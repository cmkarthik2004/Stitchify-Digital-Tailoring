/**
 * api.js — Stitchify API Abstraction Layer
 * Simulates backend behavior using in-memory data + localStorage.
 * Drop-in ready for Flask + MongoDB: replace function bodies with fetch() calls.
 *
 * API Contract — all public endpoints return:
 * {
 *   success: boolean,
 *   message: string,
 *   data: object | array,
 *   error: string | null
 * }
 *
 * Status codes (simulated via response shape):
 *   200 – success
 *   400 – validation error
 *   404 – not found
 *   500 – server error
 *
 * localStorage keys:
 *   stitchify_portfolio   – portfolio items array
 *   stitchify_orders      – orders object {new, accepted, inprogress, completed, cancelled}
 *   stitchify_profile     – tailor profile overrides
 *   stitchify_selected_design – last clicked design id (cross-page handoff)
 *   stitchify_availability   – boolean availability flag
 *   stitchify_customers   – customers array (persisted overrides)
 *   stitchify_tailors     – tailors array (persisted overrides)
 */

// ── ADD THESE AT THE VERY TOP ──────────────────────────
const API_BASE = 'http://127.0.0.1:5000/api';

function authHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    };
}
// ───────────────────────────────────────────────────────

// rest of your existing api.js code stays below...
const LS_KEYS = {
  PORTFOLIO:       'stitchify_portfolio',
  ORDERS:          'stitchify_orders',
  PROFILE:         'stitchify_profile',
  SELECTED_DESIGN: 'stitchify_selected_design',
  AVAILABILITY:    'stitchify_availability',
  CHAT:            'stitchify_v4',   // matches existing chat page LS key
  CUSTOMERS:       'stitchify_customers',
  TAILORS:         'stitchify_tailors'
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function _lsGet(key, fallback = null) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function _lsSet(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); return true; }
  catch { return false; }
}
function _genId(prefix = 'id') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2,7)}`;
}

// ─── TAILOR PROFILE ──────────────────────────────────────────────────────────
function getTailorProfile() {
  const saved = _lsGet(LS_KEYS.PROFILE, {});
  return { ...TAILOR_PROFILE, ...saved };
}

function updateTailorProfile(updates) {
  const current = _lsGet(LS_KEYS.PROFILE, {});
  const merged = { ...current, ...updates };
  _lsSet(LS_KEYS.PROFILE, merged);
  return { ...TAILOR_PROFILE, ...merged };
}

function getAvailability() {
  const stored = localStorage.getItem(LS_KEYS.AVAILABILITY);
  return stored !== null ? JSON.parse(stored) : TAILOR_PROFILE.availability;
}

function setAvailability(isAvailable) {
  _lsSet(LS_KEYS.AVAILABILITY, isAvailable);
  return isAvailable;
}

// ─── DESIGNS ─────────────────────────────────────────────────────────────────
function getDesigns(gender = 'all') {
  if (gender === 'men')   return DESIGNS.men;
  if (gender === 'women') return DESIGNS.women;
  return [...DESIGNS.men, ...DESIGNS.women];
}

function getDesignById(id) {
  return getDesigns().find(d => d.id === id) || null;
}

function selectDesign(designId) {
  // Cross-page handoff: store selected design for Profile page to consume
  _lsSet(LS_KEYS.SELECTED_DESIGN, designId);
}

function getSelectedDesign() {
  const id = _lsGet(LS_KEYS.SELECTED_DESIGN);
  return id ? getDesignById(id) : null;
}

function clearSelectedDesign() {
  localStorage.removeItem(LS_KEYS.SELECTED_DESIGN);
}

// ─── PORTFOLIO ───────────────────────────────────────────────────────────────
function getPortfolio() {
  return _lsGet(LS_KEYS.PORTFOLIO, PORTFOLIO_ITEMS);
}

function addToPortfolio(item) {
  const portfolio = getPortfolio();
  // Prevent duplicates by name
  if (portfolio.find(p => p.name === item.name)) return { success: false, msg: 'Already in portfolio' };
  const newItem = { ...item, id: _genId('p'), addedAt: new Date().toISOString() };
  portfolio.push(newItem);
  _lsSet(LS_KEYS.PORTFOLIO, portfolio);
  return { success: true, item: newItem };
}

function removeFromPortfolio(id) {
  const portfolio = getPortfolio().filter(p => p.id !== id);
  _lsSet(LS_KEYS.PORTFOLIO, portfolio);
  return { success: true };
}

function updatePortfolioItem(id, updates) {
  const portfolio = getPortfolio().map(p => p.id === id ? { ...p, ...updates } : p);
  _lsSet(LS_KEYS.PORTFOLIO, portfolio);
  return portfolio.find(p => p.id === id) || null;
}

// ─── ORDERS ──────────────────────────────────────────────────────────────────
function getOrders() {
  return _lsGet(LS_KEYS.ORDERS, ORDERS_DATA);
}

function getOrdersByTab(tab) {
  return getOrders()[tab] || [];
}

function findOrder(id) {
  const orders = getOrders();
  for (const tab of Object.keys(orders)) {
    const found = orders[tab].find(o => o.id === id);
    if (found) return { order: found, tab };
  }
  return null;
}

function createOrder(orderData) {
  const orders = getOrders();
  const newOrder = {
    ...orderData,
    id: _genId('ord'),
    createdAt: new Date().toISOString()
  };
  orders.new = [newOrder, ...(orders.new || [])];
  _lsSet(LS_KEYS.ORDERS, orders);
  return { success: true, order: newOrder };
}

function acceptOrder(id, notes = '') {
  const orders = getOrders();
  const idx = (orders.new || []).findIndex(o => o.id === id);
  if (idx === -1) return { success: false, msg: 'Order not found' };
  const order = { ...orders.new[idx], step: 0, notes, acceptedAt: new Date().toISOString(),
    steps: ["Accepted","Fabric Received","Stitching","Ready","Delivered"],
    stepDates: [new Date().toLocaleDateString('en-IN',{month:'short',day:'numeric'}), null, null, null, null]
  };
  orders.new.splice(idx, 1);
  orders.accepted = [order, ...(orders.accepted || [])];
  _lsSet(LS_KEYS.ORDERS, orders);
  return { success: true, order };
}

function rejectOrder(id, reason = '') {
  const orders = getOrders();
  const idx = (orders.new || []).findIndex(o => o.id === id);
  if (idx === -1) return { success: false, msg: 'Order not found' };
  const order = { ...orders.new[idx], reason, cancelledDate: new Date().toLocaleDateString('en-IN') };
  orders.new.splice(idx, 1);
  orders.cancelled = [order, ...(orders.cancelled || [])];
  _lsSet(LS_KEYS.ORDERS, orders);
  return { success: true };
}

function updateOrderStep(id, tab, step) {
  const orders = getOrders();
  const arr = orders[tab] || [];
  const idx = arr.findIndex(o => o.id === id);
  if (idx === -1) return { success: false };

  arr[idx] = { ...arr[idx], step };
  // Record step date
  if (!arr[idx].stepDates) arr[idx].stepDates = [null,null,null,null,null];
  arr[idx].stepDates[step] = new Date().toLocaleDateString('en-IN', {month:'short', day:'numeric'});

  // Auto-promote: if reached "Ready" (step 3), move to inprogress if still in accepted
  if (step >= (arr[idx].steps || []).length - 1) {
    // Mark completed
    const completed = { ...arr[idx], completedDate: new Date().toLocaleDateString('en-IN'), rating: 0 };
    arr.splice(idx, 1);
    orders.completed = [completed, ...(orders.completed || [])];
    orders[tab] = arr;
  } else {
    orders[tab] = arr;
    // Promote accepted → inprogress at step 2 (Stitching)
    if (tab === 'accepted' && step >= 2) {
      const promoted = arr.splice(idx, 1)[0];
      orders.accepted = arr;
      orders.inprogress = [promoted, ...(orders.inprogress || [])];
    }
  }

  _lsSet(LS_KEYS.ORDERS, orders);
  return { success: true };
}

// ─── SERVICES ────────────────────────────────────────────────────────────────
function getServices() { return SERVICES; }

function addService(name, desc, price) {
  const services = [...SERVICES];
  const s = { id: _genId('s'), name, desc, price: Number(price) };
  SERVICES.push(s); // mutate for session (in real app this would be a POST)
  return s;
}

// ─── REVIEWS ─────────────────────────────────────────────────────────────────
function getReviews() { return REVIEWS; }

// ─── SCHEDULE ────────────────────────────────────────────────────────────────
function getScheduleEvents() {
  return _lsGet('stitchify_schedule', SCHEDULE_EVENTS);
}

function addScheduleEvent(day, event) {
  const events = getScheduleEvents();
  if (!events[day]) events[day] = [];
  events[day].push({ ...event, id: _genId('se') });
  _lsSet('stitchify_schedule', events);
  return events;
}

function deleteScheduleEvent(day, eventId) {
  const events = getScheduleEvents();
  if (events[day]) events[day] = events[day].filter(e => e.id !== eventId);
  _lsSet('stitchify_schedule', events);
  return events;
}

function updateScheduleEvent(day, eventId, updates) {
  const events = getScheduleEvents();
  if (events[day]) {
    events[day] = events[day].map(e => e.id === eventId ? { ...e, ...updates } : e);
  }
  _lsSet('stitchify_schedule', events);
  return events;
}

// ─── API RESPONSE HELPER ──────────────────────────────────────────────────────
/**
 * Wraps any result in the standard API contract envelope.
 * { success, message, data, error }
 */
function _apiResponse(success, message, data = null, error = null) {
  return { success, message, data, error };
}

// ─── CUSTOMERS API ────────────────────────────────────────────────────────────

/**
 * GET /customers
 * Returns all customers.
 * @returns {{ success: boolean, message: string, data: Array, error: string|null }}
 */
function getCustomers() {
  try {
    const stored = _lsGet(LS_KEYS.CUSTOMERS, null);
    const list = stored !== null ? stored : CUSTOMERS;
    return _apiResponse(true, 'Customers retrieved successfully', list, null);
  } catch (err) {
    return _apiResponse(false, 'Failed to retrieve customers', null, err.message);
  }
}

/**
 * POST /customers
 * Adds a new customer after validation. email must be unique.
 * @param {Object} payload - Must match customer schema (no username).
 * @returns {{ success: boolean, message: string, data: Object|null, error: string|null }}
 */
function createCustomer(payload) {
  try {
    // Validation
    const required = ['fullName', 'email', 'mobile', 'address', 'location'];
    for (const field of required) {
      if (!payload[field] || String(payload[field]).trim() === '') {
        return _apiResponse(false, `Validation error: '${field}' is required`, null, `Missing field: ${field}`);
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email)) {
      return _apiResponse(false, 'Validation error: invalid email format', null, 'Invalid email');
    }

    const stored = _lsGet(LS_KEYS.CUSTOMERS, null);
    const list = stored !== null ? stored : [...CUSTOMERS];

    // Unique email check
    if (list.find(c => c.email.toLowerCase() === payload.email.toLowerCase())) {
      return _apiResponse(false, 'Validation error: email already exists', null, 'Duplicate email');
    }

    const newCustomer = {
      fullName:  String(payload.fullName).trim(),
      email:     String(payload.email).trim().toLowerCase(),
      mobile:    String(payload.mobile).trim(),
      address:   String(payload.address).trim(),
      location:  String(payload.location).trim(),
      measurements: {
        chest:    Number(payload.measurements?.chest    || 0),
        waist:    Number(payload.measurements?.waist    || 0),
        shoulder: Number(payload.measurements?.shoulder || 0),
        sleeve:   Number(payload.measurements?.sleeve   || 0)
      },
      preferences: {
        style: String(payload.preferences?.style || '').trim(),
        fit:   String(payload.preferences?.fit   || '').trim()
      },
      createdAt: new Date()
    };

    list.push(newCustomer);
    _lsSet(LS_KEYS.CUSTOMERS, list);
    return _apiResponse(true, 'Customer created successfully', newCustomer, null);
  } catch (err) {
    return _apiResponse(false, 'Server error while creating customer', null, err.message);
  }
}

// ─── TAILORS API ──────────────────────────────────────────────────────────────

/**
 * GET /tailors
 * Returns all tailors.
 * @returns {{ success: boolean, message: string, data: Array, error: string|null }}
 */
function getTailors() {
  try {
    const stored = _lsGet(LS_KEYS.TAILORS, null);
    const list = stored !== null ? stored : TAILORS;
    return _apiResponse(true, 'Tailors retrieved successfully', list, null);
  } catch (err) {
    return _apiResponse(false, 'Failed to retrieve tailors', null, err.message);
  }
}

/**
 * POST /tailors
 * Adds a new tailor after validation. email must be unique.
 * @param {Object} payload - Must match tailor schema (no username).
 * @returns {{ success: boolean, message: string, data: Object|null, error: string|null }}
 */
function createTailor(payload) {
  try {
    const required = ['fullName', 'shopName', 'email', 'mobile', 'address', 'location'];
    for (const field of required) {
      if (!payload[field] || String(payload[field]).trim() === '') {
        return _apiResponse(false, `Validation error: '${field}' is required`, null, `Missing field: ${field}`);
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email)) {
      return _apiResponse(false, 'Validation error: invalid email format', null, 'Invalid email');
    }

    const stored = _lsGet(LS_KEYS.TAILORS, null);
    const list = stored !== null ? stored : [...TAILORS];

    if (list.find(t => t.email.toLowerCase() === payload.email.toLowerCase())) {
      return _apiResponse(false, 'Validation error: email already exists', null, 'Duplicate email');
    }

    const newTailor = {
      fullName:          String(payload.fullName).trim(),
      shopName:          String(payload.shopName).trim(),
      email:             String(payload.email).trim().toLowerCase(),
      mobile:            String(payload.mobile).trim(),
      address:           String(payload.address).trim(),
      location:          String(payload.location).trim(),
      specializationTags: Array.isArray(payload.specializationTags) ? payload.specializationTags.map(t => String(t).trim()) : [],
      workingHours:      String(payload.workingHours || '').trim(),
      priceRange: {
        min: Number(payload.priceRange?.min || 0),
        max: Number(payload.priceRange?.max || 0)
      },
      experience: Number(payload.experience || 0),
      createdAt:  new Date()
    };

    list.push(newTailor);
    _lsSet(LS_KEYS.TAILORS, list);
    return _apiResponse(true, 'Tailor created successfully', newTailor, null);
  } catch (err) {
    return _apiResponse(false, 'Server error while creating tailor', null, err.message);
  }
}
