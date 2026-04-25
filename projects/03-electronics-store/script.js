// Product Data
const products = [
  {
    id: 1,
    name: "Smartphone X",
    price: 18000,
    category: "Mobiles",
    specs: ["6GB RAM", "128GB Storage", "5000mAh Battery"],
    image: "images/mobile.png"
  },
  {
    id: 2,
    name: "Laptop Pro",
    price: 65000,
    category: "Laptops",
    specs: ["16GB RAM", "512GB SSD", "Intel i7"],
    image: "images/laptop.png"
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    price: 3500,
    category: "Accessories",
    specs: ["Bluetooth 5.0", "Noise Cancellation"],
    image: "images/earbuds.png"
  },
  {
    id: 4,
    name: "Gaming Laptop",
    price: 90000,
    category: "Laptops",
    specs: ["RTX Graphics", "16GB RAM", "1TB SSD"],
    image: "images/gaming.png"
  }
];

let filteredProducts = [...products];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let compareList = [];

// Render Products
function renderProducts(list) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  list.forEach(p => {
    productList.innerHTML += `
      <div class="product-card">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <small>${p.category}</small>
        <ul>${p.specs.map(s => `<li>${s}</li>`).join("")}</ul>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
        <button onclick="addToCompare(${p.id})">Compare</button>
      </div>
    `;
  });
}

// Filters
function filterCategory(cat) {
  filteredProducts = cat === "All"
    ? products
    : products.filter(p => p.category === cat);
  renderProducts(filteredProducts);
}

function filterPrice(range) {
  let list = filteredProducts;
  if (range === "low") list = list.filter(p => p.price < 20000);
  if (range === "mid") list = list.filter(p => p.price >= 20000 && p.price <= 50000);
  if (range === "high") list = list.filter(p => p.price > 50000);
  renderProducts(list);
}

function searchProducts(text) {
  renderProducts(
    filteredProducts.filter(p =>
      p.name.toLowerCase().includes(text.toLowerCase())
    )
  );
}

// Cart
function addToCart(id) {
  const item = cart.find(p => p.id === id);
  if (item) item.qty++;
  else cart.push({ ...products.find(p => p.id === id), qty: 1 });
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const totalPrice = document.getElementById("total-price");
  const cartCount = document.getElementById("cart-count");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name} (x${item.qty})</span>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `;
  });

  totalPrice.innerText = total;
  cartCount.innerText = cart.reduce((a, b) => a + b.qty, 0);
  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeFromCart(id) {
  cart = cart.filter(p => p.id !== id);
  updateCart();
}

// Compare
function addToCompare(id) {
  if (compareList.length >= 2) return alert("Only 2 products allowed");
  compareList.push(products.find(p => p.id === id));
  updateCompare();
}

function updateCompare() {
  const table = document.getElementById("compare-table");
  table.innerHTML = `
    <tr>
      <th>Feature</th>
      <th>${compareList[0]?.name || "-"}</th>
      <th>${compareList[1]?.name || "-"}</th>
    </tr>
    <tr>
      <td>Price</td>
      <td>₹${compareList[0]?.price || "-"}</td>
      <td>₹${compareList[1]?.price || "-"}</td>
    </tr>
    <tr>
      <td>Specs</td>
      <td>${compareList[0]?.specs.join(", ") || "-"}</td>
      <td>${compareList[1]?.specs.join(", ") || "-"}</td>
    </tr>
  `;
}

// Init
renderProducts(products);
updateCart();
