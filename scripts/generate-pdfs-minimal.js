#!/usr/bin/env node

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const collaborators = [
  {
    name: 'Blake Carter',
    contentUrl: 'http://localhost:3000/c/blake',
    contentUrlLight: 'http://localhost:3000/c/blake#light',
    coverUrl: 'http://localhost:3000/c/blake/cover',
    filename: 'blake-carter-resume.pdf',
    filenameLight: 'blake-carter-resume-light.pdf'
  }
];

async function generatePDF(url, filename, description) {
  console.log(`Generating ${description}...`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 768 });

  try {
    // Navigate with network idle
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 90000
    });

    // Wait for body
    await page.waitForSelector('body', { timeout: 30000 });

    // Theme setup
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

    // Basic wait
    await new Promise(resolve => setTimeout(resolve, 10000));

    // Inject Material Icons font
    await page.addStyleTag({
      content: `
        @font-face {
          font-family: 'Material Symbols Outlined';
          font-style: normal;
          font-weight: 100 700;
          src: url(https://fonts.gstatic.com/s/materialsymbolsoutlined/v135/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY3JiOqVZrUeNYdOFZdlWnZw.woff2) format('woff2');
        }
        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined' !important;
        }
      `
    });

    // Wait for fonts
    await page.evaluate(() => document.fonts.ready);
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Minimal CSS - only hide header
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

    // Generate PDF
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' }
    });

    // Save PDF
    const outputPath = path.join(__dirname, '..', 'public', 'pdfs', filename);
    fs.writeFileSync(outputPath, pdf);

    const sizeKB = (pdf.length / 1024).toFixed(2);
    console.log(`  ✓ Generated ${filename} (${sizeKB} KB)`);

    await browser.close();
    return pdf;

  } catch (error) {
    console.error(`Error generating ${description}:`, error);
    await browser.close();
    throw error;
  }
}

async function main() {
  console.log('Starting minimal PDF generation...\n');

  for (const collaborator of collaborators) {
    console.log(`Generating PDFs for ${collaborator.name}...`);

    // Generate dark mode PDF
    await generatePDF(collaborator.contentUrl, collaborator.filename, `${collaborator.name} (dark mode)`);

    // Generate light mode PDF
    await generatePDF(collaborator.contentUrlLight, collaborator.filenameLight, `${collaborator.name} (light mode)`);
  }

  console.log('\nMinimal PDF generation complete!');
}

main().catch(console.error);