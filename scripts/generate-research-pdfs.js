#!/usr/bin/env node

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');
const { optimizePDF } = require('./pdf-optimizer');


// Function to get all research documents from the directory
function getResearchDocuments() {
  const researchDir = path.join(__dirname, '..', 'research');

  if (!fs.existsSync(researchDir)) {
    console.log('No research directory found');
    return [];
  }

  const files = fs.readdirSync(researchDir);
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace('.md', ''));
}

// Generate A4 cover page PDF (210mm x 297mm)
async function generateCoverPDF(url, description) {
  console.log(`Generating ${description}...`);

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1024, height: 768 });

  try {
    await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: 60000
    });

    await page.waitForSelector('body', { timeout: 60000 });

    // Apply dark mode
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    });

    await new Promise(resolve => setTimeout(resolve, 5000));

    // Wait for images and fonts to load
    await page.evaluate(() => {
      return Promise.all(Array.from(document.images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.addEventListener('load', resolve);
          img.addEventListener('error', resolve);
        });
      }));
    });

    await page.evaluate(() => document.fonts.ready);
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Force screen media
    await page.emulateMedia({ media: 'screen' });

    // Hide header elements
    await page.addStyleTag({
      content: `
        header, .sticky, nav, .mobile-nav, .desktop-nav {
          display: none !important;
        }
        * {
          print-color-adjust: exact !important;
          -webkit-print-color-adjust: exact !important;
        }
      `
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate A4 PDF
    const pdfBuffer = await page.pdf({
      width: '210mm',
      height: '297mm',
      printBackground: true,
      margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
      scale: 1.0,
      displayHeaderFooter: false,
      preferCSSPageSize: false,
      tagged: true,
      format: undefined
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

async function generateSinglePagePDF(url, description) {
  console.log(`Generating ${description}...`);

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  // Set smaller viewport for better compression
  await page.setViewportSize({ width: 1024, height: 768 });

  try {
    // Navigate to the page
    await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: 60000
    });

    // Wait for the main content to load
    await page.waitForSelector('body', { timeout: 60000 });

    // Set browser zoom to 85% for proposals
    await page.evaluate(() => {
      document.body.style.zoom = '0.85';
    });

    // Apply correct mode - force dark mode for proposals
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    });

    // Wait for dynamic content and theme application
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Wait specifically for mermaid diagrams to render
    await page.evaluate(() => {
      return new Promise((resolve) => {
        const checkMermaid = setInterval(() => {
          const mermaidElements = document.querySelectorAll('.mermaid');
          const allRendered = Array.from(mermaidElements).every(el => {
            return el.querySelector('svg') !== null;
          });
          if (allRendered || mermaidElements.length === 0) {
            clearInterval(checkMermaid);
            resolve();
          }
        }, 100);
        // Timeout after 10 seconds
        setTimeout(() => {
          clearInterval(checkMermaid);
          resolve();
        }, 10000);
      });
    });

    // Wait for images to load completely and debug signature
    await page.evaluate(() => {
      const signatureImg = document.querySelector('img[alt="Blake Carter Signature"]');
      console.log('Signature image found:', !!signatureImg);
      if (signatureImg) {
        console.log('Signature src:', signatureImg.src);
        console.log('Signature loaded:', signatureImg.complete);
        console.log('Signature natural dimensions:', signatureImg.naturalWidth, 'x', signatureImg.naturalHeight);
      }

      return Promise.all(Array.from(document.images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve, reject) => {
          img.addEventListener('load', resolve);
          img.addEventListener('error', (e) => {
            console.log('Image failed to load:', img.src);
            resolve(); // Don't reject, just continue
          });
        });
      }));
    });

    // Wait for fonts to load and ensure text rendering is complete
    await page.evaluate(() => document.fonts.ready);
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Ensure text is properly rendered and selectable
    await page.evaluate(() => {
      // Force font rendering completion
      const allElements = document.querySelectorAll('*');
      allElements.forEach(el => {
        const style = window.getComputedStyle(el);
        if (style.fontFamily) {
          el.style.fontDisplay = 'block';
        }
      });
    });

    // Force screen media and minimal styling - only hide header
    await page.emulateMedia({ media: 'screen' });
    await page.addStyleTag({
      content: `
        header, .sticky, nav, .mobile-nav, .desktop-nav {
          display: none !important;
        }
        * {
          print-color-adjust: exact !important;
          -webkit-print-color-adjust: exact !important;
        }
        /* Ensure signature is visible */
        img[alt="Blake Carter Signature"] {
          opacity: 1 !important;
          filter: invert(1) brightness(1) !important;
          mix-blend-mode: normal !important;
          display: block !important;
          visibility: visible !important;
          height: 80px !important;
        }
        /* Apply pretty text breaking to proposal content */
        .proposal-letter-content p {
          text-wrap: pretty !important;
          hyphens: auto !important;
        }
      `
    });

    // Wait for styles to apply
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Get full page height including all content
    const dimensions = await page.evaluate(() => {
      // Look for the entire container that includes both content and signature
      let targetElement = null;
      let maxBottom = 0;

      // First try to find the "Available for discussion" text as it's the last element
      const availableText = Array.from(document.querySelectorAll('p')).find(p =>
        p.textContent && p.textContent.includes('Available for discussion at your convenience')
      );

      const signatureImg = document.querySelector('img[alt="Blake Carter Signature"]');

      console.log('Signature debugging:');
      console.log('- Signature image found:', !!signatureImg);
      console.log('- Available text found:', !!availableText);
      console.log('- All images on page:', document.querySelectorAll('img').length);
      console.log('- All paragraphs:', document.querySelectorAll('p').length);

      // Debug content structure
      const coverLetterDiv = document.querySelector('#proposal-letter');
      if (coverLetterDiv) {
        console.log('Proposal div children count:', coverLetterDiv.children.length);
        console.log('Proposal div innerHTML length:', coverLetterDiv.innerHTML.length);
      }

      // Use signature or availability text as the bottom element
      if (availableText) {
        targetElement = availableText;
        const rect = targetElement.getBoundingClientRect();
        maxBottom = rect.bottom + window.scrollY;
        console.log('Found availability text at bottom, using it as last element');
      } else if (signatureImg) {
        targetElement = signatureImg;
        const rect = targetElement.getBoundingClientRect();
        maxBottom = rect.bottom + window.scrollY;
        console.log('Found signature image, using it as last element');
      } else {
        // Fallback to proposal section
        const coverLetterSection = document.querySelector('#proposal-letter');
        if (coverLetterSection) {
          targetElement = coverLetterSection;
          const rect = targetElement.getBoundingClientRect();
          maxBottom = rect.bottom + window.scrollY;
          console.log('Found proposal section, using it as last element');
        } else {
          // Ultimate fallback: find last meaningful content element
          const contentElements = Array.from(document.querySelectorAll('section, .grid, .mb-20, .mb-16, .mb-8, p, img')).filter(el => {
            const style = window.getComputedStyle(el);
            return style.display !== 'none' && style.visibility !== 'hidden' && el.offsetHeight > 0;
          });

          contentElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const bottom = rect.bottom + window.scrollY;
            if (bottom > maxBottom) {
              maxBottom = bottom;
              targetElement = el;
            }
          });
          console.log('Using fallback method to find last element');
        }
      }

      console.log('Last content element:', targetElement?.tagName, targetElement?.className || targetElement?.textContent?.substring(0, 50));
      console.log('Content bottom:', maxBottom);

      // Add buffer to ensure signature is fully captured plus user requested 200px
      const finalHeight = Math.ceil(maxBottom) + 200;

      return {
        contentHeight: finalHeight,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        lastElementInfo: `${targetElement?.tagName} ${targetElement?.className}`
      };
    });

    console.log(`Content dimensions: ${dimensions.contentHeight}px height, ${dimensions.viewportWidth}px width`);
    console.log(`Last element info: ${dimensions.lastElementInfo}`);

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
      scale: 1.0,
      displayHeaderFooter: false,
      preferCSSPageSize: false,
      // Enhanced text structure preservation options
      tagged: true, // Enable tagged PDFs for accessibility
      outline: true, // Generate PDF outline/bookmarks
      printBackground: true, // Preserve all visual elements
      // Optimize for text layer preservation
      format: undefined // Use explicit width/height for precision
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

async function generateResearchPDFs() {
  console.log(`Starting research PDF generation (dark mode only)...`);

  const researchDocuments = getResearchDocuments();
  console.log(`Found ${researchDocuments.length} research documents: ${researchDocuments.join(', ')}`);

  for (const docName of researchDocuments) {
    console.log(`Generating PDF for research document: ${docName}`);

    const coverUrl = `http://localhost:3000/c/blake/research/${docName}/cover`;
    const contentUrl = `http://localhost:3000/c/blake/research/${docName}`;

    try {
      // Generate cover page PDF (A4)
      const coverPdf = await generateCoverPDF(coverUrl, `${docName} cover`);

      // Generate content PDF (dynamic height)
      const contentPdf = await generateSinglePagePDF(contentUrl, `${docName} content`);

      // Merge the PDFs
      const pdfDoc = await PDFDocument.create();

      // Load cover and content PDFs
      const coverDoc = await PDFDocument.load(coverPdf);
      const contentDoc = await PDFDocument.load(contentPdf);

      // Copy cover pages
      const coverPages = await pdfDoc.copyPages(coverDoc, coverDoc.getPageIndices());
      coverPages.forEach(page => pdfDoc.addPage(page));

      // Copy content pages
      const contentPages = await pdfDoc.copyPages(contentDoc, contentDoc.getPageIndices());
      contentPages.forEach(page => pdfDoc.addPage(page));

      // Save merged PDF
      const mergedPdfBytes = await pdfDoc.save();
      const clientName = docName; // Simplified client name
      const darkFilename = `drksci-research-${clientName}.pdf`;
      const darkPath = path.join(__dirname, '..', 'pdfs', 'research', darkFilename);
      fs.writeFileSync(darkPath, mergedPdfBytes);

      // Create optimized version
      try {
        await optimizePDF(darkPath);
        console.log(`  ✓ Created prepress optimized version: ${darkFilename.replace('.pdf', '-prepress.pdf')}`);
      } catch (error) {
        console.log(`  ⚠️  Failed to optimize ${darkFilename}: ${error.message}`);
      }

      const darkSizeKB = Math.round(mergedPdfBytes.length / 1024 * 100) / 100;

      console.log(`  ✓ ${darkFilename} (${darkSizeKB} KB)`);

    } catch (error) {
      console.error(`❌ Error generating PDF for ${docName}:`, error.message);
    }
  }

  console.log(`Research PDF generation complete!`);
}

// Run the script
generateResearchPDFs().catch(error => {
  console.error('Script failed:', error);
  process.exit(1);
});
