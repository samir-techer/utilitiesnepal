// ============================================
// ONLINE RADIO NEPAL
// ============================================

const RadioTool = {
  audio: null,
  currentStation: null,
  favorites: Utils.storage.get('radioFavorites', []),
  activeCategory: 'all',

  getFiltered() {
    let stations = APP_DATA.radioStations;
    if (this.activeCategory !== 'all') {
      stations = stations.filter(s => s.category === this.activeCategory);
    }
    return stations;
  },

  isFavorite(name) {
    return this.favorites.includes(name);
  },

  toggleFavorite(name) {
    if (this.favorites.includes(name)) {
      this.favorites = this.favorites.filter(f => f !== name);
      Utils.toast('Removed from favorites');
    } else {
      this.favorites.push(name);
      Utils.toast('Added to favorites');
    }
    Utils.storage.set('radioFavorites', this.favorites);
    this.render();
  },

  play(station) {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }

    this.audio = new Audio(station.url);
    this.audio.volume = parseFloat(document.getElementById('playerVolume')?.value || 0.8);

    this.audio.play().then(() => {
      this.currentStation = station;
      document.getElementById('playerStation').textContent = station.name + ' - ' + station.freq;
      document.getElementById('playerStatus').textContent = station.city + ' | ' + station.category;
      document.getElementById('audioPlayer').style.display = 'flex';
      document.getElementById('playIcon').style.display = 'none';
      document.getElementById('pauseIcon').style.display = 'block';
      this.render();
      Utils.toast('Playing: ' + station.name);
    }).catch(() => {
      Utils.toast('Unable to play station. Stream may be unavailable.');
    });
  },

  pause() {
    if (this.audio) {
      this.audio.pause();
      document.getElementById('playIcon').style.display = 'block';
      document.getElementById('pauseIcon').style.display = 'none';
      document.getElementById('playerStatus').textContent = 'Paused';
    }
  },

  resume() {
    if (this.audio) {
      this.audio.play();
      document.getElementById('playIcon').style.display = 'none';
      document.getElementById('pauseIcon').style.display = 'block';
      document.getElementById('playerStatus').textContent = this.currentStation?.city + ' | ' + this.currentStation?.category || 'Playing';
    }
  },

  togglePlay() {
    if (!this.audio) return;
    if (this.audio.paused) this.resume();
    else this.pause();
  },

  closePlayer() {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
    this.currentStation = null;
    document.getElementById('audioPlayer').style.display = 'none';
  },

  setVolume(val) {
    if (this.audio) this.audio.volume = val;
  },

  render() {
    return `
      <div class="tool-page">
        <div class="page-header">
          <h1 class="page-title">Online Radio Nepal</h1>
          <p class="page-desc">Listen to Nepali FM stations from across the country.</p>
        </div>
        <div class="tool-container">
          <div class="radio-categories">
            <button class="radio-cat ${this.activeCategory === 'all' ? 'active' : ''}" onclick="RadioTool.setCategory('all')">All Stations</button>
            <button class="radio-cat ${this.activeCategory === 'news' ? 'active' : ''}" onclick="RadioTool.setCategory('news')">News</button>
            <button class="radio-cat ${this.activeCategory === 'music' ? 'active' : ''}" onclick="RadioTool.setCategory('music')">Music</button>
            <button class="radio-cat ${this.activeCategory === 'regional' ? 'active' : ''}" onclick="RadioTool.setCategory('regional')">Regional</button>
            <button class="radio-cat ${this.activeCategory === 'talk' ? 'active' : ''}" onclick="RadioTool.setCategory('talk')">Talk</button>
          </div>
          <div class="station-grid" id="stationGrid">
            ${this.renderStations()}
          </div>
        </div>
      </div>
    `;
  },

  renderStations() {
    const stations = this.getFiltered();
    return stations.map(s => `
      <div class="station-card ${this.currentStation?.name === s.name ? 'playing' : ''}" onclick="RadioTool.play(${JSON.stringify(s).replace(/"/g, '&quot;')})">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;">
          <div class="station-name">${s.name}</div>
          <button class="icon-btn btn-icon" style="width:28px;height:28px;" onclick="event.stopPropagation();RadioTool.toggleFavorite('${s.name}')">
            ${this.isFavorite(s.name) ? '❤️' : '🤍'}
          </button>
        </div>
        <div class="station-freq">${s.freq} MHz</div>
        <div class="station-cat">${s.city} • ${s.category}</div>
      </div>
    `).join('');
  },

  setCategory(cat) {
    this.activeCategory = cat;
    document.getElementById('stationGrid').innerHTML = this.renderStations();
  },

  init() {
    document.getElementById('playerPlayPause')?.addEventListener('click', () => this.togglePlay());
    document.getElementById('playerVolume')?.addEventListener('input', (e) => this.setVolume(e.target.value));
    document.getElementById('playerClose')?.addEventListener('click', () => this.closePlayer());
  }
};

window.RadioTool = RadioTool;
