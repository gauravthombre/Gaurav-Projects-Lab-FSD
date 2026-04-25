// Shoe Data
const shoes = [
  {
    id: 1,
    name: "Air Runner",
    brand: "Nike",
    price: 4500,
    category: "Sports",
    sizes: [7, 8, 9, 10],
    image: "images/sports1.png"
  },
  {
    id: 2,
    name: "Classic Leather",
    brand: "Bata",
    price: 3200,
    category: "Formal",
    sizes: [6, 7, 8, 9],
    image: "images/formal1.png"
  },
  {
    id: 3,
    name: "Street Comfort",
    brand: "Puma",
    price: 1800,
    category: "Casual",
    sizes: [7, 8, 9, 10],
    image: "images/casual1.png"
  },
  {
    id: 4,
    name: "Pro Max",
    brand: "Adidas",
    price: 6200,
    category: "Sports",
    sizes: [8, 9, 10],
    image: "images/sports2.png"
  }
];

let filteredShoes = [...shoes];
let cart = JSON.parse(localStorage.getItem("cart")) || {};
let selectedSizes = {};

// Render Shoes
function renderShoes(list) {
  const shoeList = document.getElementById("shoe-list");
  shoeList.innerHTML = "";

  list.forEach(shoe => {
    shoeList.innerHTML += `
      <div class="shoe-card">
        <img src="${shoe.image}" alt="${shoe.name}">
        <h3>${shoe.name}</h3>
        <p>${shoe.brand}</p>
        <p>₹${shoe.price}</p>
        <small>${shoe.category}</small>

        <div class="sizes">
          ${shoe.sizes.map(size =>
            `<div class="size" onclick="selectSize(${shoe.id}, ${size}, this)">${size}</div>`
          ).join("")}
        </div>

        <button onclick="addToCart(${shoe.id})">Add to Cart</button>
      </div>
    `;
  });
}

// Size Selection
function selectSize(id, size, el) {
  selectedSizes[id] = size;
  el.parentElement.querySelectorAll(".size").forEach(s => s.classList.remove("active"));
  el.classList.add("active");
}

// Filters
function filterCategory(cat) {
  filteredShoes = cat === "All" ? shoes : shoes.filter(s => s.category === cat);
  renderShoes(filteredShoes);
}

function filterPrice(range) {
  let list = filteredShoes;
  if (range === "low") list = list.filter(s => s.price < 2000);
  if (range === "mid") list = list.filter(s => s.price >= 2000 && s.price <= 5000);
  if (range === "high") list = list.filter(s => s.price > 5000);
  renderShoes(list);
}

function searchShoes(text) {
  renderShoes(
    filteredShoes.filter(s =>
      s.name.toLowerCase().includes(text.toLowerCase()) ||
      s.brand.toLowerCase().includes(text.toLowerCase())
    )
  );
}

// Cart
function addToCart(id) {
  if (!selectedSizes[id]) {
    alert("Please select a shoe size first!");
    return;
  }

  const key = `${id}-${selectedSizes[id]}`;
  if (cart[key]) cart[key].qty++;
  else cart[key] = { ...shoes.find(s => s.id === id), size: selectedSizes[id], qty: 1 };

  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const totalPrice = document.getElementById("total-price");
  const cartCount = document.getElementById("cart-count");

  cartItems.innerHTML = "";
  let total = 0;
  let count = 0;

  Object.values(cart).forEach(item => {
    total += item.price * item.qty;
    count += item.qty;

    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name} (Size ${item.size}) x${item.qty}</span>
        <button onclick="removeItem('${item.id}-${item.size}')">Remove</button>
      </div>
    `;
  });

  totalPrice.innerText = total;
  cartCount.innerText = count;
  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeItem(key) {
  delete cart[key];
  updateCart();
}

// Init
renderShoes(shoes);
updateCart();
