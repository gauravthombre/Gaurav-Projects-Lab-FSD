var wordList = [
  { word: 'javascript', category: 'Programming' },
  { word: 'python', category: 'Programming' },
  { word: 'elephant', category: 'Animal' },
  { word: 'giraffe', category: 'Animal' },
  { word: 'laptop', category: 'Technology' },
  { word: 'keyboard', category: 'Technology' },
  { word: 'galaxy', category: 'Space' },
  { word: 'planet', category: 'Space' },
  { word: 'football', category: 'Sports' },
  { word: 'cricket', category: 'Sports' },
  { word: 'mango', category: 'Fruit' },
  { word: 'banana', category: 'Fruit' },
  { word: 'hospital', category: 'Places' },
  { word: 'library', category: 'Places' },
  { word: 'diamond', category: 'Gems' }
];

var bodyParts = ['h-head','h-body','h-larm','h-rarm','h-lleg','h-rleg'];
var secret, guessed, wrong, wins, losses, gameOver;
wins = 0; losses = 0;

function newGame() {
  var item = wordList[Math.floor(Math.random() * wordList.length)];
  secret = item.word;
  guessed = [];
  wrong = 0;
  gameOver = false;

  document.getElementById('categoryLabel').textContent = 'Category: ' + item.category;
  document.getElementById('feedback').textContent = '';
  document.getElementById('feedback').className = 'feedback';
  document.getElementById('wrongCount').textContent = 'Wrong: 0 / 6';

  bodyParts.forEach(function(id) {
    document.getElementById(id).style.display = 'none';
  });

  buildWordDisplay();
  buildKeyboard();
}

function buildWordDisplay() {
  var display = document.getElementById('wordDisplay');
  display.innerHTML = '';
  secret.split('').forEach(function(letter) {
    var box = document.createElement('div');
    box.className = 'letter-box';
    box.id = 'box-' + letter + '-' + Math.random().toString(36).substr(2,5);
    box.dataset.letter = letter;
    box.textContent = guessed.includes(letter) ? letter.toUpperCase() : '';
    display.appendChild(box);
  });
}

function buildKeyboard() {
  var kb = document.getElementById('keyboard');
  kb.innerHTML = '';
  'abcdefghijklmnopqrstuvwxyz'.split('').forEach(function(letter) {
    var btn = document.createElement('button');
    btn.className = 'key-btn';
    btn.textContent = letter.toUpperCase();
    btn.dataset.letter = letter;
    if (guessed.includes(letter)) {
      btn.disabled = true;
      btn.classList.add(secret.includes(letter) ? 'correct' : 'wrong');
    }
    btn.addEventListener('click', function() { guess(letter, btn); });
    kb.appendChild(btn);
  });
}

function guess(letter, btn) {
  if (gameOver || guessed.includes(letter)) return;
  guessed.push(letter);
  btn.disabled = true;

  if (secret.includes(letter)) {
    btn.classList.add('correct');
    document.querySelectorAll('[data-letter="' + letter + '"]').forEach(function(box) {
      if (box.classList.contains('letter-box')) box.textContent = letter.toUpperCase();
    });
    // Check win
    if (secret.split('').every(function(l) { return guessed.includes(l); })) {
      document.getElementById('feedback').textContent = '🎉 You Win!';
      document.getElementById('feedback').className = 'feedback win';
      wins++;
      document.getElementById('wins').textContent = wins;
      gameOver = true;
      disableAll();
    }
  } else {
    btn.classList.add('wrong');
    wrong++;
    document.getElementById('h-' + ['head','body','larm','rarm','lleg','rleg'][wrong - 1]).style.display = 'block';
    document.getElementById('wrongCount').textContent = 'Wrong: ' + wrong + ' / 6';
    if (wrong >= 6) {
      document.getElementById('feedback').textContent = '😢 You Lose! Word: ' + secret.toUpperCase();
      document.getElementById('feedback').className = 'feedback lose';
      losses++;
      document.getElementById('losses').textContent = losses;
      gameOver = true;
      disableAll();
      // Reveal word
      secret.split('').forEach(function(l) {
        document.querySelectorAll('[data-letter="' + l + '"]').forEach(function(box) {
          if (box.classList.contains('letter-box')) box.textContent = l.toUpperCase();
        });
      });
    }
  }
}

function disableAll() {
  document.querySelectorAll('.key-btn').forEach(function(b) { b.disabled = true; });
}

document.getElementById('newWordBtn').addEventListener('click', newGame);

document.addEventListener('keydown', function(e) {
  var letter = e.key.toLowerCase();
  if (/^[a-z]$/.test(letter) && !gameOver) {
    var btn = document.querySelector('.key-btn[data-letter="' + letter + '"]');
    if (btn && !btn.disabled) guess(letter, btn);
  }
});

newGame();
