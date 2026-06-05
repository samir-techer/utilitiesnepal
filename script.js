/**
 * Utilities Nepal - Main JavaScript
 * Built by ordinary people, for ordinary people.
 */

(function() {
  'use strict';

  // ============================================
  // CONFIGURATION
  // ============================================
  const CONFIG = {
    scrollThreshold: 100,
    animationDelay: 100,
    debounceDelay: 150,
    searchMinLength: 1
  };

  // ============================================
  // DOM CACHE
  // ============================================
  const DOM = {
    navbar: document.getElementById('navbar'),
    navToggle: document.getElementById('navToggle'),
    navMenu: document.getElementById('navMenu'),
    navLinks: document.querySelectorAll('.nav-link'),
    themeToggle: document.getElementById('themeToggle'),
    langToggle: document.getElementById('langToggle'),
    searchBtn: document.getElementById('searchBtn'),
    searchOverlay: document.getElementById('searchOverlay'),
    searchClose: document.getElementById('searchClose'),
    searchInput: document.getElementById('searchInput'),
    searchResults: document.getElementById('searchResults'),
    searchTags: document.querySelectorAll('.search-tag'),
    backToTop: document.getElementById('backToTop'),
    productCards: document.querySelectorAll('.product-card'),
    utilityCards: document.querySelectorAll('.utility-card'),
    sections: document.querySelectorAll('section[id]'),
    statNumbers: document.querySelectorAll('.stat-number')
  };

  // ============================================
  // STATE MANAGEMENT
  // ============================================
  const State = {
    currentTheme: localStorage.getItem('theme') || 'dark',
    currentLang: localStorage.getItem('lang') || 'en',
    searchOpen: false,
    menuOpen: false,
    statsAnimated: false
  };

  // ============================================
  // THEME MANAGER
  // ============================================
  const ThemeManager = {
    init() {
      document.documentElement.setAttribute('data-theme', State.currentTheme);
      DOM.themeToggle.addEventListener('click', () => this.toggle());
    },

    toggle() {
      State.currentTheme = State.currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', State.currentTheme);
      localStorage.setItem('theme', State.currentTheme);
      this.updateIcon();
    },

    updateIcon() {
      const isDark = State.currentTheme === 'dark';
      DOM.themeToggle.setAttribute('title', isDark ? 'Toggle light mode' : 'Toggle dark mode');
      DOM.themeToggle.setAttribute('aria-label', isDark ? 'Toggle light mode' : 'Toggle dark mode');
    }
  };

  // ============================================
  // LANGUAGE MANAGER
  // ============================================
  const LangManager = {
    init() {
      this.apply(State.currentLang);
      DOM.langToggle.addEventListener('click', () => this.toggle());
    },

    toggle() {
      State.currentLang = State.currentLang === 'en' ? 'ne' : 'en';
      this.apply(State.currentLang);
      localStorage.setItem('lang', State.currentLang);
      this.updateToggle();
    },

    apply(lang) {
      document.documentElement.setAttribute('lang', lang === 'ne' ? 'ne' : 'en');

      const elements = document.querySelectorAll('[data-en][data-ne]');
      elements.forEach(el => {
        const text = el.getAttribute('data-' + lang);
        if (text) {
          if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = text;
          } else {
            el.textContent = text;
          }
        }
      });

      // Update document title
      const titleEl = document.querySelector('title');
      if (titleEl) {
        const titleText = lang === 'ne' 
          ? 'यूटिलिटिज नेपाल - नेपालको डिजिटल केन्द्र' 
          : 'Utilities Nepal - The Digital Hub for Nepal';
        titleEl.textContent = titleText;
      }
    },

    updateToggle() {
      const isNepali = State.currentLang === 'ne';
      DOM.langToggle.setAttribute('title', isNepali ? 'Switch to English' : 'Switch to Nepali');
      DOM.langToggle.setAttribute('aria-label', isNepali ? 'Switch to English' : 'Switch to Nepali');

      const current = DOM.langToggle.querySelector('.lang-current');
      const alt = DOM.langToggle.querySelector('.lang-alt');
      if (current && alt) {
        current.textContent = isNepali ? 'NP' : 'EN';
        alt.textContent = isNepali ? 'EN' : 'NP';
      }
    }
  };

  // ============================================
  // NAVIGATION MANAGER
  // ============================================
  const NavManager = {
    init() {
      // Mobile toggle
      DOM.navToggle.addEventListener('click', () => this.toggleMenu());

      // Close menu on link click
      DOM.navLinks.forEach(link => {
        link.addEventListener('click', () => this.closeMenu());
      });

      // Scroll spy
      window.addEventListener('scroll', this.debounce(() => this.updateActiveLink(), CONFIG.debounceDelay));

      // Navbar background on scroll
      window.addEventListener('scroll', this.debounce(() => this.updateNavbar(), CONFIG.debounceDelay));
    },

    toggleMenu() {
      State.menuOpen = !State.menuOpen;
      DOM.navMenu.classList.toggle('active', State.menuOpen);
      DOM.navToggle.setAttribute('aria-expanded', State.menuOpen);
      document.body.style.overflow = State.menuOpen ? 'hidden' : '';
    },

    closeMenu() {
      State.menuOpen = false;
      DOM.navMenu.classList.remove('active');
      DOM.navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    },

    updateNavbar() {
      const scrolled = window.scrollY > CONFIG.scrollThreshold;
      DOM.navbar.classList.toggle('scrolled', scrolled);
    },

    updateActiveLink() {
      const scrollPos = window.scrollY + 100;

      DOM.sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          DOM.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    },

    debounce(fn, delay) {
      let timeout;
      return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delay);
      };
    }
  };

  // ============================================
  // SEARCH SYSTEM
  // ============================================
  const SearchManager = {
    init() {
      DOM.searchBtn.addEventListener('click', () => this.open());
      DOM.searchClose.addEventListener('click', () => this.close());
      DOM.searchInput.addEventListener('input', (e) => this.handleInput(e));
      DOM.searchInput.addEventListener('keydown', (e) => this.handleKeydown(e));

      DOM.searchTags.forEach(tag => {
        tag.addEventListener('click', () => {
          DOM.searchInput.value = tag.getAttribute('data-query');
          this.performSearch(tag.getAttribute('data-query'));
        });
      });

      // Close on escape or overlay click
      DOM.searchOverlay.addEventListener('click', (e) => {
        if (e.target === DOM.searchOverlay) this.close();
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && State.searchOpen) this.close();
        // Ctrl/Cmd + K to open search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          e.preventDefault();
          this.open();
        }
      });
    },

    open() {
      State.searchOpen = true;
      DOM.searchOverlay.classList.add('active');
      DOM.searchOverlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      setTimeout(() => DOM.searchInput.focus(), 100);
    },

    close() {
      State.searchOpen = false;
      DOM.searchOverlay.classList.remove('active');
      DOM.searchOverlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      DOM.searchInput.value = '';
      DOM.searchResults.innerHTML = '';
    },

    handleInput(e) {
      const query = e.target.value.trim().toLowerCase();
      if (query.length >= CONFIG.searchMinLength) {
        this.performSearch(query);
      } else {
        DOM.searchResults.innerHTML = '';
      }
    },

    handleKeydown(e) {
      if (e.key === 'Escape') {
        this.close();
      }
    },

    performSearch(query) {
      const results = [];

      // Search products
      DOM.productCards.forEach(card => {
        const searchData = card.getAttribute('data-search') || '';
        const name = card.getAttribute('data-name') || '';
        const category = card.getAttribute('data-category') || '';
        const title = card.querySelector('.card-title')?.textContent || '';
        const desc = card.querySelector('.card-desc')?.textContent || '';

        if (searchData.includes(query) || 
            name.includes(query) || 
            category.includes(query) ||
            title.toLowerCase().includes(query) ||
            desc.toLowerCase().includes(query)) {
          results.push({
            type: 'product',
            element: card,
            title: title,
            desc: desc,
            category: card.querySelector('.card-category')?.textContent || 'Product',
            link: card.querySelector('.card-btn')?.getAttribute('href') || '#',
            icon: card.querySelector('.card-icon-wrapper')?.innerHTML || ''
          });
        }
      });

      // Search utilities
      DOM.utilityCards.forEach(card => {
        const searchData = card.getAttribute('data-search') || '';
        const title = card.querySelector('.utility-title')?.textContent || '';
        const desc = card.querySelector('.utility-desc')?.textContent || '';

        if (searchData.includes(query) || 
            title.toLowerCase().includes(query) ||
            desc.toLowerCase().includes(query)) {
          results.push({
            type: 'utility',
            element: card,
            title: title,
            desc: desc,
            category: 'Coming Soon',
            link: '#utilities',
            icon: card.querySelector('.utility-icon')?.innerHTML || ''
          });
        }
      });

      this.renderResults(results, query);
    },

    renderResults(results, query) {
      if (results.length === 0) {
        DOM.searchResults.innerHTML = `
          <div class="search-no-results">
            <p>No results found for "${query}"</p>
            <p style="font-size: 0.875rem; margin-top: 0.5rem;">Try searching for: Music, Education, GPA, Audix, NebTools</p>
          </div>
        `;
        return;
      }

      const html = results.map(result => `
        <a href="${result.link}" class="search-result-item" ${result.type === 'product' ? 'target="_blank" rel="noopener noreferrer"' : ''}>
          <div class="search-result-icon" style="background: var(--bg-tertiary); color: var(--primary);">
            ${result.icon}
          </div>
          <div class="search-result-info">
            <h4>${this.highlightMatch(result.title, query)}</h4>
            <p>${this.highlightMatch(result.desc.substring(0, 80) + '...', query)}</p>
          </div>
        </a>
      `).join('');

      DOM.searchResults.innerHTML = html;
    },

    highlightMatch(text, query) {
      if (!query) return text;
      const regex = new RegExp('(' + query + ')', 'gi');
      return text.replace(regex, '<mark style="background: var(--primary-300); color: var(--text-inverse); padding: 0 2px; border-radius: 2px;">$1</mark>');
    }
  };

  // ============================================
  // SCROLL MANAGER
  // ============================================
  const ScrollManager = {
    init() {
      // Back to top button
      window.addEventListener('scroll', NavManager.debounce(() => this.updateBackToTop(), CONFIG.debounceDelay));
      DOM.backToTop.addEventListener('click', () => this.scrollToTop());

      // Intersection Observer for animations
      this.initObserver();
    },

    updateBackToTop() {
      const scrolled = window.scrollY > 500;
      DOM.backToTop.classList.toggle('visible', scrolled);
    },

    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    initObserver() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');

            // Animate stats when hero is visible
            if (entry.target.classList.contains('hero') && !State.statsAnimated) {
              this.animateStats();
              State.statsAnimated = true;
            }
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

      document.querySelectorAll('.section, .hero').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
      });

      // Add animate-in class styles
      const style = document.createElement('style');
      style.textContent = `
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `;
      document.head.appendChild(style);
    },

    animateStats() {
      DOM.statNumbers.forEach(stat => {
        const target = stat.textContent;
        const numMatch = target.match(/[\d.]+/);
        if (!numMatch) return;

        const num = parseFloat(numMatch[0]);
        const suffix = target.replace(numMatch[0], '');
        const duration = 2000;
        const startTime = performance.now();

        const animate = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(num * easeOut);

          stat.textContent = current + suffix;

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            stat.textContent = target;
          }
        };

        requestAnimationFrame(animate);
      });
    }
  };

  // ============================================
  // CARD GLOW EFFECT
  // ============================================
  const CardGlowManager = {
    init() {
      document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
        card.addEventListener('mouseleave', (e) => this.handleMouseLeave(card));
      });
    },

    handleMouseMove(e, card) {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    },

    handleMouseLeave(card) {
      card.style.setProperty('--mouse-x', '50%');
      card.style.setProperty('--mouse-y', '50%');
    }
  };

  // ============================================
  // SERVICE WORKER REGISTRATION
  // ============================================
  const SWManager = {
    init() {
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
              console.log('SW registered:', registration.scope);
            })
            .catch(error => {
              console.log('SW registration failed:', error);
            });
        });
      }
    }
  };

  // ============================================
  // PREFERS COLOR SCHEME
  // ============================================
  const PrefersColorScheme = {
    init() {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');

      // Only apply if no stored preference
      if (!localStorage.getItem('theme')) {
        if (mediaQuery.matches) {
          State.currentTheme = 'light';
          document.documentElement.setAttribute('data-theme', 'light');
        }
      }

      mediaQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
          State.currentTheme = e.matches ? 'light' : 'dark';
          document.documentElement.setAttribute('data-theme', State.currentTheme);
        }
      });
    }
  };

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  const SmoothScroll = {
    init() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          const href = this.getAttribute('href');
          if (href === '#') return;

          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            const offset = 80; // Navbar height
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        });
      });
    }
  };

  // ============================================
  // PERFORMANCE: LAZY LOAD IMAGES (if any)
  // ============================================
  const LazyLoad = {
    init() {
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
              }
              imageObserver.unobserve(img);
            }
          });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
          imageObserver.observe(img);
        });
      }
    }
  };

  // ============================================
  // FOOTER YEAR AUTO-UPDATE
  // ============================================
  const FooterManager = {
    init() {
      const year = new Date().getFullYear();
      const copyrightEl = document.querySelector('.copyright');
      if (copyrightEl) {
        const text = copyrightEl.textContent;
        copyrightEl.textContent = text.replace(/\d{4}/, year);
      }
    }
  };

  // ============================================
  // INITIALIZATION
  // ============================================
  function init() {
    // Apply stored preferences immediately to prevent flash
    document.documentElement.setAttribute('data-theme', State.currentTheme);

    // Initialize all managers
    ThemeManager.init();
    LangManager.init();
    NavManager.init();
    SearchManager.init();
    ScrollManager.init();
    CardGlowManager.init();
    SWManager.init();
    PrefersColorScheme.init();
    SmoothScroll.init();
    LazyLoad.init();
    FooterManager.init();

    // Apply initial language
    LangManager.apply(State.currentLang);
    LangManager.updateToggle();
    ThemeManager.updateIcon();

    // Add loaded class for any CSS transitions
    document.body.classList.add('loaded');

    console.log('Utilities Nepal initialized');
    console.log('Contact: utilitiesnepal@gmail.com');
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
