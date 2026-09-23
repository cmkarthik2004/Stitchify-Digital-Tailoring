
/* ═══════════════════════════════════════════════════════════
   STITCHIFY TAILOR DASHBOARD - SHARED STYLES
   ═══════════════════════════════════════════════════════════ */
:root {
  --primary: #0c7bb3;
  --primary-dark: #095f8a;
  --primary-light: #e8f4fb;
  --accent: #a75c9a;
  --accent-light: #f3e8fb;
  --accent2: #f2bae8;
  --gradient: linear-gradient(135deg, #0c7bb3 0%, #a75c9a 100%);
  --gradient-h: linear-gradient(90deg, #0c7bb3, #a75c9a);
  --success: #16a34a;
  --success-bg: #f0fdf4;
  --warning: #f59e0b;
  --warning-bg: #fffbeb;
  --danger: #ef4444;
  --danger-bg: #fef2f2;
  --white: #ffffff;
  --bg: #f5f6fa;
  --bg-card: #ffffff;
  --text: #1a2340;
  --text-mid: #4a4a6a;
  --text-light: #9aaac4;
  --border: #e0e7ef;
  --border-light: #eef2f7;
  --shadow-sm: 0 2px 10px rgba(12,123,179,0.06);
  --shadow: 0 4px 20px rgba(12,123,179,0.09);
  --shadow-lg: 0 10px 40px rgba(12,123,179,0.14);
  --radius-sm: 8px;
  --radius: 14px;
  --radius-lg: 20px;
  --radius-xl: 24px;
  --font-display: 'Playfair Display', 'Cormorant Garamond', Georgia, serif;
  --font-body: 'DM Sans', 'Sora', sans-serif;
  --transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: var(--font-body);
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  min-height: 100vh;
}

/* ═══════════════════════════════════════════════════════════
   BRAND BAR
   ═══════════════════════════════════════════════════════════ */
.brand-bar {
  background: var(--white);
  padding: 12px 0 4px;
  text-align: center;
  border-bottom: 1px solid var(--border-light);
}
.brand-name {
  font-family: var(--font-display);
  font-size: 36px;
  font-weight: 700;
  letter-spacing: 3px;
}
.brand-stitch { color: var(--primary); }
.brand-ify { color: var(--accent); }

/* ═══════════════════════════════════════════════════════════
   NAVIGATION BAR
   ═══════════════════════════════════════════════════════════ */
.navbar {
  background: var(--white);
  border-bottom: 2px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 500;
}
.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  height: 56px;
  max-width: 1400px;
  margin: 0 auto;
}
.nav-search {
  position: relative;
  flex: 1;
  max-width: 400px;
}
.nav-search svg {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-light);
  pointer-events: none;
}
.nav-search input {
  width: 100%;
  height: 38px;
  border: 1.5px solid var(--border);
  border-radius: 20px;
  padding: 0 16px 0 38px;
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--text);
  background: var(--bg);
  outline: none;
  transition: var(--transition);
}
.nav-search input:focus {
  border-color: var(--primary);
  background: var(--white);
  box-shadow: 0 0 0 3px rgba(12,123,179,0.08);
}
.nav-search input::placeholder { color: var(--text-light); }

.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 24px;
}
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 8px 14px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  color: var(--text-mid);
  text-decoration: none;
  position: relative;
  transition: var(--transition);
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}
.nav-item i { font-size: 18px; }
.nav-item:hover { background: var(--primary-light); color: var(--primary); }
.nav-item.active { color: var(--primary); }
.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 25%;
  right: 25%;
  height: 3px;
  background: var(--gradient-h);
  border-radius: 3px 3px 0 0;
}
.nav-badge {
  position: absolute;
  top: 2px;
  right: 4px;
  min-width: 16px;
  height: 16px;
  background: #ef4444;
  color: white;
  border-radius: 10px;
  font-size: 9px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  border: 2px solid white;
}
.nav-user {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 16px;
  cursor: pointer;
}
.nav-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 14px;
}
.nav-user-info { font-size: 12px; }
.nav-user-name { font-weight: 600; color: var(--text); }
.nav-user-role { color: var(--text-light); font-size: 10px; }

/* ═══════════════════════════════════════════════════════════
   PAGE LAYOUT
   ═══════════════════════════════════════════════════════════ */
.page-content {
  padding: 24px 32px;
  max-width: 1400px;
  margin: 0 auto;
}

/* ═══════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════ */
.dashboard-footer {
  background: var(--text);
  color: #8899aa;
  padding: 32px;
  text-align: center;
  margin-top: 48px;
}
.dashboard-footer a {
  color: var(--accent-light);
  text-decoration: none;
}
.dashboard-footer a:hover { color: var(--accent2); }

/* ═══════════════════════════════════════════════════════════
   COMMON COMPONENTS
   ═══════════════════════════════════════════════════════════ */
.card {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  padding: 24px;
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
}
.card:hover { box-shadow: var(--shadow); }

.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  border-radius: 20px;
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: var(--transition);
}
.btn-primary {
  background: var(--gradient);
  color: white;
  box-shadow: 0 4px 14px rgba(12,123,179,0.25);
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(12,123,179,0.35); }
.btn-outline {
  background: transparent;
  color: var(--primary);
  border: 2px solid var(--primary);
}
.btn-outline:hover { background: var(--primary); color: white; }
.btn-danger {
  background: var(--danger-bg);
  color: var(--danger);
}
.btn-danger:hover { background: var(--danger); color: white; }

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.section-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text);
}

.toast {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--text);
  color: white;
  padding: 12px 24px;
  border-radius: 50px;
  z-index: 10000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
  font-weight: 500;
}
.toast.show { opacity: 1; }

/* ═══════════════════════════════════════════════════════════
   RESPONSIVE
   ═══════════════════════════════════════════════════════════ */
@media (max-width: 768px) {
  .navbar-inner { flex-wrap: wrap; height: auto; padding: 8px 16px; gap: 8px; }
  .nav-links { overflow-x: auto; margin-left: 0; width: 100%; justify-content: center; }
  .page-content { padding: 16px; }
}