/* ========================================
   ShopNest - app.js
   ======================================== */

const PRODUCTS = [
  { id:1, name:'Sony WH-1000XM5 Headphones', cat:'Electronics', emoji:'🎧', bg:'#dbeafe', desc:'Industry-leading noise cancellation with 30hr battery life and crystal-clear calls.', price:24990, orig:32990, rating:4.9, reviews:2341, new:false },
  { id:2, name:'Nike Air Max 270', cat:'Fashion', emoji:'👟', bg:'#fce7f3', desc:'Lightweight sneakers with Max Air cushioning for all-day comfort and style.', price:8995, orig:10995, rating:4.7, reviews:1520, new:false },
  { id:3, name:'Atomic Habits — James Clear', cat:'Books', emoji:'📚', bg:'#fef9c3', desc:'The proven system for building good habits and breaking bad ones. #1 bestseller.', price:399, orig:599, rating:4.9, reviews:8920, new:false },
  { id:4, name:'Apple AirPods Pro (2nd Gen)', cat:'Electronics', emoji:'🎵', bg:'#ede9fe', desc:'Active Noise Cancellation, Transparency mode, and Adaptive EQ.', price:19900, orig:24900, rating:4.8, reviews:3200, new:true },
  { id:5, name:'Whey Protein — Gold Standard', cat:'Health', emoji:'💪', bg:'#d1fae5', desc:'24g protein per serving, fast-absorbing whey isolate for muscle recovery.', price:3499, orig:4499, rating:4.6, reviews:980, new:false },
  { id:6, name:'Instant Pot Duo 7-in-1', cat:'Home', emoji:'🍲', bg:'#fff7ed', desc:'Pressure cooker, slow cooker, rice cooker, steamer and much more.', price:6999, orig:8999, rating:4.7, reviews:1540, new:false },
  { id:7, name:'MacBook Air M2 Sleeve', cat:'Electronics', emoji:'💻', bg:'#f0f9ff', desc:'Ultra-slim neoprene sleeve fits 13-inch laptops perfectly. Multiple color options.', price:799, orig:1299, rating:4.4, reviews:360, new:true },
  { id:8, name:'Yoga Mat — Liforme', cat:'Health', emoji:'🧘', bg:'#dcfce7', desc:'Eco-friendly, alignment system, superior grip even when wet.', price:4500, orig:5999, rating:4.8, reviews:720, new:false },
  { id:9, name:'The Psychology of Money', cat:'Books', emoji:'📖', bg:'#fef9c3', desc:'Timeless lessons on wealth, greed, and happiness by Morgan Housel.', price:349, orig:499, rating:4.8, reviews:6100, new:false },
  { id:10,'name':'Samsung 27" Monitor', cat:'Electronics', emoji:'🖥️', bg:'#dbeafe', desc:'QHD IPS display, 165Hz refresh rate, 1ms response time. Perfect for gaming.', price:22990, orig:29990, rating:4.7, reviews:850, new:true },
  { id:11, name:'Levi\'s 511 Slim Jeans', cat:'Fashion', emoji:'👖', bg:'#e0f2fe', desc:'Classic slim-fit jeans in premium stretch denim. Versatile everyday wear.', price:2999, orig:4299, rating:4.5, reviews:2100, new:false },
  { id:12, name:'Philips Air Fryer', cat:'Home', emoji:'🍳', bg:'#fff7ed', desc:'4.1L capacity, rapid air technology, 80% less fat. Healthy cooking made easy.', price:5499, orig:7499, rating:4.6, reviews:1890, new:false },
];

const CATEGORIES = ['All', ...new Set(PRODUCTS.map(p => p.cat))];

// ── STATE ─────────────────────────────────────────────────────────────────────
const cart = {};     // id → qty
const wishlist = new Set();
let activeCategory = 'All';
let currentView = 'grid';
let filteredProducts = [...PRODUCTS];

// Load from localStorage
try {
  const s = localStorage.getItem('shopnest_v1');
  if (s) {
    const d = JSON.parse(s);
    Object.assign(cart, d.cart || {});
    (d.wish || []).forEach(id => wishlist.add(id));
  }
} catch(e) {}

function save() {
  localStorage.setItem('shopnest_v1', JSON.stringify({ cart, wish: [...wishlist] }));
}

// ── SHOP CONTROLLER ────────────────────────────────────────────────────────────
const Shop = {

  init() {
    this.buildCategories();
    this.applyFilters();
    this.updateBadges();
  },

  buildCategories() {
    const container = document.getElementById('cat-filters');
    container.innerHTML = CATEGORIES.map(c =>
      `<div class="cat-item${c === activeCategory ? ' active' : ''}" onclick="Shop.setCategory('${c}', this)">${c}</div>`
    ).join('');
  },

  setCategory(cat, el) {
    activeCategory = cat;
    document.querySelectorAll('.cat-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
    this.applyFilters();
  },

  search() {
    this.applyFilters();
  },

  applyFilters() {
    const q = (document.getElementById('search-inp').value || '').toLowerCase();
    const minP = parseFloat(document.getElementById('price-min').value) || 0;
    const maxP = parseFloat(document.getElementById('price-max').value) || Infinity;
    const minR = parseFloat(document.getElementById('rating-filter').value) || 0;
    const sort = document.getElementById('sort-filter').value;

    let list = PRODUCTS.filter(p => {
      const mCat = activeCategory === 'All' || p.cat === activeCategory;
      const mQ = !q || p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
      const mP = p.price >= minP && p.price <= maxP;
      const mR = p.rating >= minR;
      return mCat && mQ && mP && mR;
    });

    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    else if (sort === 'newest') list = [...list.filter(p => p.new), ...list.filter(p => !p.new)];

    filteredProducts = list;
    document.getElementById('results-count').textContent = `Showing ${list.length} product${list.length !== 1 ? 's' : ''}`;
    this.renderProducts();
  },

  clearFilters() {
    activeCategory = 'All';
    document.getElementById('search-inp').value = '';
    document.getElementById('price-min').value = '';
    document.getElementById('price-max').value = '';
    document.getElementById('rating-filter').value = '';
    document.getElementById('sort-filter').value = 'default';
    this.buildCategories();
    this.applyFilters();
  },

  setView(v, btn) {
    currentView = v;
    document.querySelectorAll('.vt').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    this.renderProducts();
  },

  renderProducts() {
    const grid = document.getElementById('products-grid');
    grid.className = 'products-grid' + (currentView === 'list' ? ' list-view' : '');
    if (!filteredProducts.length) {
      grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:48px;color:#94a3b8"><div style="font-size:3rem">🔍</div><p>No products found.</p></div>';
      return;
    }
    const inCart = id => (cart[id] || 0) > 0;
    const disc = p => p.orig ? Math.round((p.orig - p.price) / p.orig * 100) : 0;
    grid.innerHTML = filteredProducts.map(p => `
      <div class="prod-card${currentView === 'list' ? ' list-card' : ''}" onclick="Shop.openModal(${p.id})">
        <div class="prod-img" style="background:${p.bg}">
          ${p.emoji}
          ${disc(p) ? `<div class="prod-discount">-${disc(p)}%</div>` : ''}
          <button class="prod-wish-btn ${wishlist.has(p.id) ? 'wishlisted' : ''}" onclick="event.stopPropagation(); Shop.toggleWish(${p.id})">${wishlist.has(p.id) ? '❤️' : '🤍'}</button>
        </div>
        <div class="prod-info">
          <div class="prod-cat">${p.cat}${p.new ? ' • 🆕 New' : ''}</div>
          <div class="prod-name">${p.name}</div>
          <div class="prod-desc">${p.desc}</div>
          <div class="prod-rating">${'★'.repeat(Math.floor(p.rating))} ${p.rating} <span>(${p.reviews.toLocaleString()})</span></div>
          <div class="prod-footer">
            <div class="prod-price">
              ${p.orig ? `<del>₹${p.orig.toLocaleString()}</del>` : ''}
              <span class="disc-price">₹${p.price.toLocaleString()}</span>
            </div>
            ${inCart(p.id)
              ? `<div class="qty-ctrl" onclick="event.stopPropagation()">
                  <button class="qty-btn" onclick="Shop.changeQty(${p.id},-1)">−</button>
                  <span class="qty-num">${cart[p.id]}</span>
                  <button class="qty-btn" onclick="Shop.changeQty(${p.id},1)">+</button>
                </div>`
              : `<button class="add-cart-btn" onclick="event.stopPropagation(); Shop.addToCart(${p.id})">Add to Cart</button>`
            }
          </div>
        </div>
      </div>`).join('');
  },

  addToCart(id) {
    cart[id] = (cart[id] || 0) + 1;
    save(); this.updateBadges(); this.renderProducts();
    this.toast('🛒 Added to cart!');
  },

  changeQty(id, delta) {
    cart[id] = (cart[id] || 0) + delta;
    if (cart[id] <= 0) delete cart[id];
    save(); this.updateBadges(); this.renderProducts(); this.renderCart();
  },

  toggleWish(id) {
    if (wishlist.has(id)) wishlist.delete(id);
    else { wishlist.add(id); this.toast('❤️ Added to wishlist!'); }
    save(); this.updateBadges(); this.renderProducts(); this.renderWishlist();
  },

  updateBadges() {
    const total = Object.values(cart).reduce((s, q) => s + q, 0);
    document.getElementById('cart-badge').textContent = total;
    document.getElementById('wish-count').textContent = wishlist.size;
  },

  // ── CART DRAWER ──────────────────────────────────────────────────────────────
  toggleCart() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    const open = drawer.classList.toggle('open');
    overlay.classList.toggle('open', open);
    if (open) this.renderCart();
  },

  renderCart() {
    const keys = Object.keys(cart);
    const items = document.getElementById('cart-items');
    const footer = document.getElementById('cart-footer');
    if (!keys.length) {
      items.innerHTML = '<div class="cart-empty"><div>🛒</div><p>Your cart is empty</p></div>';
      footer.innerHTML = '';
      return;
    }
    let subtotal = 0, shipping = 49;
    items.innerHTML = keys.map(id => {
      const p = PRODUCTS.find(x => x.id == id);
      const sub = p.price * cart[id];
      subtotal += sub;
      return `<div class="cart-item">
        <div class="ci-img" style="background:${p.bg}">${p.emoji}</div>
        <div class="ci-info">
          <div class="ci-name">${p.name}</div>
          <div class="ci-price">₹${p.price.toLocaleString()} × ${cart[id]} = ₹${sub.toLocaleString()}</div>
          <div class="ci-actions">
            <div class="qty-ctrl">
              <button class="qty-btn" onclick="Shop.changeQty(${id},-1)">−</button>
              <span class="qty-num">${cart[id]}</span>
              <button class="qty-btn" onclick="Shop.changeQty(${id},1)">+</button>
            </div>
            <button class="ci-remove" onclick="Shop.removeFromCart(${id})">Remove</button>
          </div>
        </div>
      </div>`;
    }).join('');
    if (subtotal >= 499) shipping = 0;
    footer.innerHTML = `
      <div class="cart-total-row"><span>Subtotal</span><span>₹${subtotal.toLocaleString()}</span></div>
      <div class="cart-total-row"><span>Shipping</span><span>${shipping === 0 ? '<span style="color:#10b981">FREE</span>' : '₹' + shipping}</span></div>
      <div class="cart-grand"><span>Total</span><span>₹${(subtotal + shipping).toLocaleString()}</span></div>
      <button class="checkout-btn" onclick="Shop.checkout()">Checkout →</button>`;
  },

  removeFromCart(id) {
    delete cart[id];
    save(); this.updateBadges(); this.renderCart(); this.renderProducts();
  },

  checkout() {
    Object.keys(cart).forEach(k => delete cart[k]);
    save(); this.updateBadges(); this.renderProducts(); this.renderCart();
    this.toggleCart();
    this.toast('✅ Order placed successfully! Thank you 🎉');
  },

  // ── WISHLIST DRAWER ──────────────────────────────────────────────────────────
  toggleWishlist() {
    const drawer = document.getElementById('wish-drawer');
    const overlay = document.getElementById('wish-overlay');
    const open = drawer.classList.toggle('open');
    overlay.classList.toggle('open', open);
    if (open) this.renderWishlist();
  },

  renderWishlist() {
    const items = document.getElementById('wish-items');
    if (!wishlist.size) {
      items.innerHTML = '<div class="cart-empty"><div>❤️</div><p>Your wishlist is empty</p></div>';
      return;
    }
    items.innerHTML = [...wishlist].map(id => {
      const p = PRODUCTS.find(x => x.id == id);
      return `<div class="cart-item">
        <div class="ci-img" style="background:${p.bg}">${p.emoji}</div>
        <div class="ci-info">
          <div class="ci-name">${p.name}</div>
          <div class="ci-price">₹${p.price.toLocaleString()}</div>
          <div class="ci-actions">
            <button class="add-cart-btn" onclick="Shop.addToCart(${id})" style="padding:5px 12px;font-size:0.75rem">Add to Cart</button>
            <button class="ci-remove" onclick="Shop.toggleWish(${id}); Shop.renderWishlist()">Remove</button>
          </div>
        </div>
      </div>`;
    }).join('');
  },

  // ── PRODUCT MODAL ────────────────────────────────────────────────────────────
  openModal(id) {
    const p = PRODUCTS.find(x => x.id == id);
    const disc = p.orig ? Math.round((p.orig - p.price) / p.orig * 100) : 0;
    const inCart = (cart[id] || 0) > 0;
    document.getElementById('product-modal-inner').innerHTML = `
      <button class="pm-close" onclick="Shop.closeModal()">✕</button>
      <div class="pm-img" style="background:${p.bg}">${p.emoji}</div>
      <div class="pm-cat">${p.cat}${p.new ? ' • 🆕 New' : ''}${disc ? ` • ${disc}% OFF` : ''}</div>
      <div class="pm-name">${p.name}</div>
      <div class="pm-rating">${'★'.repeat(Math.floor(p.rating))} ${p.rating} (${p.reviews.toLocaleString()} reviews)</div>
      <div class="pm-desc">${p.desc}</div>
      <div class="pm-price">
        ${p.orig ? `<del>₹${p.orig.toLocaleString()}</del>` : ''}
        <span class="disc">₹${p.price.toLocaleString()}</span>
      </div>
      <div class="pm-btns">
        <button class="pm-add-btn" onclick="Shop.addToCart(${id}); Shop.closeModal()">${inCart ? '+ Add More' : '🛒 Add to Cart'}</button>
        <button class="pm-wish-btn" onclick="Shop.toggleWish(${id})">${wishlist.has(id) ? '❤️ Wishlisted' : '🤍 Wishlist'}</button>
      </div>`;
    document.getElementById('product-modal').classList.add('open');
  },

  closeModal() {
    document.getElementById('product-modal').classList.remove('open');
  },

  // ── TOAST ────────────────────────────────────────────────────────────────────
  toast(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('show'), 2500);
  }
};

// Close modal on overlay click
document.getElementById('product-modal').addEventListener('click', e => {
  if (e.target === document.getElementById('product-modal')) Shop.closeModal();
});

Shop.init();