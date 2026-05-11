const allCourses = [
  { id:1, title:"React & Next.js Masterclass", cat:"Web Dev", emoji:"⚛️", color:"#e0f2fe", lessons:12, duration:"8h 30m", price:"Free", enrolled:false, progress:0 },
  { id:2, title:"UI/UX Design Fundamentals", cat:"Design", emoji:"🎨", color:"#fdf4ff", lessons:10, duration:"6h", price:"Free", enrolled:false, progress:0 },
  { id:3, title:"Python for Data Science", cat:"Data", emoji:"🐍", color:"#f0fdf4", lessons:15, duration:"10h", price:"Free", enrolled:false, progress:0 },
  { id:4, title:"Flutter Mobile Development", cat:"Mobile", emoji:"📱", color:"#fff7ed", lessons:14, duration:"9h", price:"Free", enrolled:false, progress:0 },
  { id:5, title:"Node.js Backend Bootcamp", cat:"Web Dev", emoji:"🚀", color:"#fef2f2", lessons:12, duration:"7h 45m", price:"Free", enrolled:false, progress:0 },
  { id:6, title:"Figma for Beginners", cat:"Design", emoji:"✏️", color:"#f0fdf4", lessons:8, duration:"4h", price:"Free", enrolled:false, progress:0 },
];
const lessonData = ["Introduction & Setup","Core Concepts","Hands-on Project","Advanced Techniques","Testing & Debugging","Deployment & Best Practices"];
let enrolledCourses = [];
let currentCourse = null;
let currentLesson = 0;
let lessonsDone = {};

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelector(`[data-page="${id}"]`)?.classList.add('active');
  if(id==='dashboard') renderDashboard();
  if(id==='courses') renderAllCourses();
  if(id==='my-courses') renderMyCourses();
  if(id==='progress') renderProgress();
}

function renderDashboard() {
  document.getElementById('enrolled-count').textContent = enrolledCourses.length;
  const done = enrolledCourses.filter(c=>c.progress===100).length;
  document.getElementById('completed-count').textContent = done;
  const avg = enrolledCourses.length ? Math.round(enrolledCourses.reduce((a,c)=>a+c.progress,0)/enrolledCourses.length) : 0;
  document.getElementById('progress-count').textContent = avg+'%';
  const grid = document.getElementById('continue-grid');
  if(!enrolledCourses.length){ grid.innerHTML='<p style="color:var(--muted);font-size:14px">Enroll in courses to continue learning!</p>'; return; }
  grid.innerHTML = enrolledCourses.map(c=>courseCard(c,true)).join('');
}

function renderAllCourses() {
  const grid = document.getElementById('all-courses-grid');
  grid.innerHTML = allCourses.map(c=>courseCard(c,false)).join('');
}

function filterCourses() {
  const q = document.getElementById('search-input').value.toLowerCase();
  const cat = document.getElementById('cat-filter').value;
  const filtered = allCourses.filter(c=>(c.title.toLowerCase().includes(q)||c.cat.toLowerCase().includes(q)) && (!cat||c.cat===cat));
  document.getElementById('all-courses-grid').innerHTML = filtered.map(c=>courseCard(c,false)).join('');
}

function renderMyCourses() {
  const grid = document.getElementById('my-courses-grid');
  if(!enrolledCourses.length){ grid.innerHTML='<p style="color:var(--muted);font-size:14px">No courses yet! <a href="#" onclick="showPage(\'courses\')" style="color:var(--accent)">Browse courses</a></p>'; return; }
  grid.innerHTML = enrolledCourses.map(c=>courseCard(c,true)).join('');
}

function renderProgress() {
  const list = document.getElementById('progress-list');
  if(!enrolledCourses.length){ list.innerHTML='<p style="color:var(--muted)">No courses enrolled yet.</p>'; return; }
  list.innerHTML = enrolledCourses.map(c=>`
    <div class="progress-item">
      <h3>${c.emoji} ${c.title}</h3>
      <div class="progress-pct"><span>${c.cat}</span><span>${c.progress}%</span></div>
      <div class="progress-bar-lg"><div class="progress-fill-lg" style="width:${c.progress}%"></div></div>
    </div>`).join('');
}

function courseCard(c, enrolled) {
  const isEnrolled = enrolled || enrolledCourses.find(e=>e.id===c.id);
  return `<div class="course-card">
    <div class="course-thumb" style="background:${c.color}">${c.emoji}</div>
    <div class="course-body">
      <div class="course-cat">${c.cat}</div>
      <div class="course-title">${c.title}</div>
      <div class="course-meta">${c.lessons} lessons · ${c.duration}</div>
      ${isEnrolled?`<div class="progress-bar-sm"><div class="progress-fill-sm" style="width:${isEnrolled.progress||0}%"></div></div>`:'' }
      <div class="course-footer">
        <span class="course-price">${c.price}</span>
        ${isEnrolled
          ? `<button class="btn-continue" onclick="openPlayer(${c.id})">Continue →</button>`
          : `<button class="btn-enroll" onclick="enroll(${c.id})">Enroll</button>`}
      </div>
    </div>
  </div>`;
}

function enroll(id) {
  if(enrolledCourses.find(c=>c.id===id)) return;
  const c = allCourses.find(c=>c.id===id);
  enrolledCourses.push({...c, progress:0});
  lessonsDone[id] = [];
  alert(`✅ Enrolled in "${c.title}"!`);
  renderAllCourses();
}

function openPlayer(id) {
  currentCourse = enrolledCourses.find(c=>c.id===id);
  currentLesson = 0;
  renderPlayer();
  showPage('player');
  document.querySelector('[data-page="player"]')?.classList.remove('active');
}

function renderPlayer() {
  const c = currentCourse;
  document.getElementById('lesson-heading').textContent = `${c.emoji} ${c.title}`;
  document.getElementById('lesson-desc').textContent = `Currently on: ${lessonData[currentLesson]}`;
  document.getElementById('current-lesson-title').textContent = lessonData[currentLesson];
  const done = lessonsDone[c.id] || [];
  document.getElementById('lesson-list').innerHTML = lessonData.slice(0, c.lessons > 6 ? 6 : c.lessons).map((l,i)=>`
    <div class="lesson-item ${i===currentLesson?'active':''} ${done.includes(i)?'done':''}" onclick="selectLesson(${i})">${l}</div>
  `).join('');
}

function selectLesson(i) { currentLesson = i; renderPlayer(); }

function markComplete() {
  const c = currentCourse;
  if(!lessonsDone[c.id]) lessonsDone[c.id] = [];
  if(!lessonsDone[c.id].includes(currentLesson)) lessonsDone[c.id].push(currentLesson);
  const total = Math.min(c.lessons, 6);
  c.progress = Math.round((lessonsDone[c.id].length / total) * 100);
  if(currentLesson < total-1) { currentLesson++; }
  renderPlayer();
  alert('✅ Lesson marked as complete!');
}

// Init
showPage('dashboard');