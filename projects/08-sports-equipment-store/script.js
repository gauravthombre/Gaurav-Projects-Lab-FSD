const products = [
  {
    id: 1,
    name: "Cricket Bat",
    price: 3500,
    category: "Cricket",
    brand: "SG",
    image: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d"
  },
  {
    id: 2,
    name: "Football",
    price: 1800,
    category: "Football",
    brand: "Nike",
    image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6"
  },
  {
    id: 3,
    name: "Dumbbell Set",
    price: 5200,
    category: "Gym",
    brand: "Adidas",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61"
  },
  {
    id: 4,
    name: "Badminton Racket",
    price: 4200,
    category: "Badminton",
    brand: "Yonex",
    image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae"
  },
  {
    id: 5,
    name: "Yoga Mat",
    price: 1200,
    category: "Fitness",
    brand: "Nike",
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e"
  }
];

let filtered = [...products];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render
function render(list) {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";
  list.forEach(p => {
    grid.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>${p.category}</p>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

// Filters
function filterCategory(cat) {
  filtered = cat === "All" ? products : products.filter(p => p.category === cat);
  render(filtered);
}

function filterPrice(range) {
  let list = filtered;
  if (range === "low") list = list.filter(p => p.price < 2000);
  if (range === "mid") list = list.filter(p => p.price >= 2000 && p.price <= 5000);
  if (range === "high") list = list.filter(p => p.price > 5000);
  render(list);
}

function filterBrand(brand) {
  let list = filtered;
  if (brand !== "All") list = list.filter(p => p.brand === brand);
  render(list);
}

// Cart
function addToCart(id) {
  const item = cart.find(p => p.id === id);
  if (item) item.qty++;
  else cart.push({ ...products.find(p => p.id === id), qty: 1 });
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
render(products);
updateCart();
