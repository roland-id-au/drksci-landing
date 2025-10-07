#!/usr/bin/env node

const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const { generateATSResumePDF } = require('./generate-ats-resume-pdf');

async function mergeATSToResume() {
  console.log('Merging ATS page to main resume PDF...');

  const outputDir = path.join(__dirname, '..', 'public', 'pdfs');
  const mainResumePath = path.join(outputDir, 'blake-carter-resume.pdf');
  const mergedOutputPath = path.join(outputDir, 'blake-carter-resume-with-ats.pdf');

  try {
    // Check if main resume exists
    if (!fs.existsSync(mainResumePath)) {
      throw new Error(`Main resume PDF not found at: ${mainResumePath}`);
    }

    // Generate ATS PDF
    console.log('Generating ATS PDF...');
    const atsResult = await generateATSResumePDF();
    if (!atsResult.success) {
      throw new Error(`Failed to generate ATS PDF: ${atsResult.error}`);
    }

    // Read main resume PDF
    const mainResumeBytes = fs.readFileSync(mainResumePath);
    const mainPdf = await PDFDocument.load(mainResumeBytes);

    // Load ATS PDF
    const atsPdf = await PDFDocument.load(atsResult.buffer);
    const atsPages = await mainPdf.copyPages(atsPdf, atsPdf.getPageIndices());

    // Add ATS pages to main PDF
    atsPages.forEach(page => mainPdf.addPage(page));

    // Save merged PDF
    const mergedPdfBytes = await mainPdf.save();
    fs.writeFileSync(mergedOutputPath, mergedPdfBytes);

    console.log(`✓ Merged PDF created: ${mergedOutputPath}`);
    console.log(`✓ Total pages: ${mainPdf.getPageCount()}`);

    return {
      success: true,
      path: mergedOutputPath,
      pageCount: mainPdf.getPageCount()
    };

  } catch (error) {
    console.error(`✗ Failed to merge ATS to resume:`, error.message);
    return { success: false, error: error.message };
  }
}

// Function to update all resume variants with ATS pages
async function updateAllResumeVariants() {
  console.log('Updating all resume variants with ATS pages...');

  const outputDir = path.join(__dirname, '..', 'public', 'pdfs');
  const variants = [
    'blake-carter-resume.pdf',
    'blake-carter-resume-light.pdf',
    'blake-carter-resume-prepress.pdf',
    'blake-carter-resume-light-prepress.pdf'
  ];

  const results = [];

  for (const variant of variants) {
    const variantPath = path.join(outputDir, variant);
    const mergedPath = path.join(outputDir, variant.replace('.pdf', '-with-ats.pdf'));

    try {
      if (!fs.existsSync(variantPath)) {
        console.log(`⚠ Skipping ${variant} - file not found`);
        continue;
      }

      // Generate ATS PDF
      const atsResult = await generateATSResumePDF();
      if (!atsResult.success) {
        throw new Error(`Failed to generate ATS PDF: ${atsResult.error}`);
      }

      // Read variant PDF
      const variantBytes = fs.readFileSync(variantPath);
      const variantPdf = await PDFDocument.load(variantBytes);

      // Load ATS PDF
      const atsPdf = await PDFDocument.load(atsResult.buffer);
      const atsPages = await variantPdf.copyPages(atsPdf, atsPdf.getPageIndices());

      // Add ATS pages to variant PDF
      atsPages.forEach(page => variantPdf.addPage(page));

      // Save merged PDF
      const mergedPdfBytes = await variantPdf.save();
      fs.writeFileSync(mergedPath, mergedPdfBytes);

      console.log(`✓ Updated ${variant} -> ${path.basename(mergedPath)}`);
      results.push({ variant, success: true, path: mergedPath });

    } catch (error) {
      console.error(`✗ Failed to update ${variant}:`, error.message);
      results.push({ variant, success: false, error: error.message });
    }
  }

  return results;
}

// Run if called directly
if (require.main === module) {
  const mode = process.argv[2];

  if (mode === 'all') {
    updateAllResumeVariants()
      .then(results => {
        const successful = results.filter(r => r.success).length;
        const total = results.length;
        console.log(`\n✅ Updated ${successful}/${total} resume variants with ATS pages!`);
        process.exit(successful === total ? 0 : 1);
      })
      .catch(error => {
        console.error('Unexpected error:', error);
        process.exit(1);
      });
  } else {
    mergeATSToResume()
      .then(result => {
        if (result.success) {
          console.log('\n✅ ATS merge completed successfully!');
          process.exit(0);
        } else {
          console.log('\n❌ ATS merge failed!');
          process.exit(1);
        }
      })
      .catch(error => {
        console.error('Unexpected error:', error);
        process.exit(1);
      });
  }
}

module.exports = { mergeATSToResume, updateAllResumeVariants };