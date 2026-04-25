const phones = [
  {
    id: 1,
    name: "iPhone 14",
    brand: "Apple",
    price: 69999,
    ram: "6GB",
    storage: "128GB",
    camera: "12MP",
    image: "https://images.unsplash.com/photo-1664478546386-2c5a1e2f8f9e"
  },
  {
    id: 2,
    name: "Samsung S23",
    brand: "Samsung",
    price: 74999,
    ram: "8GB",
    storage: "256GB",
    camera: "50MP",
    image: "https://images.unsplash.com/photo-1670272505340-d906d8d77c7b"
  },
  {
    id: 3,
    name: "OnePlus 11",
    brand: "OnePlus",
    price: 56999,
    ram: "12GB",
    storage: "256GB",
    camera: "50MP",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf"
  },
  {
    id: 4,
    name: "Xiaomi 13",
    brand: "Xiaomi",
    price: 49999,
    ram: "8GB",
    storage: "256GB",
    camera: "50MP",
    image: "https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00"
  }
];

let filtered = [...phones];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let compareList = [];

// Render
function render(list) {
  const grid = document.getElementById("phone-grid");
  grid.innerHTML = "";
  list.forEach(p => {
    grid.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>${p.brand}</p>
        <p>${p.ram} / ${p.storage}</p>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
        <div class="compare-check">
          <input type="checkbox" onchange="toggleCompare(${p.id}, this)">
          Compare
        </div>
      </div>
    `;
  });
}

// Filters
function filterBrand(b) {
  filtered = b === "All" ? phones : phones.filter(p => p.brand === b);
  render(filtered);
}

function filterPrice(range) {
  let list = filtered;
  if (range === "low") list = list.filter(p => p.price < 20000);
  if (range === "mid") list = list.filter(p => p.price >= 20000 && p.price <= 50000);
  if (range === "high") list = list.filter(p => p.price > 50000);
  render(list);
}

// Compare
function toggleCompare(id, el) {
  if (el.checked) {
    if (compareList.length >= 2) {
      el.checked = false;
      return alert("Select up to 2 phones");
    }
    compareList.push(phones.find(p => p.id === id));
  } else {
    compareList = compareList.filter(p => p.id !== id);
  }
  updateCompare();
}

function updateCompare() {
  const t = document.getElementById("compare-table");
  const p1 = compareList[0];
  const p2 = compareList[1];

  t.innerHTML = `
    <tr>
      <th>Feature</th>
      <th>${p1?.name || "-"}</th>
      <th>${p2?.name || "-"}</th>
    </tr>
    <tr><td>Brand</td><td>${p1?.brand || "-"}</td><td>${p2?.brand || "-"}</td></tr>
    <tr><td>Price</td><td>₹${p1?.price || "-"}</td><td>₹${p2?.price || "-"}</td></tr>
    <tr><td>RAM</td><td>${p1?.ram || "-"}</td><td>${p2?.ram || "-"}</td></tr>
    <tr><td>Storage</td><td>${p1?.storage || "-"}</td><td>${p2?.storage || "-"}</td></tr>
    <tr><td>Camera</td><td>${p1?.camera || "-"}</td><td>${p2?.camera || "-"}</td></tr>
  `;
}

// Cart
function addToCart(id) {
  const item = cart.find(p => p.id === id);
  if (item) item.qty++;
  else cart.push({ ...phones.find(p => p.id === id), qty: 1 });
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
render(phones);
updateCart();
