#!/usr/bin/env node

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

const collaborators = [
  {
    name: 'Blake Carter',
    contentUrl: 'http://localhost:3000/c/blake', // Dark mode for profile content (no #light hash)
    coverUrl: 'http://localhost:3000/c/blake/cover', // Dark mode for cover (no #light hash)
    filename: 'blake-carter-resume.pdf'
  }
];

async function generateSinglePagePDF(url, description) {
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

    // Apply correct mode based on URL hash
    await page.evaluate(() => {
      const isLightMode = window.location.hash === '#light';
      if (isLightMode) {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      }
    });

    // Wait for dynamic content and theme application
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Force screen media and disable all print styles, hide header
    await page.emulateMediaType('screen');
    await page.addStyleTag({
      content: `
        /* Hide header menu */
        header, .sticky, nav, .mobile-nav, .desktop-nav {
          display: none !important;
        }

        /* Adjust margins for collaborator page - narrow margins */
        .max-w-5xl {
          max-width: none !important;
          margin: 0 auto !important;
        }
        .px-12 {
          padding-left: 4rem !important;
          padding-right: 4rem !important;
        }
        .sm\\:px-18 {
          padding-left: 4rem !important;
          padding-right: 4rem !important;
        }

        /* Ensure links are clickable in PDF */
        a[href] {
          color: inherit !important;
          text-decoration: none !important;
        }

        /* Make contact buttons clearly clickable */
        a[href*="mailto:"],
        a[href*="calendly.com"] {
          display: block !important;
          cursor: pointer !important;
        }

        /* Remove trailing space after final image */
        section:last-child {
          margin-bottom: 0 !important;
          padding-bottom: 0 !important;
        }

        /* Reduce bottom padding on main container */
        .py-20 {
          padding-bottom: 0.25rem !important;
        }

        /* Remove excess spacing on final elements */
        .mb-8:last-child,
        .mb-16:last-child,
        .mb-20:last-child,
        .mb-40:last-child {
          margin-bottom: 0 !important;
        }


        @media print {
          * {
            all: unset !important;
            display: revert !important;
            box-sizing: border-box !important;
          }
          html, body {
            font-family: system-ui, -apple-system, 'Segoe UI', 'Roboto', 'Ubuntu', 'Cantarell', 'Noto Sans', sans-serif !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            color: black !important;
          }
          .bg-black {
            background: white !important;
          }
          .text-white {
            color: black !important;
          }
          header, .sticky, nav, .mobile-nav, .desktop-nav {
            display: none !important;
          }
        }
      `
    });

    // Wait for styles to apply
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Get the viewport dimensions and content height
    const dimensions = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;

      return {
        contentHeight: Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight
        ),
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight
      };
    });

    console.log(`Content dimensions: ${dimensions.contentHeight}px height, ${dimensions.viewportWidth}px width`);

    const pdfWidth = '210mm';  // A4 width to match cover page
    const pdfHeight = `${dimensions.contentHeight * 0.264583}mm`;
    console.log(`PDF page size: ${pdfWidth} x ${pdfHeight}`);

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
      scale: 0.9  // 90% zoom to fit more content
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

    // Apply correct mode based on URL hash
    await page.evaluate(() => {
      const isLightMode = window.location.hash === '#light';
      if (isLightMode) {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      }
    });

    // Wait for dynamic content and theme application
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Only emulate print media for content pages, not cover pages
    if (!url.includes('/cover')) {
      await page.emulateMediaType('print');
    } else {
      // Force screen media and disable all print styles for cover page
      await page.emulateMediaType('screen');
      await page.addStyleTag({
        content: `
          @media print {
            * {
              all: unset !important;
              display: revert !important;
              box-sizing: border-box !important;
            }
            html, body {
              font-family: system-ui, -apple-system, 'Segoe UI', 'Roboto', 'Ubuntu', 'Cantarell', 'Noto Sans', sans-serif !important;
              margin: 0 !important;
              padding: 0 !important;
            }
          }
        `
      });
    }

    // Generate PDF using A4 width (210mm) but dynamic height
    const dimensions = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;

      return {
        contentHeight: Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight
        ),
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight
      };
    });

    const pdfWidth = '210mm';  // A4 width
    const pdfHeight = '297mm';  // Full A4 height
    console.log(`PDF page size: ${pdfWidth} x ${pdfHeight}`);

    // Generate PDF with full A4 dimensions
    const pdfBuffer = await page.pdf({
      width: pdfWidth,
      height: pdfHeight,
      printBackground: true,
      margin: {
        top: '0mm',
        bottom: '0mm',
        left: '0mm',
        right: '0mm'
      },
      preferCSSPageSize: false,
      scale: 1.0
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
  const contentBuffer = await generateSinglePagePDF(collaborator.contentUrl, 'content page (single page)');

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