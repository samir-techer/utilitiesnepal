# Utilities Nepal v2 - Nepal's Digital Toolbox

> **Built by ordinary people, for ordinary people.** 🇳🇵

A complete, production-ready web platform with 8 fully functional utilities — no backend required. Deploys directly to GitHub Pages.

---

## What's Included

| Tool | Status | Features |
|------|--------|----------|
| **Date Converter** | ✅ Working | BS ↔ AD, Today's Date, Nepali Months, Festivals |
| **Currency** | ✅ Working | NPR/USD/INR/EUR/GBP/AUD, Live rates, Swap, History |
| **Weather** | ✅ Working | 12 Nepal cities, Current + 7-day forecast, Open-Meteo API |
| **Notes** | ✅ Working | Create/Edit/Delete, Categories, Search, Auto-save to LocalStorage |
| **Study AI** | ✅ Working | 18 Formulas + 12 Definitions, Accounting/Economics/Business, Search |
| **Radio** | ✅ Working | 20 Nepali FM stations, Play/Pause, Volume, Favorites |
| **News** | ✅ Working | 8 categories, Search, Headlines from major sources |
| **Career** | ✅ Working | Jobs, Internships, Scholarships, Bookmark system |

---

## Architecture

```
utilities-nepal/
├── index.html              # SPA shell
├── manifest.json           # PWA manifest
├── service-worker.js       # Offline caching
├── css/
│   └── style.css           # Complete stylesheet (dark/light, glassmorphism)
├── js/
│   ├── data.js             # Static data (formulas, stations, jobs, etc.)
│   ├── utils.js            # Shared utilities (storage, toast, copy)
│   ├── app.js              # Router, dashboard, global logic
│   └── tools/
│       ├── date-converter.js
│       ├── currency.js
│       ├── weather.js
│       ├── notes.js
│       ├── study.js
│       ├── radio.js
│       ├── news.js
│       └── career.js
```

---

## Deploy to GitHub Pages

1. Create repo: `utilitiesnepal.github.io`
2. Upload all files to root
3. Settings → Pages → Deploy from branch
4. Live at `https://utilitiesnepal.github.io`

---

## APIs Used

| API | Purpose | Fallback |
|-----|---------|----------|
| Open-Meteo | Weather data | Cached data |
| exchangerate-api.com | Currency rates | Static fallback rates |
| (News) | Headlines | Built-in fallback articles |

---

## Keyboard Shortcuts

- `Ctrl+K` — Global search
- `Escape` — Close search

---

## Browser Support

Chrome 90+, Firefox 88+, Safari 14+, Edge 90+, Samsung Internet 14+

---

## License

MIT License — see LICENSE file.

**Contact:** utilitiesnepal@gmail.com
