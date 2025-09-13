#!/usr/bin/env node

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Import PDF naming utilities
function generatePdfName(candidateName, jobTitle = null, id = null, type = 'resume') {
  const today = new Date();
  const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
  
  // Generate or use provided ID
  const shortId = id || generateShortId();
  
  // Clean full candidate name (replace spaces with hyphens, remove special chars, lowercase)
  const candidateSlug = candidateName.toLowerCase()
    .replace(/\s+/g, '-')          // spaces to hyphens
    .replace(/[^a-z0-9-]/g, '');   // remove special chars except hyphens
  
  if (jobTitle) {
    // For job applications: {full-candidate-name}-{job-title}-{id}-YYYYMMDD.pdf
    const jobSlug = jobTitle.toLowerCase()
      .replace(/\s+/g, '-')        // spaces to hyphens
      .replace(/[^a-z0-9-]/g, ''); // remove special chars except hyphens
    return `${candidateSlug}-${jobSlug}-${shortId}-${dateStr}.pdf`;
  } else {
    // For general resumes: {full-candidate-name}-{type}-{id}-YYYYMMDD.pdf
    return `${candidateSlug}-${type}-${shortId}-${dateStr}.pdf`;
  }
}

function generateShortId(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Configuration for PDF generation
const PDF_CONFIG = {
  collaborators: {
    blake: {
      url: '/c/blake',
      filename: generatePdfName('Blake Carter', null, null, 'resume'),
      title: 'Blake Carter - Resume',
      candidate: 'Blake Carter'
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
    
    // CRITICAL: Wait for React to render the actual content
    // Check if React root has content (not just the noscript message)
    await page.waitForFunction(
      () => {
        const root = document.getElementById('root');
        if (!root) return false;
        // Check if root has actual content (not just empty or noscript)
        const hasContent = root.innerHTML.length > 100;
        const hasVisibleElements = root.querySelector('h1, h2, .pdf-cover-page, .cover-name, section');
        return hasContent && hasVisibleElements;
      },
      { timeout: 30000 }
    );
    
    console.log('  ✓ React content loaded');
    
    // Wait for specific content that indicates page is loaded
    // For Blake's page, wait for specific content
    if (config.url.includes('/c/blake') || config.url.includes('/collaborators/blake')) {
      try {
        await page.waitForSelector('.pdf-cover-page, .cover-name, h1', { timeout: 15000 });
        console.log('  ✓ PDF cover page detected');
      } catch (e) {
        console.log('  ⚠ Warning: PDF cover elements not found');
      }
    }
    
    // Additional wait to ensure all styles are applied
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Check if content is actually loaded by checking page height and content
    const pageInfo = await page.evaluate(() => {
      const height = document.body.scrollHeight;
      const rootContent = document.getElementById('root')?.innerHTML || '';
      const hasReactContent = rootContent.includes('Blake Carter') || rootContent.includes('cover-name');
      const textContent = document.body.innerText || '';
      return {
        height,
        hasReactContent,
        contentLength: rootContent.length,
        hasText: textContent.length > 100,
        sampleText: textContent.substring(0, 200)
      };
    });
    
    console.log(`  Page height: ${pageInfo.height}px`);
    console.log(`  React content: ${pageInfo.hasReactContent ? 'Yes' : 'No'}`);
    console.log(`  Content length: ${pageInfo.contentLength} chars`);
    
    if (!pageInfo.hasReactContent || pageInfo.contentLength < 500) {
      console.log('  ⚠ Page content appears to be HTML source, not rendered');
      console.log(`  Sample: ${pageInfo.sampleText}`);
      if (retryCount < maxRetries) {
        throw new Error('React content not properly rendered');
      }
    }
    
    // Emulate print media
    await page.emulateMediaType('print');
    
    // Directly inject print styles since @media print isn't working reliably
    const fs = require('fs');
    const printCssPath = path.join(__dirname, '..', 'src', 'styles', 'print.css');
    
    if (fs.existsSync(printCssPath)) {
      const printCssContent = fs.readFileSync(printCssPath, 'utf8');
      
      // Extract only the content inside @media print { ... }
      const printMediaMatch = printCssContent.match(/@media print \{([\s\S]*)\}$/);
      if (printMediaMatch) {
        const printStylesOnly = printMediaMatch[1];
        
        await page.evaluate((cssContent) => {
          // Remove any existing print styles
          const existingPrintStyles = document.querySelector('style[data-print-injected]');
          if (existingPrintStyles) {
            existingPrintStyles.remove();
          }
          
          // Inject print styles directly (without @media print wrapper)
          const style = document.createElement('style');
          style.setAttribute('data-print-injected', 'true');
          style.textContent = cssContent;
          document.head.appendChild(style);
          console.log('✅ Print styles injected directly');
        }, printStylesOnly);
      }
    }
    
    // Hide non-print elements
    await page.evaluate(() => {
      const elementsToHide = [
        '[aria-label*="PDF"]', 'nav', '.mobile-nav', '.desktop-nav',
        'footer', '.no-print', '.screen-only', 'button'
      ];
      
      elementsToHide.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          el.style.display = 'none';
        });
      });
    });
    
    // Enhanced text normalization for ATS compatibility
    await page.evaluate(() => {
      try {
        document.querySelectorAll('*').forEach(el => {
          if (el.textContent && el.textContent.trim()) {
            let text = el.textContent;
            
            // Normalize Unicode characters to NFC form
            text = text.normalize('NFC');
            
            // Replace problematic Unicode characters with ATS-safe equivalents
            const charMap = {
              '\u2022': '*',   // Unicode bullet -> ASCII asterisk (more ATS-friendly)
              '\u2013': '-',   // En dash -> hyphen
              '\u2014': '-',   // Em dash -> hyphen
              '\u2018': "'",   // Left single quote -> apostrophe
              '\u2019': "'",   // Right single quote -> apostrophe
              '\u201C': '"',   // Left double quote -> straight quote
              '\u201D': '"',   // Right double quote -> straight quote
              '\u00A0': ' ',   // Non-breaking space -> regular space
              '\u2026': '...', // Ellipsis -> three dots
              '\u00B7': '*',   // Middle dot -> asterisk
              '\u25CF': '*',   // Black circle -> asterisk
              '\u2219': '*',   // Bullet operator -> asterisk
            };
            
            // Apply character replacements
            for (const [unicode, replacement] of Object.entries(charMap)) {
              text = text.replace(new RegExp(unicode, 'g'), replacement);
            }
            
            // Clean up extra whitespace
            text = text.replace(/\s+/g, ' ').trim();
            
            el.textContent = text;
          }
        });
        console.log('✅ Enhanced text normalization applied');
      } catch (error) {
        console.error('Text normalization error:', error);
      }
    });
    
    // Generate PDF with optimized settings for beautiful print output
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '5mm',
        bottom: '5mm',
        left: '5mm',
        right: '5mm'
      },
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      scale: 1.0,  // Use full scale
      tagged: true  // Generate tagged PDF for ATS compatibility
    });
    
    // Ensure output directory exists
    const outputDir = path.join(__dirname, '..', 'public', 'assets', 'personnel', 'pdfs');
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
      path: `/assets/personnel/pdfs/${config.filename}`
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