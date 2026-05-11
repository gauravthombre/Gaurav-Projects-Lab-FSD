/* ── DATA ── */
const ITEMS = [
  { id:1,  name:'Margherita Pizza',      desc:'Classic San Marzano tomato, fresh mozzarella, basil & EVOO on a thin crispy crust.',  price:12.99, oldPrice:null, emoji:'🍕', bg:'#fff3e8', cat:'Pizza',   rest:'Luigi\'s Pizzeria', rating:4.8, time:'25 min', cal:'720 kcal', veg:true,  sale:false, opts:{size:['Small','Medium','Large'], crust:['Thin','Thick','Stuffed']} },
  { id:2,  name:'BBQ Chicken Pizza',     desc:'Smoky BBQ base, grilled chicken, caramelised onions, mozzarella & coriander.',         price:14.99, oldPrice:19.99, emoji:'🍕', bg:'#ffeee0', cat:'Pizza',   rest:'Luigi\'s Pizzeria', rating:4.7, time:'25 min', cal:'810 kcal', veg:false, sale:true,  opts:{size:['Medium','Large'], crust:['Thin','Classic']} },
  { id:3,  name:'Pepperoni Feast',       desc:'Double pepperoni, mozzarella, rich tomato sauce. The ultimate meat lover\'s pizza.',    price:15.99, oldPrice:null, emoji:'🍕', bg:'#ffe8e8', cat:'Pizza',   rest:'Luigi\'s Pizzeria', rating:4.9, time:'25 min', cal:'950 kcal', veg:false, sale:false, opts:{size:['Medium','Large','XL']} },
  { id:4,  name:'Classic Smash Burger',  desc:'180g beef smash, American cheese, pickles, caramelised onions, secret sauce.',          price:10.99, oldPrice:null, emoji:'🍔', bg:'#fff8e0', cat:'Burgers', rest:'BurgerBox',         rating:4.9, time:'20 min', cal:'680 kcal', veg:false, sale:false, opts:{doneness:['Medium','Well Done'], extras:['Bacon +$1','Extra Cheese +$0.5','Jalapeños +$0.5']} },
  { id:5,  name:'Veggie Delight Burger', desc:'Crispy chickpea patty, avocado, sundried tomato, rocket, vegan mayo.',                  price:9.99,  oldPrice:12.99, emoji:'🥗', bg:'#e8f8e0', cat:'Burgers', rest:'BurgerBox',         rating:4.5, time:'18 min', cal:'520 kcal', veg:true,  sale:true,  opts:{extras:['Extra Avocado +$1','Vegan Cheese +$0.5']} },
  { id:6,  name:'Double Bacon Stack',    desc:'Two 150g patties, smoked bacon, cheddar, lettuce, tomato, BBQ sauce.',                  price:13.99, oldPrice:null, emoji:'🍔', bg:'#ffe0e0', cat:'Burgers', rest:'BurgerBox',         rating:4.8, time:'22 min', cal:'980 kcal', veg:false, sale:false, opts:{} },
  { id:7,  name:'Salmon Sashimi',        desc:'12 pcs premium Atlantic salmon, wasabi, pickled ginger, soy sauce.',                    price:16.99, oldPrice:null, emoji:'🐟', bg:'#e8f0ff', cat:'Sushi',   rest:'Sakura Sushi',      rating:4.9, time:'30 min', cal:'360 kcal', veg:false, sale:false, opts:{pieces:['6 pcs','12 pcs','18 pcs']} },
  { id:8,  name:'Dragon Roll (8 pcs)',   desc:'Shrimp tempura, cucumber inside; avocado, tobiko & eel sauce on top.',                  price:18.99, oldPrice:22.99, emoji:'🍱', bg:'#e0ffe8', cat:'Sushi',   rest:'Sakura Sushi',      rating:4.8, time:'30 min', cal:'430 kcal', veg:false, sale:true,  opts:{spice:['No Spice','Mild','Spicy']} },
  { id:9,  name:'Veggie Rainbow Roll',   desc:'Cucumber, mango, carrot, avocado, sesame with ponzu dressing.',                         price:13.99, oldPrice:null, emoji:'🌈', bg:'#f8f0ff', cat:'Sushi',   rest:'Sakura Sushi',      rating:4.6, time:'28 min', cal:'310 kcal', veg:true,  sale:false, opts:{} },
  { id:10, name:'Pad Thai Noodles',      desc:'Stir-fried rice noodles, tamarind sauce, spring onion, peanuts, bean sprouts.',         price:11.99, oldPrice:null, emoji:'🍜', bg:'#fff8e0', cat:'Asian',   rest:'Bangkok Kitchen',   rating:4.7, time:'22 min', cal:'590 kcal', veg:false, sale:false, opts:{protein:['Chicken','Shrimp','Tofu'], spice:['Mild','Medium','Hot','Very Hot']} },
  { id:11, name:'Chicken Tikka Masala',  desc:'Tender chicken in creamy, aromatic tomato-based sauce with basmati rice.',              price:13.99, oldPrice:16.99, emoji:'🍛', bg:'#ffe8d0', cat:'Asian',   rest:'Spice Route',       rating:4.8, time:'35 min', cal:'650 kcal', veg:false, sale:true,  opts:{spice:['Mild','Medium','Hot']} },
  { id:12, name:'Chocolate Lava Cake',   desc:'Warm dark-chocolate cake with molten centre, vanilla bean ice cream.',                  price:6.99,  oldPrice:null, emoji:'🍫', bg:'#2d1b00', cat:'Desserts',rest:'Sweet Tooth',        rating:4.9, time:'15 min', cal:'480 kcal', veg:true,  sale:false, opts:{ice_cream:['Vanilla','Chocolate','Strawberry']} },
  { id:13, name:'Strawberry Milkshake',  desc:'Fresh strawberries, whole milk, premium vanilla ice cream blended thick.',              price:4.99,  oldPrice:null, emoji:'🥤', bg:'#ffe0f0', cat:'Drinks',  rest:'Sweet Tooth',        rating:4.6, time:'10 min', cal:'390 kcal', veg:true,  sale:false, opts:{size:['Regular','Large','XL']} },
  { id:14, name:'Matcha Bubble Tea',     desc:'Premium matcha powder, oat milk, honey, black tapioca pearls.',                         price:5.99,  oldPrice:7.99, emoji:'🧋', bg:'#e8ffe8', cat:'Drinks',  rest:'Tea Time',           rating:4.7, time:'12 min', cal:'310 kcal', veg:true,  sale:true,  opts:{sweet:['50%','75%','100%'], ice:['Normal','Less','No Ice']} },
  { id:15, name:'Garlic Cheese Bread',   desc:'Ciabatta, roasted garlic butter, three-cheese blend, fresh herbs.',                     price:5.99,  oldPrice:null, emoji:'🥖', bg:'#fffbe0', cat:'Sides',   rest:'Luigi\'s Pizzeria',  rating:4.7, time:'15 min', cal:'340 kcal', veg:true,  sale:false, opts:{} },
  { id:16, name:'Truffle Fries',         desc:'Crispy shoestring fries, white truffle oil, parmesan, fresh rosemary.',                 price:6.99,  oldPrice:8.99, emoji:'🍟', bg:'#fff8e0', cat:'Sides',   rest:'BurgerBox',          rating:4.8, time:'12 min', cal:'420 kcal', veg:true,  sale:true,  opts:{} },
];

const CATS = ['All', 'Pizza', 'Burgers', 'Sushi', 'Asian', 'Desserts', 'Drinks', 'Sides'];

const TRACK_STEPS = [
  { icon:'📋', title:'Order Confirmed',   sub:'Restaurant received your order'  },
  { icon:'👨‍🍳', title:'Preparing',         sub:'Chef is cooking your food'       },
  { icon:'📦', title:'Ready for Pickup',  sub:'Packing your order'              },
  { icon:'🛵', title:'Out for Delivery',  sub:'Rider is on the way'             },
  { icon:'🏠', title:'Delivered!',        sub:'Enjoy your meal! 🎉'             },
];

/* ── STATE ── */
let cart     = {};      // { itemId: { item, qty, opts:{} } }
let wishlist = new Set();
let currentCat  = 'All';
let viewMode    = 'grid';
let promoApplied = false;

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  buildCatBar();
  applyFilters();
});

/* ── CATEGORY BAR ── */
function buildCatBar() {
  const catEmojis = { All:'🍽️', Pizza:'🍕', Burgers:'🍔', Sushi:'🍣', Asian:'🍜', Desserts:'🍰', Drinks:'🥤', Sides:'🍟' };
  document.getElementById('cat-bar').innerHTML = CATS.map(c =>
    `<button class="cat-btn ${c===currentCat?'active':''}" onclick="setCat('${c}',this)">${catEmojis[c]} ${c}</button>`
  ).join('');
}

function setCat(cat, el) {
  currentCat = cat;
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  applyFilters();
}

/* ── FILTER & SORT ── */
function applyFilters() {
  let items = [...ITEMS];
  if (currentCat !== 'All') items = items.filter(i => i.cat === currentCat);
  const q = document.getElementById('search-input').value.toLowerCase();
  if (q) items = items.filter(i =>
    i.name.toLowerCase().includes(q) || i.rest.toLowerCase().includes(q) || i.cat.toLowerCase().includes(q)
  );
  if (document.getElementById('veg-toggle').checked) items = items.filter(i => i.veg);
  if (document.getElementById('deal-toggle').checked) items = items.filter(i => i.sale);
  const sort = document.getElementById('sort-sel').value;
  if (sort === 'rating')     items.sort((a,b) => b.rating - a.rating);
  if (sort === 'price-asc')  items.sort((a,b) => a.price - b.price);
  if (sort === 'price-desc') items.sort((a,b) => b.price - a.price);
  if (sort === 'time')       items.sort((a,b) => parseInt(a.time) - parseInt(b.time));

  document.getElementById('result-count').textContent =
    `Showing ${items.length} item${items.length !== 1 ? 's' : ''}`;
  renderGrid(items);
}

/* ── RENDER GRID ── */
function renderGrid(items) {
  const grid = document.getElementById('food-grid');
  grid.className = 'food-grid' + (viewMode === 'list' ? ' list-view' : '');
  grid.innerHTML = items.map(item => {
    const inCart = cart[item.id];
    const wished = wishlist.has(item.id);
    const qty    = inCart ? inCart.qty : 0;
    const badgeColor = item.sale ? '#ef4444' : '#6366f1';
    const badgeText  = item.sale ? 'SALE' : item.veg ? '🌿 VEG' : '';
    return `
    <div class="food-card" onclick="openItemModal(${item.id})">
      <div class="food-thumb" style="background:${item.bg}">
        ${item.emoji}
        ${badgeText ? `<div class="food-badge" style="background:${badgeColor}">${badgeText}</div>` : ''}
        <div class="food-wish ${wished ? 'wished' : ''}" onclick="toggleWish(event,${item.id})">
          ${wished ? '❤️' : '🤍'}
        </div>
      </div>
      <div class="food-body">
        <div class="food-top">
          <div class="food-name">${item.name}</div>
          <div class="food-veg">${item.veg ? '🟢' : '🔴'}</div>
        </div>
        <div class="food-rest">🏪 ${item.rest}</div>
        <div class="food-meta">
          <span>⭐ ${item.rating}</span>
          <span>⏱ ${item.time}</span>
          <span>🔥 ${item.cal}</span>
        </div>
        <div class="food-price-row">
          <div class="food-price">
            $${item.price}
            ${item.oldPrice ? `<span class="old-price">$${item.oldPrice}</span>` : ''}
          </div>
          ${qty > 0
            ? `<div class="qty-ctrl" onclick="event.stopPropagation()">
                <button onclick="changeQty(${item.id},-1)">−</button>
                <span>${qty}</span>
                <button onclick="changeQty(${item.id},1)">+</button>
               </div>`
            : `<button class="add-btn" onclick="event.stopPropagation();addToCart(${item.id})">+ Add</button>`
          }
        </div>
      </div>
    </div>`;
  }).join('');
}

function setView(mode, btn) {
  viewMode = mode;
  document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  applyFilters();
}

/* ── ITEM DETAIL MODAL ── */
function openItemModal(id) {
  const item = ITEMS.find(i => i.id === id);
  const optHtml = Object.entries(item.opts||{}).map(([key, vals]) => `
    <div class="im-options">
      <h4>${key.charAt(0).toUpperCase()+key.slice(1)}</h4>
      <div class="im-opt-row">
        ${vals.map((v,i) => `<div class="im-opt ${i===0?'selected':''}" onclick="selectOpt(this)">${v}</div>`).join('')}
      </div>
    </div>`).join('');

  document.getElementById('item-modal').innerHTML = `
    <div class="im-thumb" style="background:${item.bg}">${item.emoji}</div>
    <div class="im-body">
      <div class="im-name">${item.name} ${item.veg?'🟢':'🔴'}</div>
      <div class="im-desc">${item.desc}</div>
      <div class="im-meta" style="display:flex;gap:16px;margin-bottom:16px;font-size:13px;color:#64748b">
        <span>⭐ ${item.rating}</span><span>⏱ ${item.time}</span><span>🔥 ${item.cal}</span><span>🏪 ${item.rest}</span>
      </div>
      ${optHtml}
      <div class="im-footer">
        <div class="im-price">$${item.price}${item.oldPrice?`<span class="old-price">$${item.oldPrice}</span>`:''}</div>
        <button class="im-add" onclick="addToCart(${item.id});closeItemModal()">Add to Cart 🛒</button>
      </div>
    </div>`;
  document.getElementById('item-modal-bg').classList.add('open');
}

function selectOpt(el) {
  el.closest('.im-opt-row').querySelectorAll('.im-opt').forEach(x => x.classList.remove('selected'));
  el.classList.add('selected');
}

function closeItemModal(e) {
  if (!e || e.target === document.getElementById('item-modal-bg'))
    document.getElementById('item-modal-bg').classList.remove('open');
}

/* ── CART ── */
function addToCart(id) {
  const item = ITEMS.find(i => i.id === id);
  if (cart[id]) { cart[id].qty++; }
  else           { cart[id] = { item, qty:1 }; }
  updateCartUI();
  applyFilters();
  showToast(`${item.emoji} ${item.name} added to cart!`);
}

function changeQty(id, delta) {
  if (!cart[id]) return;
  cart[id].qty += delta;
  if (cart[id].qty <= 0) delete cart[id];
  updateCartUI();
  applyFilters();
}

function updateCartUI() {
  const entries   = Object.values(cart);
  const totalQty  = entries.reduce((s,e) => s+e.qty, 0);
  const subtotal  = entries.reduce((s,e) => s + e.item.price * e.qty, 0);
  const delivery  = subtotal > 0 ? (subtotal >= 20 ? 0 : 2.99) : 0;
  const discount  = promoApplied ? subtotal * .1 : 0;
  const total     = subtotal + delivery - discount;

  document.getElementById('cart-count').textContent = totalQty;

  // Restaurant tag
  const rests = [...new Set(entries.map(e => e.item.rest))];
  document.getElementById('cd-restaurant').textContent =
    rests.length ? `🏪 ${rests.join(', ')}` : '';

  // Items
  const cdItems = document.getElementById('cd-items');
  if (!entries.length) {
    cdItems.innerHTML = `<div class="empty-cart"><div>🛒</div><p>Your cart is empty</p><small style="color:#94a3b8">Add some delicious food!</small></div>`;
  } else {
    cdItems.innerHTML = entries.map(({item,qty}) => `
      <div class="cart-item">
        <div class="ci-emoji">${item.emoji}</div>
        <div class="ci-info">
          <div class="ci-name">${item.name}</div>
          <div class="ci-extras">${item.rest}</div>
          <div class="ci-price">$${(item.price * qty).toFixed(2)}</div>
        </div>
        <div class="ci-qty">
          <button onclick="changeQty(${item.id},-1)">−</button>
          <span>${qty}</span>
          <button onclick="changeQty(${item.id},1)">+</button>
        </div>
      </div>`).join('');
  }

  // Footer
  document.getElementById('cd-footer').innerHTML = entries.length ? `
    <div class="promo-row-input">
      <input type="text" id="promo-input" placeholder="Promo code (try FIRST50)" />
      <button onclick="applyPromo()">Apply</button>
    </div>
    <div class="cf-row"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
    <div class="cf-row"><span>Delivery</span><span>${delivery===0?'<span style="color:#059669">FREE</span>':'$'+delivery.toFixed(2)}</span></div>
    ${discount>0?`<div class="cf-row" style="color:#059669"><span>Promo (10%)</span><span>-$${discount.toFixed(2)}</span></div>`:''}
    <div class="cf-total"><span>Total</span><span>$${total.toFixed(2)}</span></div>
    <button class="btn-order" onclick="placeOrder()">Place Order 🚀</button>
  ` : '';
}

function applyPromo() {
  const code = document.getElementById('promo-input')?.value.trim().toUpperCase();
  if (code === 'FIRST50') { promoApplied = true; updateCartUI(); showToast('🎉 10% discount applied!'); }
  else showToast('❌ Invalid promo code');
}

function toggleCart() {
  document.getElementById('cart-drawer').classList.toggle('open');
  document.getElementById('wish-drawer').classList.remove('open');
  document.getElementById('overlay').classList.toggle('open');
}

/* ── WISHLIST ── */
function toggleWish(e, id) {
  e.stopPropagation();
  if (wishlist.has(id)) wishlist.delete(id);
  else wishlist.add(id);
  document.getElementById('wish-count').textContent = wishlist.size;
  applyFilters();
  updateWishlistUI();
}

function updateWishlistUI() {
  const items = [...wishlist].map(id => ITEMS.find(i => i.id === id));
  document.getElementById('wish-items').innerHTML = items.length
    ? items.map(item => `
        <div class="wish-item">
          <div class="wi-emoji">${item.emoji}</div>
          <div class="wi-info">
            <div class="wi-name">${item.name}</div>
            <div class="wi-price">$${item.price}</div>
          </div>
          <button class="wi-add" onclick="addToCart(${item.id})">Add 🛒</button>
        </div>`).join('')
    : '<div class="empty-cart"><div>🤍</div><p>No saved items yet</p></div>';
}

function toggleWishlist() {
  document.getElementById('wish-drawer').classList.toggle('open');
  document.getElementById('cart-drawer').classList.remove('open');
  document.getElementById('overlay').classList.toggle('open');
  updateWishlistUI();
}

/* ── ORDER TRACKER ── */
function placeOrder() {
  if (!Object.keys(cart).length) { showToast('Add items first!'); return; }
  toggleCart();

  const orderId = 'FD-' + Math.random().toString(36).substr(2,8).toUpperCase();
  document.getElementById('tm-order-id').textContent = orderId;
  document.getElementById('tm-subtitle').textContent = 'Your food is being prepared';

  // Build steps
  const stepsEl = document.getElementById('tracker-steps');
  stepsEl.innerHTML = TRACK_STEPS.map((s,i) => `
    <div class="ts-step" id="ts-${i}">
      <div class="ts-dot">${s.icon}</div>
      <div class="ts-info">
        <div class="ts-title">${s.title}</div>
        <div class="ts-sub">${s.sub}</div>
      </div>
    </div>`).join('');

  document.getElementById('tracker-modal').classList.add('open');

  // Animate steps
  let step = 0;
  document.getElementById(`ts-${step}`).classList.add('active');
  const etaEl = document.getElementById('tm-eta');

  const stepTimer = setInterval(() => {
    document.getElementById(`ts-${step}`).classList.remove('active');
    document.getElementById(`ts-${step}`).classList.add('done');
    step++;
    if (step < TRACK_STEPS.length) {
      document.getElementById(`ts-${step}`).classList.add('active');
      const minsLeft = Math.max(0, 30 - step * 6);
      etaEl.innerHTML = `Estimated arrival: <strong>${minsLeft} min</strong>`;
    } else {
      clearInterval(stepTimer);
      etaEl.innerHTML = `<strong style="color:#059669">Delivered! 🎉 Enjoy your meal!</strong>`;
      showRating();
    }
  }, 2000);

  // Build star rating
  const starRow = document.getElementById('star-row');
  starRow.innerHTML = [1,2,3,4,5].map(n =>
    `<span class="star-btn" onclick="rateStar(${n})" id="star-${n}">⭐</span>`
  ).join('');

  // Clear cart
  cart = {};
  promoApplied = false;
  updateCartUI();
  applyFilters();
}

function showRating() {
  const r = document.getElementById('tm-rating');
  setTimeout(() => { r.style.display='block'; }, 500);
}

function rateStar(n) {
  for (let i=1;i<=5;i++) {
    const s = document.getElementById(`star-${i}`);
    s.classList.toggle('lit', i <= n);
    s.style.opacity = i <= n ? '1' : '0.3';
  }
  showToast(`Thanks for your ${n}⭐ rating!`);
}

function closeTracker() {
  document.getElementById('tracker-modal').classList.remove('open');
  document.getElementById('tm-rating').style.display = 'none';
}

/* ── TOAST ── */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2800);
}