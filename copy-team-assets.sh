#!/bin/bash
# Copy only the required black variant team assets
echo "Copying team assets..."
mkdir -p public

# Copy black variants (remove any existing regular variants)
rm -f public/team-blake_still.png
rm -f public/team-gen_still.png
cp ../team-blake_still-black.png public/
cp ../team-gen_still-black.png public/

# Keep seteven's regular still since no black variant exists
cp ../team-seteven_still.png public/

echo "Team assets copied successfully"
