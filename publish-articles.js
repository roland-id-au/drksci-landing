const fs = require('fs');
const path = require('path');
const marked = require('marked');
const nunjucks = require('nunjucks');

const articlesDir = path.join(__dirname, 'articles');
const outputDir = path.join(__dirname, 'public', 'articles');
const templatePath = path.join(__dirname, 'article.njk');

// Configure nunjucks
nunjucks.configure(__dirname);

// Load Supabase config from environment or config file
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Process each markdown file
fs.readdirSync(articlesDir).forEach(file => {
  if (file.endsWith('.md')) {
    const mdPath = path.join(articlesDir, file);
    const htmlPath = path.join(outputDir, file.replace(/\.md$/, '.html'));
    
    // Read and convert markdown to HTML
    const mdContent = fs.readFileSync(mdPath, 'utf-8');
    const htmlContent = marked.parse(mdContent);
    
    // Render with template
    const rendered = nunjucks.render('article.njk', {
      content: htmlContent,
      title: file.replace(/\.md$/, '').replace(/-/g, ' '),
      supabase_url: SUPABASE_URL,
      supabase_anon_key: SUPABASE_ANON_KEY
    });
    
    // Write output file
    fs.writeFileSync(htmlPath, rendered);
    console.log(`Published: ${htmlPath}`);
  }
}); 