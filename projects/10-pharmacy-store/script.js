const medicines = [
  {
    id: 1,
    name: "Paracetamol Tablets",
    price: 120,
    category: "Tablets",
    prescriptionRequired: false,
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5"
  },
  {
    id: 2,
    name: "Cough Syrup",
    price: 180,
    category: "Syrups",
    prescriptionRequired: false,
    image: "https://images.unsplash.com/photo-1584367369853-9b6b7f3c0d28"
  },
  {
    id: 3,
    name: "Vitamin Capsules",
    price: 350,
    category: "Supplements",
    prescriptionRequired: false,
    image: "https://images.unsplash.com/photo-1588774069410-84ae30757c8e"
  },
  {
    id: 4,
    name: "Antibiotic Tablets",
    price: 420,
    category: "Tablets",
    prescriptionRequired: true,
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5"
  },
  {
    id: 5,
    name: "First Aid Kit",
    price: 650,
    category: "First Aid",
    prescriptionRequired: false,
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde"
  }
];

let filtered = [...medicines];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render
function render(list) {
  const grid = document.getElementById("medicine-grid");
  grid.innerHTML = "";
  list.forEach(m => {
    grid.innerHTML += `
      <div class="card">
        <img src="${m.image}">
        <h3>${m.name}</h3>
        <p>${m.category}</p>
        <p>₹${m.price}</p>
        ${m.prescriptionRequired ? '<span class="badge">Prescription Required</span>' : ''}
        <button onclick="addToCart(${m.id})">Add to Cart</button>
      </div>
    `;
  });
}

// Filters
function filterCategory(cat) {
  filtered = cat === "All" ? medicines : medicines.filter(m => m.category === cat);
  render(filtered);
}

function filterPrescription(type) {
  let list = filtered;
  if (type === "rx") list = list.filter(m => m.prescriptionRequired);
  if (type === "otc") list = list.filter(m => !m.prescriptionRequired);
  render(list);
}

// Cart
function addToCart(id) {
  const item = cart.find(m => m.id === id);
  if (item) item.qty++;
  else cart.push({ ...medicines.find(m => m.id === id), qty: 1 });
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
render(medicines);
updateCart();
