var secret, maxTries, triesLeft, gameActive;

var settings = {
  easy:   { max: 50,  tries: 10 },
  medium: { max: 100, tries: 7 },
  hard:   { max: 200, tries: 5 }
};

function newGame() {
  var diff = document.getElementById('difficulty').value;
  var cfg = settings[diff];
  secret = Math.floor(Math.random() * cfg.max) + 1;
  maxTries = cfg.tries;
  triesLeft = cfg.tries;
  gameActive = true;

  document.getElementById('rangeHint').textContent = 'I\'m thinking of a number between 1 and ' + cfg.max + '.';
  document.getElementById('feedback').textContent = '';
  document.getElementById('feedback').style.color = '#333';
  document.getElementById('triesLeft').innerHTML = 'Tries left: <strong>' + triesLeft + '</strong>';
  document.getElementById('historyBar').innerHTML = '';
  document.getElementById('guessInput').value = '';
  document.getElementById('guessInput').disabled = false;
  document.getElementById('guessBtn').disabled = false;
  document.getElementById('guessInput').max = cfg.max;
}

function makeGuess() {
  if (!gameActive) return;
  var guess = parseInt(document.getElementById('guessInput').value);
  var cfg = settings[document.getElementById('difficulty').value];

  if (isNaN(guess) || guess < 1 || guess > cfg.max) {
    document.getElementById('feedback').textContent = 'Enter a valid number!';
    return;
  }

  triesLeft--;
  var chip = document.createElement('span');
  chip.className = 'guess-chip';

  if (guess === secret) {
    document.getElementById('feedback').textContent = '🎉 Correct! The number was ' + secret + '!';
    document.getElementById('feedback').style.color = '#27ae60';
    chip.textContent = guess;
    chip.classList.add('chip-win');
    gameActive = false;
    document.getElementById('guessInput').disabled = true;
    document.getElementById('guessBtn').disabled = true;
  } else {
    var diff = Math.abs(guess - secret);
    var hint = '';
    if (guess < secret) {
      hint = diff <= 10 ? '🔥 A bit higher!' : '⬆️ Too low!';
      chip.classList.add('chip-low');
    } else {
      hint = diff <= 10 ? '🔥 A bit lower!' : '⬇️ Too high!';
      chip.classList.add('chip-high');
    }
    chip.textContent = guess;
    document.getElementById('feedback').textContent = hint;
    document.getElementById('feedback').style.color = '#e74c3c';

    if (triesLeft === 0) {
      document.getElementById('feedback').textContent = '😢 Out of tries! The number was ' + secret + '.';
      document.getElementById('feedback').style.color = '#e74c3c';
      gameActive = false;
      document.getElementById('guessInput').disabled = true;
      document.getElementById('guessBtn').disabled = true;
    }
  }

  document.getElementById('triesLeft').innerHTML = 'Tries left: <strong>' + triesLeft + '</strong>';
  document.getElementById('historyBar').appendChild(chip);
  document.getElementById('guessInput').value = '';
}

document.getElementById('guessBtn').addEventListener('click', makeGuess);
document.getElementById('guessInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') makeGuess();
});
document.getElementById('newGameBtn').addEventListener('click', newGame);

newGame();
