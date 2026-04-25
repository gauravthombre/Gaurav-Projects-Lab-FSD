var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

var GRID = 20;
var COLS = canvas.width / GRID;
var ROWS = canvas.height / GRID;

var snake, dir, nextDir, food, score, best, gameLoop, running;

best = parseInt(localStorage.getItem('snakeBest')) || 0;
document.getElementById('best').textContent = best;

function initGame() {
  snake = [{ x: 10, y: 10 }];
  dir = { x: 1, y: 0 };
  nextDir = { x: 1, y: 0 };
  score = 0;
  running = true;
  document.getElementById('score').textContent = '0';
  placeFood();
  draw();
}

function placeFood() {
  var empty = false;
  while (!empty) {
    food = {
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random() * ROWS)
    };
    empty = !snake.some(function(s) { return s.x === food.x && s.y === food.y; });
  }
}

function update() {
  if (!running) return;
  dir = nextDir;

  var head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

  // Wall collision
  if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
    return gameOver();
  }

  // Self collision
  if (snake.some(function(s) { return s.x === head.x && s.y === head.y; })) {
    return gameOver();
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById('score').textContent = score;
    if (score > best) {
      best = score;
      localStorage.setItem('snakeBest', best);
      document.getElementById('best').textContent = best;
    }
    placeFood();
  } else {
    snake.pop();
  }

  draw();
}

function draw() {
  ctx.fillStyle = '#0f0f1a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Grid dots
  ctx.fillStyle = '#1a1a2e';
  for (var x = 0; x < COLS; x++) {
    for (var y = 0; y < ROWS; y++) {
      ctx.fillRect(x * GRID + 9, y * GRID + 9, 2, 2);
    }
  }

  // Food
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(food.x * GRID + GRID / 2, food.y * GRID + GRID / 2, GRID / 2 - 2, 0, Math.PI * 2);
  ctx.fill();

  // Snake
  snake.forEach(function(seg, i) {
    ctx.fillStyle = i === 0 ? '#4ade80' : '#22c55e';
    ctx.fillRect(seg.x * GRID + 1, seg.y * GRID + 1, GRID - 2, GRID - 2);
  });
}

function gameOver() {
  running = false;
  clearInterval(gameLoop);
  document.getElementById('overlayTitle').textContent = 'Game Over!';
  document.getElementById('overlayMsg').textContent = 'Score: ' + score + (score > 0 && score === best ? ' 🏆 New Best!' : '');
  document.getElementById('overlay').style.display = 'flex';
  document.getElementById('startBtn').textContent = 'Play Again';
  document.querySelector('.speed-select').style.display = 'flex';
}

document.getElementById('startBtn').addEventListener('click', function() {
  document.getElementById('overlay').style.display = 'none';
  clearInterval(gameLoop);
  var speed = parseInt(document.getElementById('speedSelect').value);
  var labels = { 200: 'Slow', 130: 'Normal', 80: 'Fast' };
  document.getElementById('speedLabel').textContent = labels[speed] || 'Normal';
  initGame();
  gameLoop = setInterval(update, speed);
});

document.addEventListener('keydown', function(e) {
  var keys = {
    ArrowUp: { x: 0, y: -1 }, w: { x: 0, y: -1 }, W: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 }, s: { x: 0, y: 1 }, S: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 }, a: { x: -1, y: 0 }, A: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 }, d: { x: 1, y: 0 }, D: { x: 1, y: 0 }
  };
  if (keys[e.key]) {
    var newDir = keys[e.key];
    if (newDir.x !== -dir.x || newDir.y !== -dir.y) {
      nextDir = newDir;
    }
    if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) {
      e.preventDefault();
    }
  }
});

draw();
