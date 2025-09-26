const gs = require('node-gs');
const path = require('path');
const fs = require('fs');

/**
 * Optimizes a PDF using Ghostscript with prepress settings
 * @param {string} inputPath - Path to the input PDF
 * @param {string} outputPath - Path for the optimized PDF (optional, defaults to adding -prepress suffix)
 * @returns {Promise<string>} - Path to the optimized PDF
 */
async function optimizePDF(inputPath, outputPath = null) {
  if (!outputPath) {
    const parsedPath = path.parse(inputPath);
    outputPath = path.join(parsedPath.dir, `${parsedPath.name}-prepress${parsedPath.ext}`);
  }

  return new Promise((resolve, reject) => {
    gs()
      .batch()
      .nopause()
      .device('pdfwrite')
      .option('-dCompatibilityLevel=1.4')
      .option('-dPDFSETTINGS=/prepress')
      .option('-dQUIET')
      .input(inputPath)
      .output(outputPath)
      .exec((err, stdout, stderr) => {
        if (err) {
          console.error(`Ghostscript error for ${inputPath}:`, err);
          console.error('stderr:', stderr);
          reject(err);
        } else {
          console.log(`  ✓ Optimized PDF created: ${path.basename(outputPath)}`);
          resolve(outputPath);
        }
      });
  });
}

/**
 * Optimizes multiple PDFs in parallel
 * @param {Array<{input: string, output?: string}>} pdfs - Array of PDF paths to optimize
 * @returns {Promise<Array<string>>} - Array of optimized PDF paths
 */
async function optimizePDFs(pdfs) {
  const promises = pdfs.map(pdf => optimizePDF(pdf.input, pdf.output));
  return Promise.all(promises);
}

module.exports = { optimizePDF, optimizePDFs };