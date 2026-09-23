/**
 * auth.js — Stitchify Auth Gatekeeper
 * =====================================
 * requireAuth(role) — blocks access if not logged in / wrong role.
 * logout()          — clears store + redirects to login.
 * saveLoginResponse(data) — saves JWT response from backend.
 * redirectAfterLogin(userType) — routes Tailor/Customer after login.
 *
 * DEPENDS ON: store.js  (must be loaded before this file)
 * Load order in every HTML: store.js → auth.js → events.js → api.js → data.js → navbar.js
 */

// Path to the login page — using absolute path
const LOGIN_PAGE = '/';

/**
 * Call at the TOP of every protected page script.
 * Redirects to login if no valid session, or if role doesn't match.
 *
 * @param {string|null} requiredRole  e.g. 'Tailor', 'Customer', 'Admin'
 *
 * @example
 *   requireAuth('Tailor');   // first line of every tailor page script
 */
function requireAuth(requiredRole = null) {
    // Read directly from localStorage
    const token = localStorage.getItem('token');
    const user  = JSON.parse(localStorage.getItem('user') || 'null');
    
    // Get role from user object (since your backend uses 'role' not 'user_type')
    const role = user ? user.role : null;

    // No session → back to login
    if (!token || !user) {
        console.log('No session, redirecting to login');
        window.location.href = LOGIN_PAGE;
        return false;
    }

    // Wrong role → back to login
    if (requiredRole && role !== requiredRole && role !== 'admin') {
        console.log(`Role mismatch: required ${requiredRole}, got ${role}`);
        window.location.href = LOGIN_PAGE;
        return false;
    }

    // Sync into AppStore if it exists
    if (typeof AppStore !== 'undefined') {
        AppStore.user = user;
        AppStore.token = token;
    }
    
    console.log(`Auth OK: ${role} logged in as ${user.name}`);
    return true;
}

/**
 * Log the user out: clears all state and redirects to login page.
 */
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    
    if (typeof AppStore !== 'undefined') {
        AppStore.user = null;
        AppStore.token = null;
    }

    window.location.href = LOGIN_PAGE;
}

/**
 * Saves the JWT login response from Flask into localStorage.
 * Call this after a successful POST /api/auth/login response.
 *
 * @param {object} data  – { user: {...}, token: 'JWT...' }
 */
function saveLoginResponse(data) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('role', data.user.role);
    
    if (typeof AppStore !== 'undefined') {
        AppStore.user = data.user;
        AppStore.token = data.token;
    }
    
    console.log('Login saved for user:', data.user.name, 'Role:', data.user.role);
}

/**
 * Redirect the user to their dashboard after login.
 * Called from the login page after saveLoginResponse().
 *
 * @param {string} userType – 'tailor' | 'customer' | 'admin'
 */
function redirectAfterLogin(userType) {
    console.log('Redirecting after login:', userType);
    
    if (userType === 'tailor') {
        window.location.href = '/tailor';
    } else if (userType === 'customer') {
        window.location.href = '/customer';
    } else if (userType === 'admin') {
        window.location.href = '/admin';
    } else {
        console.warn('Unknown userType:', userType);
        window.location.href = '/';
    }
}