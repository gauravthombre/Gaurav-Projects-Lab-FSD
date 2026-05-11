const movies = [
  { title: 'OPPENHEIMER II', genre: 'Drama · Thriller', rating: '8.9', emoji: '💣', bg: '#1a1a0a' },
  { title: 'AVATAR 3', genre: 'Sci-Fi · Adventure', rating: '8.4', emoji: '🌿', bg: '#0a1a1a' },
  { title: 'INTERSTELLAR 2', genre: 'Sci-Fi · Drama', rating: '9.2', emoji: '🪐', bg: '#0a0a1a' },
  { title: 'THE BATMAN 2', genre: 'Action · Crime', rating: '8.7', emoji: '🦇', bg: '#1a0a0a' },
  { title: 'MAD MAX 6', genre: 'Action · Adventure', rating: '8.5', emoji: '🔥', bg: '#1a100a' },
  { title: 'PARASITE 2', genre: 'Thriller · Drama', rating: '8.8', emoji: '🪲', bg: '#0f1a0a' },
];

const grid = document.getElementById('moviesGrid');
movies.forEach(m => {
  const card = document.createElement('div');
  card.className = 'movie-card';
  card.innerHTML = `
    <div class="movie-thumb" style="background:${m.bg}">${m.emoji}</div>
    <div class="movie-info">
      <h3>${m.title}</h3>
      <p>${m.genre}</p>
      <p class="movie-rating">⭐ ${m.rating}</p>
    </div>`;
  card.onclick = showBooking;
  grid.appendChild(card);
});

// Showtimes
document.querySelectorAll('.showtime').forEach(el => {
  el.addEventListener('click', () => {
    document.querySelectorAll('.showtime').forEach(s => s.classList.remove('active'));
    el.classList.add('active');
    generateSeats();
  });
});

// Seats
const PRICE = 280;
let selectedSeats = new Set();

function generateSeats() {
  selectedSeats.clear();
  updateSummary();
  const grid = document.getElementById('seatsGrid');
  grid.innerHTML = '';
  const taken = new Set();
  while (taken.size < 18) taken.add(Math.floor(Math.random() * 60));

  for (let i = 0; i < 60; i++) {
    const seat = document.createElement('button');
    seat.className = 'seat ' + (taken.has(i) ? 'taken' : 'available');
    if (!taken.has(i)) {
      seat.onclick = () => toggleSeat(seat, i);
    }
    grid.appendChild(seat);
  }
}

function toggleSeat(el, i) {
  if (el.classList.contains('taken')) return;
  if (el.classList.contains('selected')) {
    el.classList.replace('selected', 'available');
    selectedSeats.delete(i);
  } else {
    el.classList.replace('available', 'selected');
    selectedSeats.add(i);
  }
  updateSummary();
}

function updateSummary() {
  document.getElementById('selectedCount').textContent = selectedSeats.size;
  document.getElementById('totalPrice').textContent = (selectedSeats.size * PRICE).toLocaleString('en-IN');
}

function showBooking() {
  document.getElementById('modalOverlay').classList.add('active');
  generateSeats();
}

function hideBooking() {
  document.getElementById('modalOverlay').classList.remove('active');
}

function confirmBooking() {
  if (selectedSeats.size === 0) {
    alert('Please select at least one seat!');
    return;
  }
  hideBooking();
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}