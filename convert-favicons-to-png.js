const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function convertSVGtoPNG() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const sizes = [16, 32, 48, 192, 512];
  const publicDir = path.join(__dirname, 'public');
  
  for (const size of sizes) {
    const svgPath = path.join(publicDir, `favicon-${size}x${size}.svg`);
    const pngPath = path.join(publicDir, `favicon-${size}x${size}.png`);
    
    if (fs.existsSync(svgPath)) {
      const svgContent = fs.readFileSync(svgPath, 'utf8');
      
      // Create HTML page with SVG
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { margin: 0; padding: 0; background: transparent; }
            svg { display: block; }
          </style>
        </head>
        <body>
          ${svgContent}
        </body>
        </html>
      `;
      
      await page.setContent(html);
      await page.setViewportSize({ width: size, height: size });
      
      // Take screenshot
      await page.screenshot({ 
        path: pngPath,
        omitBackground: true,
        clip: { x: 0, y: 0, width: size, height: size }
      });
      
      console.log(`Converted favicon-${size}x${size}.svg to PNG`);
    }
  }
  
  // Also convert the main favicon
  const mainSvgPath = path.join(publicDir, 'favicon.svg');
  const mainPngPath = path.join(publicDir, 'favicon.png');
  
  if (fs.existsSync(mainSvgPath)) {
    const svgContent = fs.readFileSync(mainSvgPath, 'utf8');
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { margin: 0; padding: 0; background: transparent; }
          svg { display: block; }
        </style>
      </head>
      <body>
        ${svgContent}
      </body>
      </html>
    `;
    
    await page.setContent(html);
    await page.setViewportSize({ width: 512, height: 512 });
    await page.screenshot({ 
      path: mainPngPath,
      omitBackground: true,
      clip: { x: 0, y: 0, width: 512, height: 512 }
    });
    
    console.log('Converted favicon.svg to PNG');
  }
  
  await browser.close();
  console.log('\nPNG conversion complete!');
  console.log('Now you need to convert favicon-32x32.png to favicon.ico using an online tool.');
}

convertSVGtoPNG().catch(console.error);