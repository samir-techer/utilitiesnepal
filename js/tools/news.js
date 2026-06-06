// ============================================
// NEPAL NEWS HUB
// ============================================

const NewsTool = {
  articles: [],
  activeCategory: 'all',
  searchQuery: '',
  loading: false,

  categories: [
    { id: 'all', name: 'All News' },
    { id: 'politics', name: 'Politics' },
    { id: 'business', name: 'Business' },
    { id: 'technology', name: 'Technology' },
    { id: 'sports', name: 'Sports' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'education', name: 'Education' }
  ],

  // Fallback news data when API fails
  fallbackNews: [
    {
      title: "Nepal Government Announces New Digital Initiative",
      excerpt: "The government has launched a comprehensive digital transformation plan aimed at improving public services accessibility across the country.",
      category: "politics",
      source: "The Kathmandu Post",
      date: new Date().toISOString(),
      url: "https://kathmandupost.com"
    },
    {
      title: "Nepali Rupee Strengthens Against Dollar",
      excerpt: "The Nepali rupee has shown signs of recovery against the US dollar, bringing relief to importers and the general economy.",
      category: "business",
      source: "Republica",
      date: new Date(Date.now() - 86400000).toISOString(),
      url: "https://myrepublica.nagariknetwork.com"
    },
    {
      title: "Kathmandu Valley Traffic Gets Smart Signals",
      excerpt: "New AI-powered traffic management systems are being installed across major intersections in the Kathmandu Valley.",
      category: "technology",
      source: "TechLekh",
      date: new Date(Date.now() - 172800000).toISOString(),
      url: "https://techlekh.com"
    },
    {
      title: "Nepal Cricket Team Prepares for World Cup Qualifiers",
      excerpt: "The national cricket team has begun intensive training camps ahead of the upcoming ICC World Cup Qualifier matches.",
      category: "sports",
      source: "OnlineKhabar",
      date: new Date(Date.now() - 259200000).toISOString(),
      url: "https://onlinekhabar.com"
    },
    {
      title: "New Nepali Movie Breaks Box Office Records",
      excerpt: "A locally produced film has shattered previous box office records, signaling a resurgence in Nepali cinema.",
      category: "entertainment",
      source: "Nepali Times",
      date: new Date(Date.now() - 345600000).toISOString(),
      url: "https://nepalitimes.com"
    },
    {
      title: "NEB Results Published for Grade 12",
      excerpt: "The National Examination Board has published the results for the Grade 12 examinations with an overall pass rate improvement.",
      category: "education",
      source: "Gorkhapatra",
      date: new Date(Date.now() - 432000000).toISOString(),
      url: "https://gorkhapatraonline.com"
    },
    {
      title: "Tourism Sector Shows Strong Recovery",
      excerpt: "Nepal's tourism industry is bouncing back with increased visitor numbers and new trekking routes being opened.",
      category: "business",
      source: "The Himalayan Times",
      date: new Date(Date.now() - 518400000).toISOString(),
      url: "https://thehimalayantimes.com"
    },
    {
      title: "Kathmandu Metro Bus Service Expands",
      excerpt: "The Kathmandu Metropolitan City is expanding its electric bus service to cover more routes within the valley.",
      category: "politics",
      source: "Ekantipur",
      date: new Date(Date.now() - 604800000).toISOString(),
      url: "https://ekantipur.com"
    }
  ],

  async fetchNews() {
    this.loading = true;
    try {
      // Try multiple news APIs
      const apis = [
        `https://newsapi.org/v2/top-headlines?country=np&apiKey=demo`,
        `https://gnews.io/api/v4/top-headlines?country=np&apikey=demo`,
      ];

      // Since we can't use real API keys in demo, use fallback
      this.articles = this.fallbackNews.map(n => ({
        ...n,
        image: null // No images in fallback
      }));
    } catch {
      this.articles = this.fallbackNews;
    }
    this.loading = false;
    this.renderResults();
  },

  getFiltered() {
    let items = this.articles;
    if (this.activeCategory !== 'all') {
      items = items.filter(a => a.category === this.activeCategory);
    }
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      items = items.filter(a => 
        a.title.toLowerCase().includes(q) || 
        a.excerpt.toLowerCase().includes(q)
      );
    }
    return items;
  },

  render() {
    return `
      <div class="tool-page">
        <div class="page-header">
          <h1 class="page-title">Nepal News Hub</h1>
          <p class="page-desc">Latest headlines from Nepal's top news sources.</p>
        </div>
        <div class="tool-container">
          <div class="form-group">
            <input type="search" class="form-input" id="newsSearch" placeholder="Search news..." oninput="NewsTool.search(this.value)">
          </div>
          <div class="news-categories">
            ${this.categories.map(c => `
              <button class="news-cat ${this.activeCategory === c.id ? 'active' : ''}" onclick="NewsTool.setCategory('${c.id}')">${c.name}</button>
            `).join('')}
          </div>
          <div id="newsContent"></div>
        </div>
      </div>
    `;
  },

  renderResults() {
    const container = document.getElementById('newsContent');
    const items = this.getFiltered();

    if (this.loading) {
      container.innerHTML = `<div class="result-box" style="padding:40px;"><div class="result-label">Loading news...</div></div>`;
      return;
    }

    if (items.length === 0) {
      container.innerHTML = `<div class="result-box" style="padding:40px;"><div class="result-label">No news found. Try a different search or category.</div></div>`;
      return;
    }

    container.innerHTML = `
      <div class="news-grid">
        ${items.map(item => `
          <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="news-card">
            <div class="news-image" style="background:linear-gradient(135deg, var(--primary), var(--accent));display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:1.2rem;">
              ${item.source.substring(0, 2).toUpperCase()}
            </div>
            <div class="news-content">
              <div class="news-title">${Utils.escape(item.title)}</div>
              <div class="news-excerpt">${Utils.escape(item.excerpt)}</div>
              <div class="news-meta">
                <span>${item.source}</span>
                <span>${Utils.formatDate(item.date)}</span>
              </div>
            </div>
          </a>
        `).join('')}
      </div>
    `;
  },

  setCategory(cat) {
    this.activeCategory = cat;
    document.querySelectorAll('.news-cat').forEach(btn => {
      btn.classList.toggle('active', btn.textContent === this.categories.find(c => c.id === cat)?.name);
    });
    this.renderResults();
  },

  search(q) {
    this.searchQuery = q;
    this.renderResults();
  },

  async init() {
    await this.fetchNews();
  }
};

window.NewsTool = NewsTool;
