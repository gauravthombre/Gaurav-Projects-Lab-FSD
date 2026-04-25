const gifts = [
  {
    id: 1,
    name: "Birthday Gift Box",
    price: 799,
    occasion: "Birthday",
    category: "Box",
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f"
  },
  {
    id: 2,
    name: "Romantic Roses",
    price: 1299,
    occasion: "Anniversary",
    category: "Flowers",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93"
  },
  {
    id: 3,
    name: "Wedding Hamper",
    price: 1999,
    occasion: "Wedding",
    category: "Hamper",
    image: "https://images.unsplash.com/photo-1520975916090-3105956dac38"
  },
  {
    id: 4,
    name: "Festival Sweets Box",
    price: 999,
    occasion: "Festival",
    category: "Sweets",
    image: "https://images.unsplash.com/photo-1606788075761-0c8e9b3f0d7c"
  },
  {
    id: 5,
    name: "Kids Toy Set",
    price: 499,
    occasion: "Kids",
    category: "Toys",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e"
  }
];

let filtered = [...gifts];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render
function render(list) {
  const grid = document.getElementById("gift-grid");
  grid.innerHTML = "";
  list.forEach(g => {
    grid.innerHTML += `
      <div class="card">
        <img src="${g.image}">
        <h3>${g.name}</h3>
        <span class="tag">${g.occasion}</span>
        <p>₹${g.price}</p>
        <button onclick="addToCart(${g.id})">Add to Cart</button>
      </div>
    `;
  });
}

// Filters
function filterOccasion(o) {
  filtered = o === "All" ? gifts : gifts.filter(g => g.occasion === o);
  render(filtered);
}

function filterPrice(range) {
  let list = filtered;
  if (range === "low") list = list.filter(g => g.price < 500);
  if (range === "mid") list = list.filter(g => g.price >= 500 && g.price <= 1500);
  if (range === "high") list = list.filter(g => g.price > 1500);
  render(list);
}

// Cart
function addToCart(id) {
  const item = cart.find(g => g.id === id);
  if (item) item.qty++;
  else cart.push({ ...gifts.find(g => g.id === id), qty: 1 });
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
render(gifts);
updateCart();
