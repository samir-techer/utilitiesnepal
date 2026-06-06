// ============================================
// AI STUDY ASSISTANT
// ============================================

const StudyTool = {
  activeCategory: 'all',
  searchQuery: '',

  getAllItems() {
    return [
      ...APP_DATA.studyData.formulas.map(f => ({ ...f, type: 'formula' })),
      ...APP_DATA.studyData.definitions.map(d => ({ ...d, type: 'definition' }))
    ];
  },

  getFiltered() {
    let items = this.getAllItems();
    if (this.activeCategory !== 'all') {
      items = items.filter(i => i.category === this.activeCategory);
    }
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      items = items.filter(i => 
        i.title.toLowerCase().includes(q) || 
        i.body.toLowerCase().includes(q) ||
        (i.example && i.example.toLowerCase().includes(q)) ||
        (i.nepali && i.nepali.toLowerCase().includes(q))
      );
    }
    return items;
  },

  render() {
    return `
      <div class="tool-page">
        <div class="page-header">
          <h1 class="page-title">AI Study Assistant</h1>
          <p class="page-desc">Formulas, definitions, and concepts for NEB Accounting, Economics & Business Studies.</p>
        </div>
        <div class="tool-container">
          <div class="study-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input type="search" id="studySearch" placeholder="Search formulas, definitions, concepts..." oninput="StudyTool.search(this.value)">
          </div>
          <div class="study-categories">
            <button class="study-cat active" data-cat="all" onclick="StudyTool.setCategory('all')">All</button>
            <button class="study-cat" data-cat="accounting" onclick="StudyTool.setCategory('accounting')">Accounting</button>
            <button class="study-cat" data-cat="economics" onclick="StudyTool.setCategory('economics')">Economics</button>
            <button class="study-cat" data-cat="business" onclick="StudyTool.setCategory('business')">Business</button>
          </div>
          <div id="studyResults"></div>
        </div>
      </div>
    `;
  },

  renderResults() {
    const container = document.getElementById('studyResults');
    const items = this.getFiltered();

    if (items.length === 0) {
      container.innerHTML = `<div class="result-box" style="padding:40px;"><div class="result-label">No results found. Try searching for "GPA", "GDP", "depreciation", etc.</div></div>`;
      return;
    }

    container.innerHTML = items.map(item => `
      <div class="study-item">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;">
          <div class="study-item-title">${Utils.escape(item.title)}</div>
          <span class="study-item-tag">${item.type === 'formula' ? 'Formula' : 'Definition'}</span>
        </div>
        <div class="study-item-body">${Utils.escape(item.body)}</div>
        ${item.nepali ? `<div style="margin-top:8px;padding:8px 12px;background:var(--surface);border-radius:var(--radius);font-family:var(--font-nepali);font-size:0.85rem;color:var(--text-secondary);border:1px solid var(--border);">${Utils.escape(item.nepali)}</div>` : ''}
        ${item.example ? `<div style="margin-top:8px;padding:8px 12px;background:rgba(14,116,144,0.08);border-radius:var(--radius);font-size:0.8rem;color:var(--text-secondary);border-left:3px solid var(--primary);"><strong>Example:</strong> ${Utils.escape(item.example)}</div>` : ''}
      </div>
    `).join('');
  },

  setCategory(cat) {
    this.activeCategory = cat;
    document.querySelectorAll('.study-cat').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cat === cat);
    });
    this.renderResults();
  },

  search(q) {
    this.searchQuery = q;
    this.renderResults();
  },

  init() {
    this.renderResults();
  }
};

window.StudyTool = StudyTool;
