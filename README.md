# Utilities Nepal

> **The Digital Hub for Nepal**  
> *Built by ordinary people, for ordinary people.*

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen?logo=github)](https://utilitiesnepal.github.io)
[![PWA](https://img.shields.io/badge/PWA-Ready-blue?logo=pwa)](https://utilitiesnepal.github.io)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## Overview

**Utilities Nepal** is the central digital hub that connects multiple Nepali-made tools and applications into one unified ecosystem. It serves as the launchpad for all Utilities Nepal products, providing a premium, modern, and accessible web experience for users across Nepal.

### Current Products

| Product | Category | Status | Link |
|---------|----------|--------|------|
| **Audix** | Music & Entertainment | Live | [Launch](https://b4tler-org.github.io/Audix.Player/) |
| **NebTools** | Education | Live | [Launch](https://samir-techer.github.io/nebtools/) |

### Coming Soon

- Date Converter (BS ↔ AD)
- Currency Converter (NPR ↔ USD/INR)
- Unit Converter
- Public Holiday Calendar
- Emergency Contact Directory
- Weather Tool

---

## Features

### Design & UX
- **Dark & Light Mode** - Seamless theme switching with system preference detection
- **Glassmorphism** - Modern frosted glass UI elements
- **Gradient Backgrounds** - Dynamic animated orbs and patterns
- **Smooth Animations** - Intersection Observer-based scroll animations
- **Inter Font** - Clean, modern typography
- **Mobile-First** - Responsive design from 320px to 4K displays

### Functionality
- **Global Search** - Instant product filtering with keyword search
- **Bilingual Support** - English (EN) and Nepali (नेपाली) language toggle
- **System Status Widget** - Real-time operational status display
- **PWA Support** - Installable app with offline capability
- **Service Worker** - Intelligent caching for fast loading
- **SEO Optimized** - Complete meta tags, Open Graph, structured data

### Performance
- **Lighthouse Score** > 95
- **Loading Time** < 2 seconds
- **Lazy Loading** - Deferred asset loading
- **Optimized Assets** - SVG-based icons and graphics
- **Accessibility** - WCAG 2.1 AA compliant, keyboard navigation, screen reader support

---

## Technology Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic markup, SEO structure |
| CSS3 | Custom properties, grid, flexbox, animations |
| Vanilla JavaScript | Zero dependencies, modular architecture |
| GitHub Pages | Free hosting, automatic deployment |
| Service Worker | Offline support, caching strategy |
| Web App Manifest | PWA installability |

---

## Project Structure

```
utilities-nepal/
├── index.html          # Main landing page
├── style.css           # Complete stylesheet (single file)
├── script.js           # Application logic (single file)
├── manifest.json       # PWA manifest
├── service-worker.js   # Offline caching & background sync
├── README.md           # Documentation
└── LICENSE             # MIT License
```

---

## Quick Start

### Local Development

```bash
# Clone the repository
git clone https://github.com/utilitiesnepal/utilitiesnepal.github.io.git

# Navigate to project
cd utilitiesnepal.github.io

# Serve locally (Python 3)
python -m http.server 8000

# Or with Node.js
npx serve .

# Open in browser
open http://localhost:8000
```

### Deployment

This project is automatically deployed to GitHub Pages when pushed to the `main` branch.

```bash
# Add remote
git remote add origin https://github.com/utilitiesnepal/utilitiesnepal.github.io.git

# Push to deploy
git add .
git commit -m "feat: initial release"
git push origin main
```

---

## Adding New Products

To add a new product to the ecosystem:

1. **Add product card** in `index.html` within the `#productsGrid`:

```html
<article class="product-card" data-category="your-category" data-name="your-product" data-search="keywords for search">
  <div class="card-glow"></div>
  <div class="card-content">
    <div class="card-icon-wrapper" style="--icon-color: #YOUR_COLOR;">
      <!-- SVG Icon -->
    </div>
    <div class="card-meta">
      <span class="card-category" data-en="Category" data-ne="वर्ग">Category</span>
      <span class="card-status active" data-en="Live" data-ne="सक्रिय">Live</span>
    </div>
    <h3 class="card-title">Product Name</h3>
    <p class="card-desc" data-en="Description" data-ne="विवरण">Description</p>
    <div class="card-features">
      <span class="feature-tag">Feature 1</span>
    </div>
    <a href="https://your-product-url.com" target="_blank" rel="noopener noreferrer" class="card-btn">
      <span data-en="Launch" data-ne="खोल्नुहोस्">Launch</span>
    </a>
  </div>
</article>
```

2. **Update search data** - The `data-search` attribute automatically indexes the product.

3. **Update status widget** - Add the service to the status section if applicable.

4. **No CSS changes required** - The grid system automatically adapts.

---

## Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Full Support |
| Firefox | 88+ | ✅ Full Support |
| Safari | 14+ | ✅ Full Support |
| Edge | 90+ | ✅ Full Support |
| Opera | 76+ | ✅ Full Support |
| Samsung Internet | 14+ | ✅ Full Support |

---

## Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| Lighthouse Score | > 95 | TBD |
| First Contentful Paint | < 1.5s | TBD |
| Time to Interactive | < 2s | TBD |
| Cumulative Layout Shift | < 0.1 | TBD |
| Total Blocking Time | < 200ms | TBD |

---

## Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader optimized (ARIA labels, roles, live regions)
- Reduced motion support (`prefers-reduced-motion`)
- High contrast mode support (`prefers-contrast`)
- Skip navigation link
- Focus indicators on all interactive elements

---

## Contributing

We welcome contributions from the community!

### Ways to Contribute

1. **Suggest a Tool** - Email us at [utilitiesnepal@gmail.com](mailto:utilitiesnepal@gmail.com)
2. **Report Bugs** - Open an issue on GitHub
3. **Feature Requests** - Share your ideas
4. **Code Contributions** - Fork and submit a PR

### Development Guidelines

- Follow the existing code style
- Ensure mobile-first responsive design
- Maintain accessibility standards
- Test across browsers before submitting
- Update documentation for new features

---

## Community

Connect with us and other contributors:

- **Discord** - Coming Soon
- **Facebook** - Coming Soon
- **WhatsApp** - Coming Soon
- **Telegram** - Coming Soon

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## Contact

**Email:** [utilitiesnepal@gmail.com](mailto:utilitiesnepal@gmail.com)

**Website:** [utilitiesnepal.github.io](https://utilitiesnepal.github.io)

---

<p align="center">
  <strong>Built by ordinary people, for ordinary people.</strong><br>
  <sub>🇳🇵 Made with pride in Nepal</sub>
</p>
