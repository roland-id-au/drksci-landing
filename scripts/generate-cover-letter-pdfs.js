#!/usr/bin/env node

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

async function compressPDF(inputBuffer, targetSizeKB = 2048) {
  console.log('Compressing PDF to reduce file size...');
  try {
    const pdfDoc = await PDFDocument.load(inputBuffer);
    // Ultra aggressive compression settings for font and object optimization
    const compressedBytes = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
      objectsPerTick: 25, // Smaller chunks for better compression
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

// Function to get all cover letters from the directory
function getCoverLetters() {
  const coverLettersDir = path.join(__dirname, '..', 'public', 'cover_letters');

  if (!fs.existsSync(coverLettersDir)) {
    console.log('No cover_letters directory found');
    return [];
  }

  const files = fs.readdirSync(coverLettersDir);
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace('.md', ''));
}

const collaborators = [
  {
    name: 'Blake Carter',
    contentUrl: 'http://localhost:3000/c/blake', // Dark mode for profile content
    contentUrlLight: 'http://localhost:3000/c/blake#light', // Light mode for profile content
    coverUrl: 'http://localhost:3000/c/blake/cover', // Dark mode for cover
    filename: 'blake-carter-resume.pdf',
    filenameLight: 'blake-carter-resume-light.pdf'
  }
];

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
    await page.waitForSelector('body', { timeout: 30000 });

    // Apply correct mode - force dark mode for cover letters
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    });

    // Wait for dynamic content and theme application
    await new Promise(resolve => setTimeout(resolve, 5000));

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

    // Wait for fonts to load
    await page.evaluate(() => document.fonts.ready);
    await new Promise(resolve => setTimeout(resolve, 3000));

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
        /* Apply pretty text breaking to cover letter content */
        .cover-letter-content p {
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
      const coverLetterDiv = document.querySelector('#cover-letter');
      if (coverLetterDiv) {
        console.log('Cover letter div children count:', coverLetterDiv.children.length);
        console.log('Cover letter div innerHTML length:', coverLetterDiv.innerHTML.length);
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
        // Fallback to cover letter section
        const coverLetterSection = document.querySelector('#cover-letter');
        if (coverLetterSection) {
          targetElement = coverLetterSection;
          const rect = targetElement.getBoundingClientRect();
          maxBottom = rect.bottom + window.scrollY;
          console.log('Found cover letter section, using it as last element');
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
      // Enable tagged PDFs for better text structure and accessibility
      tagged: true,
      // Optimize for text structure preservation
      format: undefined // Use explicit width/height instead of format
    });

    console.log(`  ✓ Generated ${description} (${(pdfBuffer.length / 1024).toFixed(2)} KB)`);

    // Compress the PDF to optimize images
    const compressedBuffer = await compressPDF(pdfBuffer);

    return compressedBuffer;

  } catch (error) {
    console.error(`  ✗ Failed to generate ${description}:`, error.message);
    return null;
  } finally {
    await browser.close();
  }
}

async function generateCoverLetterPDFs() {
  console.log('Starting cover letter PDF generation (dark mode only)...\n');

  const coverLetters = getCoverLetters();
  console.log(`Found ${coverLetters.length} cover letters: ${coverLetters.join(', ')}\n`);

  for (const letterName of coverLetters) {
    console.log(`Generating PDF for cover letter: ${letterName}`);

    const darkUrl = `http://localhost:3000/c/blake/letter/${letterName}`;

    try {
      // Generate dark mode PDF only (single page style)
      const darkPdf = await generateSinglePagePDF(darkUrl, `${letterName} (dark mode)`);
      const darkFilename = `blake-carter-cover-${letterName}.pdf`;
      const darkPath = path.join(__dirname, '..', 'public', 'pdfs', darkFilename);
      fs.writeFileSync(darkPath, darkPdf);

      const darkSizeKB = Math.round(darkPdf.length / 1024 * 100) / 100;

      console.log(`  ✓ ${darkFilename} (${darkSizeKB} KB)\n`);

    } catch (error) {
      console.error(`❌ Error generating PDF for ${letterName}:`, error.message);
    }
  }

  console.log('Cover letter PDF generation complete!\n');
}

// Run the script
generateCoverLetterPDFs().catch(error => {
  console.error('Script failed:', error);
  process.exit(1);
});