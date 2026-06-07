// ============================================
// UTILITIES NEPAL - MAIN APP v2.1
// Tab Bar + Drawer Navigation
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
    document.documentElement.setAttribute('data-theme', this.theme);

    // Event listeners
    document.getElementById('menuToggle')?.addEventListener('click', () => this.openMenu());
    document.getElementById('themeToggle')?.addEventListener('click', () => this.toggleTheme());
    document.getElementById('globalSearchBtn')?.addEventListener('click', () => this.openSearch());
    document.getElementById('searchClose')?.addEventListener('click', () => this.closeSearch());
    document.getElementById('globalSearchInput')?.addEventListener('input', (e) => this.handleSearch(e.target.value));
    document.getElementById('backToTop')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Keyboard
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); this.openSearch(); }
      if (e.key === 'Escape') { this.closeSearch(); this.closeMenu(); }
    });

    document.getElementById('searchOverlay')?.addEventListener('click', (e) => {
      if (e.target === document.getElementById('searchOverlay')) this.closeSearch();
    });

    window.addEventListener('scroll', Utils.debounce(() => this.handleScroll(), 100));
    window.addEventListener('hashchange', () => this.handleRoute());

    this.setupInstallPrompt();

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js').catch(() => {});
    }

    this.handleRoute();
  },

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('un-theme', this.theme);
  },

  openMenu() {
    const drawer = document.getElementById('menuDrawer');
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  },

  closeMenu() {
    const drawer = document.getElementById('menuDrawer');
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  },

  handleScroll() {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
    document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 500);
  },

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
    if (!query.trim()) { results.innerHTML = ''; return; }

    const q = query.toLowerCase();
    const matches = this.tools.filter(t =>
      t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      results.innerHTML = `<div class="search-no-results"><p>No tools found for "${Utils.escape(query)}"</p></div>`;
      return;
    }

    results.innerHTML = matches.map(t => `
      <a href="#${t.page}" class="search-result-item" onclick="app.navigate('${t.page}'); app.closeSearch();">
        <div class="search-result-icon" style="background:${t.color}20;color:${t.color};">${t.icon}</div>
        <div class="search-result-info"><h4>${t.name}</h4><p>${t.desc}</p></div>
      </a>
    `).join('');
  },

  handleRoute() {
    const hash = window.location.hash.replace('#', '') || 'dashboard';
    this.navigate(hash, false);
  },

  navigate(page, updateHash = true) {
    if (page === 'about' || page === 'privacy') {
      window.location.href = page + '.html';
      return;
    }
    this.currentPage = page;
    if (updateHash) window.location.hash = page;

    // Update active state in drawer menu
    document.querySelectorAll('.menu-item').forEach(item => {
      const href = item.getAttribute('href');
      if (href) {
        const itemPage = href.replace('#', '');
        item.classList.toggle('active', itemPage === page);
      }
    });

    this.closeMenu();
    this.renderPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  renderPage(page) {
    const main = document.getElementById('main');
    switch(page) {
      case 'dashboard': main.innerHTML = this.renderDashboard(); break;
      case 'tools': main.innerHTML = this.renderToolsPage(); break;
      case 'products': main.innerHTML = this.renderProductsPage(); break;
      case 'date': main.innerHTML = DateConverter.render(); setTimeout(() => DateConverter.init(), 0); break;
      case 'currency': main.innerHTML = CurrencyConverter.render(); setTimeout(() => CurrencyConverter.init(), 0); break;
      case 'weather': main.innerHTML = WeatherTool.render(); setTimeout(() => WeatherTool.init(), 0); break;
      case 'notes': main.innerHTML = NotesTool.render(); setTimeout(() => NotesTool.init(), 0); break;
      case 'study': main.innerHTML = StudyTool.render(); setTimeout(() => StudyTool.init(), 0); break;
      case 'radio': main.innerHTML = RadioTool.render(); setTimeout(() => RadioTool.init(), 0); break;
      case 'news': main.innerHTML = NewsTool.render(); setTimeout(() => NewsTool.init(), 0); break;
      case 'career': main.innerHTML = CareerTool.render(); setTimeout(() => CareerTool.init(), 0); break;
      default: main.innerHTML = this.renderDashboard();
    }
    this.setupTabs();
  },

  setupTabs() {
    document.querySelectorAll('.tool-tab, .career-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const parent = tab.closest('.tool-container, .tool-page');
        if (!parent) return;
        tab.parentElement.querySelectorAll('.tool-tab, .career-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const tabName = tab.dataset.tab;
        if (tabName) {
          parent.querySelectorAll('.tool-panel').forEach(p => p.classList.remove('active'));
          const panel = parent.querySelector(`#panel-${tabName}`);
          if (panel) panel.classList.add('active');
        }
      });
    });
  },

  renderDashboard() {
    return `
      <div class="page">
        <!-- Notice Bar -->
        <div class="notice-bar">
          <div class="notice-track">
            <span class="notice-item">New tools added regularly</span>
            <span class="notice-item">BS-AD Converter updated with accurate logic</span>
            <span class="notice-item">More features coming soon</span>
            <span class="notice-item">Built by ordinary people, for ordinary people</span>
            <span class="notice-item">Nepal's Digital Toolbox - Utilities Nepal</span>
            <span class="notice-item">Free tools for students, professionals & everyone</span>
            <span class="notice-item">Dark mode & light mode supported</span>
            <span class="notice-item">Works offline with PWA support</span>
          </div>
        </div>

        <!-- Hero Section -->
        <section class="modern-hero">
          <div class="modern-hero-bg" aria-hidden="true">
            <div class="gradient-orb orb-1"></div>
            <div class="gradient-orb orb-2"></div>
            <div class="grid-pattern"></div>
          </div>
          <div class="modern-hero-content">
            <div class="hero-badge"><span class="dot"></span>Built in Nepal, for Nepal</div>
            <h1 class="modern-hero-title">Everything You Need.<br><span class="highlight">One Nepali Platform.</span></h1>
            <p class="modern-hero-desc">Utilities Nepal is a growing ecosystem of digital tools designed to solve real-world problems for students, creators, and everyday people across Nepal. From date conversion to career portals, everything you need is here.</p>
            <button class="modern-hero-cta" onclick="app.navigate('products')">
              Explore Tools
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </section>

        <!-- Tools Section -->
        <section class="tools-section" id="tools">
          <div class="section-header">
            <span class="section-tag">Tools</span>
            <h2 class="section-title">All Tools</h2>
            <p class="section-desc">8 powerful utilities built for everyday Nepalis</p>
          </div>
          <div class="tools-grid-modern">
            ${this.tools.map(t => `
              <a href="#${t.page}" class="tool-card-modern" style="--card-color:${t.color};" onclick="app.navigate('${t.page}')">
                <div class="tool-icon" style="color:${t.color};">${t.icon}</div>
                <div class="tool-name">${t.name}</div>
                <div class="tool-desc">${t.desc}</div>
              </a>
            `).join('')}
          </div>
        </section>

        <!-- Products Section -->
        <section class="products-section" id="products">
          <div class="section-header">
            <span class="section-tag">Products</span>
            <h2 class="section-title">Our Products</h2>
            <p class="section-desc">Applications built under the Utilities Nepal ecosystem</p>
          </div>
          <div class="products-grid-modern">
            <a href="https://b4tler-org.github.io/Audix.Player/" target="_blank" rel="noopener noreferrer" class="product-card-modern" style="--pb-color: #8B5CF6;">
              <div class="product-icon" style="color:#8B5CF6;">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 38c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8-8-3.6-8-8z"/><path d="M28 30V12l12-6v18"/><circle cx="40" cy="24" r="4"/><path d="M12 30V8l12-6v18"/></svg>
              </div>
              <div class="product-meta">
                <span class="product-cat">Music & Entertainment</span>
                <span class="product-status">Live</span>
              </div>
              <h3 class="product-name">Audix</h3>
              <p class="product-desc">AI-powered music player with radio streaming and smart listening features.</p>
              <span class="product-link">Launch Audix →</span>
            </a>
            <a href="https://samir-techer.github.io/nebtools/" target="_blank" rel="noopener noreferrer" class="product-card-modern" style="--pb-color: #10B981;">
              <div class="product-icon" style="color:#10B981;">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 6h24v36H12z"/><path d="M18 6v36M30 6v36"/><path d="M12 14h24M12 22h24M12 30h24"/><circle cx="21" cy="18" r="1.5" fill="currentColor"/><circle cx="27" cy="26" r="1.5" fill="currentColor"/><circle cx="21" cy="34" r="1.5" fill="currentColor"/></svg>
              </div>
              <div class="product-meta">
                <span class="product-cat">Education</span>
                <span class="product-status">Live</span>
              </div>
              <h3 class="product-name">NebTools</h3>
              <p class="product-desc">Study tools designed specifically for NEB students.</p>
              <span class="product-link">Launch NebTools →</span>
            </a>
          </div>
        </section>

        <!-- About Section -->
        <section class="about-section-modern" id="about">
          <div class="section-header">
            <span class="section-tag">About</span>
            <h2 class="section-title">About Utilities Nepal</h2>
            <p class="section-desc">Building useful digital tools for Nepal</p>
          </div>
          <div class="about-content-modern">
            <div class="about-text-modern">
              <p><strong>Utilities Nepal</strong> started with a simple goal: to build useful, accessible, and modern digital tools that help people in their daily lives.</p>
              <p>Instead of creating technology for a small audience, we focus on <strong>practical solutions</strong> that anyone can use. From educational tools to entertainment platforms, every product is built with simplicity, performance, and accessibility in mind.</p>
              <p>Our mission is to make technology more useful, accessible, and beneficial for people throughout Nepal. We believe great tools should be <strong>simple, reliable, and available to everyone</strong>.</p>
            </div>
            <div class="about-visual-modern">
              <div class="about-visual-card">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><path d="M24 4L4 14v20l20 10 20-10V14L24 4z"/><path d="M24 4v20M4 14l20 10 20-10" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="24" r="4" fill="currentColor"/></svg>
                <span>Utilities Nepal</span>
              </div>
            </div>
          </div>
          <div class="stats-grid-modern">
            <div class="stat-card-modern">
              <div class="stat-num">8</div>
              <div class="stat-label">Total Tools</div>
            </div>
            <div class="stat-card-modern">
              <div class="stat-num">2</div>
              <div class="stat-label">Products</div>
            </div>
            <div class="stat-card-modern">
              <div class="stat-num">∞</div>
              <div class="stat-label">Updates</div>
            </div>
            <div class="stat-card-modern">
              <div class="stat-num">24/7</div>
              <div class="stat-label">Availability</div>
            </div>
          </div>
        </section>

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
        <div class="tools-section">
          <div class="tools-grid-modern">
            ${this.tools.map(t => `
              <a href="#${t.page}" class="tool-card-modern" style="--card-color:${t.color};" onclick="app.navigate('${t.page}')">
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

  renderProductsPage() {
    return `
      <div class="page">
        <div class="page-header">
          <h1 class="page-title">Our Products</h1>
          <p class="page-desc">Applications built under the Utilities Nepal ecosystem</p>
        </div>
        <div class="products-section">
          <div class="products-grid-modern">
            <a href="https://b4tler-org.github.io/Audix.Player/" target="_blank" rel="noopener noreferrer" class="product-card-modern" style="--pb-color: #8B5CF6;">
              <div class="product-icon" style="color:#8B5CF6;">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 38c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8-8-3.6-8-8z"/><path d="M28 30V12l12-6v18"/><circle cx="40" cy="24" r="4"/><path d="M12 30V8l12-6v18"/></svg>
              </div>
              <div class="product-meta">
                <span class="product-cat">Music & Entertainment</span>
                <span class="product-status">Live</span>
              </div>
              <h3 class="product-name">Audix</h3>
              <p class="product-desc">AI-powered music player with radio streaming and smart listening features.</p>
              <span class="product-link">Launch Audix →</span>
            </a>
            <a href="https://samir-techer.github.io/nebtools/" target="_blank" rel="noopener noreferrer" class="product-card-modern" style="--pb-color: #10B981;">
              <div class="product-icon" style="color:#10B981;">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 6h24v36H12z"/><path d="M18 6v36M30 6v36"/><path d="M12 14h24M12 22h24M12 30h24"/><circle cx="21" cy="18" r="1.5" fill="currentColor"/><circle cx="27" cy="26" r="1.5" fill="currentColor"/><circle cx="21" cy="34" r="1.5" fill="currentColor"/></svg>
              </div>
              <div class="product-meta">
                <span class="product-cat">Education</span>
                <span class="product-status">Live</span>
              </div>
              <h3 class="product-name">NebTools</h3>
              <p class="product-desc">Study tools designed specifically for NEB students.</p>
              <span class="product-link">Launch NebTools →</span>
            </a>
          </div>
        </div>
        ${this.renderFooter()}
      </div>
    `;
  },

  renderFooter() {
    return `
      <footer class="footer-modern">
        <div class="footer-modern-container">
          <div class="footer-modern-main">
            <div class="footer-modern-brand">
              <a href="#dashboard" class="footer-modern-logo" onclick="app.navigate('dashboard')">
                <svg class="logo-icon" viewBox="0 0 48 48" fill="none"><path d="M24 4L4 14v20l20 10 20-10V14L24 4z" stroke="currentColor" stroke-width="2"/><path d="M24 4v20M4 14l20 10 20-10" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="24" r="4" fill="currentColor"/></svg>
                <span class="logo-text">Utilities Nepal</span>
              </a>
              <p class="footer-modern-tagline">Built by ordinary people, for ordinary people. 🇳🇵</p>
              <div class="footer-modern-social">
                <a href="mailto:utilitiesnepal@gmail.com" title="Email">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </a>
                <a href="about.html" title="About">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                </a>
              </div>
            </div>
            <div class="footer-modern-links">
              <div class="footer-modern-column">
                <h4>Navigate</h4>
                <ul>
                  <li><a href="#dashboard" onclick="app.navigate('dashboard')">Home</a></li>
                  <li><a href="#products" onclick="app.navigate('products')">Products</a></li>
                  <li><a href="#tools" onclick="app.navigate('tools')">Tools</a></li>
                  <li><a href="about.html">About</a></li>
                </ul>
              </div>
              <div class="footer-modern-column">
                <h4>Tools</h4>
                <ul>
                  ${this.tools.slice(0, 4).map(t => `<li><a href="#${t.page}" onclick="app.navigate('${t.page}')">${t.name}</a></li>`).join('')}
                </ul>
              </div>
              <div class="footer-modern-column">
                <h4>Legal</h4>
                <ul>
                  <li><a href="privacy.html">Privacy Policy</a></li>
                  <li><a href="mailto:utilitiesnepal@gmail.com">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-modern-bottom">
            <p class="footer-modern-copyright">© 2026 Utilities Nepal. Made with Ambition.</p>
            <div class="footer-modern-status"><span class="dot"></span>All Systems Operational</div>
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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => app.init());
} else {
  app.init();
}
