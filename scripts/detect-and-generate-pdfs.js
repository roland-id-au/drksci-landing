#!/usr/bin/env node

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Function to find all JSX files that import PDFDownloadButton
function findPagesWithPDFComponent() {
  const srcDir = path.join(__dirname, '..', 'src');
  const pages = [];
  
  // Find all files that import PDFDownloadButton
  try {
    const grepResult = execSync(
      `grep -r "import.*PDFDownloadButton" "${srcDir}" --include="*.jsx" --include="*.js" --include="*.tsx" || true`,
      { encoding: 'utf8' }
    );
    
    if (grepResult) {
      const lines = grepResult.split('\n').filter(line => line.trim());
      
      lines.forEach(line => {
        const match = line.match(/^(.+?):\d*:.*import.*PDFDownloadButton/);
        if (match) {
          const filePath = match[1];
          const relativePath = path.relative(srcDir, filePath);
          const baseName = path.basename(filePath, path.extname(filePath));
          
          // Determine the route based on the component
          let route = '';
          if (baseName === 'CandidateApplication') {
            route = '/candidate/:jobId?';
          } else if (baseName === 'BlakeCollaborator') {
            route = '/collaborators/blake';
          } else {
            // Default route pattern
            route = `/${baseName.toLowerCase()}`;
          }
          
          pages.push({
            component: baseName,
            file: relativePath,
            route: route
          });
        }
      });
    }
  } catch (error) {
    console.error('Error searching for PDF components:', error.message);
  }
  
  return pages;
}

// Function to extract route patterns from React Router
function extractRoutesFromApp() {
  const appPath = path.join(__dirname, '..', 'src', 'App.js');
  const routes = [];
  
  if (fs.existsSync(appPath)) {
    const content = fs.readFileSync(appPath, 'utf8');
    
    // Find Route components with PDFDownloadButton pages
    const routePattern = /<Route\s+path=["']([^"']+)["'].*?element={<(\w+).*?\/?>}/g;
    let match;
    
    while ((match = routePattern.exec(content)) !== null) {
      routes.push({
        path: match[1],
        component: match[2]
      });
    }
  }
  
  return routes;
}

// Generate URLs for PDF generation based on detected pages
function generatePDFTargets() {
  const pagesWithPDF = findPagesWithPDFComponent();
  const routes = extractRoutesFromApp();
  const baseUrl = process.env.PDF_BASE_URL || 'http://localhost:3000';
  const targets = [];
  
  console.log('Detected pages with PDF components:');
  pagesWithPDF.forEach(page => {
    console.log(`  - ${page.component} (${page.file})`);
    
    // Find matching route
    const route = routes.find(r => r.component === page.component);
    
    if (route || page.route) {
      const routePath = route ? route.path : page.route;
      
      // Handle parameterized routes
      if (routePath.includes(':')) {
        // For now, generate a default version without parameters
        const cleanPath = routePath.replace(/:\w+\??/g, '').replace(/\/+/g, '/');
        
        // Special handling for known routes
        if (page.component === 'CandidateApplication') {
          // Generate PDFs for specific job IDs or a default
          const jobIds = process.env.PDF_JOB_IDS ? process.env.PDF_JOB_IDS.split(',') : ['default'];
          jobIds.forEach(jobId => {
            targets.push({
              name: `${page.component}-${jobId}`,
              url: `${baseUrl}/candidate/${jobId}`,
              filename: `candidate-application-${jobId}.pdf`,
              component: page.component
            });
          });
        } else {
          targets.push({
            name: page.component,
            url: `${baseUrl}${cleanPath}`,
            filename: `${page.component.toLowerCase()}.pdf`,
            component: page.component
          });
        }
      } else {
        targets.push({
          name: page.component,
          url: `${baseUrl}${routePath}`,
          filename: `${page.component.toLowerCase()}.pdf`,
          component: page.component
        });
      }
    }
  });
  
  // Add any manually configured pages from existing script
  if (fs.existsSync(path.join(__dirname, 'generate-pdfs.js'))) {
    targets.push({
      name: 'Blake Carter Resume',
      url: `${baseUrl}/collaborators/blake`,
      filename: 'blake-carter-resume.pdf',
      component: 'BlakeCollaborator'
    });
  }
  
  // Remove duplicates based on filename
  const uniqueTargets = [];
  const seen = new Set();
  
  targets.forEach(target => {
    if (!seen.has(target.filename)) {
      seen.add(target.filename);
      uniqueTargets.push(target);
    }
  });
  
  return uniqueTargets;
}

async function generatePDF(target) {
  console.log(`\nGenerating PDF for ${target.name}...`);
  console.log(`  URL: ${target.url}`);
  console.log(`  Output: ${target.filename}`);
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Set viewport for consistent rendering
  await page.setViewport({ width: 1280, height: 800 });
  
  try {
    // Navigate to the page
    await page.goto(target.url, { 
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    // Wait for the main content to load
    await page.waitForSelector('body', { timeout: 15000 });
    
    // Wait for any dynamic content
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Check if PDFDownloadButton is present on the page
    const hasPDFButton = await page.evaluate(() => {
      // Look for the PDF button or its SVG icon
      return document.querySelector('[aria-label*="PDF"]') !== null ||
             document.querySelector('button svg path[d*="M14,2H6"]') !== null;
    });
    
    if (!hasPDFButton) {
      console.log(`  ⚠ Warning: No PDF button detected on page`);
    }
    
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
    const outputPath = path.join(outputDir, target.filename);
    fs.writeFileSync(outputPath, pdfBuffer);
    
    console.log(`  ✓ Generated ${target.filename} (${(pdfBuffer.length / 1024).toFixed(2)} KB)`);
    
    return { success: true, filename: target.filename, size: pdfBuffer.length };
    
  } catch (error) {
    console.error(`  ✗ Failed to generate PDF for ${target.name}:`, error.message);
    return { success: false, filename: target.filename, error: error.message };
  } finally {
    await browser.close();
  }
}

async function startLocalServer() {
  console.log('Starting local development server...');
  
  return new Promise((resolve, reject) => {
    const server = require('child_process').spawn('npm', ['start'], {
      cwd: path.join(__dirname, '..'),
      env: { ...process.env, BROWSER: 'none' },
      detached: false
    });
    
    let serverReady = false;
    
    server.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('compiled successfully') || output.includes('Compiled with warnings')) {
        if (!serverReady) {
          serverReady = true;
          console.log('Development server is ready!');
          resolve(server);
        }
      }
    });
    
    server.stderr.on('data', (data) => {
      if (!serverReady) {
        console.error(`Server error: ${data}`);
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
  console.log('===========================================');
  console.log('PDF Generation Build Script');
  console.log('===========================================\n');
  
  const isProduction = process.env.NODE_ENV === 'production';
  const useLocalServer = !isProduction && !process.env.PDF_BASE_URL;
  
  let server = null;
  
  try {
    // Start local server if needed
    if (useLocalServer) {
      server = await startLocalServer();
      // Wait a bit more for server to be fully ready
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
    
    // Find and generate PDFs
    const targets = generatePDFTargets();
    
    if (targets.length === 0) {
      console.log('No pages with PDF components found.');
      return;
    }
    
    console.log(`\nFound ${targets.length} page(s) to generate PDFs for.\n`);
    
    const results = [];
    for (const target of targets) {
      const result = await generatePDF(target);
      results.push(result);
    }
    
    // Summary
    console.log('\n===========================================');
    console.log('PDF Generation Summary');
    console.log('===========================================\n');
    
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);
    
    if (successful.length > 0) {
      console.log(`✓ Successfully generated ${successful.length} PDF(s):`);
      successful.forEach(r => {
        console.log(`  - ${r.filename} (${(r.size / 1024).toFixed(2)} KB)`);
      });
    }
    
    if (failed.length > 0) {
      console.log(`\n✗ Failed to generate ${failed.length} PDF(s):`);
      failed.forEach(r => {
        console.log(`  - ${r.filename}: ${r.error}`);
      });
    }
    
    // List all PDFs in output directory
    const outputDir = path.join(__dirname, '..', 'public', 'pdfs');
    if (fs.existsSync(outputDir)) {
      const files = fs.readdirSync(outputDir).filter(f => f.endsWith('.pdf'));
      console.log(`\nTotal PDFs in public/pdfs: ${files.length}`);
    }
    
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  } finally {
    // Clean up server if started
    if (server) {
      console.log('\nStopping local server...');
      server.kill();
    }
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { generatePDFTargets, generatePDF };