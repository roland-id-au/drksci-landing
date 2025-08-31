#!/usr/bin/env node

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const collaborators = [
  {
    name: 'Blake Carter',
    url: 'https://drksci.com/collaborators/blake',
    filename: 'blake-carter-resume.pdf'
  }
  // Only generating for Blake for now
  // {
  //   name: 'Giselle',
  //   url: 'https://drksci.com/collaborators/giselle', 
  //   filename: 'giselle-resume.pdf'
  // },
  // {
  //   name: 'Emily',
  //   url: 'https://drksci.com/collaborators/emily',
  //   filename: 'emily-resume.pdf'
  // }
];

async function generatePDF(collaborator) {
  console.log(`Generating PDF for ${collaborator.name}...`);
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Set viewport for consistent rendering
  await page.setViewport({ width: 1280, height: 800 });
  
  try {
    // Navigate to the page
    await page.goto(collaborator.url, { 
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
    
    // Ensure output directory exists
    const outputDir = path.join(__dirname, '..', 'public', 'pdfs');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write PDF file
    const outputPath = path.join(outputDir, collaborator.filename);
    fs.writeFileSync(outputPath, pdfBuffer);
    
    console.log(`✓ Generated ${collaborator.filename} (${(pdfBuffer.length / 1024).toFixed(2)} KB)`);
    
  } catch (error) {
    console.error(`✗ Failed to generate PDF for ${collaborator.name}:`, error.message);
  } finally {
    await browser.close();
  }
}

async function generateAllPDFs() {
  console.log('Starting PDF generation...\n');
  
  for (const collaborator of collaborators) {
    try {
      await generatePDF(collaborator);
    } catch (error) {
      console.error(`Failed to process ${collaborator.name}:`, error);
    }
    console.log(''); // Empty line between collaborators
  }
  
  console.log('PDF generation complete!');
  console.log('\nGenerated files:');
  
  const outputDir = path.join(__dirname, '..', 'public', 'pdfs');
  if (fs.existsSync(outputDir)) {
    const files = fs.readdirSync(outputDir);
    files.forEach(file => {
      const filePath = path.join(outputDir, file);
      const stats = fs.statSync(filePath);
      console.log(`  - ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
    });
  }
}

// Run if called directly
if (require.main === module) {
  generateAllPDFs().catch(console.error);
}

module.exports = { generateAllPDFs, generatePDF };