#!/usr/bin/env node

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generateResumePDF() {
  console.log('Generating Blake Carter Resume PDF...');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  try {
    // Navigate to Blake's collaborator page with print mode
    const url = 'http://localhost:3000/c/blake#print';
    console.log(`Loading: ${url}`);

    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Wait for React content to load
    await page.waitForSelector('.collaborator-page', { timeout: 15000 });
    console.log('✓ Page loaded');

    // Wait for cover page specifically
    try {
      await page.waitForSelector('.pdf-cover-page', { timeout: 10000 });
      console.log('✓ Cover page detected');
    } catch (e) {
      console.log('⚠ Warning: Cover page not found, continuing...');
    }

    // Wait for main content
    await page.waitForSelector('h1, h2, .cover-name', { timeout: 10000 });
    console.log('✓ Content loaded');

    // Extra wait for dynamic content
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Emulate print media
    await page.emulateMediaType('print');
    console.log('✓ Print mode activated');

    // Generate PDF with optimal settings
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '5mm',
        bottom: '5mm',
        left: '5mm',
        right: '5mm'
      },
      preferCSSPageSize: false,
      displayHeaderFooter: false
    });

    // Ensure output directory exists
    const outputDir = path.join(__dirname, '..', 'public', 'pdfs');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write PDF file
    const filename = 'blake-carter-resume.pdf';
    const outputPath = path.join(outputDir, filename);
    fs.writeFileSync(outputPath, pdfBuffer);

    console.log(`✓ Generated ${filename} (${(pdfBuffer.length / 1024).toFixed(2)} KB)`);
    console.log(`   Location: ${outputPath}`);

    return { success: true, size: pdfBuffer.length, path: outputPath };

  } catch (error) {
    console.error(`✗ Failed to generate PDF:`, error.message);
    return { success: false, error: error.message };
  } finally {
    await browser.close();
  }
}

// Run if called directly
if (require.main === module) {
  generateResumePDF()
    .then(result => {
      if (result.success) {
        console.log('\n✅ PDF generation completed successfully!');
        process.exit(0);
      } else {
        console.log('\n❌ PDF generation failed!');
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('Unexpected error:', error);
      process.exit(1);
    });
}

module.exports = { generateResumePDF };