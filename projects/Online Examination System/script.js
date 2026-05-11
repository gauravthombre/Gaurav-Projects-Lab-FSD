const exams = {
  js: {
    title: "JavaScript Fundamentals",
    questions: [
      { q: "What does `typeof null` return in JavaScript?", opts: ["null","object","undefined","string"], ans: 1 },
      { q: "Which method removes the last element from an array?", opts: ["shift()","pop()","splice()","slice()"], ans: 1 },
      { q: "What is the output of `2 + '2'` in JavaScript?", opts: ["4","22","NaN","Error"], ans: 1 },
      { q: "Which keyword declares a block-scoped variable?", opts: ["var","let","function","global"], ans: 1 },
      { q: "What does `===` check in JavaScript?", opts: ["Only value","Only type","Value and type","Reference"], ans: 2 },
      { q: "What is a closure in JavaScript?", opts: ["A loop","A function accessing outer scope variables","An object method","An array method"], ans: 1 },
      { q: "Which method converts JSON string to object?", opts: ["JSON.stringify()","JSON.parse()","JSON.convert()","JSON.decode()"], ans: 1 },
      { q: "What does `Array.isArray([])` return?", opts: ["false","null","true","undefined"], ans: 2 },
      { q: "Which is NOT a JavaScript data type?", opts: ["Boolean","Float","String","Symbol"], ans: 1 },
      { q: "What does `Promise.all()` do?", opts: ["Runs promises one by one","Waits for all promises to resolve","Returns first resolved","Cancels all promises"], ans: 1 }
    ]
  },
  html: {
    title: "HTML & CSS Basics",
    questions: [
      { q: "Which HTML tag is used for the largest heading?", opts: ["<h6>","<head>","<h1>","<header>"], ans: 2 },
      { q: "What does CSS stand for?", opts: ["Computer Style Sheets","Creative Style Sheets","Cascading Style Sheets","Colorful Style Sheets"], ans: 2 },
      { q: "Which property sets the background color in CSS?", opts: ["color","bg-color","background-color","bgcolor"], ans: 2 },
      { q: "What is the correct HTML for a line break?", opts: ["<lb>","<break>","<br>","<newline>"], ans: 2 },
      { q: "Which CSS property controls text size?", opts: ["text-style","font-size","text-size","font-style"], ans: 1 },
      { q: "Which HTML attribute specifies an image's URL?", opts: ["href","src","link","url"], ans: 1 },
      { q: "What is the default display value of a `<div>`?", opts: ["inline","block","flex","grid"], ans: 1 },
      { q: "Which CSS selector targets elements with a specific class?", opts: ["#class",".class","*class","&class"], ans: 1 },
      { q: "What does `position: absolute` do?", opts: ["Relative to nearest positioned ancestor","Relative to viewport","Relative to body","Fixed position"], ans: 0 },
      { q: "Which HTML5 element defines navigation links?", opts: ["<navigation>","<nav>","<menu>","<links>"], ans: 1 }
    ]
  },
  python: {
    title: "Python Programming",
    questions: [
      { q: "How do you create a list in Python?", opts: ["{}","()","[]","<>"], ans: 2 },
      { q: "Which keyword is used to define a function?", opts: ["function","define","def","fun"], ans: 2 },
      { q: "What does `len('hello')` return?", opts: ["4","5","6","Error"], ans: 1 },
      { q: "How do you start a comment in Python?", opts: ["//","/*","#","--"], ans: 2 },
      { q: "Which of these is NOT a Python data type?", opts: ["list","tuple","array","dict"], ans: 2 },
      { q: "What is the result of `3 ** 2` in Python?", opts: ["6","9","5","Error"], ans: 1 },
      { q: "How do you import a module in Python?", opts: ["include module","import module","require module","using module"], ans: 1 },
      { q: "What does `range(5)` generate?", opts: ["1 to 5","0 to 5","0 to 4","1 to 4"], ans: 2 },
      { q: "Which method adds an item to a list?", opts: ["add()","insert()","push()","append()"], ans: 3 },
      { q: "What is `__init__` in Python?", opts: ["A destructor","An initializer/constructor","A module","A decorator"], ans: 1 }
    ]
  }
};

let current = { exam: null, qIndex: 0, answers: {}, timer: null, startTime: null, seconds: 1800 };

function startExam() {
  const name = document.getElementById('student-name').value.trim();
  const examKey = document.getElementById('exam-select').value;
  if (!name) { alert('Please enter your name!'); return; }
  current.exam = examKey;
  current.qIndex = 0;
  current.answers = {};
  current.seconds = 1800;
  document.getElementById('student-display').textContent = `Student: ${name}`;
  document.getElementById('exam-title').textContent = exams[examKey].title;
  buildQNav();
  showScreen('exam-screen');
  renderQuestion();
  startTimer();
  current.startTime = Date.now();
}

function buildQNav() {
  const nav = document.getElementById('q-nav');
  nav.innerHTML = exams[current.exam].questions.map((_, i) =>
    `<button class="q-dot" id="dot-${i}" onclick="jumpTo(${i})">${i+1}</button>`
  ).join('') + `<button class="btn-primary" style="margin-left:16px;width:auto" onclick="submitExam()">Submit</button>`;
}

function renderQuestion() {
  const qs = exams[current.exam].questions;
  const q = qs[current.qIndex];
  const total = qs.length;
  document.getElementById('q-num').textContent = String(current.qIndex+1).padStart(2,'0');
  document.getElementById('question-text').textContent = q.q;
  document.getElementById('q-counter').textContent = `Q ${current.qIndex+1}/${total}`;
  document.getElementById('progress-fill').style.width = `${((current.qIndex+1)/total)*100}%`;
  document.getElementById('prev-btn').disabled = current.qIndex === 0;

  const opts = document.getElementById('options-container');
  opts.innerHTML = q.opts.map((o, i) => `
    <div class="option ${current.answers[current.qIndex] === i ? 'selected' : ''}" onclick="selectAnswer(${i})">
      <span class="option-label">${['A','B','C','D'][i]}</span>${o}
    </div>`).join('');

  document.querySelectorAll('.q-dot').forEach((d,i) => {
    d.className = 'q-dot' + (i === current.qIndex ? ' current' : '') + (current.answers[i] !== undefined ? ' answered' : '');
  });
  document.getElementById('next-btn').textContent = current.qIndex === total-1 ? 'Submit →' : 'Next →';
}

function selectAnswer(i) {
  current.answers[current.qIndex] = i;
  renderQuestion();
}

function nextQ() {
  const total = exams[current.exam].questions.length;
  if (current.qIndex === total-1) { submitExam(); return; }
  current.qIndex++;
  renderQuestion();
}

function prevQ() {
  if (current.qIndex > 0) { current.qIndex--; renderQuestion(); }
}

function jumpTo(i) { current.qIndex = i; renderQuestion(); }

function startTimer() {
  clearInterval(current.timer);
  current.timer = setInterval(() => {
    current.seconds--;
    const m = Math.floor(current.seconds/60).toString().padStart(2,'0');
    const s = (current.seconds%60).toString().padStart(2,'0');
    const el = document.getElementById('timer');
    el.textContent = `${m}:${s}`;
    el.classList.toggle('warning', current.seconds < 300);
    if (current.seconds <= 0) submitExam();
  }, 1000);
}

function submitExam() {
  clearInterval(current.timer);
  const qs = exams[current.exam].questions;
  let correct = 0;
  const taken = Math.round((Date.now() - current.startTime)/1000);

  qs.forEach((q, i) => { if (current.answers[i] === q.ans) correct++; });
  const wrong = Object.keys(current.answers).length - correct;
  const skipped = qs.length - Object.keys(current.answers).length;

  document.getElementById('score-num').textContent = correct;
  document.getElementById('correct-count').textContent = correct;
  document.getElementById('wrong-count').textContent = wrong;
  document.getElementById('skip-count').textContent = skipped;
  document.getElementById('time-taken').textContent = `${Math.floor(taken/60)}m${taken%60}s`;
  setTimeout(() => { document.getElementById('score-fill').style.width = `${(correct/qs.length)*100}%`; }, 100);

  const pct = (correct/qs.length)*100;
  document.getElementById('result-icon').textContent = pct>=80?'🏆':pct>=60?'🎯':'📚';
  document.getElementById('result-title').textContent = pct>=80?'Excellent Work!':pct>=60?'Good Job!':'Keep Practicing!';

  const reviewList = document.getElementById('review-list');
  reviewList.innerHTML = qs.map((q, i) => {
    const ua = current.answers[i]; const isC = ua === q.ans;
    return `<div class="review-item ${isC?'correct':'wrong'}">
      <p><strong>Q${i+1}:</strong> ${q.q}</p>
      <small>Your answer: ${ua!==undefined?q.opts[ua]:'Skipped'} ${isC?'✓':'✗'} | Correct: ${q.opts[q.ans]}</small>
    </div>`;
  }).join('');

  showScreen('result-screen');
}

function resetExam() { showScreen('login-screen'); }

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}