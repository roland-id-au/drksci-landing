#!/usr/bin/env node

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generateATSResumePDF() {
  console.log('Generating ATS Resume PDF...');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  try {
    // Navigate to the ATS resume page with cache-busting parameter
    const timestamp = Date.now();
    const url = `http://localhost:3001/ats-resume?refresh=${timestamp}`;
    console.log(`Loading: ${url}`);

    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Wait for the ATS template to load
    await page.waitForSelector('.ats-template', { timeout: 15000 });
    console.log('✓ ATS Template loaded');

    // Extra wait for content to stabilize
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Use screen media (not print) for better rendering
    await page.emulateMediaType('screen');
    console.log('✓ Screen mode activated');

    // Get content dimensions for single-page PDF
    const dimensions = await page.evaluate(() => {
      const content = document.querySelector('.ats-template');
      if (!content) {
        throw new Error('ATS template content not found');
      }

      const rect = content.getBoundingClientRect();
      const bodyRect = document.body.getBoundingClientRect();

      return {
        contentHeight: Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight,
          rect.bottom - rect.top + 100 // Add padding
        )
      };
    });

    console.log(`✓ Content dimensions calculated: ${dimensions.contentHeight}px height`);
    console.log('✓ Link tracking applied via component');

    // Calculate PDF dimensions
    const pdfWidth = '210mm';  // A4 width to match cover page
    const pdfHeight = `${dimensions.contentHeight * 0.264583}mm`;
    console.log(`✓ PDF page size: ${pdfWidth} x ${pdfHeight}`);

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
      scale: 1.0, // Use full PDF scale
      displayHeaderFooter: false,
      preferCSSPageSize: false,
      // Enable tagged PDFs for accessibility and text structure
      tagged: true,
      pageRanges: '1', // Single page only
      format: undefined // Use explicit dimensions
    });

    // Ensure output directory exists
    const outputDir = path.join(__dirname, '..', 'public', 'pdfs');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write PDF file
    const filename = 'blake-carter-resume-ats.pdf';
    const outputPath = path.join(outputDir, filename);
    fs.writeFileSync(outputPath, pdfBuffer);

    console.log(`✓ Generated ${filename} (${(pdfBuffer.length / 1024).toFixed(2)} KB)`);
    console.log(`   Location: ${outputPath}`);

    return {
      success: true,
      size: pdfBuffer.length,
      path: outputPath,
      buffer: pdfBuffer
    };

  } catch (error) {
    console.error(`✗ Failed to generate ATS PDF:`, error.message);
    return { success: false, error: error.message };
  } finally {
    await browser.close();
  }
}

// Function to write YAML file using direct data mapping
async function generateYAMLFile() {
  console.log('Generating YAML resume file...');

  try {
    // Import the modules directly
    const { generateYAMLResume } = require('../src/utils/yamlFragmentMapper');
    const { blakeProfileData } = require('../src/data/blakeProfile');
    const yaml = require('js-yaml');

    // Generate YAML data
    const yamlResumeData = generateYAMLResume(blakeProfileData);

    // Convert to YAML string
    const yamlString = yaml.dump(yamlResumeData, {
      indent: 2,
      lineWidth: -1,
      noRefs: true,
      quotingType: '"'
    });

    // Write YAML file
    const outputDir = path.join(__dirname, '..', 'public', 'pdfs');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const yamlPath = path.join(outputDir, 'blake-carter-resume.yml');
    fs.writeFileSync(yamlPath, yamlString);
    console.log(`✓ Generated YAML file: ${yamlPath}`);

    return { success: true, path: yamlPath };

  } catch (error) {
    console.error(`✗ Failed to generate YAML:`, error.message);
    return { success: false, error: error.message };
  }
}

// Run if called directly
if (require.main === module) {
  (async () => {
    try {
      // Generate YAML file first
      const yamlResult = await generateYAMLFile();
      if (!yamlResult.success) {
        console.log('\n❌ YAML generation failed!');
        process.exit(1);
      }

      // Generate ATS PDF
      const pdfResult = await generateATSResumePDF();
      if (pdfResult.success) {
        console.log('\n✅ ATS PDF generation completed successfully!');
        process.exit(0);
      } else {
        console.log('\n❌ ATS PDF generation failed!');
        process.exit(1);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      process.exit(1);
    }
  })();
}

module.exports = { generateATSResumePDF, generateYAMLFile };