// ============================================
// CURRENCY CONVERTER
// ============================================

const CurrencyConverter = {
  rates: null,
  history: Utils.storage.get('currencyHistory', []),

  async fetchRates() {
    try {
      const res = await fetch('https://api.exchangerate-api.com/v4/latest/NPR');
      const data = await res.json();
      this.rates = { NPR: 1 };
      // Convert to NPR base
      for (const [code, rate] of Object.entries(data.rates)) {
        if (APP_DATA.currencyRates[code]) {
          this.rates[code] = rate;
        }
      }
      Utils.storage.set('currencyRates', { rates: this.rates, timestamp: Date.now() });
      return this.rates;
    } catch {
      // Use fallback
      const cached = Utils.storage.get('currencyRates');
      if (cached && cached.rates && Date.now() - cached.timestamp < 86400000) {
        this.rates = cached.rates;
      } else {
        this.rates = APP_DATA.currencyRates;
      }
      return this.rates;
    }
  },

  convert(amount, from, to) {
    if (!this.rates) return 0;
    const nprAmount = from === 'NPR' ? amount : amount / this.rates[from];
    return to === 'NPR' ? nprAmount : nprAmount * this.rates[to];
  },

  addToHistory(amount, from, to, result) {
    this.history.unshift({ amount, from, to, result, date: new Date().toISOString() });
    if (this.history.length > 20) this.history.pop();
    Utils.storage.set('currencyHistory', this.history);
  },

  render() {
    const currencies = Object.keys(APP_DATA.currencyRates);
    return `
      <div class="tool-page">
        <div class="page-header">
          <h1 class="page-title">Currency Converter</h1>
          <p class="page-desc">Real-time exchange rates for NPR, USD, INR, EUR, GBP, AUD and more.</p>
        </div>
        <div class="tool-container">
          <div class="form-group">
            <label class="form-label">Amount</label>
            <input type="number" class="form-input" id="currencyAmount" value="1000" min="0" step="0.01">
          </div>
          <div class="converter-row">
            <div class="form-group">
              <label class="form-label">From</label>
              <select class="form-select" id="currencyFrom">
                ${currencies.map(c => `<option value="${c}" ${c === 'NPR' ? 'selected' : ''}>${APP_DATA.currencyFlags[c]} ${c} - ${APP_DATA.currencyNames[c]}</option>`).join('')}
              </select>
            </div>
            <button class="swap-btn" id="currencySwap" title="Swap currencies">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 16V4M7 4L3 8M7 4l4 4M17 8v12m0-12l4 4m-4-4l-4 4"/></svg>
            </button>
            <div class="form-group">
              <label class="form-label">To</label>
              <select class="form-select" id="currencyTo">
                ${currencies.map(c => `<option value="${c}" ${c === 'USD' ? 'selected' : ''}>${APP_DATA.currencyFlags[c]} ${c} - ${APP_DATA.currencyNames[c]}</option>`).join('')}
              </select>
            </div>
          </div>
          <button class="btn btn-primary" id="currencyConvertBtn" onclick="CurrencyConverter.doConvert()">Convert</button>
          <div id="currencyResult"></div>
          <div class="rate-info">
            <span id="rateInfo">Rates updated: Loading...</span>
            <span style="font-size:0.7rem;color:var(--text-muted);">Fallback rates used when offline</span>
          </div>
          <div id="currencyHistory"></div>
        </div>
      </div>
    `;
  },

  async doConvert() {
    const amount = parseFloat(document.getElementById('currencyAmount').value) || 0;
    const from = document.getElementById('currencyFrom').value;
    const to = document.getElementById('currencyTo').value;

    if (!this.rates) await this.fetchRates();
    const result = this.convert(amount, from, to);

    this.addToHistory(amount, from, to, result);

    const rate = from === 'NPR' ? this.rates[to] : (this.rates[to] / this.rates[from]);

    document.getElementById('currencyResult').innerHTML = `
      <div class="result-box">
        <div class="currency-flags">
          <span class="currency-flag">${APP_DATA.currencyFlags[from]}</span>
          <span style="color:var(--text-muted);">→</span>
          <span class="currency-flag">${APP_DATA.currencyFlags[to]}</span>
        </div>
        <div class="result-value">${APP_DATA.currencyFlags[to]} ${result.toFixed(2)}</div>
        <div class="result-label">1 ${from} = ${rate.toFixed(4)} ${to}</div>
        <button class="btn btn-secondary btn-sm" style="margin-top:12px;" onclick="Utils.copy('${result.toFixed(2)} ${to}')">📋 Copy</button>
      </div>
    `;

    this.renderHistory();
  },

  renderHistory() {
    if (this.history.length === 0) return;
    document.getElementById('currencyHistory').innerHTML = `
      <div style="margin-top:20px;">
        <h3 style="font-size:0.9rem;font-weight:700;margin-bottom:12px;">Recent Conversions</h3>
        <div class="history-list">
          ${this.history.slice(0, 10).map(h => `
            <div class="history-item">
              <span>${APP_DATA.currencyFlags[h.from]}${h.amount} ${h.from} → ${APP_DATA.currencyFlags[h.to]}${h.result.toFixed(2)} ${h.to}</span>
              <span style="font-size:0.7rem;color:var(--text-muted);">${Utils.formatDate(h.date)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  async init() {
    await this.fetchRates();
    const rateInfo = document.getElementById('rateInfo');
    if (rateInfo) {
      const cached = Utils.storage.get('currencyRates');
      if (cached && cached.timestamp) {
        rateInfo.textContent = 'Rates updated: ' + Utils.formatDate(cached.timestamp);
      } else {
        rateInfo.textContent = 'Using offline fallback rates';
      }
    }
    this.renderHistory();

    document.getElementById('currencySwap')?.addEventListener('click', () => {
      const from = document.getElementById('currencyFrom');
      const to = document.getElementById('currencyTo');
      const temp = from.value; from.value = to.value; to.value = temp;
    });
  }
};

window.CurrencyConverter = CurrencyConverter;
