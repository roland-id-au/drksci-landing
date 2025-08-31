const fs = require('fs');
const { execSync } = require('child_process');

console.log("Generating logo assets...");

// Create output directory
if (!fs.existsSync('public/logos')) {
  fs.mkdirSync('public/logos', { recursive: true });
}

// Read logo.html
const html = fs.readFileSync('../logo.html', 'utf8');

// Extract main logo SVG
const mainLogoMatch = html.match(/<svg[^>]*logo-final[^>]*>[\s\S]*?<\/svg>/i);
if (mainLogoMatch) {
  fs.writeFileSync('public/logos/logo-main.svg', mainLogoMatch[0]);
}

// Extract slash symbol SVG
const slashMatch = html.match(/<symbol[^>]*id="slash"[^>]*>[\s\S]*?<\/symbol>/i);
if (slashMatch) {
  const slashSvg = slashMatch[0].replace('<symbol', '<svg').replace('<\/symbol>', '<\/svg>');
  fs.writeFileSync('public/logos/logo-slash.svg', slashSvg);
}

// Generate PNG variants
console.log("Generating PNGs...");
const svgFiles = fs.readdirSync('public/logos').filter(f => f.endsWith('.svg'));
for (const svgFile of svgFiles) {
  const base = svgFile.replace('.svg', '');
  execSync(`magick -density 300 public/logos/${svgFile} -background none -resize 512x512 public/logos/${base}.png`);
  execSync(`magick -density 300 public/logos/${svgFile} -background none -resize 1024x1024 public/logos/${base}@2x.png`);
  execSync(`magick -density 300 public/logos/${svgFile} -background none -resize 2048x2048 public/logos/${base}@4x.png`);
}

// Create black variants
if (fs.existsSync('public/logos/logo-main.png')) {
  execSync('magick public/logos/logo-main.png -fill black -colorize 100 public/logos/logo-main-black.png');
  execSync('magick public/logos/logo-main.png -transparent white public/logos/logo-main-transparent.png');
}

console.log("Logo generation complete!");
