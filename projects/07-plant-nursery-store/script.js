const plants = [
  {
    id: 1,
    name: "Snake Plant",
    price: 899,
    sunlight: "Low",
    water: "Light",
    place: "Indoor",
    description: "Hardy indoor plant with air-purifying qualities.",
    image: "images/snake.png"
  },
  {
    id: 2,
    name: "Areca Palm",
    price: 1499,
    sunlight: "Medium",
    water: "Moderate",
    place: "Balcony / Indoor",
    description: "Lush palm that brings tropical freshness.",
    image: "images/areca.png"
  },
  {
    id: 3,
    name: "Peace Lily",
    price: 1299,
    sunlight: "Low",
    water: "Regular",
    place: "Indoor",
    description: "Elegant flowering plant with white blooms.",
    image: "images/lily.png"
  },
  {
    id: 4,
    name: "Succulent Mix",
    price: 599,
    sunlight: "High",
    water: "Light",
    place: "Window / Balcony",
    description: "Low-maintenance succulent collection.",
    image: "images/succulent.png"
  }
];

let filtered = [...plants];

function renderPlants(list) {
  const grid = document.getElementById("plant-grid");
  grid.innerHTML = "";

  list.forEach(p => {
    grid.innerHTML += `
      <div class="plant-card" onclick="openDetails(${p.id})">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <small>☀️ ${p.sunlight} | 💧 ${p.water}</small>
      </div>
    `;
  });
}

function filterSun(level) {
  filtered = plants.filter(p => p.sunlight === level);
  renderPlants(filtered);
}

function filterWater(level) {
  filtered = plants.filter(p => p.water === level);
  renderPlants(filtered);
}

function resetFilters() {
  filtered = [...plants];
  renderPlants(filtered);
}

function openDetails(id) {
  const p = plants.find(pl => pl.id === id);
  document.getElementById("detail-name").innerText = p.name;
  document.getElementById("detail-desc").innerText = p.description;
  document.getElementById("detail-sun").innerText = p.sunlight;
  document.getElementById("detail-water").innerText = p.water;
  document.getElementById("detail-place").innerText = p.place;
  document.getElementById("detail-price").innerText = p.price;
  document.getElementById("detail-panel").classList.add("active");
}

function closeDetails() {
  document.getElementById("detail-panel").classList.remove("active");
}

renderPlants(plants);
