const fs = require('fs');
const path = require('path');

// SVG template for circular favicon with Vapourwave 1 colors
function generateFaviconSVG(size) {
  const radius = size / 2;
  const innerRadius = size * 0.35; // 70% of half = 35% of full
  
  // For very small sizes, simplify the design
  if (size <= 32) {
    const bandHeight = size / 3.5;
    const startY = size * 0.2;
    const bandWidth = size * 0.6;
    const startX = size * 0.2;
    
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <circle cx="${radius}" cy="${radius}" r="${radius}" fill="#000000"/>
  <g>
    <rect x="${startX}" y="${startY}" width="${bandWidth}" height="${bandHeight}" fill="#FF00FF"/>
    <rect x="${startX}" y="${startY + bandHeight}" width="${bandWidth}" height="${bandHeight}" fill="#00FFFF"/>
    <rect x="${startX}" y="${startY + bandHeight * 2}" width="${bandWidth}" height="${bandHeight}" fill="#6400FF"/>
  </g>
</svg>`;
  }
  
  // For larger sizes, use the fade effect
  const bandHeight = size / 3.5;
  const startY = size * 0.15;
  
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <circle cx="${radius}" cy="${radius}" r="${radius}" fill="#000000"/>
  <defs>
    <radialGradient id="fade-${size}" cx="70%" cy="70%">
      <stop offset="0%" stop-color="white" stop-opacity="1"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </radialGradient>
    <mask id="mask-${size}">
      <circle cx="${radius}" cy="${radius}" r="${innerRadius}" fill="url(#fade-${size})"/>
    </mask>
  </defs>
  <g mask="url(#mask-${size})">
    <rect x="0" y="${startY}" width="${size}" height="${bandHeight}" fill="#FF00FF"/>
    <rect x="0" y="${startY + bandHeight}" width="${size}" height="${bandHeight}" fill="#00FFFF"/>
    <rect x="0" y="${startY + bandHeight * 2}" width="${size}" height="${bandHeight}" fill="#6400FF"/>
  </g>
</svg>`;
}

// Generate favicon files
const sizes = [16, 32, 48, 192, 512];
const publicDir = path.join(__dirname, 'public');

sizes.forEach(size => {
  const svg = generateFaviconSVG(size);
  const filename = `favicon-${size}x${size}.svg`;
  const filepath = path.join(publicDir, filename);
  
  fs.writeFileSync(filepath, svg);
  console.log(`Generated ${filename}`);
});

// Also create the main favicon.svg
const mainFaviconSVG = generateFaviconSVG(512);
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), mainFaviconSVG);
console.log('Generated favicon.svg');

// Generate a special ICO-compatible SVG (32x32)
const icoSVG = generateFaviconSVG(32);
fs.writeFileSync(path.join(publicDir, 'favicon-ico.svg'), icoSVG);
console.log('Generated favicon-ico.svg for ICO conversion');

console.log('\nNext steps:');
console.log('1. Use an online converter to convert favicon-ico.svg to favicon.ico');
console.log('2. Use an online converter to convert the SVGs to PNG format');
console.log('3. Update the HTML to reference the new favicon files');