const jewelry = [
  {
    id: 1,
    name: "Gold Ring",
    price: 15999,
    category: "Rings",
    material: "Gold",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e"
  },
  {
    id: 2,
    name: "Diamond Necklace",
    price: 55999,
    category: "Necklaces",
    material: "Diamond",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f"
  },
  {
    id: 3,
    name: "Silver Earrings",
    price: 4999,
    category: "Earrings",
    material: "Silver",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d"
  },
  {
    id: 4,
    name: "Gold Bracelet",
    price: 22999,
    category: "Bracelets",
    material: "Gold",
    image: "https://images.unsplash.com/photo-1605100804689-4f45cbbca6d4"
  }
];

let filtered = [...jewelry];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render
function render(list) {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";
  list.forEach(j => {
    grid.innerHTML += `
      <div class="card">
        <img src="${j.image}">
        <h3>${j.name}</h3>
        <span class="badge">${j.material}</span>
        <p>₹${j.price}</p>
        <button onclick="addToCart(${j.id})">Add to Cart</button>
      </div>
    `;
  });
}

// Filters
function filterCategory(cat) {
  filtered = cat === "All" ? jewelry : jewelry.filter(j => j.category === cat);
  render(filtered);
}

function filterMaterial(mat) {
  let list = filtered;
  if (mat !== "All") list = list.filter(j => j.material === mat);
  render(list);
}

// Cart
function addToCart(id) {
  const item = cart.find(j => j.id === id);
  if (item) item.qty++;
  else cart.push({ ...jewelry.find(j => j.id === id), qty: 1 });
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
render(jewelry);
updateCart();