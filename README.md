# d/rksci Landing Page

An interactive React application showcasing d/rksci's innovation studio capabilities, featuring dynamic job applications, PDF generation, and portfolio demonstrations.

## 🚀 Quick Start

```bash
npm install
npm start
```

Visit `http://localhost:3000` to view the application.

## 📋 Available Scripts

### Development
- `npm start` - Start development server
- `npm test` - Run test suite
- `npm run eject` - Eject from create-react-app (⚠️ irreversible)

### Building
- `npm run build` - Full production build (includes PDF generation)
- `npm run build:fast` - Quick build without PDF generation
- `npm run build:custom` - Custom build with articles and favicons
- `npm run build:articles` - Generate articles from markdown
- `npm run build:favicons` - Generate favicon variants
- `npm run build:homepage` - Build homepage components

### PDF Generation
- `npm run pdf:generate:all` - Generate all PDF versions
- `npm run pdf:generate:resume` - Generate resume PDFs only
- `npm run pdf:generate:cover` - Generate cover letter PDFs
- `npm run pdf:generate:job` - Generate job-specific PDFs
- `npm run pdf:clean` - Remove all generated PDFs
- `npm run copy-pdfs` - Copy PDFs to build directory

### Job Profile Management
- `npm run profile:list` - List all job profiles
- `npm run profile:add` - Add new job profile
- `npm run profile:remove` - Remove job profile
- `npm run profile:info` - Show profile information
- `npm run profile:secure` - Secure profile with token
- `npm run profile:enable` - Enable profile
- `npm run profile:disable` - Disable profile
- `npm run profile:token` - Generate profile token
- `npm run profile:cleanup` - Clean up old profiles

### Job Shortcuts (aliases)
- `npm run jobs:list` → `npm run profile:list`
- `npm run jobs:add` → `npm run profile:add`
- `npm run jobs:remove` → `npm run profile:remove`
- `npm run jobs:info` → `npm run profile:info`

### Deployment
- `npm run deploy` - Build and deploy to Cloudflare Pages
- `npm run preview` - Build and preview locally
- `npm run cf:login` - Login to Cloudflare
- `npm run cf:whoami` - Check Cloudflare authentication
- `npm run cf:project` - Create Cloudflare Pages project

## 🏗️ Project Structure

```
drksci-landing/
├── public/
│   ├── assets/
│   │   ├── brand/           # Brand assets and favicons
│   │   ├── homage/          # Reflection gallery images
│   │   ├── personnel/       # Personal assets and PDFs
│   │   │   └── pdfs/        # Generated PDF files
│   │   └── storytelling/    # Project story assets
│   │       ├── bischoff-historic/
│   │       ├── bischoff-modern/
│   │       └── mount-bischoff/
│   └── index.html
├── src/
│   ├── components/          # Reusable React components
│   ├── data/               # Data files and configurations
│   ├── CandidateApplication.jsx  # Main job application component
│   ├── LandingPage.jsx     # Homepage component
│   └── App.js              # Main application router
├── scripts/                # Node.js utility scripts
│   ├── generate-pdf-versions.js
│   ├── generate-cover-letter.js
│   └── profile-manager.js
└── .github/workflows/      # GitHub Actions CI/CD
    └── deploy-cloudflare.yml
```

## 🔗 URL Patterns

### Public Routes
- `/` - Homepage
- `/portfolio` - Portfolio showcase
- `/research` - Research projects

### Application Routes
- `/j/:shortId` - Direct job application links
- `/c/:collaborator/j/*` - Collaborator-specific applications
- `/candidate/:candidate/:jobSlug` - Named candidate applications

## 📱 Features

### Interactive Job Applications
- Magic link authentication with JWT tokens
- Dynamic PDF generation for resumes and cover letters
- Gallery showcase with reflection images
- Storytelling sections with project narratives

### PDF Generation System
- Automated resume generation from templates
- Job-specific cover letter creation
- Profile-based document customization
- Secure token-based access control

### Portfolio Integration
- Project showcases with interactive elements
- Research demonstrations
- Technical documentation
- Visual storytelling components

## 🛠️ Development Workflow

### Local Development
1. `npm start` - Start development server
2. Make changes to React components
3. Test changes at `http://localhost:3000`
4. Use browser dev tools for debugging

### Adding New Job Profiles
1. `npm run profile:add` - Interactive profile creation
2. Follow prompts to set up job details
3. `npm run pdf:generate:all` - Generate PDFs
4. Test application flow

### PDF Management
1. `npm run pdf:clean` - Clear old PDFs
2. `npm run pdf:generate:all` - Generate new versions
3. `npm run copy-pdfs` - Ensure build inclusion

### Deployment Process
1. `npm run build` - Full production build
2. `npm run deploy` - Deploy to Cloudflare Pages
3. Monitor GitHub Actions for build status

## 🔐 Authentication & Security

- JWT-based magic links for secure access
- Token validation for application routes
- Profile-based access control
- Secure PDF generation with time-limited tokens

## 🎨 Styling & Theming

- **Tailwind CSS** for utility-first styling
- **DaisyUI** for component themes
- **Material-UI** for complex components
- Responsive design for all screen sizes

## 📦 Dependencies

### Core React Stack
- React 19.1.0 + React DOM
- React Router Dom 7.8.0
- React Helmet for SEO

### UI & Styling
- Tailwind CSS + DaisyUI
- Material-UI (MUI)
- Emotion for CSS-in-JS

### PDF & Document Generation
- jsPDF for PDF creation
- html2canvas for screenshots
- Marked for Markdown processing

### Development Tools
- Playwright for testing
- Favicons for icon generation
- Nunjucks for templating

## 🚀 Deployment

The project uses GitHub Actions for continuous deployment to Cloudflare Pages:

- **Trigger**: Push to `main` branch
- **Build**: `npm run build`
- **Deploy**: Automatic to Cloudflare Pages
- **Rolling Builds**: Previous builds cancelled on new pushes

## 📝 Contributing

1. Create feature branch from `dev`
2. Make changes and test locally
3. Update documentation if needed
4. Submit PR to `dev` branch
5. Merge to `main` triggers deployment

## 🆘 Troubleshooting

### Common Issues
- **PDF Generation Fails**: Check `scripts/generate-pdf-versions.js`
- **Images Not Loading**: Verify paths in `public/assets/`
- **Build Errors**: Run `npm run build:fast` to skip PDF generation
- **Profile Issues**: Use `npm run profile:cleanup` to reset

### Development Tips
- Use `npm run build:fast` for quick builds during development
- Monitor `npm start` output for compilation errors
- Check browser console for runtime errors
- Use React Developer Tools for component debugging

---

**d/rksci Innovation Studio** - Transforming ideas into market-ready realities through rapid prototyping and AI transformation.