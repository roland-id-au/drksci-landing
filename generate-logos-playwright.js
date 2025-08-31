const playwright = require('playwright');
const fs = require('fs');
const path = require('path');

async function generateLogos() {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();

  // Ensure the output directory exists
  const outputDir = 'public/logos';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Navigate to the local logo.html file
  await page.goto('file://' + path.resolve(__dirname, '../logo.html'));

  // Define the elements to screenshot and their desired filenames
  const logoElements = [
    { id: 'logo-black-color', filename: 'logo-main.png' },
    { id: 'logo-black-grayscale', filename: 'logo-main-grayscale.png' },
    { id: 'banner-black-color-logo', filename: 'banner-main.png' },
    { id: 'banner-black-grayscale-logo', filename: 'banner-main-grayscale.png' },
    { id: 'avatar-black-color', filename: 'logo-slash.png' },
    { id: 'avatar-black-grayscale', filename: 'logo-slash-grayscale.png' },
    { id: 'logo-white-color', filename: 'logo-main-white.png' },
    { id: 'logo-white-grayscale', filename: 'logo-main-grayscale-white.png' },
    { id: 'banner-white-color-logo', filename: 'banner-main-white.png' },
    { id: 'banner-white-grayscale-logo', filename: 'banner-main-grayscale-white.png' },
    { id: 'avatar-white-color', filename: 'logo-slash-white.png' },
    { id: 'avatar-white-grayscale', filename: 'logo-slash-grayscale-white.png' },

    // Vapourwave 1
    { id: 'logo-vaporwave1-black-color', filename: 'logo-vaporwave1.png' },
    { id: 'logo-vaporwave1-black-grayscale', filename: 'logo-vaporwave1-grayscale.png' },
    { id: 'banner-vaporwave1-black-color', filename: 'banner-vaporwave1.png' },
    { id: 'banner-vaporwave1-black-grayscale', filename: 'banner-vaporwave1-grayscale.png' },
    { id: 'avatar-vaporwave1-black-color', filename: 'logo-slash-vaporwave1.png' },
    { id: 'avatar-vaporwave1-black-grayscale', filename: 'logo-slash-vaporwave1-grayscale.png' },
    { id: 'logo-vaporwave1-white-color', filename: 'logo-vaporwave1-white.png' },
    { id: 'logo-vaporwave1-white-grayscale', filename: 'logo-vaporwave1-grayscale-white.png' },
    { id: 'banner-vaporwave1-white-color', filename: 'banner-vaporwave1-white.png' },
    { id: 'banner-vaporwave1-white-grayscale', filename: 'banner-vaporwave1-grayscale-white.png' },
    { id: 'avatar-vaporwave1-white-color', filename: 'logo-slash-vaporwave1-white.png' },
    { id: 'avatar-vaporwave1-white-grayscale', filename: 'logo-slash-vaporwave1-grayscale-white.png' },

    // Vapourwave 2
    { id: 'logo-vaporwave2-black-color', filename: 'logo-vaporwave2.png' },
    { id: 'logo-vaporwave2-black-grayscale', filename: 'logo-vaporwave2-grayscale.png' },
    { id: 'banner-vaporwave2-black-color', filename: 'banner-vaporwave2.png' },
    { id: 'banner-vaporwave2-black-grayscale', filename: 'banner-vaporwave2-grayscale.png' },
    { id: 'avatar-vaporwave2-black-color', filename: 'logo-slash-vaporwave2.png' },
    { id: 'avatar-vaporwave2-black-grayscale', filename: 'logo-slash-vaporwave2-grayscale.png' },
    { id: 'logo-vaporwave2-white-color', filename: 'logo-vaporwave2-white.png' },
    { id: 'logo-vaporwave2-white-grayscale', filename: 'logo-vaporwave2-grayscale-white.png' },
    { id: 'banner-vaporwave2-white-color', filename: 'banner-vaporwave2-white.png' },
    { id: 'banner-vaporwave2-white-grayscale', filename: 'banner-vaporwave2-grayscale-white.png' },
    { id: 'avatar-vaporwave2-white-color', filename: 'logo-slash-vaporwave2-white.png' },
    { id: 'avatar-vaporwave2-white-grayscale', filename: 'logo-slash-vaporwave2-grayscale-white.png' },
  ];

  for (const { id, filename } of logoElements) {
    const selector = `#${id} svg`; // Target the SVG inside the div
    console.log(`Attempting to screenshot: ${selector} to ${path.join(outputDir, filename)}`);
    try {
      const element = await page.$(selector);
      if (element) {
        await element.screenshot({
          path: path.join(outputDir, filename),
          omitBackground: true, // Capture with transparency
          type: 'png'
        });
        console.log(`Successfully generated ${filename}`);
      } else {
        console.warn(`Element not found for ID: ${id}`);
      }
    } catch (error) {
      console.error(`Error generating ${filename}:`, error);
    }
  }

  await browser.close();
  console.log("All logo generation attempts complete.");
}

generateLogos(); 