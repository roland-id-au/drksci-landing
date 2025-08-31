#!/usr/bin/env node

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration for PDF generation
const PDF_CONFIG = {
  collaborators: {
    blake: {
      url: '/collaborators/blake',  // Use old URL until new routes are deployed
      filename: 'blake-carter-resume.pdf',
      title: 'Blake Carter - Resume'
    }
  },
  candidate: {
    default: {
      url: '/candidate',
      filename: 'candidate-application.pdf',
      title: 'Candidate Application'
    }
  }
};

// Find all components using PdfVersion or PdfPage
function findPagesWithPdfVersion() {
  const srcDir = path.join(__dirname, '..', 'src');
  const pages = new Set();
  
  try {
    // Search for PdfVersion imports
    const pdfVersionImports = execSync(
      `grep -r "import.*PdfVersion" "${srcDir}" --include="*.jsx" --include="*.js" --include="*.tsx" || true`,
      { encoding: 'utf8' }
    );
    
    // Search for PdfPage imports
    const pdfPageImports = execSync(
      `grep -r "import.*PdfPage" "${srcDir}" --include="*.jsx" --include="*.js" --include="*.tsx" || true`,
      { encoding: 'utf8' }
    );
    
    // Process results
    [pdfVersionImports, pdfPageImports].forEach(result => {
      if (result) {
        const lines = result.split('\n').filter(line => line.trim());
        lines.forEach(line => {
          const match = line.match(/^(.+?):\d*:/);
          if (match) {
            const filePath = match[1];
            const baseName = path.basename(filePath, path.extname(filePath));
            pages.add(baseName);
          }
        });
      }
    });
  } catch (error) {
    console.error('Error searching for PDF components:', error.message);
  }
  
  return Array.from(pages);
}

// Parse JSX files to find PDF configurations
function extractPdfConfigurations() {
  const srcDir = path.join(__dirname, '..', 'src');
  const configs = [];
  
  const pagesWithPdf = findPagesWithPdfVersion();
  console.log('Pages found with PDF components:', pagesWithPdf);
  
  pagesWithPdf.forEach(pageName => {
    // Map component names to their PDF configurations
    if (pageName === 'BlakeCollaborator') {
      configs.push({
        component: pageName,
        ...PDF_CONFIG.collaborators.blake,
        pageId: 'blake-collaborator'
      });
    } else if (pageName === 'CandidateApplication') {
      configs.push({
        component: pageName,
        ...PDF_CONFIG.candidate.default,
        pageId: 'candidate-application'
      });
    }
  });
  
  // Always include Blake's resume as it's currently used
  if (!configs.find(c => c.component === 'BlakeCollaborator')) {
    configs.push({
      component: 'BlakeCollaborator',
      ...PDF_CONFIG.collaborators.blake,
      pageId: 'blake-collaborator'
    });
  }
  
  return configs;
}

const maxRetries = 3;

async function generatePdf(config, baseUrl, retryCount = 0) {
  
  console.log(`Generating PDF: ${config.title}${retryCount > 0 ? ` (Retry ${retryCount}/${maxRetries})` : ''}`);
  console.log(`  URL: ${baseUrl}${config.url}`);
  console.log(`  Output: ${config.filename}`);
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Set viewport for consistent rendering
    await page.setViewport({ width: 1280, height: 800 });
    
    // Navigate to the page
    await page.goto(`${baseUrl}${config.url}`, { 
      waitUntil: 'networkidle0',
      timeout: 60000
    });
    
    // Wait for content to load
    await page.waitForSelector('body', { timeout: 15000 });
    
    // Wait for specific content that indicates page is loaded
    // For Blake's page, wait for specific content
    if (config.url.includes('/c/blake') || config.url.includes('/collaborators/blake')) {
      try {
        await page.waitForSelector('.blake-title, h1, [class*="text-7xl"], [class*="text-6xl"]', { timeout: 15000 });
        // Also wait for sections to load
        await page.waitForSelector('section, [id="profile"], [id="resume"]', { timeout: 10000 });
      } catch (e) {
        console.log('  ⚠ Warning: Some content elements not found');
      }
    } else {
      try {
        await page.waitForSelector('h1, [class*="title"]', { timeout: 10000 });
      } catch (e) {
        console.log('  ⚠ Warning: Could not find title element');
      }
    }
    
    // Wait for any dynamic content
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Check if content is actually loaded by checking page height
    const pageHeight = await page.evaluate(() => document.body.scrollHeight);
    console.log(`  Page height: ${pageHeight}px`);
    
    if (pageHeight < 500 && retryCount < maxRetries) {
      throw new Error('Page content appears incomplete (too short)');
    }
    
    // Apply print-specific styles and hide non-print elements
    await page.evaluate(() => {
      // Hide PDF download buttons in the PDF itself
      const pdfButtons = document.querySelectorAll('[aria-label*="PDF"]');
      pdfButtons.forEach(btn => btn.style.display = 'none');
      
      // Hide navigation elements
      const nav = document.querySelector('nav');
      if (nav) nav.style.display = 'none';
      
      // Hide any footer links or social media icons
      const footers = document.querySelectorAll('footer');
      footers.forEach(f => f.style.display = 'none');
      
      // Remove any link underlines and make links black for print
      const style = document.createElement('style');
      style.textContent = `
        @media print {
          a {
            color: #000 !important;
            text-decoration: none !important;
          }
          a[href]:after {
            content: none !important;
          }
          .no-print {
            display: none !important;
          }
          body {
            font-size: 11pt !important;
            line-height: 1.5 !important;
          }
          h1 {
            font-size: 20pt !important;
            margin-top: 0 !important;
          }
          h2 {
            font-size: 16pt !important;
            margin-top: 12pt !important;
          }
          h3 {
            font-size: 14pt !important;
            margin-top: 10pt !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        }
      `;
      document.head.appendChild(style);
    });
    
    // Emulate print media
    await page.emulateMediaType('print');
    
    // Generate PDF with optimized settings for beautiful print output
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '10mm',
        bottom: '10mm',
        left: '10mm',
        right: '10mm'
      },
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      scale: 0.95  // Slightly scale down to ensure content fits well
    });
    
    // Ensure output directory exists
    const outputDir = path.join(__dirname, '..', 'public', 'pdfs');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write PDF file
    const outputPath = path.join(outputDir, config.filename);
    fs.writeFileSync(outputPath, pdfBuffer);
    
    console.log(`  ✓ Generated (${(pdfBuffer.length / 1024).toFixed(2)} KB)`);
    
    return { 
      success: true, 
      ...config,
      size: pdfBuffer.length,
      path: `/pdfs/${config.filename}`
    };
    
  } catch (error) {
    await browser.close();
    
    // Retry if the page content seems incomplete
    if (retryCount < maxRetries && (
      error.message.includes('too short') || 
      error.message.includes('timeout') ||
      error.message.includes('Navigation')
    )) {
      console.log(`  ⚠ Retrying due to: ${error.message}`);
      await new Promise(resolve => setTimeout(resolve, 3000)); // Wait before retry
      return generatePdf(config, baseUrl, retryCount + 1);
    }
    
    console.error(`  ✗ Failed: ${error.message}`);
    return { 
      success: false, 
      ...config,
      error: error.message 
    };
  }
}

async function startDevServer() {
  console.log('Starting development server...');
  
  return new Promise((resolve, reject) => {
    const server = require('child_process').spawn('npm', ['start'], {
      cwd: path.join(__dirname, '..'),
      env: { ...process.env, BROWSER: 'none', PORT: '3000' },
      detached: false
    });
    
    let serverReady = false;
    
    server.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('compiled successfully') || 
          output.includes('Compiled with warnings') ||
          output.includes('webpack compiled')) {
        if (!serverReady) {
          serverReady = true;
          console.log('  ✓ Server ready\n');
          resolve(server);
        }
      }
    });
    
    server.on('error', reject);
    
    // Timeout after 60 seconds
    setTimeout(() => {
      if (!serverReady) {
        server.kill();
        reject(new Error('Server startup timeout'));
      }
    }, 60000);
  });
}

async function main() {
  console.log('========================================');
  console.log('PDF Version Generator');
  console.log('========================================\n');
  
  const isProduction = process.env.NODE_ENV === 'production';
  const baseUrl = process.env.PDF_BASE_URL || 'http://localhost:3000';
  
  let server = null;
  
  try {
    // Start local server if needed
    if (!isProduction && !process.env.PDF_BASE_URL) {
      server = await startDevServer();
      // Wait for server to be fully ready
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    // Get PDF configurations
    const configs = extractPdfConfigurations();
    
    // Add any additional configured PDFs
    const additionalPdfs = process.env.PDF_PAGES ? 
      process.env.PDF_PAGES.split(',').map(page => {
        const [url, filename] = page.split(':');
        return { url, filename, title: filename };
      }) : [];
    
    const allConfigs = [...configs, ...additionalPdfs];
    
    if (allConfigs.length === 0) {
      console.log('No pages configured for PDF generation.');
      console.log('Add PdfVersion or PdfPage components to enable PDF generation.');
      return;
    }
    
    console.log(`Generating ${allConfigs.length} PDF(s)...\n`);
    
    // Generate all PDFs
    const results = [];
    for (const config of allConfigs) {
      const result = await generatePdf(config, baseUrl);
      results.push(result);
    }
    
    // Create manifest file for runtime reference
    const manifest = {
      generated: new Date().toISOString(),
      baseUrl: baseUrl,
      pdfs: results.filter(r => r.success).map(r => ({
        pageId: r.pageId,
        component: r.component,
        filename: r.filename,
        path: r.path,
        size: r.size,
        title: r.title
      }))
    };
    
    const manifestPath = path.join(__dirname, '..', 'public', 'pdfs', 'manifest.json');
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    
    // Summary
    console.log('\n========================================');
    console.log('Summary');
    console.log('========================================\n');
    
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);
    
    console.log(`✓ Generated ${successful.length} PDF(s)`);
    console.log(`✗ Failed ${failed.length} PDF(s)`);
    
    if (successful.length > 0) {
      console.log('\nGenerated files:');
      successful.forEach(r => {
        console.log(`  • ${r.filename} (${(r.size / 1024).toFixed(1)} KB)`);
      });
    }
    
    if (failed.length > 0) {
      console.log('\nFailed:');
      failed.forEach(r => {
        console.log(`  • ${r.filename}: ${r.error}`);
      });
      process.exit(1);
    }
    
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  } finally {
    if (server) {
      console.log('\nStopping server...');
      server.kill();
    }
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { extractPdfConfigurations, generatePdf };