/**
 * navbar.js — Stitchify Shared Navigation Component
 * Injects a consistent navbar into every page.
 * Call renderNavbar('home' | 'orders' | 'chat' | 'portfolio' | 'schedule' | 'profile')
 * from each page's <script> tag after DOM is ready.
 */

// Page URLs - Using absolute paths for Flask routes
const PAGE_URLS = {
  home:      '/tailor',
  orders:    '/tailor/orders',
  chat:      '/tailor/chat',
  portfolio: '/tailor/portfolio',
  schedule:  '/tailor/schedule',
  profile:   '/tailor/profile'
};

// Nav item definitions
const NAV_ITEMS = [
  { key: 'home',      label: 'Home',      icon: 'fa-home' },
  { key: 'orders',    label: 'Orders',    icon: 'fa-box',          badge: true },
  { key: 'chat',      label: 'Chat',      icon: 'fa-comment-dots', badge: true },
  { key: 'portfolio', label: 'Portfolio', icon: 'fa-images' },
  { key: 'schedule',  label: 'Schedule',  icon: 'fa-calendar-alt', appointmentBadge: true },
  { key: 'profile',   label: 'Profile',   icon: 'fa-user' }
];

// Global variables for notification counts
let notificationBadgeCount = 0;
let appointmentBadgeCount = 0;

/**
 * Renders the shared navbar into #navbar-root element.
 * @param {string} activePage – one of: home, orders, chat, portfolio, schedule, profile
 * @param {object} badges     – optional { orders: 3, chat: 5 } unread counts
 */
function renderNavbar(activePage, badges = {}) {
  const root = document.getElementById('navbar-root');
  if (!root) {
    console.warn('[Navbar] No #navbar-root element found. Add <div id="navbar-root"></div> to your page.');
    return;
  }

  const orderCount = badges.orders ?? _getOrderBadgeCount();
  const chatCount  = badges.chat   ?? _getChatBadgeCount();

  const itemsHTML = NAV_ITEMS.map(item => {
    const isActive = item.key === activePage;
    const badgeCount = item.key === 'orders' ? orderCount : item.key === 'chat' ? chatCount : 0;
    const badgeHTML = (item.badge && badgeCount > 0)
      ? `<span class="nav-badge-count">${badgeCount}</span>`
      : '';
    
    const appointmentBadgeHTML = (item.appointmentBadge && appointmentBadgeCount > 0)
      ? `<span id="appointmentBadge" class="nav-badge-count" style="background: linear-gradient(135deg, #ef4444, #dc2626);">${appointmentBadgeCount}</span>`
      : '<span id="appointmentBadge" class="nav-badge-count" style="display: none;"></span>';

    return `
      <a class="snav-item ${isActive ? 'active' : ''}"
         href="${PAGE_URLS[item.key]}"
         data-page="${item.key}"
         aria-label="${item.label}"
         aria-current="${isActive ? 'page' : 'false'}">
        <span style="position:relative;display:inline-block;">
          <i class="fas ${item.icon} snav-icon"></i>
          ${badgeHTML}
          ${item.key === 'schedule' ? appointmentBadgeHTML : ''}
        </span>
        <span class="snav-lbl">${item.label}</span>
      </a>`;
  }).join('');

  root.innerHTML = `
    <nav class="snav-bar" role="navigation" aria-label="Main navigation">
      <div class="snav-search">
        <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input type="search" placeholder="Search designs, orders…"
               aria-label="Search"
               oninput="handleNavSearch(this.value)" />
      </div>
      <div class="snav-links" role="list">
        ${itemsHTML}
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <button class="snav-notification-btn" onclick="toggleNotifications()" title="Notifications" aria-label="Notifications" style="position: relative;">
          <i class="fas fa-bell"></i>
          <span id="notificationBadge" class="nav-badge-count" style="background: linear-gradient(135deg, #ef4444, #dc2626); display: none;">0</span>
        </button>
        <button class="snav-logout-btn" onclick="handleLogout()" title="Logout" aria-label="Logout">
          <i class="fas fa-sign-out-alt"></i>
          <span class="snav-lbl">Logout</span>
        </button>
      </div>
    </nav>
    <div class="divider"></div>`;
  
  setTimeout(() => { fetchNotificationCounts(); }, 500);
}

function _getOrderBadgeCount() {
  try {
    const orders = JSON.parse(localStorage.getItem('stitchify_orders') || 'null');
    return orders ? (orders.new || []).length : 0;
  } catch { return 0; }
}

function _getChatBadgeCount() {
  try {
    const raw = localStorage.getItem('stitchify_v4');
    if (!raw) return 0;
    const contacts = JSON.parse(raw);
    return contacts.reduce((acc, c) => acc + (c.unread || 0), 0);
  } catch { return 0; }
}

async function fetchNotificationCounts() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');
  if (!user.id || user.role !== 'tailor') return;
  
  try {
    const notifRes = await fetch(`/api/tailor/notifications/count/${user.id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const notifData = await notifRes.json();
    notificationBadgeCount = notifData.unread_count || 0;
    
    const notifBadge = document.getElementById('notificationBadge');
    if (notifBadge && notificationBadgeCount > 0) {
      notifBadge.textContent = notificationBadgeCount;
      notifBadge.style.display = 'flex';
    } else if (notifBadge) {
      notifBadge.style.display = 'none';
    }
    
    const aptRes = await fetch(`/api/tailor/appointments/${user.id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const appointments = await aptRes.json();
    appointmentBadgeCount = appointments.filter(a => a.status === 'pending').length;
    
    const aptBadge = document.getElementById('appointmentBadge');
    if (aptBadge && appointmentBadgeCount > 0) {
      aptBadge.textContent = appointmentBadgeCount;
      aptBadge.style.display = 'flex';
    } else if (aptBadge) {
      aptBadge.style.display = 'none';
    }
    
    if (notificationBadgeCount > 0) {
      showNotificationToast(`You have ${notificationBadgeCount} new notification(s)!`);
    }
  } catch (error) {
    console.error('Error fetching notification counts:', error);
  }
}

function showNotificationToast(msg) {
  let toast = document.getElementById('notification-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'notification-toast';
    toast.style.cssText = `
      position:fixed;bottom:30px;right:30px;background:linear-gradient(135deg,#0c7bb3,#a75c9a);
      color:white;padding:12px 20px;border-radius:8px;z-index:10000;cursor:pointer;
      box-shadow:0 2px 10px rgba(0,0,0,0.2);font-size:14px;font-weight:500;
    `;
    toast.onclick = () => toggleNotifications();
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.display = 'block';
  setTimeout(() => { toast.style.display = 'none'; }, 5000);
}

async function toggleNotifications() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');
  if (!user.id) return;
  
  try {
    const response = await fetch(`/api/tailor/notifications/${user.id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const notifications = await response.json();
    
    let message = "NOTIFICATIONS\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
    if (notifications.length === 0) {
      message += "No notifications yet";
    } else {
      notifications.slice(0, 10).forEach((n, i) => {
        message += `${n.is_read ? '✓' : '●'} ${n.title}\n   ${n.message}\n   ${new Date(n.created_at).toLocaleString()}\n`;
        if (i < notifications.length - 1) message += "\n";
      });
    }
    message += "\n━━━━━━━━━━━━━━━━━━━━━━━━";
    alert(message);
    fetchNotificationCounts();
  } catch (err) {
    console.error('Error fetching notifications:', err);
  }
}

function handleNavSearch(query) {
  const q = query.toLowerCase().trim();
  if (typeof window.onNavSearch === 'function') {
    window.onNavSearch(q);
    return;
  }
  const cards = document.querySelectorAll('.portfolio-card, .other-card, .order-card');
  cards.forEach(card => {
    card.style.display = (q === '' || card.textContent.toLowerCase().includes(q)) ? '' : 'none';
  });
}

function handleLogout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/stitchify_auth/login.html';
}

function injectNavbarStyles() {
  if (document.getElementById('snav-styles')) return;
  const style = document.createElement('style');
  style.id = 'snav-styles';
  style.textContent = `
    .snav-bar{display:flex;align-items:center;justify-content:space-between;padding:8px 32px;background:#fff;border-bottom:1px solid #e0e7ef;gap:16px;position:sticky;top:0;z-index:100;box-shadow:0 2px 8px rgba(12,123,179,0.06)}
    .snav-search{display:flex;align-items:center;background:#f5f6fa;border:1.5px solid #e0e7ef;border-radius:24px;padding:7px 18px;gap:8px;width:360px;flex-shrink:0;transition:border-color .2s,box-shadow .2s}
    .snav-search:focus-within{border-color:#0c7bb3;background:#fff;box-shadow:0 0 0 3px rgba(12,123,179,0.09)}
    .snav-search svg{color:#0c7bb3;flex-shrink:0}
    .snav-search input{border:none;outline:none;font-size:13px;color:#444;background:transparent;width:100%;font-family:inherit}
    .snav-search input::placeholder{color:#b0b8c1}
    .snav-links{display:flex;align-items:center;margin-left:auto;gap:2px}
    .snav-item{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 14px;border-radius:12px;text-decoration:none;cursor:pointer;transition:background .2s,color .2s;position:relative}
    .snav-item:hover{background:#e8f4fb}.snav-item:hover .snav-icon,.snav-item:hover .snav-lbl{color:#0c7bb3}
    .snav-item.active .snav-icon,.snav-item.active .snav-lbl{color:#a75c9a;font-weight:700}
    .snav-item.active::after{content:'';position:absolute;bottom:-2px;left:50%;transform:translateX(-50%);width:20px;height:2px;background:linear-gradient(90deg,#0c7bb3,#a75c9a);border-radius:2px}
    .snav-icon{font-size:16px;color:#9ca3af;transition:color .2s;line-height:1}
    .snav-lbl{font-size:10px;font-weight:600;letter-spacing:.5px;text-transform:uppercase;color:#9ca3af;transition:color .2s}
    .nav-badge-count{position:absolute;top:-5px;right:-8px;background:linear-gradient(135deg,#0c7bb3,#a75c9a);color:white;font-size:9px;font-weight:700;min-width:16px;height:16px;border-radius:8px;display:flex;align-items:center;justify-content:center;padding:0 3px;line-height:1}
    .divider{height:1px;background:linear-gradient(90deg,transparent,#e0e7ef,transparent);margin:8px 32px}
    .snav-notification-btn{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 14px;border-radius:12px;border:none;background:transparent;cursor:pointer;transition:background .2s,color .2s;position:relative;flex-shrink:0}
    .snav-notification-btn i{font-size:16px;color:#9ca3af;transition:color .2s}
    .snav-notification-btn:hover{background:#e8f4fb}.snav-notification-btn:hover i{color:#0c7bb3}
    .stitchify-brand-bar{text-align:center;padding:14px 0 4px;background:#fff;border-bottom:none}
    .stitchify-brand-name{font-size:36px;font-weight:700;letter-spacing:3px;font-family:'Cormorant Garamond','Playfair Display',Georgia,serif;display:inline-block}
    .stitchify-brand-stitch{color:#0c7bb3}.stitchify-brand-ify{color:#a75c9a}
    .stitchify-brand-tagline{font-size:11px;color:#b0b8c1;letter-spacing:2px;text-transform:uppercase}
    .snav-logout-btn{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 14px;border-radius:12px;border:none;background:transparent;cursor:pointer;transition:background .2s,color .2s;flex-shrink:0}
    .snav-logout-btn i{font-size:16px;color:#9ca3af;transition:color .2s;line-height:1}
    .snav-logout-btn .snav-lbl{font-size:10px;font-weight:600;letter-spacing:.5px;text-transform:uppercase;color:#9ca3af;transition:color .2s}
    .snav-logout-btn:hover{background:#fdecea}.snav-logout-btn:hover i,.snav-logout-btn:hover .snav-lbl{color:#e74c3c}
  `;
  document.head.appendChild(style);
}

function renderBrand() {
  const root = document.getElementById('brand-root');
  if (!root) return;
  root.innerHTML = `
    <div class="stitchify-brand-bar">
      <div class="stitchify-brand-name">
        <span class="stitchify-brand-stitch">Stitch</span><span class="stitchify-brand-ify">ify</span>
      </div>
      <div class="stitchify-brand-tagline">Premium Tailor Management</div>
    </div>`;
}

injectNavbarStyles();

if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    if (document.getElementById('navbar-root')) { fetchNotificationCounts(); }
  }, 15000);
}