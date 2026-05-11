const doctors = [
  { name: 'Dr. Priya Sharma', spec: 'Cardiology', rating: '⭐ 4.9 (230 reviews)', emoji: '👩‍⚕️' },
  { name: 'Dr. Rajan Mehta', spec: 'Neurology', rating: '⭐ 4.8 (185 reviews)', emoji: '🧠' },
  { name: 'Dr. Anita Rao', spec: 'Orthopedics', rating: '⭐ 4.7 (160 reviews)', emoji: '🦴' },
  { name: 'Dr. Vikram Singh', spec: 'Dermatology', rating: '⭐ 4.9 (310 reviews)', emoji: '🔬' },
  { name: 'Dr. Sunita Patel', spec: 'Pediatrics', rating: '⭐ 4.8 (270 reviews)', emoji: '👶' },
  { name: 'Dr. Arjun Kumar', spec: 'General Medicine', rating: '⭐ 4.6 (420 reviews)', emoji: '💉' },
];

const appointments = [
  { day: '12', month: 'Jun', doctor: 'Dr. Priya Sharma', spec: 'Cardiology', time: '10:00 AM', status: 'confirmed' },
  { day: '18', month: 'Jun', doctor: 'Dr. Rajan Mehta', spec: 'Neurology', time: '2:00 PM', status: 'pending' },
  { day: '25', month: 'Jun', doctor: 'Dr. Anita Rao', spec: 'Orthopedics', time: '11:00 AM', status: 'confirmed' },
];

let selectedDoctor = null;
const userAppointments = [...appointments];

function renderDoctorCards(container, docs, compact = false) {
  container.innerHTML = '';
  docs.forEach((doc, i) => {
    const card = document.createElement('div');
    card.className = 'doctor-card';
    card.innerHTML = `<div class="doc-avatar">${doc.emoji}</div><h4>${doc.name}</h4><p class="spec">${doc.spec}</p><p class="rating">${doc.rating}</p>`;
    card.onclick = () => {
      document.querySelectorAll('.doctor-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedDoctor = doc;
    };
    container.appendChild(card);
  });
}

function renderAppointments(container, list) {
  container.innerHTML = '';
  if (list.length === 0) { container.innerHTML = '<p style="color:var(--muted)">No appointments found.</p>'; return; }
  list.forEach(a => {
    const card = document.createElement('div');
    card.className = 'appt-card';
    card.innerHTML = `
      <div class="appt-date-badge"><div class="day">${a.day}</div><div class="month">${a.month}</div></div>
      <div class="appt-details"><h4>${a.doctor}</h4><p>${a.spec} · ${a.time}</p></div>
      <span class="appt-status status-${a.status}">${a.status.charAt(0).toUpperCase() + a.status.slice(1)}</span>`;
    container.appendChild(card);
  });
}

function filterDoctors() {
  const spec = document.getElementById('specSelect').value;
  const filtered = spec ? doctors.filter(d => d.spec === spec) : doctors;
  renderDoctorCards(document.getElementById('doctorCards'), filtered);
}

function bookAppointment() {
  if (!selectedDoctor) { showToast('Please select a doctor first!', true); return; }
  const date = document.getElementById('apptDate').value;
  if (!date) { showToast('Please select a date!', true); return; }
  const time = document.getElementById('apptTime').value;
  const d = new Date(date);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  userAppointments.push({ day: d.getDate(), month: months[d.getMonth()], doctor: selectedDoctor.name, spec: selectedDoctor.spec, time, status: 'pending' });
  renderAppointments(document.getElementById('dashAppts'), userAppointments.slice(0, 3));
  renderAppointments(document.getElementById('allAppts'), userAppointments);
  showToast('✅ Appointment booked successfully!');
  showPage('appointments');
}

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
}

function showToast(msg, isError = false) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.background = isError ? '#ef4444' : '#10b981';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// Init
renderAppointments(document.getElementById('dashAppts'), appointments);
renderAppointments(document.getElementById('allAppts'), appointments);
const strip = document.getElementById('dashDoctors');
strip.style.display = 'flex';
renderDoctorCards(strip, doctors.slice(0, 4), true);
renderDoctorCards(document.getElementById('doctorCards'), doctors);
renderDoctorCards(document.getElementById('allDoctors'), doctors);

const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0');
const dd = String(today.getDate() + 1).padStart(2, '0');
document.getElementById('apptDate').min = `${yyyy}-${mm}-${dd}`;
document.getElementById('apptDate').value = `${yyyy}-${mm}-${dd}`;