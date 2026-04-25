// Book Data
const books = [
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 299,
    genre: "Fiction",
    image: "images/alchemist.png"
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    price: 399,
    genre: "Non-Fiction",
    image: "images/atomic-habits.png"
  },
  {
    id: 3,
    title: "Clean Code",
    author: "Robert C. Martin",
    price: 599,
    genre: "Education",
    image: "images/clean-code.png"
  },
  {
    id: 4,
    title: "Steve Jobs",
    author: "Walter Isaacson",
    price: 499,
    genre: "Biography",
    image: "images/steve-jobs.png"
  }
];

let filteredBooks = [...books];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render Books
function renderBooks(list) {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";

  list.forEach(book => {
    bookList.innerHTML += `
      <div class="book-card">
        <img src="${book.image}" alt="${book.title}">
        <h3>${book.title}</h3>
        <p><strong>${book.author}</strong></p>
        <p>₹${book.price}</p>
        <small>${book.genre}</small>
        <button onclick="addToCart(${book.id})">Add to Cart</button>
      </div>
    `;
  });
}

// Filter
function filterGenre(genre) {
  filteredBooks =
    genre === "All" ? books : books.filter(b => b.genre === genre);
  renderBooks(filteredBooks);
}

// Search
function searchBooks(text) {
  renderBooks(
    filteredBooks.filter(b =>
      b.title.toLowerCase().includes(text.toLowerCase()) ||
      b.author.toLowerCase().includes(text.toLowerCase())
    )
  );
}

// Sort
function sortBooks(type) {
  let sorted = [...filteredBooks];
  if (type === "low") sorted.sort((a, b) => a.price - b.price);
  if (type === "high") sorted.sort((a, b) => b.price - a.price);
  if (type === "az") sorted.sort((a, b) => a.title.localeCompare(b.title));
  renderBooks(sorted);
}

// Cart
function addToCart(id) {
  const item = cart.find(b => b.id === id);
  if (item) item.qty++;
  else cart.push({ ...books.find(b => b.id === id), qty: 1 });
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
        <span>${item.title} (x${item.qty})</span>
        <div>
          <button onclick="changeQty(${item.id}, -1)">-</button>
          <button onclick="changeQty(${item.id}, 1)">+</button>
          <button onclick="removeFromCart(${item.id})">x</button>
        </div>
      </div>
    `;
  });

  totalPrice.innerText = total;
  cartCount.innerText = cart.reduce((a, b) => a + b.qty, 0);
  localStorage.setItem("cart", JSON.stringify(cart));
}

function changeQty(id, delta) {
  const item = cart.find(b => b.id === id);
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else updateCart();
}

function removeFromCart(id) {
  cart = cart.filter(b => b.id !== id);
  updateCart();
}

// Init
renderBooks(books);
updateCart();
