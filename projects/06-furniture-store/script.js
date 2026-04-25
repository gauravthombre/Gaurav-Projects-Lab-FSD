const furniture = [
  {
    id: 1,
    name: "Modern Sofa",
    room: "Living",
    price: 42000,
    material: "Fabric",
    dimensions: "200 x 90 x 85 cm",
    description: "Comfortable modern fabric sofa",
    image: "images/sofa.png"
  },
  {
    id: 2,
    name: "Wooden Bed",
    room: "Bedroom",
    price: 58000,
    material: "Wood",
    dimensions: "210 x 180 x 100 cm",
    description: "Solid wood king-size bed",
    image: "images/bed.png"
  },
  {
    id: 3,
    name: "Office Desk",
    room: "Office",
    price: 26000,
    material: "Wood",
    dimensions: "140 x 70 x 75 cm",
    description: "Minimal work desk",
    image: "images/desk.png"
  },
  {
    id: 4,
    name: "Dining Table",
    room: "Dining",
    price: 48000,
    material: "Wood",
    dimensions: "180 x 90 x 75 cm",
    description: "6-seater dining table",
    image: "images/dining.png"
  }
];

let filtered = [...furniture];

function renderGrid(list) {
  const grid = document.getElementById("furniture-grid");
  grid.innerHTML = "";

  list.forEach(item => {
    grid.innerHTML += `
      <div class="item" onclick="openDetails(${item.id})">
        <img src="${item.image}">
        <div class="overlay">View Details</div>
        <h4>${item.name}</h4>
        <p>₹${item.price}</p>
      </div>
    `;
  });
}

function filterRoom(room) {
  filtered = room === "All" ? furniture : furniture.filter(f => f.room === room);
  renderGrid(filtered);
}

function filterMaterial(mat) {
  const list = mat === "All" ? filtered : filtered.filter(f => f.material === mat);
  renderGrid(list);
}

function openDetails(id) {
  const item = furniture.find(f => f.id === id);
  document.getElementById("detail-name").innerText = item.name;
  document.getElementById("detail-desc").innerText = item.description;
  document.getElementById("detail-material").innerText = item.material;
  document.getElementById("detail-dimensions").innerText = item.dimensions;
  document.getElementById("detail-price").innerText = item.price;
  document.getElementById("detail-panel").classList.add("active");
}

function closeDetails() {
  document.getElementById("detail-panel").classList.remove("active");
}

renderGrid(furniture);
