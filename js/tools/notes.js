// ============================================
// NOTES NEPAL
// ============================================

const NotesTool = {
  notes: Utils.storage.get('notes', []),
  editingId: null,
  searchQuery: '',
  filterCategory: 'all',

  categories: ['Personal', 'Work', 'Study', 'Ideas', 'Important'],

  save() {
    Utils.storage.set('notes', this.notes);
  },

  add(title, body, category) {
    const note = {
      id: Utils.uid(),
      title, body, category,
      created: new Date().toISOString(),
      updated: new Date().toISOString()
    };
    this.notes.unshift(note);
    this.save();
    return note;
  },

  update(id, title, body, category) {
    const idx = this.notes.findIndex(n => n.id === id);
    if (idx === -1) return;
    this.notes[idx] = { ...this.notes[idx], title, body, category, updated: new Date().toISOString() };
    this.save();
  },

  delete(id) {
    this.notes = this.notes.filter(n => n.id !== id);
    this.save();
  },

  getFiltered() {
    let filtered = this.notes;
    if (this.filterCategory !== 'all') {
      filtered = filtered.filter(n => n.category === this.filterCategory);
    }
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(n => n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q));
    }
    return filtered;
  },

  render() {
    return `
      <div class="tool-page">
        <div class="page-header">
          <h1 class="page-title">Notes Nepal</h1>
          <p class="page-desc">Create, edit, and organize your notes. All data stays on your device.</p>
        </div>
        <div class="tool-container">
          <div class="note-editor" id="noteEditor">
            <div class="form-group">
              <input type="text" class="form-input" id="noteTitle" placeholder="Note title...">
            </div>
            <div class="form-group">
              <select class="form-select" id="noteCategory">
                ${this.categories.map(c => `<option value="${c}">${c}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <textarea class="form-textarea" id="noteBody" placeholder="Write your note here..."></textarea>
            </div>
            <div style="display:flex;gap:8px;">
              <button class="btn btn-primary" onclick="NotesTool.saveNote()">Save Note</button>
              <button class="btn btn-secondary" onclick="NotesTool.clearEditor()">Clear</button>
            </div>
          </div>

          <div class="notes-toolbar">
            <input type="search" class="form-input" id="notesSearch" placeholder="Search notes..." style="max-width:300px;" oninput="NotesTool.search(this.value)">
            <select class="form-select" id="notesFilter" style="max-width:150px;" onchange="NotesTool.filter(this.value)">
              <option value="all">All Categories</option>
              ${this.categories.map(c => `<option value="${c}">${c}</option>`).join('')}
            </select>
          </div>

          <div id="notesList"></div>
        </div>
      </div>
    `;
  },

  renderList() {
    const list = document.getElementById('notesList');
    const filtered = this.getFiltered();

    if (filtered.length === 0) {
      list.innerHTML = `<div class="result-box" style="padding:40px;"><div class="result-label">No notes yet. Create your first note above!</div></div>`;
      return;
    }

    list.innerHTML = `
      <div class="notes-list">
        ${filtered.map(n => `
          <div class="note-card" data-id="${n.id}">
            <div class="note-title">${Utils.escape(n.title)}</div>
            <div class="note-body">${Utils.escape(Utils.truncate(n.body, 150))}</div>
            <div class="note-meta">
              <div>
                <span class="note-date">${Utils.formatDate(n.updated)}</span>
                <span style="padding:2px 8px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-full);font-size:0.7rem;color:var(--text-muted);margin-left:8px;">${n.category}</span>
              </div>
              <div class="note-actions">
                <button onclick="NotesTool.editNote('${n.id}')">Edit</button>
                <button onclick="NotesTool.deleteNote('${n.id}')">Delete</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  saveNote() {
    const title = document.getElementById('noteTitle').value.trim();
    const body = document.getElementById('noteBody').value.trim();
    const category = document.getElementById('noteCategory').value;

    if (!title && !body) {
      Utils.toast('Please enter a title or body');
      return;
    }

    if (this.editingId) {
      this.update(this.editingId, title, body, category);
      Utils.toast('Note updated!');
      this.editingId = null;
    } else {
      this.add(title, body, category);
      Utils.toast('Note saved!');
    }

    this.clearEditor();
    this.renderList();
  },

  editNote(id) {
    const note = this.notes.find(n => n.id === id);
    if (!note) return;

    document.getElementById('noteTitle').value = note.title;
    document.getElementById('noteBody').value = note.body;
    document.getElementById('noteCategory').value = note.category;
    this.editingId = id;

    document.getElementById('noteEditor').scrollIntoView({ behavior: 'smooth' });
    Utils.toast('Editing note...');
  },

  deleteNote(id) {
    if (!confirm('Delete this note?')) return;
    this.delete(id);
    this.renderList();
    Utils.toast('Note deleted');
  },

  clearEditor() {
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteBody').value = '';
    document.getElementById('noteCategory').value = this.categories[0];
    this.editingId = null;
  },

  search(q) {
    this.searchQuery = q;
    this.renderList();
  },

  filter(cat) {
    this.filterCategory = cat;
    this.renderList();
  },

  init() {
    this.renderList();
  }
};

window.NotesTool = NotesTool;
