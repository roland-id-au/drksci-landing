const { favicons } = require('favicons');
const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, 'public', 'favicon.svg');
const output = path.join(__dirname, 'public', 'icons');

const configuration = {
  path: '/',
  appName: 'drksci',
  appDescription: 'drksci innovation studio',
  developerName: 'drksci',
  developerURL: null,
  background: '#050505',
  theme_color: '#050505',
  display: 'standalone',
  orientation: 'any',
  start_url: '/',
  version: '1.0',
  logging: false,
  pixel_art: false,
  loadManifestWithCredentials: false,
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: true,
    coast: false,
    favicons: true,
    firefox: false,
    windows: true,
    yandex: false
  }
};

if (!fs.existsSync(output)) {
  fs.mkdirSync(output, { recursive: true });
}

favicons(source, configuration)
  .then(response => {
    // Save images
    response.images.forEach(image => {
      fs.writeFileSync(path.join(output, image.name), image.contents);
    });
    // Save files (manifest, browserconfig, etc)
    response.files.forEach(file => {
      fs.writeFileSync(path.join(output, file.name), file.contents);
    });
    // Optionally print HTML tags
    fs.writeFileSync(path.join(output, 'favicons.html'), response.html.join('\n'));
    console.log('Favicons and manifest generated in', output);
  })
  .catch(error => {
    console.error(error.message);
  }); 