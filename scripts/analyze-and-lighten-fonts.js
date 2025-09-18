#!/usr/bin/env node

const { chromium } = require('playwright');

async function analyzeFonts() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Navigate to the collaborator page
    await page.goto('http://localhost:3000/c/blake', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Wait for content to load
    await page.waitForTimeout(3000);

    // Apply the same color overrides as the PDF generation script
    await page.addStyleTag({
      content: `
        /* Override Tailwind gray color scale to be lighter globally */
        :root {
          --tw-color-gray-900: rgb(60, 67, 84) !important;   /* Lighten from 17,24,39 */
          --tw-color-gray-800: rgb(80, 87, 104) !important;  /* Lighten from 31,41,55 */
          --tw-color-gray-700: rgb(100, 107, 124) !important; /* Lighten from 55,65,81 */
          --tw-color-gray-600: rgb(130, 137, 154) !important; /* Lighten from 75,85,99 */
          --tw-color-gray-500: rgb(140, 147, 164) !important; /* Lighten from 107,114,128 */
          --tw-color-gray-400: rgb(170, 177, 194) !important; /* Lighten from 156,163,175 */
        }

        .text-gray-900 { color: rgb(60, 67, 84) !important; }
        .text-gray-800 { color: rgb(80, 87, 104) !important; }
        .text-gray-700 { color: rgb(100, 107, 124) !important; }
        .text-gray-600 { color: rgb(130, 137, 154) !important; }
        .text-gray-500 { color: rgb(140, 147, 164) !important; }
        .text-gray-400 { color: rgb(170, 177, 194) !important; }
      `
    });

    // Wait for styles to apply
    await page.waitForTimeout(1000);

    // Find all text elements and their colors
    const textElements = await page.evaluate(() => {
      const elements = [];
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );

      let node;
      while (node = walker.nextNode()) {
        const element = node.parentElement;
        if (element && element.offsetParent !== null) { // Only visible elements
          const computedStyle = window.getComputedStyle(element);
          const color = computedStyle.color;
          const fontSize = computedStyle.fontSize;
          const fontWeight = computedStyle.fontWeight;
          const text = node.textContent.trim();

          if (text.length > 0 && color) {
            elements.push({
              text: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
              color: color,
              fontSize: fontSize,
              fontWeight: fontWeight,
              element: element.tagName,
              className: element.className
            });
          }
        }
      }
      return elements;
    });

    // Convert RGB colors to HSL and find darkest ones
    function rgbToHsl(r, g, b) {
      r /= 255;
      g /= 255;
      b /= 255;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;

      if (max === min) {
        h = s = 0;
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }
      return [h * 360, s * 100, l * 100];
    }

    function parseRgb(colorStr) {
      const match = colorStr.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (match) {
        return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
      }
      return null;
    }

    // Analyze colors and group by darkness
    const colorAnalysis = {};
    textElements.forEach(element => {
      const rgb = parseRgb(element.color);
      if (rgb) {
        const [h, s, l] = rgbToHsl(rgb[0], rgb[1], rgb[2]);
        const colorKey = element.color;

        if (!colorAnalysis[colorKey]) {
          colorAnalysis[colorKey] = {
            rgb: rgb,
            hsl: [h, s, l],
            lightness: l,
            elements: []
          };
        }
        colorAnalysis[colorKey].elements.push(element);
      }
    });

    // Sort by lightness (darkest first)
    const sortedColors = Object.entries(colorAnalysis)
      .sort(([,a], [,b]) => a.lightness - b.lightness);

    console.log('\nFont Color Analysis (darkest to lightest):');
    console.log('=' .repeat(60));

    // Generate CSS to lighten the darkest colors
    const cssRules = [];

    sortedColors.forEach(([color, analysis], index) => {
      const currentLightness = analysis.lightness;
      let newLightness = currentLightness;

      // Lighten proportionally - darker colors get more lightening
      if (currentLightness < 20) {
        newLightness = currentLightness + 15; // Very dark: +15%
      } else if (currentLightness < 40) {
        newLightness = currentLightness + 10; // Dark: +10%
      } else if (currentLightness < 60) {
        newLightness = currentLightness + 5;  // Medium: +5%
      }

      // Cap at reasonable lightness
      newLightness = Math.min(newLightness, 75);

      const newColor = `hsl(${analysis.hsl[0]}, ${analysis.hsl[1]}%, ${newLightness}%)`;

      console.log(`${index + 1}. Original: ${color} (L: ${currentLightness.toFixed(1)}%)`);
      if (newLightness !== currentLightness) {
        console.log(`   Lightened: ${newColor} (L: ${newLightness.toFixed(1)}%)`);
        console.log(`   Elements: ${analysis.elements.length} text elements`);

        // Group elements by className for targeted CSS
        const classNames = [...new Set(analysis.elements.map(e => e.className).filter(c => c))];
        if (classNames.length > 0) {
          classNames.forEach(className => {
            if (className.trim()) {
              cssRules.push(`.${className.split(' ').join('.')} { color: ${newColor} !important; }`);
            }
          });
        } else {
          // Fallback: target by original color (less precise)
          cssRules.push(`[style*="color: ${color}"] { color: ${newColor} !important; }`);
        }
      } else {
        console.log(`   No change needed (light enough)`);
      }
      console.log(`   Sample text: "${analysis.elements[0]?.text}"`);
      console.log('');
    });

    if (cssRules.length > 0) {
      console.log('\nGenerated CSS for font lightening:');
      console.log('=' .repeat(60));
      cssRules.forEach(rule => console.log(rule));

      // Apply the changes to the page
      await page.addStyleTag({
        content: cssRules.join('\n')
      });

      console.log('\nCSS applied to page. The fonts should now be lightened.');
    } else {
      console.log('\nNo font lightening needed - all fonts are already light enough.');
    }

  } catch (error) {
    console.error('Error analyzing fonts:', error);
  } finally {
    await browser.close();
  }
}

// Run the analysis
analyzeFonts().catch(console.error);