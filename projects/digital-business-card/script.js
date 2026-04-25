// Share button
document.getElementById('shareBtn').addEventListener('click', function() {
  if (navigator.share) {
    navigator.share({
      title: 'Gaurav Thombre - Business Card',
      text: 'Check out my digital business card!',
      url: window.location.href
    }).catch(function(err) {
      console.log('Share cancelled');
    });
  } else {
    // Fallback: copy URL to clipboard
    navigator.clipboard.writeText(window.location.href).then(function() {
      alert('Link copied to clipboard! Share it with anyone.');
    }).catch(function() {
      alert('Share this URL: ' + window.location.href);
    });
  }
});
