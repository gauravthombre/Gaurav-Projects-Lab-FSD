const toys = [
  {
    id: 1,
    name: "Baby Soft Blocks",
    price: 499,
    ageGroup: "0-2",
    category: "Soft Toy",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b"
  },
  {
    id: 2,
    name: "Shape Sorter",
    price: 699,
    ageGroup: "3-5",
    category: "Educational",
    image: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8"
  },
  {
    id: 3,
    name: "Puzzle Board",
    price: 399,
    ageGroup: "6-8",
    category: "Puzzle",
    image: "https://images.unsplash.com/photo-1604881991720-f91add269bed"
  },
  {
    id: 4,
    name: "Action Robot",
    price: 1299,
    ageGroup: "9-12",
    category: "Action",
    image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30"
  },
  {
    id: 5,
    name: "Teddy Bear",
    price: 899,
    ageGroup: "3-5",
    category: "Soft Toy",
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1"
  }
];

let filtered = [...toys];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render
function render(list) {
  const grid = document.getElementById("toy-grid");
  grid.innerHTML = "";
  list.forEach(t => {
    grid.innerHTML += `
      <div class="card">
        <img src="${t.image}">
        <h3>${t.name}</h3>
        <span class="badge">${t.ageGroup}</span>
        <p>₹${t.price}</p>
        <button onclick="addToCart(${t.id})">Add to Cart</button>
      </div>
    `;
  });
}

// Filters
function filterAge(age) {
  filtered = age === "All" ? toys : toys.filter(t => t.ageGroup === age);
  render(filtered);
}

function filterCategory(cat) {
  let list = filtered;
  if (cat !== "All") list = list.filter(t => t.category === cat);
  render(list);
}

// Cart
function addToCart(id) {
  const item = cart.find(t => t.id === id);
  if (item) item.qty++;
  else cart.push({ ...toys.find(t => t.id === id), qty: 1 });
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
render(toys);
updateCart();