// Grocery Products Data
const products = [
  { id: 1, name: "Tomato", price: 40, category: "Vegetables", image: "images/tomato.png" },
  { id: 2, name: "Potato", price: 30, category: "Vegetables", image: "images/potato.png" },
  { id: 3, name: "Apple", price: 120, category: "Fruits", image: "images/apple.png" },
  { id: 4, name: "Banana", price: 60, category: "Fruits", image: "images/banana.png" },
  { id: 5, name: "Milk", price: 55, category: "Dairy", image: "images/milk.png" },
  { id: 6, name: "Cheese", price: 180, category: "Dairy", image: "images/cheese.png" },
  { id: 7, name: "Chips", price: 50, category: "Snacks", image: "images/chips.png" },
  { id: 8, name: "Biscuits", price: 40, category: "Snacks", image: "images/biscuits.png" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render Products
function displayProducts(list) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  list.forEach(product => {
    productList.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <small>${product.category}</small>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  });
}

// Filter
function filterProducts(category) {
  if (category === "All") {
    displayProducts(products);
  } else {
    displayProducts(products.filter(p => p.category === category));
  }
}

// Search
function searchProducts() {
  const value = document.getElementById("searchInput").value.toLowerCase();
  displayProducts(products.filter(p => p.name.toLowerCase().includes(value)));
}

// Cart Functions
function addToCart(id) {
  const item = cart.find(p => p.id === id);
  if (item) {
    item.quantity++;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, quantity: 1 });
  }
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const totalPrice = document.getElementById("total-price");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name}</span>
        <div>
          <button onclick="changeQty(${item.id}, -1)">-</button>
          ${item.quantity}
          <button onclick="changeQty(${item.id}, 1)">+</button>
          <button onclick="removeItem(${item.id})">x</button>
        </div>
      </div>
    `;
  });

  cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
  totalPrice.innerText = total;

  localStorage.setItem("cart", JSON.stringify(cart));
}

function changeQty(id, delta) {
  const item = cart.find(p => p.id === id);
  item.quantity += delta;
  if (item.quantity <= 0) {
    removeItem(id);
  } else {
    updateCart();
  }
}

function removeItem(id) {
  cart = cart.filter(p => p.id !== id);
  updateCart();
}

// Initial Load
displayProducts(products);
updateCart();
