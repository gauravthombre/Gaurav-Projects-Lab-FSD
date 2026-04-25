const products = [
  {
    id: 1,
    name: "Dog Food Premium",
    price: 899,
    petType: "Dogs",
    category: "Food",
    image: "https://images.unsplash.com/photo-1583511655826-05700442b31b"
  },
  {
    id: 2,
    name: "Cat Toy Ball",
    price: 299,
    petType: "Cats",
    category: "Toy",
    image: "https://images.unsplash.com/photo-1598137267438-81f3a5b76c4e"
  },
  {
    id: 3,
    name: "Bird Cage",
    price: 1599,
    petType: "Birds",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1598751337485-74b7b6b4f1a5"
  },
  {
    id: 4,
    name: "Fish Tank",
    price: 2499,
    petType: "Fish",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13"
  },
  {
    id: 5,
    name: "Hamster Wheel",
    price: 499,
    petType: "Small Pets",
    category: "Toy",
    image: "https://images.unsplash.com/photo-1601758123927-1963b89e0c9b"
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
        <span class="badge">${p.petType}</span>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

// Filters
function filterPet(type) {
  filtered = type === "All" ? products : products.filter(p => p.petType === type);
  render(filtered);
}

function filterCategory(cat) {
  let list = filtered;
  if (cat !== "All") list = list.filter(p => p.category === cat);
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
