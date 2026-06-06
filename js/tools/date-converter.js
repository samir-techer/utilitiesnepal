// ============================================
// DATE CONVERTER - BS ↔ AD
// ============================================

const DateConverter = {
  // BS to AD conversion (approximate algorithm)
  bsToAd(bsYear, bsMonth, bsDay) {
    const ref = APP_DATA.bsReference;
    let totalBsDays = 0;

    // Days from reference year to target year
    for (let y = ref.bsYear; y < bsYear; y++) {
      totalBsDays += this.getBsYearDays(y);
    }

    // Days from start of target year to target month
    for (let m = 1; m < bsMonth; m++) {
      totalBsDays += APP_DATA.nepaliMonths[m - 1].days;
    }

    // Add target day
    totalBsDays += bsDay - 1;

    // Convert to AD
    const adDate = new Date(ref.adYear, ref.adMonth - 1, ref.adDay);
    adDate.setDate(adDate.getDate() + totalBsDays);

    return {
      year: adDate.getFullYear(),
      month: adDate.getMonth() + 1,
      day: adDate.getDate(),
      weekday: adDate.toLocaleDateString('en-US', { weekday: 'long' }),
      formatted: adDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };
  },

  // AD to BS conversion (approximate)
  adToBs(adYear, adMonth, adDay) {
    const ref = APP_DATA.bsReference;
    const adDate = new Date(adYear, adMonth - 1, adDay);
    const refDate = new Date(ref.adYear, ref.adMonth - 1, ref.adDay);

    let diffDays = Math.floor((adDate - refDate) / (1000 * 60 * 60 * 24));

    let bsYear = ref.bsYear;
    let bsMonth = 1;
    let bsDay = 1;

    // Add years
    while (diffDays >= this.getBsYearDays(bsYear)) {
      diffDays -= this.getBsYearDays(bsYear);
      bsYear++;
    }

    // Add months
    while (diffDays >= APP_DATA.nepaliMonths[bsMonth - 1].days) {
      diffDays -= APP_DATA.nepaliMonths[bsMonth - 1].days;
      bsMonth++;
    }

    // Add days
    bsDay += diffDays;

    const monthData = APP_DATA.nepaliMonths[bsMonth - 1];

    return {
      year: bsYear,
      month: bsMonth,
      day: bsDay,
      monthName: monthData.bs,
      monthEn: monthData.en,
      formatted: `${monthData.bs} ${bsDay}, ${bsYear} BS`
    };
  },

  getBsYearDays(year) {
    // Simplified: most years have 365 days, some have 366 (leap year in BS)
    // In reality, BS calendar has varying year lengths
    return 365; // Approximation for simplicity
  },

  getTodayBs() {
    const now = new Date();
    return this.adToBs(now.getFullYear(), now.getMonth() + 1, now.getDate());
  },

  getTodayAd() {
    const now = new Date();
    return {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
      formatted: now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })
    };
  },

  checkFestival(bsMonth, bsDay) {
    return APP_DATA.festivals.find(f => f.bsMonth === bsMonth && f.bsDay === bsDay);
  },

  render() {
    return `
      <div class="tool-page">
        <div class="page-header">
          <h1 class="page-title">Nepali Date Converter</h1>
          <p class="page-desc">Convert between Bikram Sambat (BS) and Anno Domini (AD) calendars instantly.</p>
        </div>
        <div class="tool-container">
          <div class="tool-tabs">
            <button class="tool-tab active" data-tab="ad2bs">AD → BS</button>
            <button class="tool-tab" data-tab="bs2ad">BS → AD</button>
            <button class="tool-tab" data-tab="today">Today's Date</button>
            <button class="tool-tab" data-tab="months">Nepali Months</button>
          </div>

          <div class="tool-panel active" id="panel-ad2bs">
            <div class="form-group">
              <label class="form-label">AD Date</label>
              <input type="date" class="form-input" id="adDateInput" value="${new Date().toISOString().split('T')[0]}">
            </div>
            <button class="btn btn-primary" onclick="DateConverter.convertAdToBs()">Convert to BS</button>
            <div id="ad2bsResult"></div>
          </div>

          <div class="tool-panel" id="panel-bs2ad">
            <div class="converter-row">
              <div class="form-group">
                <label class="form-label">BS Year</label>
                <input type="number" class="form-input" id="bsYearInput" value="${this.getTodayBs().year}" min="2000" max="2100">
              </div>
              <div class="form-group">
                <label class="form-label">BS Month</label>
                <select class="form-select" id="bsMonthInput">
                  ${APP_DATA.nepaliMonths.map((m, i) => `<option value="${i+1}" ${i+1 === this.getTodayBs().month ? 'selected' : ''}>${m.bs} (${m.en})</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">BS Day</label>
                <input type="number" class="form-input" id="bsDayInput" value="${this.getTodayBs().day}" min="1" max="32">
              </div>
            </div>
            <button class="btn btn-primary" onclick="DateConverter.convertBsToAd()">Convert to AD</button>
            <div id="bs2adResult"></div>
          </div>

          <div class="tool-panel" id="panel-today">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
              <div class="result-box">
                <div class="result-value">${this.getTodayAd().formatted}</div>
                <div class="result-label">AD (Gregorian)</div>
              </div>
              <div class="result-box">
                <div class="result-value" style="font-family:var(--font-nepali);font-size:1.5rem;">${this.getTodayBs().formatted}</div>
                <div class="result-label">BS (Bikram Sambat)</div>
              </div>
            </div>
            <div id="todayFestival" style="margin-top:16px;"></div>
          </div>

          <div class="tool-panel" id="panel-months">
            <div class="nepali-months-grid">
              ${APP_DATA.nepaliMonths.map((m, i) => `
                <div class="month-item">
                  <div class="month-name">${m.bs}</div>
                  <div class="month-en">${m.en}</div>
                  <div style="font-size:0.7rem;color:var(--text-muted);margin-top:2px;">${m.days} days</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  convertAdToBs() {
    const val = document.getElementById('adDateInput').value;
    if (!val) return;
    const [y, m, d] = val.split('-').map(Number);
    const result = this.adToBs(y, m, d);
    const festival = this.checkFestival(result.month, result.day);

    document.getElementById('ad2bsResult').innerHTML = `
      <div class="result-box">
        <div class="result-value" style="font-family:var(--font-nepali);font-size:1.8rem;">${result.formatted}</div>
        <div class="result-label">Bikram Sambat Date</div>
        ${festival ? `<div style="margin-top:12px;padding:8px 16px;background:rgba(245,158,11,0.15);border:1px solid rgba(245,158,11,0.3);border-radius:var(--radius);color:#F59E0B;font-size:0.85rem;font-weight:600;">🎉 ${festival.name} (${festival.nepali})</div>` : ''}
        <button class="btn btn-secondary btn-sm" style="margin-top:12px;" onclick="Utils.copy('${result.formatted}')">📋 Copy Result</button>
      </div>
    `;
  },

  convertBsToAd() {
    const y = parseInt(document.getElementById('bsYearInput').value);
    const m = parseInt(document.getElementById('bsMonthInput').value);
    const d = parseInt(document.getElementById('bsDayInput').value);
    const result = this.bsToAd(y, m, d);

    document.getElementById('bs2adResult').innerHTML = `
      <div class="result-box">
        <div class="result-value">${result.formatted}</div>
        <div class="result-label">Gregorian Date (${result.weekday})</div>
        <button class="btn btn-secondary btn-sm" style="margin-top:12px;" onclick="Utils.copy('${result.formatted}')">📋 Copy Result</button>
      </div>
    `;
  },

  init() {
    // Check today's festival
    const today = this.getTodayBs();
    const festival = this.checkFestival(today.month, today.day);
    if (festival) {
      const el = document.getElementById('todayFestival');
      if (el) el.innerHTML = `<div style="padding:12px 16px;background:rgba(245,158,11,0.15);border:1px solid rgba(245,158,11,0.3);border-radius:var(--radius);color:#F59E0B;font-size:0.9rem;font-weight:600;text-align:center;">🎉 Today: ${festival.name} (${festival.nepali})</div>`;
    }
  }
};

window.DateConverter = DateConverter;
