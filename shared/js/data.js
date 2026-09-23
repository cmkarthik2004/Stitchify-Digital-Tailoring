/**
 * data.js — Stitchify Centralized Data Layer
 * Single source of truth for all static/dummy data.
 * All entities have unique IDs. Ready for Flask + MongoDB migration.
 */

// ─── CUSTOMERS ───────────────────────────────────────────────────────────────
const CUSTOMERS = [
  {
    fullName: "Sohail Ahmed",
    email: "sohailthunder@gmail.com",
    mobile: "+91 98765 22331",
    address: "18, Gandhi Nagar, Ballari – 583103",
    location: "Ballari",
    measurements: {
      chest: 40,
      waist: 34,
      shoulder: 18,
      sleeve: 24
    },
    preferences: {
      style: "Casual & Ethnic",
      fit: "Regular Fit"
    },
    createdAt: new Date("2025-01-10T09:00:00Z")
  },
  {
    fullName: "Arjun Patel",
    email: "arjun.patel6145@gmail.com",
    mobile: "+91 91234 66789",
    address: "55, Whitefield Main Road, Bengaluru – 560066",
    location: "Bengaluru",
    measurements: {
      chest: 42,
      waist: 36,
      shoulder: 19,
      sleeve: 25
    },
    preferences: {
      style: "Formal Wear",
      fit: "Slim Fit"
    },
    createdAt: new Date("2025-01-15T10:00:00Z")
  },
  {
    fullName: "Kiran Kumar",
    email: "kirankumar.543921@gmail.com",
    mobile: "+91 99887 44556",
    address: "27, Vijayanagar 2nd Stage, Mysuru – 570017",
    location: "Mysuru",
    measurements: {
      chest: 39,
      waist: 33,
      shoulder: 17.5,
      sleeve: 23
    },
    preferences: {
      style: "Casual Wear",
      fit: "Comfort Fit"
    },
    createdAt: new Date("2025-01-20T11:00:00Z")
  },
  {
    fullName: "Rohit Singh",
    email: "rohitsingh346145@gmail.com",
    mobile: "+91 93456 77889",
    address: "90, Koramangala 5th Block, Bengaluru – 560095",
    location: "Bengaluru",
    measurements: {
      chest: 41,
      waist: 35,
      shoulder: 18.5,
      sleeve: 24.5
    },
    preferences: {
      style: "Formal & Party Wear",
      fit: "Slim Fit"
    },
    createdAt: new Date("2025-02-01T09:30:00Z")
  },
  {
    fullName: "Vinod Kumar",
    email: "lt999923@gmail.com",
    mobile: "+91 90123 55667",
    address: "14, Cowl Bazaar, Ballari – 583102",
    location: "Ballari",
    measurements: {
      chest: 38,
      waist: 32,
      shoulder: 17,
      sleeve: 23
    },
    preferences: {
      style: "Ethnic Wear",
      fit: "Regular Fit"
    },
    createdAt: new Date("2025-02-10T10:30:00Z")
  }
];

// ─── TAILORS ─────────────────────────────────────────────────────────────────
const TAILORS = [
  {
    fullName: "Sahil Khan",
    shopName: "Sahil Designer Tailors",
    email: "mohammedsohail6364@gmail.com",
    mobile: "+91 98765 11223",
    address: "21, Cantonment Area, Ballari – 583104",
    location: "Ballari",
    specializationTags: ["Bridal Wear", "Sherwani", "Kurta", "Alterations", "Custom Design"],
    workingHours: "Mon – Sat | 9:30 AM – 8:30 PM",
    priceRange: {
      min: 500,
      max: 25000
    },
    experience: 10,
    createdAt: new Date("2024-06-01T09:00:00Z")
  },
  {
    fullName: "Sneha Nair",
    shopName: "Nair Boutique Studio",
    email: "sohailsania903@gmail.com",
    mobile: "+91 91234 55678",
    address: "45, Indiranagar 2nd Stage, Bengaluru – 560038",
    location: "Bengaluru",
    specializationTags: ["Bridal Wear", "Lehenga", "Blouse", "Designer Sarees", "Custom Stitching"],
    workingHours: "Mon – Sat | 10:00 AM – 7:30 PM",
    priceRange: {
      min: 800,
      max: 40000
    },
    experience: 12,
    createdAt: new Date("2024-06-15T10:00:00Z")
  },
  {
    fullName: "Anjali Verma",
    shopName: "Anjali Fashion Hub",
    email: "anjaliverma346145@gmail.com",
    mobile: "+91 99887 66554",
    address: "12, Saraswathipuram, Mysuru – 570009",
    location: "Mysuru",
    specializationTags: ["Salwar Suits", "Kurtis", "Blouse", "Alterations", "Embroidery Work"],
    workingHours: "Mon – Sat | 10:00 AM – 8:00 PM",
    priceRange: {
      min: 400,
      max: 15000
    },
    experience: 8,
    createdAt: new Date("2024-07-01T09:00:00Z")
  },
  {
    fullName: "Basavaraj H",
    shopName: "Basava Men's Tailoring",
    email: "basavaraj346145@gmail.com",
    mobile: "+91 90123 77889",
    address: "78, Gandhi Nagar, Ballari – 583101",
    location: "Ballari",
    specializationTags: ["Formal Suits", "Blazers", "Shirts", "Pants", "Uniform Stitching"],
    workingHours: "Mon – Sat | 9:00 AM – 9:00 PM",
    priceRange: {
      min: 600,
      max: 20000
    },
    experience: 15,
    createdAt: new Date("2024-07-15T09:00:00Z")
  },
  {
    fullName: "Suresh D",
    shopName: "Suresh Tailoring House",
    email: "dsuresh8904@gmail.com",
    mobile: "+91 93456 22331",
    address: "33, Jayanagar 4th Block, Bengaluru – 560041",
    location: "Bengaluru",
    specializationTags: ["Men's Wear", "Casual Shirts", "Jeans Alterations", "Office Wear"],
    workingHours: "Mon – Sat | 10:00 AM – 8:30 PM",
    priceRange: {
      min: 300,
      max: 10000
    },
    experience: 9,
    createdAt: new Date("2024-08-01T10:00:00Z")
  }
];

// ─── TAILOR PROFILE ──────────────────────────────────────────────────────────
const TAILOR_PROFILE = {
  id: "tailor_001",
  name: "Arjun Sharma",
  shopName: "Royal Threads Studio",
  tagline: "Dress well. Stitch better. Every seam tells a story.",
  phone: "+91 98765 43210",
  email: "arjun@royalthreads.in",
  address: "42, Craft Lane, Bandra West, Mumbai – 400050",
  mapsUrl: "https://maps.google.com/?q=Bandra+West+Mumbai",
  rating: 4.9,
  totalRatings: 312,
  yearsExperience: 12,
  completedOrders: 1840,
  specialties: ["Bridal Wear", "Bespoke Suits", "Ethnic Fusion"],
  availability: true,  // toggle state stored here, persisted via localStorage
  avatar: null,        // base64 or URL when user uploads
  badges: [
    { id: "b1", label: "Top Rated", color: "#16a34a" },
    { id: "b2", label: "12 Yrs Exp", color: "#0c7bb3" },
    { id: "b3", label: "1840+ Orders", color: "#a75c9a" }
  ]
};

// ─── DESIGNS / CATALOGUE ─────────────────────────────────────────────────────
const DESIGNS = {
  men: [
    { id: "d_m01", key: "shirt",    name: "Classic Shirt",    gender: "men", price: 2499,  fabric: "Pure Cotton",  tags: ["Cotton","Formal","Custom Fit"],         desc: "A crisp, well-tailored classic shirt perfect for formal and semi-formal occasions." },
    { id: "d_m02", key: "pant",     name: "Formal Pant",      gender: "men", price: 3199,  fabric: "Wool Blend",   tags: ["Wool Blend","Formal","Slim Fit"],        desc: "Elegantly tailored formal pants with a sharp crease. Ideal for office wear." },
    { id: "d_m03", key: "suit",     name: "3-Piece Suit",     gender: "men", price: 12999, fabric: "Premium Wool", tags: ["Premium","Wedding","Bespoke"],           desc: "A refined 3-piece suit for weddings, galas, and prestigious events." },
    { id: "d_m04", key: "linen",    name: "Linen Kurta",      gender: "men", price: 1899,  fabric: "Pure Linen",   tags: ["Linen","Casual","Lightweight"],          desc: "Breathable linen kurta for casual elegance and everyday comfort." },
    { id: "d_m05", key: "chino",    name: "Chino Trouser",    gender: "men", price: 2299,  fabric: "Cotton Chino", tags: ["Chino","Smart Casual","Tapered"],        desc: "Smart chino trousers in rich indigo — perfect for casual Fridays." },
    { id: "d_m06", key: "bandhgala",name: "Bandhgala Suit",   gender: "men", price: 8499,  fabric: "Brocade Silk", tags: ["Ethnic","Festive","Royal"],              desc: "A regal bandhgala suit for cultural events and festivities." }
  ],
  women: [
    { id: "d_w01", key: "blouse",   name: "Silk Blouse",      gender: "women", price: 4299,  fabric: "Pure Silk",     tags: ["Pure Silk","Casual","Party"],          desc: "A flowing silk blouse with intricate hand-finishing." },
    { id: "d_w02", key: "lehenga",  name: "Bridal Lehenga",   gender: "women", price: 28999, fabric: "Banarasi Silk", tags: ["Bridal","Embroidery","Luxury"],        desc: "An exquisite bridal lehenga with embroidery and zari work." },
    { id: "d_w03", key: "kurta",    name: "Anarkali Kurta",   gender: "women", price: 3799,  fabric: "Cotton Silk",   tags: ["Cotton Silk","Festive","Traditional"], desc: "A graceful Anarkali kurta with flared bottom and traditional prints." },
    { id: "d_w04", key: "designer", name: "Designer Blouse",  gender: "women", price: 5499,  fabric: "Georgette",     tags: ["Designer","Mirror Work","Pastel"],     desc: "Statement designer blouse with mirror work and pastel tones." },
    { id: "d_w05", key: "saree",    name: "Party Saree Set",  gender: "women", price: 9999,  fabric: "Chiffon",       tags: ["Party","Embellished","Vivid"],         desc: "A vibrant party saree set with matching blouse and dupatta." },
    { id: "d_w06", key: "palazzo",  name: "Palazzo Suit",     gender: "women", price: 2999,  fabric: "Crepe",         tags: ["Palazzo","Comfort","Floral"],          desc: "Comfortable palazzo suit with flared legs and floral embroidery." }
  ]
};

// ─── PORTFOLIO ITEMS ─────────────────────────────────────────────────────────
const PORTFOLIO_ITEMS = [
  { id: "p001", name: "Bridal Lehenga",   price: "from ₹18,000", gradient: "linear-gradient(140deg,#f2bae8,#f7d8f4)", desc: "Exquisite custom bridal lehenga with intricate hand embroidery. Includes 3–4 fittings." },
  { id: "p002", name: "Wedding Sherwani", price: "from ₹12,500", gradient: "linear-gradient(140deg,#c8e8f8,#e8f4fb)", desc: "Regal hand-crafted sherwani for weddings. Premium fabric with zari detailing. 2 fittings." },
  { id: "p003", name: "Designer Gown",    price: "from ₹8,000",  gradient: "linear-gradient(140deg,#f2bae8,#c8e8f8)", desc: "Contemporary designer gown with elegant draping. Suitable for receptions and sangeets." },
  { id: "p004", name: "Custom Blazer",    price: "from ₹5,500",  gradient: "linear-gradient(140deg,#e8f4fb,#f2bae8)", desc: "Tailored blazer crafted to your measurements. Single and double-breasted styles." },
  { id: "p005", name: "Salwar Kameez",    price: "from ₹2,800",  gradient: "linear-gradient(140deg,#fdf3fc,#f2bae8)", desc: "Classic and designer salwar kameez sets with matching dupatta." },
  { id: "p006", name: "3-Piece Suit",     price: "from ₹9,000",  gradient: "linear-gradient(140deg,#c8e8f8,#f2bae8)", desc: "Premium 3-piece suit with jacket, vest and trousers. Perfect for formal occasions." },
  { id: "p007", name: "Embroidered Kurta",price: "from ₹3,200",  gradient: "linear-gradient(140deg,#f7d8f4,#e8f4fb)", desc: "Beautifully hand-embroidered kurta in premium cotton and silk blends." },
  { id: "p008", name: "Party Blouse",     price: "from ₹1,200",  gradient: "linear-gradient(140deg,#e8f4fb,#f7d8f4)", desc: "Stylish custom-stitched blouse for sarees. Standard, backless or designer neck." }
];

// ─── SERVICES / PRICING ──────────────────────────────────────────────────────
const SERVICES = [
  { id: "s001", name: "Bridal Lehenga (Custom)",      desc: "Full custom stitching with embroidery, 3–4 fittings", price: 18000 },
  { id: "s002", name: "Wedding Sherwani / Suit",       desc: "2 or 3-piece, premium fabric, hand-finishing, 2 fittings", price: 12500 },
  { id: "s003", name: "Salwar Kameez (Custom)",        desc: "Full set with dupatta, standard or designer cut", price: 2800 },
  { id: "s004", name: "Blouse Stitching",              desc: "Custom blouse from your fabric, standard or designer neck", price: 1200 },
  { id: "s005", name: "Alterations (Basic)",           desc: "Hemming, taking in/letting out seams, zip replacement", price: 400 }
];

// ─── ORDERS ──────────────────────────────────────────────────────────────────
const ORDERS_DATA = {
  new: [
    {
      id: "ord_n01", customer: "Priya Sharma",   phone: "9876543210", gender: "Female",
      item: "Bridal Lehenga", measurements: "Bust 36\", Waist 28\", Hip 38\"",
      note: "Prefer deep red, heavy zari border", deadline: "May 10, 2025",
      amount: 28000, advance: 14000,
      designImage: null, designNote: "Reference image from Pinterest"
    },
    {
      id: "ord_n02", customer: "Rahul Mehta",    phone: "9123456789", gender: "Male",
      item: "3-Piece Suit", measurements: "Chest 40\", Waist 34\", Length 28\"",
      note: "Navy blue, slim fit, silver buttons", deadline: "Apr 28, 2025",
      amount: 12999, advance: 5000,
      designImage: null, designNote: ""
    },
    {
      id: "ord_n03", customer: "Ananya Iyer",    phone: "9654321098", gender: "Female",
      item: "Anarkali Kurta", measurements: "Bust 34\", Waist 26\", Length 52\"",
      note: "Pastel pink, mirror work preferred", deadline: "May 3, 2025",
      amount: 3799, advance: 1500,
      designImage: null, designNote: ""
    }
  ],
  accepted: [
    {
      id: "ord_a01", customer: "Meena Patel",    phone: "9988776655", gender: "Female",
      item: "Designer Blouse", measurements: "Bust 36\", Back 14\"",
      note: "Backless, boat neck", deadline: "Apr 25, 2025",
      amount: 5499, advance: 2500, step: 2,
      steps: ["Accepted", "Fabric Received", "Stitching", "Ready", "Delivered"],
      stepDates: ["Apr 18", "Apr 20", null, null, null]
    },
    {
      id: "ord_a02", customer: "Karan Singh",    phone: "9871234560", gender: "Male",
      item: "Bandhgala Suit", measurements: "Chest 42\", Waist 36\"",
      note: "Cream, gold buttons", deadline: "May 1, 2025",
      amount: 8499, advance: 4000, step: 1,
      steps: ["Accepted", "Fabric Received", "Stitching", "Ready", "Delivered"],
      stepDates: ["Apr 19", null, null, null, null]
    }
  ],
  inprogress: [
    {
      id: "ord_p01", customer: "Sunita Rao",     phone: "9765432109", gender: "Female",
      item: "Silk Blouse", measurements: "Bust 34\", Back 13\"",
      note: "Turquoise, traditional neck", deadline: "Apr 30, 2025",
      amount: 4299, advance: 2000, step: 3,
      steps: ["Accepted", "Fabric Received", "Stitching", "Ready", "Delivered"],
      stepDates: ["Apr 15", "Apr 17", "Apr 19", null, null]
    }
  ],
  completed: [
    {
      id: "ord_c01", customer: "Ritika Joshi",   phone: "9812309876", gender: "Female",
      item: "Palazzo Suit", deadline: "Apr 15, 2025",
      amount: 2999, rating: 5, review: "Perfect fit, delivered on time!",
      completedDate: "Apr 14, 2025"
    },
    {
      id: "ord_c02", customer: "Vikram Nair",    phone: "9900112233", gender: "Male",
      item: "Formal Pant", deadline: "Apr 10, 2025",
      amount: 3199, rating: 4, review: "Great quality fabric and stitching.",
      completedDate: "Apr 9, 2025"
    }
  ],
  cancelled: [
    {
      id: "ord_x01", customer: "Deepa Menon",    phone: "9845678901", gender: "Female",
      item: "Bridal Lehenga", deadline: "Apr 20, 2025",
      amount: 28999, reason: "Customer changed plans",
      cancelledDate: "Apr 12, 2025"
    }
  ]
};

// ─── REVIEWS ─────────────────────────────────────────────────────────────────
const REVIEWS = [
  { id: "r001", author: "Priya S.",   rating: 5, initials: "PS", color: "#f2bae8", date: "Apr 2025", text: "Absolutely love the bridal lehenga! Arjun sir's attention to detail is unmatched." },
  { id: "r002", author: "Rahul M.",   rating: 5, initials: "RM", color: "#c8e8f8", date: "Mar 2025", text: "Got three suits stitched for my wedding functions. The fit and fabric quality were top-notch." },
  { id: "r003", author: "Sunita R.",  rating: 4, initials: "SR", color: "#f7d8f4", date: "Mar 2025", text: "Very professional. The Palazzo suit came out beautifully. Minor delay but worth it." }
];

// ─── SCHEDULE EVENTS ─────────────────────────────────────────────────────────
const SCHEDULE_EVENTS = {
  3:  [{ id: "se_3a",  time: "11:00 AM", type: "free",   label: "Open Slot",           sub: "Available for booking" }],
  5:  [{ id: "se_5a",  time: "10:00 AM", type: "busy",   label: "Personal Appointment",sub: "Doctor visit · unavailable" }],
  8:  [{ id: "se_8a",  time: "12:00 PM", type: "pickup", label: "Fabric Pickup – Rahul",sub: "3-Piece Suit fabric" },
       { id: "se_8b",  time: "4:00 PM",  type: "free",   label: "Open Slot",           sub: "Available for booking" }],
  10: [{ id: "se_10a", time: "2:00 PM",  type: "order",  label: "Fitting – Priya",     sub: "Bridal Lehenga • 1st fitting" },
       { id: "se_10b", time: "5:00 PM",  type: "pickup", label: "Pickup – Meena",      sub: "Blouse ready for pickup" }],
  15: [{ id: "se_15a", time: "10:00 AM", type: "order",  label: "Fitting – Karan",     sub: "Bandhgala • 1st fitting" },
       { id: "se_15b", time: "2:00 PM",  type: "busy",   label: "Personal Errand",     sub: "Unavailable" }],
  17: [{ id: "se_17a", time: "11:00 AM", type: "free",   label: "Open Slot",           sub: "Available for booking" }],
  22: [{ id: "se_22a", time: "3:00 PM",  type: "pickup", label: "Delivery – Sunita",   sub: "Silk blouse delivery" }],
  24: [{ id: "se_24a", time: "10:00 AM", type: "free",   label: "Open Slot",           sub: "Available for booking" }],
  30: [{ id: "se_30a", time: "2:00 PM",  type: "pickup", label: "Pickup – Vikram",     sub: "Formal pant ready" }]
};

// Day-type helpers (used by calendar rendering)
const BUSY_DAYS   = [5, 15];
const PICKUP_DAYS = [8, 10, 22, 30];
const AVAIL_DAYS  = [3, 6, 17, 24];

// ─── CHAT CONTACTS ───────────────────────────────────────────────────────────
// (Kept minimal — full chat data is large; chat.html manages its own LS key)
const CHAT_CONTACTS_SEED = [
  { id: 1, name: "Priya Sharma",    tag: "Customer", phone: "9876543210", unread: 2, starred: true,  orderId: "ord_n01" },
  { id: 2, name: "Rahul Mehta",     tag: "Customer", phone: "9123456789", unread: 0, starred: false, orderId: "ord_n02" },
  { id: 3, name: "Meena Patel",     tag: "Customer", phone: "9988776655", unread: 1, starred: false, orderId: "ord_a01" },
  { id: 4, name: "Karan Singh",     tag: "Customer", phone: "9871234560", unread: 0, starred: true,  orderId: "ord_a02" },
  { id: 5, name: "Ananya Iyer",     tag: "Customer", phone: "9654321098", unread: 3, starred: false, orderId: "ord_n03" }
];

// ─── SVG ICON MAP (shared across pages) ──────────────────────────────────────
const SVG_MAP = {
  shirt:     '<svg width="68" height="78" viewBox="0 0 48 56" fill="none"><path d="M8 8 L18 2 L24 8 L30 2 L40 8 L44 20 L36 22 L36 52 L12 52 L12 22 L4 20 Z" fill="#3b82f6" opacity=".7"/><path d="M18 2 Q24 10 30 2" stroke="#fff" stroke-width="1" fill="none"/></svg>',
  pant:      '<svg width="64" height="84" viewBox="0 0 44 60" fill="none"><path d="M6 4 L38 4 L38 10 L34 10 L34 56 L24 56 L22 30 L20 56 L10 56 L10 10 L6 10 Z" fill="#0ea5e9" opacity=".7"/></svg>',
  suit:      '<svg width="72" height="88" viewBox="0 0 52 64" fill="none"><path d="M10 6 L20 2 L26 10 L32 2 L42 6 L46 22 L38 24 L38 60 L14 60 L14 24 L6 22 Z" fill="#6366f1" opacity=".7"/><path d="M20 2 L26 14 L32 2" stroke="white" stroke-width="1" fill="none" opacity=".5"/><rect x="22" y="28" width="8" height="12" rx="2" fill="white" opacity=".3"/></svg>',
  blouse:    '<svg width="68" height="74" viewBox="0 0 48 52" fill="none"><path d="M10 8 L18 4 L24 10 L30 4 L38 8 L42 20 L34 22 L34 48 L14 48 L14 22 L6 20 Z" fill="#ec4899" opacity=".7"/><path d="M18 4 Q24 12 30 4" stroke="white" stroke-width="1" fill="none"/></svg>',
  lehenga:   '<svg width="72" height="92" viewBox="0 0 52 68" fill="none"><ellipse cx="26" cy="50" rx="22" ry="18" fill="#d946ef" opacity=".6"/><rect x="18" y="12" width="16" height="28" rx="4" fill="#a855f7" opacity=".7"/><path d="M4 50 Q26 34 48 50 Q26 66 4 50" fill="#e879f9" opacity=".4"/></svg>',
  kurta:     '<svg width="68" height="90" viewBox="0 0 48 66" fill="none"><path d="M10 8 L18 4 L24 10 L30 4 L38 8 L42 22 L34 24 L34 62 L14 62 L14 24 L6 22 Z" fill="#22c55e" opacity=".6"/><line x1="24" y1="10" x2="24" y2="40" stroke="white" stroke-width="1.5" opacity=".6"/><path d="M14 30 Q24 26 34 30" stroke="white" stroke-width="1" fill="none" opacity=".5"/></svg>',
  linen:     '<svg width="68" height="78" viewBox="0 0 48 56" fill="none"><path d="M8 8 L18 2 L24 8 L30 2 L40 8 L44 20 L36 22 L36 52 L12 52 L12 22 L4 20 Z" fill="#0c7bb3" opacity=".8"/><path d="M18 2 Q24 10 30 2" stroke="#fff" stroke-width="1" fill="none"/></svg>',
  chino:     '<svg width="64" height="84" viewBox="0 0 44 60" fill="none"><path d="M6 4 L38 4 L38 10 L34 10 L34 56 L24 56 L22 30 L20 56 L10 56 L10 10 L6 10 Z" fill="#6366f1" opacity=".7"/></svg>',
  bandhgala: '<svg width="72" height="88" viewBox="0 0 52 64" fill="none"><path d="M10 6 L20 2 L26 10 L32 2 L42 6 L46 22 L38 24 L38 60 L14 60 L14 24 L6 22 Z" fill="#1a9fd4" opacity=".75"/><path d="M20 2 L26 14 L32 2" stroke="white" stroke-width="1" fill="none" opacity=".5"/></svg>',
  designer:  '<svg width="68" height="74" viewBox="0 0 48 52" fill="none"><path d="M10 8 L18 4 L24 10 L30 4 L38 8 L42 20 L34 22 L34 48 L14 48 L14 22 L6 20 Z" fill="#f2bae8" opacity=".9"/><path d="M18 4 Q24 12 30 4" stroke="#a75c9a" stroke-width="1" fill="none"/></svg>',
  saree:     '<svg width="72" height="92" viewBox="0 0 52 68" fill="none"><ellipse cx="26" cy="50" rx="22" ry="18" fill="#f2bae8" opacity=".9"/><rect x="18" y="12" width="16" height="28" rx="4" fill="#a75c9a" opacity=".7"/><path d="M4 50 Q26 34 48 50 Q26 66 4 50" fill="#ec4899" opacity=".4"/></svg>',
  palazzo:   '<svg width="68" height="90" viewBox="0 0 48 66" fill="none"><path d="M10 8 L18 4 L24 10 L30 4 L38 8 L42 22 L34 24 L34 62 L14 62 L14 24 L6 22 Z" fill="#f9a8d4" opacity=".8"/><line x1="24" y1="10" x2="24" y2="40" stroke="white" stroke-width="1.5" opacity=".6"/></svg>'
};

const IMG_CLASS_MAP = {
  shirt: "shirt", pant: "pant", suit: "suit", blouse: "blouse",
  lehenga: "lehenga", kurta: "kurta",
  linen: "shirt", chino: "pant", bandhgala: "suit",
  designer: "blouse", saree: "lehenga", palazzo: "kurta"
};
