# Deployment Guide

## Repository
- **GitHub**: https://github.com/roland-id-au/drksci-landing

## Cloudflare Pages Deployment

### Automatic Deployment (GitHub Actions)
The repository is configured to automatically deploy to Cloudflare Pages on every push to the `main` branch.

#### Required GitHub Secrets:
1. `CLOUDFLARE_API_TOKEN` - Your Cloudflare API token
2. `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID

To set these up:
1. Go to GitHub repo → Settings → Secrets and variables → Actions
2. Add the required secrets

### Manual Deployment

1. **Login to Cloudflare:**
   ```bash
   npm run cf:login
   ```

2. **Create Cloudflare Pages project (first time only):**
   ```bash
   npm run cf:project
   ```

3. **Deploy to Cloudflare Pages:**
   ```bash
   npm run deploy
   ```

4. **Preview locally with Wrangler:**
   ```bash
   npm run preview
   ```

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run deploy` - Deploy to Cloudflare Pages
- `npm run preview` - Preview build with Wrangler
- `npm run cf:login` - Login to Cloudflare
- `npm run cf:whoami` - Check Cloudflare authentication

## URLs
- **Production**: https://drksci.pages.dev
- **Custom Domain**: https://drksci.com (configure in Cloudflare Pages)

## Project Structure
```
drksci-landing/
├── .github/workflows/     # GitHub Actions
├── public/                # Static assets
├── src/                   # React source code
├── wrangler.toml         # Cloudflare configuration
└── package.json          # Dependencies and scripts
```