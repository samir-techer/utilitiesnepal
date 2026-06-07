// ============================================
// UTILITIES NEPAL - UTILITIES MODULE
// ============================================

const Utils = {
  // Local Storage helpers
  storage: {
    get(key, defaultVal = null) {
      try { return JSON.parse(localStorage.getItem(key)) || defaultVal; }
      catch { return defaultVal; }
    },
    set(key, val) { localStorage.setItem(key, JSON.stringify(val)); },
    remove(key) { localStorage.removeItem(key); }
  },

  // Toast notification
  toast(msg, duration = 2500) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), duration);
  },

  // Copy to clipboard
  async copy(text) {
    try {
      await navigator.clipboard.writeText(text);
      this.toast('Copied to clipboard!');
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta);
      ta.select(); document.execCommand('copy');
      document.body.removeChild(ta);
      this.toast('Copied to clipboard!');
    }
  },

  // Debounce
  debounce(fn, delay = 200) {
    let timer;
    return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
  },

  // Format date
  formatDate(date, locale = 'en') {
    const d = new Date(date);
    return d.toLocaleDateString(locale === 'ne' ? 'ne-NP' : 'en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  },

  // Generate unique ID
  uid() { return Date.now().toString(36) + Math.random().toString(36).substr(2); },

  // Escape HTML
  escape(str) {
    const div = document.createElement('div');
    div.textContent = str; return div.innerHTML;
  },

  // Truncate text
  truncate(str, len = 100) {
    return str.length > len ? str.substring(0, len) + '...' : str;
  }
};

window.Utils = Utils;
