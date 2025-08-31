#!/bin/bash
# Generate all logo variants from logo.html using rsvg-convert

echo "Generating logo assets..."
mkdir -p public/logos

# Extract main logo SVG (using more robust XML handling)
grep -A 1000 '<svg.*logo-final' ../logo.html | grep -B 1000 '</svg>' | sed 's/xmlns=".*"//g' > public/logos/logo-main.svg

# Extract slash symbol SVG
grep -A 1000 '<symbol.*id="slash"' ../logo.html | grep -B 1000 '</symbol>' | \
    sed 's/<symbol/<svg/g' | sed 's/<\/symbol>/<\/svg>/g' > public/logos/logo-slash.svg

# Generate PNG variants using rsvg-convert
echo "Generating PNGs..."
for svg in public/logos/*.svg; do
    base=$(basename "$svg" .svg)
    rsvg-convert -w 512 -h 512 "$svg" -o "public/logos/${base}.png"
    rsvg-convert -w 1024 -h 1024 "$svg" -o "public/logos/${base}@2x.png"
    rsvg-convert -w 2048 -h 2048 "$svg" -o "public/logos/${base}@4x.png"
done

# Create black variants using ImageMagick (only if PNGs were created)
if [ -f "public/logos/logo-main.png" ]; then
    echo "Creating color variants..."
    magick public/logos/logo-main.png -fill black -colorize 100 public/logos/logo-main-black.png
    magick public/logos/logo-main.png -transparent white public/logos/logo-main-transparent.png
fi

echo "Logo generation complete!"
