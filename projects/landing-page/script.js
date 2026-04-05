// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(function(link) {
  link.addEventListener('click', function(e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Email form
document.getElementById('emailForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var email = document.getElementById('emailInput').value;
  if (email) {
    document.getElementById('successMsg').style.display = 'block';
    this.reset();
  }
});
