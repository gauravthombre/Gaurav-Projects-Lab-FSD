const bakeryItems = [
  {
    id: 1,
    name: "Chocolate Cake",
    price: 899,
    category: "Cakes",
    eggless: true,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587"
  },
  {
    id: 2,
    name: "Strawberry Pastry",
    price: 199,
    category: "Pastries",
    eggless: false,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c"
  },
  {
    id: 3,
    name: "Garlic Bread",
    price: 149,
    category: "Bread",
    eggless: true,
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec"
  },
  {
    id: 4,
    name: "Choco Cookies",
    price: 249,
    category: "Cookies",
    eggless: false,
    image: "https://images.unsplash.com/photo-1599785209707-28e2e0e0b3f7"
  },
  {
    id: 5,
    name: "Cheesecake",
    price: 499,
    category: "Desserts",
    eggless: true,
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187"
  }
];

let filtered = [...bakeryItems];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render
function render(list) {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";
  list.forEach(b => {
    grid.innerHTML += `
      <div class="card">
        <img src="${b.image}">
        <h3>${b.name}</h3>
        ${b.eggless ? '<span class="badge">Eggless</span>' : ''}
        <p>₹${b.price}</p>
        <button onclick="addToCart(${b.id})">Add to Cart</button>
      </div>
    `;
  });
}

// Filters
function filterCategory(cat) {
  filtered = cat === "All" ? bakeryItems : bakeryItems.filter(b => b.category === cat);
  render(filtered);
}

function filterEggless(type) {
  let list = filtered;
  if (type === "eggless") list = list.filter(b => b.eggless);
  if (type === "regular") list = list.filter(b => !b.eggless);
  render(list);
}

// Cart
function addToCart(id) {
  const item = cart.find(b => b.id === id);
  if (item) item.qty++;
  else cart.push({ ...bakeryItems.find(b => b.id === id), qty: 1 });
  updateCart();
}

function updateCart() {
  const items = document.getElementById("cart-items");
  const totalEl = document.getElementById("total-price");
  const countEl = document.getElementById("cart-count");

  items.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach(i => {
    total += i.price * i.qty;
    count += i.qty;
    items.innerHTML += `
      <div class="cart-item">
        <span>${i.name} x${i.qty}</span>
        <button onclick="removeItem(${i.id})">Remove</button>
      </div>
    `;
  });

  totalEl.innerText = total;
  countEl.innerText = count;
  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  updateCart();
}

// Init
render(bakeryItems);
updateCart();