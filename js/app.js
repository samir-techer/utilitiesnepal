// ============================================
// UTILITIES NEPAL - MAIN APP
// ============================================

const app = {
  currentPage: 'dashboard',
  theme: localStorage.getItem('un-theme') || 'dark',

  tools: [
    { id: 'date', name: 'Date Converter', desc: 'BS ↔ AD calendar', color: '#F59E0B', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>', page: 'date' },
    { id: 'currency', name: 'Currency', desc: 'NPR, USD, INR, EUR', color: '#10B981', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M8 10h8M8 14h8"/></svg>', page: 'currency' },
    { id: 'weather', name: 'Weather', desc: 'Nepal cities forecast', color: '#3B82F6', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.5 19c0-3.037-2.463-5.5-5.5-5.5S6.5 15.963 6.5 19"/><path d="M17.5 19H19a3 3 0 0 0 3-3 3 3 0 0 0-3-3h-.5"/><path d="M6.5 19H5a3 3 0 0 1-3-3 3 3 0 0 1 3-3h.5"/><path d="M12 13.5V8"/><path d="M12 8a4 4 0 0 1 4-4h.5"/><path d="M12 8a4 4 0 0 0-4-4h-.5"/></svg>', page: 'weather' },
    { id: 'notes', name: 'Notes', desc: 'Create & save notes', color: '#8B5CF6', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>', page: 'notes' },
    { id: 'study', name: 'Study AI', desc: 'Formulas & definitions', color: '#EC4899', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>', page: 'study' },
    { id: 'radio', name: 'Radio', desc: 'Nepali FM stations', color: '#EF4444', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/></svg>', page: 'radio' },
    { id: 'news', name: 'News', desc: 'Nepal headlines', color: '#06B6D4', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2"/><path d="M9 10h6"/><path d="M9 14h6"/></svg>', page: 'news' },
    { id: 'career', name: 'Career', desc: 'Jobs & scholarships', color: '#F97316', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>', page: 'career' },
  ],

  init() {
    // Apply theme
    document.documentElement.setAttribute('data-theme', this.theme);

    // Event listeners
    document.getElementById('navToggle')?.addEventListener('click', () => this.toggleMenu());
    document.getElementById('themeToggle')?.addEventListener('click', () => this.toggleTheme());
    document.getElementById('globalSearchBtn')?.addEventListener('click', () => this.openSearch());
    document.getElementById('searchClose')?.addEventListener('click', () => this.closeSearch());
    document.getElementById('globalSearchInput')?.addEventListener('input', (e) => this.handleSearch(e.target.value));
    document.getElementById('backToTop')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault(); this.openSearch();
      }
      if (e.key === 'Escape') this.closeSearch();
    });

    // Close search on overlay click
    document.getElementById('searchOverlay')?.addEventListener('click', (e) => {
      if (e.target === document.getElementById('searchOverlay')) this.closeSearch();
    });

    // Scroll handler
    window.addEventListener('scroll', Utils.debounce(() => this.handleScroll(), 100));

    // PWA install
    this.setupInstallPrompt();

    // Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js').catch(() => {});
    }

    // Route handler
    window.addEventListener('hashchange', () => this.handleRoute());

    // Initial route
    this.handleRoute();
  },

  toggleMenu() {
    const menu = document.getElementById('navMenu');
    const toggle = document.getElementById('navToggle');
    const isOpen = menu.classList.toggle('active');
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  },

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('un-theme', this.theme);
  },

  handleScroll() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 500);
  },

  // Search
  openSearch() {
    const overlay = document.getElementById('searchOverlay');
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.getElementById('globalSearchInput').focus(), 100);
  },

  closeSearch() {
    const overlay = document.getElementById('searchOverlay');
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.getElementById('globalSearchInput').value = '';
    document.getElementById('searchResults').innerHTML = '';
  },

  handleSearch(query) {
    const results = document.getElementById('searchResults');
    if (!query.trim()) {
      results.innerHTML = '';
      return;
    }

    const q = query.toLowerCase();
    const matches = this.tools.filter(t => 
      t.name.toLowerCase().includes(q) || 
      t.desc.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      results.innerHTML = `<div class="search-no-results"><p>No tools found for "${Utils.escape(query)}"</p></div>`;
      return;
    }

    results.innerHTML = matches.map(t => `
      <a href="#${t.page}" class="search-result-item" onclick="app.navigate('${t.page}'); app.closeSearch();">
        <div class="search-result-icon" style="background:${t.color}20;color:${t.color};">${t.icon}</div>
        <div class="search-result-info">
          <h4>${t.name}</h4>
          <p>${t.desc}</p>
        </div>
      </a>
    `).join('');
  },

  // Routing
  handleRoute() {
    const hash = window.location.hash.replace('#', '') || 'dashboard';
    this.navigate(hash, false);
  },

  navigate(page, updateHash = true) {
    if (page === 'about') {
      window.location.href = 'about.html';
      return;
    }
    this.currentPage = page;
    if (updateHash) window.location.hash = page;

    // Update nav active state
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.page === page || (page === 'dashboard' && link.dataset.page === 'dashboard'));
    });

    // Close mobile menu
    document.getElementById('navMenu')?.classList.remove('active');
    document.getElementById('navToggle')?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    // Render page
    this.renderPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  renderPage(page) {
    const main = document.getElementById('main');

    switch(page) {
      case 'dashboard':
        main.innerHTML = this.renderDashboard();
        break;
      case 'tools':
        main.innerHTML = this.renderToolsPage();
        break;
      case 'date':
        main.innerHTML = DateConverter.render();
        setTimeout(() => DateConverter.init(), 0);
        break;
      case 'currency':
        main.innerHTML = CurrencyConverter.render();
        setTimeout(() => CurrencyConverter.init(), 0);
        break;
      case 'weather':
        main.innerHTML = WeatherTool.render();
        setTimeout(() => WeatherTool.init(), 0);
        break;
      case 'notes':
        main.innerHTML = NotesTool.render();
        setTimeout(() => NotesTool.init(), 0);
        break;
      case 'study':
        main.innerHTML = StudyTool.render();
        setTimeout(() => StudyTool.init(), 0);
        break;
      case 'radio':
        main.innerHTML = RadioTool.render();
        setTimeout(() => RadioTool.init(), 0);
        break;
      case 'news':
        main.innerHTML = NewsTool.render();
        setTimeout(() => NewsTool.init(), 0);
        break;
      case 'career':
        main.innerHTML = CareerTool.render();
        setTimeout(() => CareerTool.init(), 0);
        break;
      default:
        main.innerHTML = this.renderDashboard();
    }

    // Setup tabs
    this.setupTabs();
  },

  setupTabs() {
    document.querySelectorAll('.tool-tab, .career-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const parent = tab.closest('.tool-container, .tool-page');
        if (!parent) return;

        // Remove active from siblings
        tab.parentElement.querySelectorAll('.tool-tab, .career-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Show corresponding panel
        const tabName = tab.dataset.tab || tab.textContent.toLowerCase().split(' ')[0];
        parent.querySelectorAll('.tool-panel').forEach(p => p.classList.remove('active'));
        const panel = parent.querySelector(`#panel-${tabName}`) || parent.querySelector(`.tool-panel:nth-child(${Array.from(tab.parentElement.children).indexOf(tab) + 1})`);
        if (panel) panel.classList.add('active');
      });
    });
  },

  renderDashboard() {
    return `
      <div class="page">
        <div class="dashboard-hero">
          <div class="hero-badge"><span class="dot"></span>Built in Nepal, for Nepal</div>
          <h1 class="hero-title">Everything You Need.<br><span class="highlight">One Nepali Platform.</span></h1>
          <p class="hero-subtitle">Powerful tools for students, professionals, and everyday Nepalis. All free, all local, all yours.</p>
          <div class="hero-stats">
            <div class="stat-item"><span class="stat-num">8</span><span class="stat-label">Tools</span></div>
            <div class="stat-item"><span class="stat-num">10K+</span><span class="stat-label">Users</span></div>
            <div class="stat-item"><span class="stat-num">24/7</span><span class="stat-label">Available</span></div>
          </div>
        </div>

        <div class="quick-launch">
          <h2 class="quick-launch-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
            Quick Launch
          </h2>
          <div class="tools-grid">
            ${this.tools.map(t => `
              <a href="#${t.page}" class="tool-card" style="--card-color:${t.color};" onclick="app.navigate('${t.page}')">
                <div class="tool-icon" style="color:${t.color};">${t.icon}</div>
                <div class="tool-name">${t.name}</div>
                <div class="tool-desc">${t.desc}</div>
              </a>
            `).join('')}
          </div>
        </div>

        ${this.renderFooter()}
      </div>
    `;
  },

  renderToolsPage() {
    return `
      <div class="page">
        <div class="page-header">
          <h1 class="page-title">All Tools</h1>
          <p class="page-desc">Explore every utility in the Nepal digital toolbox.</p>
        </div>
        <div class="quick-launch">
          <div class="tools-grid">
            ${this.tools.map(t => `
              <a href="#${t.page}" class="tool-card" style="--card-color:${t.color};" onclick="app.navigate('${t.page}')">
                <div class="tool-icon" style="color:${t.color};">${t.icon}</div>
                <div class="tool-name">${t.name}</div>
                <div class="tool-desc">${t.desc}</div>
              </a>
            `).join('')}
          </div>
        </div>
        ${this.renderFooter()}
      </div>
    `;
  },

  renderFooter() {
    return `
      <footer class="footer">
        <div class="footer-container">
          <div class="footer-main">
            <div class="footer-brand">
              <a href="#dashboard" class="footer-logo" onclick="app.navigate('dashboard')">
                <svg class="logo-icon" viewBox="0 0 48 48" fill="none"><path d="M24 4L4 14v20l20 10 20-10V14L24 4z" stroke="currentColor" stroke-width="2"/><path d="M24 4v20M4 14l20 10 20-10" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="24" r="4" fill="currentColor"/></svg>
                <span class="logo-text">Utilities Nepal</span>
              </a>
              <p class="footer-tagline">Built by ordinary people, for ordinary people.</p>
            </div>
            <div class="footer-links">
              <div class="footer-column">
                <h4 class="footer-heading">Tools</h4>
                <ul>
                  ${this.tools.slice(0, 4).map(t => `<li><a href="#${t.page}" onclick="app.navigate('${t.page}')">${t.name}</a></li>`).join('')}
                </ul>
              </div>
              <div class="footer-column">
                <h4 class="footer-heading">More</h4>
                <ul>
                  ${this.tools.slice(4).map(t => `<li><a href="#${t.page}" onclick="app.navigate('${t.page}')">${t.name}</a></li>`).join('')}
                </ul>
              </div>
              <div class="footer-column">
                <h4 class="footer-heading">Contact</h4>
                <ul>
                  <li><a href="mailto:utilitiesnepal@gmail.com">utilitiesnepal@gmail.com</a></li>
                  <li><a href="#" onclick="Utils.toast('Coming soon')">About Us</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <p class="copyright">© ${new Date().getFullYear()} Utilities Nepal. Built by ordinary people, for ordinary people.</p>
            <div class="footer-status"><span class="dot"></span>All Systems Operational</div>
          </div>
        </div>
      </footer>
    `;
  },

  setupInstallPrompt() {
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      document.getElementById('installPrompt').style.display = 'block';
    });

    document.getElementById('installBtn')?.addEventListener('click', async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        document.getElementById('installPrompt').style.display = 'none';
        Utils.toast('App installed!');
      }
    });

    document.getElementById('installDismiss')?.addEventListener('click', () => {
      document.getElementById('installPrompt').style.display = 'none';
    });
  }
};

// Initialize when DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => app.init());
} else {
  app.init();
}
