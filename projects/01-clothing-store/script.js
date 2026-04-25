// Product Data
const products = [
  {
    id: 1,
    name: "Men T-Shirt",
    price: 799,
    category: "Men",
    image: "images/men1.png"
  },
  {
    id: 2,
    name: "Women Dress",
    price: 1499,
    category: "Women",
    image: "images/women1.png"
  },
  {
    id: 3,
    name: "Kids Hoodie",
    price: 999,
    category: "Kids",
    image: "images/kids1.png"
  },
  {
    id: 4,
    name: "Men Jacket",
    price: 2499,
    category: "Men",
    image: "images/men2.png"
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render Products
function displayProducts(items) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  items.forEach(product => {
    productList.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  });
}

// Category Filter
function filterCategory(category) {
  if (category === "All") {
    displayProducts(products);
  } else {
    const filtered = products.filter(p => p.category === category);
    displayProducts(filtered);
  }
}

// Search
function searchProducts() {
  const value = document.getElementById("searchInput").value.toLowerCase();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(value)
  );
  displayProducts(filtered);
}

// Cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const totalPrice = document.getElementById("total-price");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price;
    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name}</span>
        <span>₹${item.price}</span>
      </div>
    `;
  });

  cartCount.innerText = cart.length;
  totalPrice.innerText = total;
}

// Initial Load
displayProducts(products);
updateCart();
