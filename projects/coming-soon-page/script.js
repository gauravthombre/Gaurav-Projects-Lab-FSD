// Set launch date (change this to your actual launch date)
var launchDate = new Date("2025-01-01T00:00:00").getTime();

function updateCountdown() {
  var now = new Date().getTime();
  var diff = launchDate - now;

  if (diff <= 0) {
    document.getElementById('days').textContent = '00';
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    return;
  }

  var days = Math.floor(diff / (1000 * 60 * 60 * 24));
  var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('days').textContent = days < 10 ? '0' + days : days;
  document.getElementById('hours').textContent = hours < 10 ? '0' + hours : hours;
  document.getElementById('minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
  document.getElementById('seconds').textContent = seconds < 10 ? '0' + seconds : seconds;
}

// Update every second
updateCountdown();
setInterval(updateCountdown, 1000);

// Email form
document.getElementById('notifyForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var email = document.getElementById('emailInput').value;
  if (email) {
    document.getElementById('successMsg').style.display = 'block';
    this.reset();
  }
});
