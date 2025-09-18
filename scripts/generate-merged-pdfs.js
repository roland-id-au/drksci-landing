#!/usr/bin/env node

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

const collaborators = [
  {
    name: 'Blake Carter',
    contentUrl: 'http://localhost:3000/c/blake',
    coverUrl: 'http://localhost:3000/c/blake/cover',
    filename: 'blake-carter-resume.pdf'
  }
];

async function generatePDF(url, description) {
  console.log(`Generating ${description}...`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Set viewport for consistent rendering
  await page.setViewport({ width: 1280, height: 800 });

  try {
    // Navigate to the page
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Wait for the main content to load
    await page.waitForSelector('body', { timeout: 15000 });

    // Wait a bit more for dynamic content
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Emulate print media for print stylesheets
    await page.emulateMediaType('print');

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        bottom: '20mm',
        left: '15mm',
        right: '15mm'
      },
      preferCSSPageSize: false
    });

    console.log(`  ✓ Generated ${description} (${(pdfBuffer.length / 1024).toFixed(2)} KB)`);

    return pdfBuffer;

  } catch (error) {
    console.error(`  ✗ Failed to generate ${description}:`, error.message);
    return null;
  } finally {
    await browser.close();
  }
}

async function mergePDFs(coverBuffer, contentBuffer, outputPath) {
  console.log('Merging cover and content PDFs...');

  try {
    // Create a new PDF document
    const mergedPdf = await PDFDocument.create();

    // Parse the cover PDF
    if (coverBuffer) {
      const coverPdf = await PDFDocument.load(coverBuffer);
      const coverPages = await mergedPdf.copyPages(coverPdf, coverPdf.getPageIndices());
      coverPages.forEach((page) => mergedPdf.addPage(page));
    }

    // Parse the content PDF
    if (contentBuffer) {
      const contentPdf = await PDFDocument.load(contentBuffer);
      const contentPages = await mergedPdf.copyPages(contentPdf, contentPdf.getPageIndices());
      contentPages.forEach((page) => mergedPdf.addPage(page));
    }

    // Save the merged PDF
    const mergedPdfBytes = await mergedPdf.save();
    fs.writeFileSync(outputPath, mergedPdfBytes);

    console.log(`  ✓ Merged PDF saved (${(mergedPdfBytes.length / 1024).toFixed(2)} KB)`);

    return mergedPdfBytes.length;

  } catch (error) {
    console.error(`  ✗ Failed to merge PDFs:`, error.message);
    return null;
  }
}

async function generateCollaboratorPDF(collaborator) {
  console.log(`\nGenerating PDF for ${collaborator.name}...`);

  // Generate cover and content PDFs separately
  const coverBuffer = await generatePDF(collaborator.coverUrl, 'cover page');
  const contentBuffer = await generatePDF(collaborator.contentUrl, 'content pages');

  if (!coverBuffer && !contentBuffer) {
    console.error(`Failed to generate any PDFs for ${collaborator.name}`);
    return { success: false, filename: collaborator.filename, error: 'Failed to generate PDFs' };
  }

  // Ensure output directory exists
  const outputDir = path.join(__dirname, '..', 'public', 'pdfs');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Merge PDFs
  const outputPath = path.join(outputDir, collaborator.filename);
  const mergedSize = await mergePDFs(coverBuffer, contentBuffer, outputPath);

  if (mergedSize) {
    return {
      success: true,
      filename: collaborator.filename,
      size: mergedSize,
      hasCover: !!coverBuffer,
      hasContent: !!contentBuffer
    };
  } else {
    return { success: false, filename: collaborator.filename, error: 'Failed to merge PDFs' };
  }
}

async function generateAllPDFs() {
  console.log('Starting enhanced PDF generation with separate cover and content...\n');

  const results = [];

  for (const collaborator of collaborators) {
    try {
      const result = await generateCollaboratorPDF(collaborator);
      results.push(result);
    } catch (error) {
      console.error(`Failed to process ${collaborator.name}:`, error);
      results.push({
        success: false,
        filename: collaborator.filename,
        error: error.message
      });
    }
    console.log(''); // Empty line between collaborators
  }

  console.log('Enhanced PDF generation complete!');
  console.log('\nGenerated files:');

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  if (successful.length > 0) {
    successful.forEach(result => {
      const parts = [];
      if (result.hasCover) parts.push('cover');
      if (result.hasContent) parts.push('content');
      console.log(`  ✓ ${result.filename} (${(result.size / 1024).toFixed(2)} KB) - ${parts.join(' + ')}`);
    });
  }

  if (failed.length > 0) {
    console.log('\nFailed:');
    failed.forEach(result => {
      console.log(`  ✗ ${result.filename} - ${result.error}`);
    });
  }
}

// Run if called directly
if (require.main === module) {
  generateAllPDFs().catch(console.error);
}

module.exports = { generateAllPDFs, generateCollaboratorPDF };