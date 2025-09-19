#!/usr/bin/env node

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

const collaborators = [
  {
    name: 'Blake Carter',
    contentUrl: 'http://localhost:3000/c/blake', // Dark mode for profile content (no #light hash)
    contentUrlLight: 'http://localhost:3000/c/blake#light', // Light mode for profile content
    coverUrl: 'http://localhost:3000/c/blake/cover', // Dark mode for cover (always dark)
    filename: 'blake-carter-resume.pdf',
    filenameLight: 'blake-carter-resume-light.pdf'
  }
];

async function generateSinglePagePDF(url, description) {
  console.log(`Generating ${description}...`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Set smaller viewport for better compression
  await page.setViewport({ width: 1024, height: 768 });

  try {
    // Navigate to the page
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 60000
    });

    // Wait for the main content to load
    await page.waitForSelector('body', { timeout: 30000 });

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
        a[href*="calendly.com"],
        a[href*="linkedin.com"],
        a[href*="drksci.com"] {
          display: block !important;
          cursor: pointer !important;
        }

        /* Cover page link styling for PDF */
        .linkedin-badge,
        .email-link,
        .booking-link,
        .cover-link {
          position: relative !important;
          z-index: 10 !important;
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

        /* Aggressive trailing space removal */
        body > div:last-child,
        .min-h-screen > div:last-child,
        main:last-child,
        [data-pdf-page]:last-child {
          margin-bottom: 0 !important;
          padding-bottom: 0 !important;
        }

        /* Remove any trailing margins from gallery section */
        .grid.grid-cols-2:last-child,
        .grid.grid-cols-4:last-child {
          margin-bottom: 0 !important;
        }


        /* Disable all page breaks for single-page layout */
        * {
          page-break-before: avoid !important;
          page-break-after: avoid !important;
          page-break-inside: avoid !important;
          break-before: avoid !important;
          break-after: avoid !important;
          break-inside: avoid !important;
        }

        /* Force single page layout */
        html, body {
          height: auto !important;
          overflow: visible !important;
        }

        @media print {
          * {
            all: unset !important;
            display: revert !important;
            box-sizing: border-box !important;
            page-break-before: avoid !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
            break-before: avoid !important;
            break-after: avoid !important;
            break-inside: avoid !important;
          }
          html, body {
            font-family: system-ui, -apple-system, 'Segoe UI', 'Roboto', 'Ubuntu', 'Cantarell', 'Noto Sans', sans-serif !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            color: black !important;
            height: auto !important;
            overflow: visible !important;
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
      scale: 0.7,  // Aggressive scale reduction for smaller file size
      displayHeaderFooter: false,
      preferCSSPageSize: false,
      pageRanges: '1' // Force single page only
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

  // Set smaller viewport for better compression
  await page.setViewport({ width: 1024, height: 768 });

  try {
    // Navigate to the page
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 60000
    });

    // Wait for the main content to load
    await page.waitForSelector('body', { timeout: 30000 });

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

async function mergePDFs(coverBuffer, contentBuffer, outputPath, returnBuffer = false) {
  console.log('Merging cover and content PDFs...');

  try {
    // Create a new PDF document
    const mergedPdf = await PDFDocument.create();

    let totalPages = 0;

    // Parse the cover PDF
    if (coverBuffer) {
      const coverPdf = await PDFDocument.load(coverBuffer);
      const coverPageCount = coverPdf.getPageCount();
      console.log(`  Cover PDF has ${coverPageCount} page(s)`);
      totalPages += coverPageCount;

      const coverPages = await mergedPdf.copyPages(coverPdf, coverPdf.getPageIndices());
      coverPages.forEach((page) => mergedPdf.addPage(page));
    }

    // Parse the content PDF
    if (contentBuffer) {
      const contentPdf = await PDFDocument.load(contentBuffer);
      const contentPageCount = contentPdf.getPageCount();
      console.log(`  Content PDF has ${contentPageCount} page(s)`);
      totalPages += contentPageCount;

      const contentPages = await mergedPdf.copyPages(contentPdf, contentPdf.getPageIndices());
      contentPages.forEach((page) => mergedPdf.addPage(page));
    }

    // Validate expected page count
    const finalPageCount = mergedPdf.getPageCount();
    console.log(`  Final merged PDF has ${finalPageCount} page(s) (expected: 2)`);

    if (finalPageCount !== 2) {
      console.warn(`  ⚠️  WARNING: Expected 2 pages but got ${finalPageCount} pages!`);
    } else {
      console.log(`  ✓ Page count validation passed`);
    }

    // Save the merged PDF
    const mergedPdfBytes = await mergedPdf.save();

    if (returnBuffer) {
      console.log(`  ✓ Merged PDF created (${(mergedPdfBytes.length / 1024).toFixed(2)} KB)`);
      return mergedPdfBytes;
    } else {
      fs.writeFileSync(outputPath, mergedPdfBytes);
      console.log(`  ✓ Merged PDF saved (${(mergedPdfBytes.length / 1024).toFixed(2)} KB)`);
      return mergedPdfBytes.length;
    }

  } catch (error) {
    console.error(`  ✗ Failed to merge PDFs:`, error.message);
    return null;
  }
}

async function compressPDF(inputBuffer, targetSizeKB = 2048) {
  console.log('Compressing PDF to reduce file size...');

  try {
    const pdfDoc = await PDFDocument.load(inputBuffer);

    // More aggressive compression settings
    const compressedBytes = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
      objectsPerTick: 100,
      updateFieldAppearances: false,
      compress: true
    });

    const originalSizeKB = inputBuffer.length / 1024;
    const compressedSizeKB = compressedBytes.length / 1024;

    console.log(`  ✓ Compressed from ${originalSizeKB.toFixed(2)} KB to ${compressedSizeKB.toFixed(2)} KB`);

    return compressedBytes;
  } catch (error) {
    console.error(`  ✗ Failed to compress PDF:`, error.message);
    return inputBuffer; // Return original if compression fails
  }
}

async function generateCollaboratorPDF(collaborator) {
  console.log(`\nGenerating PDF for ${collaborator.name}...`);

  // Generate cover with standard A4 and content with single page approach
  const coverBuffer = await generatePDF(collaborator.coverUrl, 'cover page');
  const contentBuffer = await generateSinglePagePDF(collaborator.contentUrl, 'content page (single page)');

  // Generate light mode content
  const contentBufferLight = await generateSinglePagePDF(collaborator.contentUrlLight, 'content page (light mode)');

  if (!coverBuffer && !contentBuffer && !contentBufferLight) {
    console.error(`Failed to generate any PDFs for ${collaborator.name}`);
    return { success: false, filename: collaborator.filename, error: 'Failed to generate PDFs' };
  }

  // Ensure output directory exists
  const outputDir = path.join(__dirname, '..', 'public', 'pdfs');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const results = [];

  // Generate dark mode PDF
  if (coverBuffer && contentBuffer) {
    const darkOutputPath = path.join(outputDir, collaborator.filename);
    let mergedBuffer = await mergePDFs(coverBuffer, contentBuffer, darkOutputPath, true); // Return buffer instead of writing

    if (mergedBuffer) {
      // Compress if over 2MB
      if (mergedBuffer.length > 2 * 1024 * 1024) {
        mergedBuffer = await compressPDF(mergedBuffer);
      }

      // Write compressed version
      fs.writeFileSync(darkOutputPath, mergedBuffer);

      results.push({
        success: true,
        filename: collaborator.filename,
        size: mergedBuffer.length,
        mode: 'dark',
        hasCover: !!coverBuffer,
        hasContent: !!contentBuffer
      });
    }
  }

  // Generate light mode PDF
  if (coverBuffer && contentBufferLight) {
    const lightOutputPath = path.join(outputDir, collaborator.filenameLight);
    let mergedBuffer = await mergePDFs(coverBuffer, contentBufferLight, lightOutputPath, true); // Return buffer instead of writing

    if (mergedBuffer) {
      // Compress if over 2MB
      if (mergedBuffer.length > 2 * 1024 * 1024) {
        mergedBuffer = await compressPDF(mergedBuffer);
      }

      // Write compressed version
      fs.writeFileSync(lightOutputPath, mergedBuffer);

      results.push({
        success: true,
        filename: collaborator.filenameLight,
        size: mergedBuffer.length,
        mode: 'light',
        hasCover: !!coverBuffer,
        hasContent: !!contentBufferLight
      });
    }
  }

  return results.length > 0 ? results : [{ success: false, filename: collaborator.filename, error: 'Failed to merge PDFs' }];
}

async function generateAllPDFs() {
  console.log('Starting enhanced PDF generation with separate cover and content...\n');

  const allResults = [];

  for (const collaborator of collaborators) {
    try {
      const results = await generateCollaboratorPDF(collaborator);
      allResults.push(...results);
    } catch (error) {
      console.error(`Failed to process ${collaborator.name}:`, error);
      allResults.push({
        success: false,
        filename: collaborator.filename,
        error: error.message
      });
    }
    console.log(''); // Empty line between collaborators
  }

  console.log('Enhanced PDF generation complete!');
  console.log('\nGenerated files:');

  const successful = allResults.filter(r => r.success);
  const failed = allResults.filter(r => !r.success);

  if (successful.length > 0) {
    successful.forEach(result => {
      const parts = [];
      if (result.hasCover) parts.push('cover');
      if (result.hasContent) parts.push('content');
      const mode = result.mode ? ` (${result.mode} mode)` : '';
      const sizeKB = (result.size / 1024).toFixed(2);
      const sizeStatus = result.size > 2 * 1024 * 1024 ? ' ⚠️  >2MB' : ' ✓ ≤2MB';
      console.log(`  ✓ ${result.filename} (${sizeKB} KB${sizeStatus}) - ${parts.join(' + ')}${mode}`);
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