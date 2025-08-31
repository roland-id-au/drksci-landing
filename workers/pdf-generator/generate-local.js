#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const url = process.argv[2] || 'https://drksci.com/collaborators/blake';
const outputFile = process.argv[3] || 'blake-resume.pdf';

console.log(`Generating PDF from: ${url}`);
console.log(`Output file: ${outputFile}`);

// wkhtmltopdf options for better rendering
const options = [
  '--enable-javascript',
  '--javascript-delay', '3000',
  '--no-stop-slow-scripts',
  '--enable-local-file-access',
  '--print-media-type',
  '--margin-top', '20mm',
  '--margin-bottom', '20mm',
  '--margin-left', '15mm',
  '--margin-right', '15mm',
  '--page-size', 'A4',
  '--dpi', '300',
  '--image-quality', '100',
  '--enable-smart-shrinking',
  '--minimum-font-size', '10'
].join(' ');

const command = `wkhtmltopdf ${options} "${url}" "${outputFile}"`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
  }
  console.log(`PDF generated successfully: ${outputFile}`);
  
  // Get file size
  const stats = fs.statSync(outputFile);
  console.log(`File size: ${(stats.size / 1024).toFixed(2)} KB`);
});