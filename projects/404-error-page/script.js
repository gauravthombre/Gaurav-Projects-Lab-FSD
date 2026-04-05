// Show how many seconds the user has been on the 404 page
var seconds = 0;
setInterval(function() {
  seconds++;
  var msg = document.querySelector('.wrapper p');
  if (seconds === 10) {
    msg.textContent = "Still here? Let us help you get back on track!";
  }
}, 1000);
