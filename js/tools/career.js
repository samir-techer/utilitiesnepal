// ============================================
// CAREER NEPAL
// ============================================

const CareerTool = {
  activeTab: 'jobs',
  searchQuery: '',
  savedJobs: Utils.storage.get('savedJobs', []),

  getFilteredJobs() {
    let items = APP_DATA.jobs;
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      items = items.filter(j => 
        j.title.toLowerCase().includes(q) || 
        j.company.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q)
      );
    }
    return items;
  },

  isSaved(id) {
    return this.savedJobs.includes(id);
  },

  toggleSave(id) {
    if (this.savedJobs.includes(id)) {
      this.savedJobs = this.savedJobs.filter(sid => sid !== id);
      Utils.toast('Removed from bookmarks');
    } else {
      this.savedJobs.push(id);
      Utils.toast('Saved to bookmarks');
    }
    Utils.storage.set('savedJobs', this.savedJobs);
    this.render();
  },

  render() {
    return `
      <div class="tool-page">
        <div class="page-header">
          <h1 class="page-title">Career Nepal</h1>
          <p class="page-desc">Job listings, internships, and scholarships for Nepali professionals and students.</p>
        </div>
        <div class="tool-container">
          <div class="form-group">
            <input type="search" class="form-input" id="careerSearch" placeholder="Search jobs, companies, locations..." oninput="CareerTool.search(this.value)">
          </div>
          <div class="career-tabs">
            <button class="career-tab ${this.activeTab === 'jobs' ? 'active' : ''}" onclick="CareerTool.setTab('jobs')">Jobs (${APP_DATA.jobs.length})</button>
            <button class="career-tab ${this.activeTab === 'internships' ? 'active' : ''}" onclick="CareerTool.setTab('internships')">Internships (${APP_DATA.internships.length})</button>
            <button class="career-tab ${this.activeTab === 'scholarships' ? 'active' : ''}" onclick="CareerTool.setTab('scholarships')">Scholarships (${APP_DATA.scholarships.length})</button>
            <button class="career-tab ${this.activeTab === 'saved' ? 'active' : ''}" onclick="CareerTool.setTab('saved')">Saved (${this.savedJobs.length})</button>
          </div>
          <div id="careerContent"></div>
        </div>
      </div>
    `;
  },

  renderContent() {
    const container = document.getElementById('careerContent');

    if (this.activeTab === 'jobs') {
      const jobs = this.getFilteredJobs();
      container.innerHTML = jobs.length === 0 
        ? `<div class="result-box" style="padding:40px;"><div class="result-label">No jobs found matching your search.</div></div>`
        : `<div class="job-list">${jobs.map(j => this.renderJobCard(j)).join('')}</div>`;
    } else if (this.activeTab === 'internships') {
      container.innerHTML = `<div class="job-list">${APP_DATA.internships.map(i => this.renderInternshipCard(i)).join('')}</div>`;
    } else if (this.activeTab === 'scholarships') {
      container.innerHTML = `<div class="job-list">${APP_DATA.scholarships.map(s => this.renderScholarshipCard(s)).join('')}</div>`;
    } else if (this.activeTab === 'saved') {
      const saved = APP_DATA.jobs.filter(j => this.savedJobs.includes(j.id));
      container.innerHTML = saved.length === 0
        ? `<div class="result-box" style="padding:40px;"><div class="result-label">No saved jobs yet. Click the bookmark button on any job to save it.</div></div>`
        : `<div class="job-list">${saved.map(j => this.renderJobCard(j)).join('')}</div>`;
    }
  },

  renderJobCard(j) {
    return `
      <div class="job-card">
        <div class="job-header">
          <div>
            <div class="job-title">${j.title}</div>
            <div class="job-company">${j.company} • ${j.location}</div>
          </div>
          <span class="job-type">${j.type}</span>
        </div>
        <div class="job-details">
          <span>💰 ${j.salary}</span>
          <span>📅 ${j.posted}</span>
        </div>
        <div style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:12px;">${j.description}</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;">
          ${j.requirements.map(r => `<span style="padding:2px 8px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-full);font-size:0.7rem;color:var(--text-muted);">${r}</span>`).join('')}
        </div>
        <div class="job-actions">
          <button class="${this.isSaved(j.id) ? 'saved' : ''}" onclick="CareerTool.toggleSave(${j.id})">
            ${this.isSaved(j.id) ? '🔖 Saved' : '🔖 Save'}
          </button>
          <button onclick="Utils.toast('Application feature coming soon')">Apply Now</button>
        </div>
      </div>
    `;
  },

  renderInternshipCard(i) {
    return `
      <div class="job-card">
        <div class="job-header">
          <div>
            <div class="job-title">${i.title}</div>
            <div class="job-company">${i.company} • ${i.location}</div>
          </div>
          <span class="job-type">${i.type}</span>
        </div>
        <div class="job-details">
          <span>⏰ Deadline: ${i.deadline}</span>
        </div>
        <div style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:12px;">${i.description}</div>
        <div class="job-actions">
          <button onclick="window.open('${i.link}', '_blank')">View Details</button>
        </div>
      </div>
    `;
  },

  renderScholarshipCard(s) {
    return `
      <div class="job-card">
        <div class="job-header">
          <div>
            <div class="job-title">${s.title}</div>
            <div class="job-company">${s.provider} • ${s.level}</div>
          </div>
          <span class="job-type">Scholarship</span>
        </div>
        <div class="job-details">
          <span>💰 ${s.amount}</span>
          <span>⏰ Deadline: ${s.deadline}</span>
        </div>
        <div style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:12px;">${s.description}</div>
        <div class="job-actions">
          <button onclick="window.open('${s.link}', '_blank')">Apply Now</button>
        </div>
      </div>
    `;
  },

  setTab(tab) {
    this.activeTab = tab;
    this.render();
    this.renderContent();
  },

  search(q) {
    this.searchQuery = q;
    this.renderContent();
  },

  init() {
    this.renderContent();
  }
};

window.CareerTool = CareerTool;
