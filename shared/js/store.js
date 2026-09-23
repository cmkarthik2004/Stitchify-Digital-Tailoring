const STORE_KEY = 'stitchify_app_store';

/* ─── Default State Shape ─── */
const _defaults = {
  auth: {
    user:  null,
    token: null,
    role:  null
  },
  tailor: {
    profile:      null,
    portfolio:    [],
    availability: true
  },
  orders: {
    new:        [],
    accepted:   [],
    inprogress: [],
    completed:  [],
    cancelled:  []
  },
  schedule: {
    events: {}
  },
  chat: {
    conversations:         [],
    activeConversationId:  null,
    messages:              []
  },
  ui: {
    loading:   false,
    error:     null,
    activeTab: 'new'
  }
};

/* ─── Runtime State Object ─── */
const AppStore = {

  // ── Internal data (populated by loadStore on boot) ──
  _data: JSON.parse(JSON.stringify(_defaults)),

  // ── Persist to sessionStorage ──
  _save() {
    try {
      sessionStorage.setItem(STORE_KEY, JSON.stringify(this._data));
    } catch (e) {
      console.error('[AppStore] _save failed:', e);
    }
  },

  // ── Load from sessionStorage on boot ──
  _load() {
    try {
      const raw = sessionStorage.getItem(STORE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      // Merge top-level keys only (safe shallow merge)
      Object.keys(saved).forEach(key => {
        if (this._data[key] !== undefined) {
          this._data[key] = saved[key];
        }
      });
    } catch (e) {
      console.error('[AppStore] _load failed:', e);
    }
  },

  // ── Deep path setter: setStore('auth.user', obj) ──
  set(path, value) {
    const keys = path.split('.');
    let ref = this._data;
    for (let i = 0; i < keys.length - 1; i++) {
      if (ref[keys[i]] === undefined) {
        console.error(`[AppStore] Invalid path: ${path}`);
        return;
      }
      ref = ref[keys[i]];
    }
    ref[keys[keys.length - 1]] = value;
    this._save();
  },

  // ── Deep path getter: getStore('auth.token') ──
  get(path) {
    return path.split('.').reduce((obj, key) => obj?.[key], this._data);
  },

  // ────────────────────────────────────────────────────
  // AUTH HELPERS  (used by auth.js)
  // ────────────────────────────────────────────────────

  getUser()  { return this._data.auth.user;  },
  getToken() { return this._data.auth.token; },
  getRole()  { return this._data.auth.role;  },

  saveLogin(user, token) {
    this._data.auth.user  = user;
    this._data.auth.token = token;
    this._data.auth.role  = user?.user_type || null;
    this._save();
  },

  isLoggedIn() {
    return !!(this._data.auth.user && this._data.auth.token);
  },

  // ── Wipe all state + sessionStorage (called by logout) ──
  clear() {
    this._data = JSON.parse(JSON.stringify(_defaults));
    sessionStorage.removeItem(STORE_KEY);
  }
};

/* ─── Legacy standalone helpers (kept for backward-compat with api.js / data.js) ─── */
function setStore(path, value) { AppStore.set(path, value); }
function getStore(path)        { return AppStore.get(path); }
function saveStore()           { AppStore._save(); }
function clearStore()          { AppStore.clear(); }
function isLoggedIn()          { return AppStore.isLoggedIn(); }
function saveLogin(user, token){ AppStore.saveLogin(user, token); }

/* ─── Boot: restore persisted state immediately ─── */
AppStore._load();