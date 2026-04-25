var score = 0;
var bestScore = parseInt(localStorage.getItem('wamBest')) || 0;
var timeLeft = 30;
var gameActive = false;
var moleTimer = null;
var countdownTimer = null;
var currentMole = null;

document.getElementById('bestScore').textContent = bestScore;

var speeds = { easy: 1000, medium: 700, hard: 400 };

function startGame() {
  score = 0;
  timeLeft = 30;
  gameActive = true;
  document.getElementById('score').textContent = '0';
  document.getElementById('timeLeft').textContent = '30s';
  document.getElementById('startScreen').style.display = 'none';
  document.getElementById('gameOverScreen').style.display = 'none';
  document.getElementById('board').style.display = 'grid';
  runCountdown();
  showMole();
}

function runCountdown() {
  clearInterval(countdownTimer);
  countdownTimer = setInterval(function() {
    timeLeft--;
    document.getElementById('timeLeft').textContent = timeLeft + 's';
    if (timeLeft <= 0) {
      clearInterval(countdownTimer);
      clearTimeout(moleTimer);
      endGame();
    }
  }, 1000);
}

function showMole() {
  if (!gameActive) return;
  hideMole();
  var index = Math.floor(Math.random() * 9);
  currentMole = document.getElementById('mole' + index);
  currentMole.classList.add('visible');

  var speed = speeds[document.getElementById('difficulty').value];
  moleTimer = setTimeout(function() {
    hideMole();
    showMole();
  }, speed);
}

function hideMole() {
  if (currentMole) {
    currentMole.classList.remove('visible');
    currentMole = null;
  }
}

function endGame() {
  gameActive = false;
  hideMole();
  document.getElementById('board').style.display = 'none';
  document.getElementById('gameOverScreen').style.display = 'block';
  document.getElementById('finalScore').textContent = score;
  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem('wamBest', bestScore);
    document.getElementById('bestScore').textContent = bestScore;
  }
}

document.getElementById('board').addEventListener('click', function(e) {
  var mole = e.target.closest('.mole');
  if (!mole || !mole.classList.contains('visible') || !gameActive) return;
  mole.classList.remove('visible');
  score++;
  document.getElementById('score').textContent = score;
  clearTimeout(moleTimer);
  showMole();
});

document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('playAgainBtn').addEventListener('click', function() {
  document.getElementById('gameOverScreen').style.display = 'none';
  document.getElementById('startScreen').style.display = 'block';
});
