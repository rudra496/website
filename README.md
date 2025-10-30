# SoulEcho Website

Official website for SoulEcho - an affordable $500 AI-powered bionic arm designed to make advanced assistive technology accessible to everyone.

## Overview

This is a static website built with Tailwind CSS showcasing the SoulEcho project, a revolutionary prosthetic arm that combines dual-sensor fusion (EMG + SMG) with a spring-assisted grip mechanism to deliver 95% of traditional prosthetic functionality at just 1% of the cost.

**Project Recognition:** Participating in the 2025-2026 NASA Conrad Challenge

## Technology Stack

- **HTML5** - Semantic markup for all pages
- **Tailwind CSS** - Utility-first CSS framework for styling
- **JavaScript** - Interactive features and animations
- **GitHub Pages** - Static site hosting
- **GitHub Actions** - Automated build and deployment

## How the Tailwind Build Works

The website uses a compiled Tailwind CSS approach for optimal performance:

1. **Source File:** `src/style.css` contains Tailwind directives and custom styles
2. **Configuration:** `tailwind.config.js` defines custom colors, fonts, and theme extensions
3. **Build Process:** The Tailwind CLI processes the source file and scans all HTML/JS files for used classes
4. **Output:** `css/style.css` is generated with only the CSS classes actually used in the project (minified)

This approach provides several benefits:
- **Faster Loading:** Smaller CSS file (no unused styles)
- **Better Performance:** Compiled once, cached by browsers
- **Production Ready:** Optimized and minified output
- **No Runtime Dependencies:** No CDN scripts that slow down page loads

## Local Development

### Prerequisites

- Node.js 20 or higher
- npm (comes with Node.js)

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rudra496/website.git
   cd website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the CSS:**
   ```bash
   npm run build
   ```
   
   This command compiles `src/style.css` → `css/style.css` with all used Tailwind utilities and custom styles.

4. **View the website:**
   
   Open `index.html` in your browser, or use a local development server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed globally)
   npx http-server
   ```
   
   Then navigate to `http://localhost:8000` in your browser.

### Making Changes

**When updating HTML or adding new Tailwind classes:**
1. Make your changes to the HTML files
2. Run `npm run build` to regenerate the CSS
3. Refresh your browser to see the changes

**When modifying custom styles:**
1. Edit `src/style.css`
2. Run `npm run build` to regenerate the CSS
3. Refresh your browser to see the changes

**When updating Tailwind configuration:**
1. Edit `tailwind.config.js`
2. Run `npm run build` to regenerate the CSS
3. Refresh your browser to see the changes

## Deployment

The website automatically deploys to GitHub Pages using GitHub Actions.

### Deployment Process

1. **Trigger:** Push to the `main` branch or manually trigger via GitHub Actions UI
2. **Build Job:** 
   - Checks out code
   - Sets up Node.js 20
   - Caches npm dependencies for faster builds
   - Installs dependencies
   - Ensures the `css/` directory exists
   - Builds the Tailwind CSS
   - Cleans up `node_modules` (not needed in deployment)
   - Uploads site artifact
3. **Deploy Job:**
   - Deploys the artifact to GitHub Pages

### Workflow Configuration

The deployment workflow is defined in `.github/workflows/pages.yml`

**Key Features:**
- **Node Module Caching:** Speeds up builds by caching `~/.npm`
- **Robust Build:** Ensures the `css/` directory exists before building
- **Clean Deployment:** Excludes `node_modules` from the deployed site

### Manual Deployment

To manually trigger a deployment:
1. Go to the repository on GitHub
2. Click "Actions" tab
3. Select "Build Tailwind and deploy to GitHub Pages"
4. Click "Run workflow"
5. Select the branch and click "Run workflow"

## Project Structure

```
website/
├── .github/
│   └── workflows/
│       └── pages.yml          # GitHub Actions workflow for build & deploy
├── css/
│   └── style.css              # Compiled Tailwind CSS (generated, do not edit)
├── js/
│   └── main.js                # JavaScript for interactivity
├── src/
│   └── style.css              # Source Tailwind CSS with custom styles
├── index.html                 # Home page
├── technology.html            # Technology details
├── mission.html               # Team and mission
├── stories.html               # Patient stories
├── contact.html               # Contact page
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
├── package.json               # Node.js dependencies and scripts
└── README.md                  # This file
```

## Troubleshooting

### Common Build Issues

**Problem:** `css/style.css` not generated after running `npm run build`

**Solution:** 
- Ensure you've run `npm install` first
- Check that the `src/style.css` file exists
- Try deleting `node_modules` and `package-lock.json`, then run `npm install` again

---

**Problem:** Changes to HTML not reflected in the CSS

**Solution:**
- Run `npm run build` after making HTML changes
- Tailwind only includes classes that are used in your HTML files
- Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)

---

**Problem:** GitHub Actions workflow fails on build step

**Solution:**
- Check that `package.json` and `package-lock.json` are committed
- Ensure the build script in `package.json` is correct
- Review the Actions logs for specific error messages
- The workflow now includes a step to create the `css/` directory, preventing directory-related errors

---

**Problem:** Styles look broken after deployment

**Solution:**
- Verify `css/style.css` was generated and committed
- Check browser console for 404 errors loading the CSS file
- Ensure all file paths use relative paths (e.g., `css/style.css` not `/css/style.css`)
- Clear GitHub Pages cache (can take a few minutes to update)

---

**Problem:** `npm install` fails or reports vulnerabilities

**Solution:**
- Update Node.js to version 20 or higher
- Run `npm audit fix` to automatically fix vulnerabilities
- If issues persist, delete `node_modules` and `package-lock.json`, then run `npm install` again

### Common Deployment Issues

**Problem:** GitHub Pages shows 404 error

**Solution:**
- Ensure GitHub Pages is enabled in repository settings
- Verify the source is set to "GitHub Actions"
- Check that the workflow completed successfully in the Actions tab
- Wait a few minutes for DNS propagation

---

**Problem:** Workflow fails with "Permission denied"

**Solution:**
- Verify the repository has Pages enabled
- Check that Actions has the required permissions (Settings → Actions → General → Workflow permissions)
- Ensure the `GITHUB_TOKEN` has write permissions for `id-token` and `pages`

---

**Problem:** Old version of site still showing after deployment

**Solution:**
- Clear your browser cache
- Try opening in an incognito/private window
- GitHub Pages can take 1-5 minutes to update after deployment
- Check the deployment URL in the Actions log to ensure it's the correct one

## Contributing

To contribute to this project:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Test locally by running `npm run build` and viewing in a browser
5. Commit your changes (`git commit -m 'Add some feature'`)
6. Push to the branch (`git push origin feature/your-feature`)
7. Open a Pull Request

## Contact

- **Email:** contact@soulecho.org
- **Project Status:** Active development for NASA Conrad Challenge 2025-2026

## License

© 2025 SoulEcho. All rights reserved.