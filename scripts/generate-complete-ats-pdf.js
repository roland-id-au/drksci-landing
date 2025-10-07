#!/usr/bin/env node

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

async function generateATSDiagnosticsPage() {
  console.log('Generating ATS Diagnostics page...');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  try {
    // Navigate to the ATS diagnostics page
    const timestamp = Date.now();
    const url = `http://localhost:3001/ats-resume?refresh=${timestamp}`;
    console.log(`Loading: ${url}`);

    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Wait for the ATS template to load
    await page.waitForSelector('.ats-template', { timeout: 15000 });
    console.log('✓ ATS Template loaded');

    // Extract only the ATS diagnostics section
    await page.evaluate(() => {
      // Hide everything except the ATS diagnostics section
      const atsTemplate = document.querySelector('.ats-template');
      if (atsTemplate) {
        const children = Array.from(atsTemplate.children);
        children.forEach(child => {
          // Find the ATS diagnostics section
          if (child.textContent.includes('ATS COMPATIBILITY DIAGNOSTICS')) {
            // Keep this section visible
            child.style.display = 'block';
          } else {
            // Hide all other sections
            child.style.display = 'none';
          }
        });

        // Update container styling for diagnostics-only page
        atsTemplate.style.minHeight = 'auto';
        atsTemplate.style.padding = '40px';
      }
    });

    // Use screen media for better rendering
    await page.emulateMediaType('screen');
    console.log('✓ Screen mode activated');

    // Extra wait for content to stabilize
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Get content dimensions for single-page PDF
    const dimensions = await page.evaluate(() => {
      const content = document.querySelector('.ats-template');
      if (!content) {
        throw new Error('ATS template content not found');
      }

      const rect = content.getBoundingClientRect();

      return {
        contentHeight: Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight,
          rect.bottom - rect.top + 100 // Add padding
        )
      };
    });

    console.log(`✓ Content dimensions calculated: ${dimensions.contentHeight}px height`);

    // Calculate PDF dimensions
    const pdfWidth = '210mm';  // A4 width to match other pages
    const pdfHeight = `${dimensions.contentHeight * 0.264583}mm`;
    console.log(`✓ PDF page size: ${pdfWidth} x ${pdfHeight}`);

    // Generate PDF as single page with A4 width and exact content height
    const pdfBuffer = await page.pdf({
      width: pdfWidth, // A4 width
      height: pdfHeight, // Exact content height
      printBackground: true,
      margin: {
        top: '0mm',
        bottom: '0mm',
        left: '0mm',
        right: '0mm'
      },
      scale: 1.0, // Use full PDF scale
      displayHeaderFooter: false,
      preferCSSPageSize: false,
      // Enable tagged PDFs for accessibility and text structure
      tagged: true,
      pageRanges: '1', // Single page only
      format: undefined // Use explicit dimensions
    });

    return pdfBuffer;

  } catch (error) {
    console.error(`✗ Failed to generate ATS diagnostics page:`, error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

async function combineAllPDFs() {
  console.log('Combining all PDFs...');

  const outputDir = path.join(__dirname, '..', 'public', 'pdfs');

  // Check that all required PDFs exist
  const coverPath = path.join(outputDir, 'blake-carter-cover-only.pdf');
  const resumePath = path.join(outputDir, 'blake-carter-resume.pdf');
  const atsPath = path.join(outputDir, 'blake-carter-resume-ats.pdf');

  if (!fs.existsSync(coverPath)) {
    throw new Error('Cover PDF not found. Run generate-merged-pdfs.js first.');
  }
  if (!fs.existsSync(resumePath)) {
    throw new Error('Resume PDF not found. Run generate-merged-pdfs.js first.');
  }
  if (!fs.existsSync(atsPath)) {
    throw new Error('ATS PDF not found. Run generate-ats-resume-pdf.js first.');
  }

  // Generate ATS diagnostics page
  const diagnosticsBuffer = await generateATSDiagnosticsPage();

  // Read existing PDFs
  const coverBuffer = fs.readFileSync(coverPath);
  const resumeBuffer = fs.readFileSync(resumePath);
  const atsBuffer = fs.readFileSync(atsPath);

  // Create new PDF document
  const finalPdf = await PDFDocument.create();

  // Add cover page
  const coverPdf = await PDFDocument.load(coverBuffer);
  const coverPages = await finalPdf.copyPages(coverPdf, [0]);
  finalPdf.addPage(coverPages[0]);
  console.log('✓ Added cover page');

  // Add resume pages (skip cover since we already added it)
  const resumePdf = await PDFDocument.load(resumeBuffer);
  const resumePageCount = resumePdf.getPageCount();
  if (resumePageCount > 1) {
    // Skip first page (cover) and add content pages
    const resumePages = await finalPdf.copyPages(resumePdf, Array.from({length: resumePageCount - 1}, (_, i) => i + 1));
    resumePages.forEach(page => finalPdf.addPage(page));
    console.log(`✓ Added ${resumePageCount - 1} resume content page(s)`);
  }

  // Add ATS transcript page
  const atsPdf = await PDFDocument.load(atsBuffer);
  const atsPages = await finalPdf.copyPages(atsPdf, [0]);
  finalPdf.addPage(atsPages[0]);
  console.log('✓ Added ATS transcript page');

  // Add ATS diagnostics page
  const diagnosticsPdf = await PDFDocument.load(diagnosticsBuffer);
  const diagnosticsPages = await finalPdf.copyPages(diagnosticsPdf, [0]);
  finalPdf.addPage(diagnosticsPages[0]);
  console.log('✓ Added ATS diagnostics page');

  // Save the final PDF
  const finalPdfBytes = await finalPdf.save();
  const outputPath = path.join(outputDir, 'blake-carter-complete-ats.pdf');
  fs.writeFileSync(outputPath, finalPdfBytes);

  const fileSize = (finalPdfBytes.length / 1024).toFixed(2);
  console.log(`✓ Generated blake-carter-complete-ats.pdf (${fileSize} KB)`);
  console.log(`   Location: ${outputPath}`);
  console.log(`   Total pages: ${finalPdf.getPageCount()}`);

  return {
    success: true,
    size: finalPdfBytes.length,
    path: outputPath,
    pageCount: finalPdf.getPageCount()
  };
}

// Run if called directly
if (require.main === module) {
  (async () => {
    try {
      const result = await combineAllPDFs();
      console.log('\n✅ Complete ATS PDF generation completed successfully!');
      process.exit(0);
    } catch (error) {
      console.error('Unexpected error:', error);
      process.exit(1);
    }
  })();
}

module.exports = { combineAllPDFs, generateATSDiagnosticsPage };