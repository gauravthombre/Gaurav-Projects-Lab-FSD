var emojis = ['🍎','🍌','🍇','🍓','🍕','🎸','🚀','🦁'];
var cards = [];
var flipped = [];
var matched = 0;
var moves = 0;
var timerInterval = null;
var seconds = 0;
var canFlip = true;

function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}

function startTimer() {
  clearInterval(timerInterval);
  seconds = 0;
  document.getElementById('timer').textContent = '0s';
  timerInterval = setInterval(function() {
    seconds++;
    document.getElementById('timer').textContent = seconds + 's';
  }, 1000);
}

function initGame() {
  matched = 0; moves = 0; flipped = []; canFlip = true;
  document.getElementById('moves').textContent = '0';
  document.getElementById('matches').textContent = '0';
  document.getElementById('winMsg').style.display = 'none';

  var pairs = shuffle(emojis.concat(emojis));
  var board = document.getElementById('board');
  board.innerHTML = '';
  cards = [];

  pairs.forEach(function(emoji, i) {
    var card = document.createElement('div');
    card.className = 'card';
    card.dataset.emoji = emoji;
    card.dataset.index = i;
    card.innerHTML =
      '<div class="card-front">?</div>' +
      '<div class="card-back">' + emoji + '</div>';
    card.addEventListener('click', function() { flipCard(this); });
    board.appendChild(card);
    cards.push(card);
  });

  startTimer();
}

function flipCard(card) {
  if (!canFlip) return;
  if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
  if (flipped.length >= 2) return;

  card.classList.add('flipped');
  flipped.push(card);

  if (flipped.length === 2) {
    canFlip = false;
    moves++;
    document.getElementById('moves').textContent = moves;

    if (flipped[0].dataset.emoji === flipped[1].dataset.emoji) {
      flipped[0].classList.add('matched');
      flipped[1].classList.add('matched');
      matched++;
      document.getElementById('matches').textContent = matched;
      flipped = [];
      canFlip = true;
      if (matched === emojis.length) {
        clearInterval(timerInterval);
        document.getElementById('winMsg').style.display = 'block';
        document.getElementById('winStats').textContent =
          'Completed in ' + moves + ' moves and ' + seconds + ' seconds!';
      }
    } else {
      setTimeout(function() {
        flipped[0].classList.remove('flipped');
        flipped[1].classList.remove('flipped');
        flipped = [];
        canFlip = true;
      }, 900);
    }
  }
}

document.getElementById('restartBtn').addEventListener('click', initGame);
document.getElementById('playAgainBtn').addEventListener('click', initGame);

initGame();
