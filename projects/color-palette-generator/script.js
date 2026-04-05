var savedPalettes = [];

// Generate a random hex color
function randomHex() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Generate 5 random colors and display them
function generatePalette() {
  var palette = document.getElementById('palette');
  palette.innerHTML = '';

  for (var i = 0; i < 5; i++) {
    var hex = randomHex();

    var box = document.createElement('div');
    box.className = 'color-box';
    box.innerHTML =
      '<div class="color-swatch" style="background-color:' + hex + '"></div>' +
      '<div class="color-info">' +
        '<div class="color-hex">' + hex + '</div>' +
        '<div class="color-label">Click to copy</div>' +
      '</div>';

    // Copy hex on click
    box.addEventListener('click', (function(h) {
      return function() {
        navigator.clipboard.writeText(h).then(function() {
          var msg = document.getElementById('copyMsg');
          msg.style.display = 'block';
          setTimeout(function() { msg.style.display = 'none'; }, 2000);
        });
      };
    })(hex));

    palette.appendChild(box);
  }
}

// Save current palette
document.getElementById('saveBtn').addEventListener('click', function() {
  var boxes = document.querySelectorAll('.color-hex');
  if (boxes.length === 0) {
    alert('Please generate a palette first!');
    return;
  }

  var colors = [];
  boxes.forEach(function(box) {
    colors.push(box.textContent);
  });

  savedPalettes.push(colors);
  displaySaved();
});

function displaySaved() {
  var container = document.getElementById('savedPalettes');
  container.innerHTML = '';

  if (savedPalettes.length === 0) {
    container.innerHTML = '<p style="color:#aaa;font-size:14px;">No saved palettes yet.</p>';
    return;
  }

  savedPalettes.forEach(function(palette) {
    var div = document.createElement('div');
    div.className = 'saved-palette';

    palette.forEach(function(hex) {
      var swatch = document.createElement('div');
      swatch.className = 'saved-swatch';
      swatch.style.backgroundColor = hex;
      swatch.title = hex;
      div.appendChild(swatch);
    });

    var label = document.createElement('span');
    label.className = 'saved-hex';
    label.textContent = palette.join(', ');
    div.appendChild(label);

    container.appendChild(div);
  });
}

// Generate a palette on page load
document.getElementById('generateBtn').addEventListener('click', generatePalette);
generatePalette();
displaySaved();
