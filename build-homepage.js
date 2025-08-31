const fs = require('fs');
const path = require('path');
const nunjucks = require('nunjucks');

const templatePath = path.join(__dirname, 'homepage.njk');
const outputPath = path.join(__dirname, 'public', 'index.html');
const dataPath = path.join(__dirname, 'homepage.json');

nunjucks.configure(__dirname);

let homepageData = {
  title: 'drksci',
  description: 'drksci innovation studio',
  // Add more default fields as needed
};

if (fs.existsSync(dataPath)) {
  homepageData = { ...homepageData, ...JSON.parse(fs.readFileSync(dataPath, 'utf-8')) };
}

// Inject Supabase config
homepageData.supabase_url = process.env.SUPABASE_URL || '';
homepageData.supabase_anon_key = process.env.SUPABASE_ANON_KEY || '';

const rendered = nunjucks.render('homepage.njk', homepageData);
fs.writeFileSync(outputPath, rendered);
console.log(`Homepage generated: ${outputPath}`); 