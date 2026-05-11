/* ── DATA ── */
const EMOJIS = ['😀','😂','😍','🥺','😎','🤔','👍','❤️','🔥','🎉','🚀','💯','😢','🤣','😮','👀','✨','🙌','💪','🎯','⚡','🌟','🤩','😅'];
const AVATARS = ['🐱','🐶','🦊','🐸','🦁','🐯','🐻','🐼','🐨','🦋','🦄','🐉'];

const ROOMS = [
  { id:'general',  name:'general',  icon:'💬', color:'#1e293b', desc:'Everyone · 24 online' },
  { id:'tech',     name:'tech',     icon:'💻', color:'#1e2d3b', desc:'Devs · 12 online' },
  { id:'random',   name:'random',   icon:'🎲', color:'#2d1e3b', desc:'Chill vibes · 9 online' },
  { id:'design',   name:'design',   icon:'🎨', color:'#2d1e2d', desc:'Creatives · 6 online' },
  { id:'announcements', name:'announcements', icon:'📢', color:'#2d2a1e', desc:'Admins only · pinned' },
];

const DM_USERS = [
  { id:'alice',  name:'Alice',   emoji:'🐱', status:'online'  },
  { id:'bob',    name:'Bob',     emoji:'🦊', status:'online'  },
  { id:'carol',  name:'Carol',   emoji:'🐸', status:'away'    },
  { id:'dave',   name:'Dave',    emoji:'🦁', status:'offline' },
  { id:'emma',   name:'Emma',    emoji:'🦄', status:'online'  },
];

const BOT_REPLIES = {
  general: [
    "Hey! Glad you're here 👋",
    "That's a great point!",
    "Totally agree 🙌",
    "Interesting perspective!",
    "🔥 Love it!",
    "Can you elaborate?",
    "Makes sense to me!",
    "Count me in! ✅",
    "Haha, same here 😄",
    "Let's discuss this further!",
  ],
  tech: [
    "Have you tried using TypeScript for that?",
    "Check out the docs — super helpful 📚",
    "That's a classic off-by-one error 😅",
    "Git blame knows the truth 🕵️",
    "Ship it! 🚀",
    "Always write tests first.",
    "That's O(n²) — can we optimise? 🤔",
    "VSCode or Neovim? Fight me.",
  ],
  random: [
    "😂😂😂",
    "No way!!",
    "Peak content.",
    "I didn't need to know that 😬",
    "Okay but same though.",
    "This made my day 🎉",
    "Mood.",
    "Send tweet.",
  ],
  design: [
    "That color palette is chef's kiss 🤌",
    "Did you use Figma for this?",
    "White space is your friend!",
    "The contrast ratio needs work per WCAG.",
    "Love the micro-interactions!",
    "Consistency is key 🔑",
  ],
  announcements: [
    "📢 Read-only channel — admins only.",
    "Thank you for the update!",
    "Got it! Thanks for the heads-up.",
  ],
};

const BOT_DM = [
  "Hey! What's up? 😊",
  "Sure, sounds good!",
  "I'll get back to you on that.",
  "Interesting! Tell me more.",
  "Haha, right? 😂",
  "Absolutely! Let's do it 🚀",
  "Noted! ✅",
  "Miss you too! 🥺",
  "Working on something exciting — stay tuned!",
  "On it! Give me a sec.",
];

const SEED_MESSAGES = {
  general: [
    { from:'Alice', emoji:'🐱', text:'Good morning everyone! ☀️', time:minsAgo(45) },
    { from:'Bob',   emoji:'🦊', text:"Anyone up for a quick standup at 10?", time:minsAgo(40) },
    { from:'Carol', emoji:'🐸', text:'I\'m in! 🙋‍♀️', time:minsAgo(38) },
    { from:'Emma',  emoji:'🦄', text:'Same here. Let\'s use the video link from last week.', time:minsAgo(35) },
    { from:'Alice', emoji:'🐱', text:'Sent the invite 📅', time:minsAgo(30) },
  ],
  tech: [
    { from:'Dave',  emoji:'🦁', text:'Has anyone tried the new React 19 RC?', time:minsAgo(60) },
    { from:'Bob',   emoji:'🦊', text:'Yeah — the compiler is wild! No more useMemo 🎉', time:minsAgo(55) },
    { from:'Emma',  emoji:'🦄', text:'Finally. I hated writing those hooks.', time:minsAgo(50) },
  ],
  random: [
    { from:'Carol', emoji:'🐸', text:'Who put pizza in the coffee machine 😭', time:minsAgo(20) },
    { from:'Dave',  emoji:'🦁', text:'Not me 👀', time:minsAgo(18) },
    { from:'Alice', emoji:'🐱', text:'The intern strikes again 💀', time:minsAgo(15) },
  ],
  design: [
    { from:'Emma', emoji:'🦄', text:'Just pushed new mockups to Figma. Let me know what you think!', time:minsAgo(90) },
    { from:'Alice',emoji:'🐱', text:'The new onboarding flow looks amazing 👏', time:minsAgo(85) },
  ],
  announcements: [
    { from:'Admin', emoji:'📢', text:'Welcome to ChatWave! Please read the community guidelines in #general.', time:minsAgo(120), pinned:true },
    { from:'Admin', emoji:'📢', text:'Server maintenance tonight at 2 AM UTC. Expect 10 min downtime.', time:minsAgo(30), pinned:true },
  ],
};

/* ── STATE ── */
let me = { name: '', emoji: '' };
let currentRoom = null;
let currentType = null; // 'room' | 'dm'
let allMessages = {};     // { [roomId]: MessageObj[] }
let badgeCounts  = {};
let typingTimers = {};
let memberPanelOpen = false;
let selectedAvatar = AVATARS[0];

/* ── HELPERS ── */
function minsAgo(n) {
  return new Date(Date.now() - n * 60 * 1000);
}

function fmtTime(d) {
  if (!(d instanceof Date)) d = new Date(d);
  return d.toLocaleTimeString('en', { hour:'2-digit', minute:'2-digit' });
}

function fmtDate(d) {
  if (!(d instanceof Date)) d = new Date(d);
  const today = new Date();
  if (d.toDateString() === today.toDateString()) return 'Today';
  const yest = new Date(today); yest.setDate(yest.getDate()-1);
  if (d.toDateString() === yest.toDateString()) return 'Yesterday';
  return d.toLocaleDateString('en', { month:'short', day:'numeric' });
}

function uid() { return Math.random().toString(36).substr(2,9); }

/* ── INIT ── */
window.addEventListener('DOMContentLoaded', () => {
  // Avatar picker
  const avList = document.getElementById('avatar-list');
  AVATARS.forEach((a, i) => {
    const btn = document.createElement('div');
    btn.className = 'av-opt' + (i === 0 ? ' selected' : '');
    btn.textContent = a;
    btn.onclick = () => {
      document.querySelectorAll('.av-opt').forEach(x => x.classList.remove('selected'));
      btn.classList.add('selected');
      selectedAvatar = a;
    };
    avList.appendChild(btn);
  });

  // Seed messages
  ROOMS.forEach(r => {
    allMessages[r.id] = (SEED_MESSAGES[r.id] || []).map(m => ({
      id: uid(), from: m.from, emoji: m.emoji, text: m.text,
      time: m.time, own: false, reactions: {}, pinned: m.pinned||false,
    }));
    badgeCounts[r.id] = Math.floor(Math.random() * 5);
  });
  DM_USERS.forEach(u => {
    allMessages['dm_'+u.id] = [];
    badgeCounts['dm_'+u.id] = u.status === 'online' ? Math.floor(Math.random()*3) : 0;
  });

  // Emoji picker
  const ep = document.getElementById('emoji-picker');
  EMOJIS.forEach(e => {
    const span = document.createElement('span');
    span.className = 'ep-emoji'; span.textContent = e;
    span.onclick = () => { document.getElementById('msg-input').value += e; toggleEmoji(); };
    ep.appendChild(span);
  });
});

/* ── LOGIN / LOGOUT ── */
function doLogin() {
  const name = document.getElementById('login-name').value.trim();
  if (!name) { document.getElementById('login-name').focus(); return; }
  me = { name, emoji: selectedAvatar };
  document.getElementById('me-avatar-disp').textContent = me.emoji;
  document.getElementById('me-name-disp').textContent   = me.name;
  document.getElementById('login-screen').classList.remove('active');
  document.getElementById('chat-screen').classList.add('active');
  renderRoomList();
  renderDMList();
  openRoom('general', 'room');
}

function doLogout() {
  document.getElementById('chat-screen').classList.remove('active');
  document.getElementById('login-screen').classList.add('active');
  currentRoom = null;
}

/* ── RENDER LISTS ── */
function renderRoomList(filter = '') {
  const list = document.getElementById('room-list');
  list.innerHTML = '';
  ROOMS.filter(r => r.name.includes(filter)).forEach(r => {
    const div = document.createElement('div');
    div.className = 'room-item' + (currentRoom === r.id && currentType === 'room' ? ' active' : '');
    div.innerHTML = `
      <div class="room-icon" style="background:${r.color}">${r.icon}</div>
      <div class="room-info">
        <div class="room-name">#${r.name}</div>
        <div class="room-preview">${(allMessages[r.id]?.slice(-1)[0]?.text||'').slice(0,28)||r.desc}</div>
      </div>
      ${badgeCounts[r.id] ? `<div class="room-badge">${badgeCounts[r.id]}</div>` : ''}
    `;
    div.onclick = () => openRoom(r.id, 'room');
    list.appendChild(div);
  });
}

function renderDMList(filter = '') {
  const list = document.getElementById('dm-list');
  list.innerHTML = '';
  DM_USERS.filter(u => u.name.toLowerCase().includes(filter.toLowerCase())).forEach(u => {
    const key = 'dm_'+u.id;
    const div = document.createElement('div');
    div.className = 'dm-item' + (currentRoom === key && currentType === 'dm' ? ' active' : '');
    const dotColor = u.status==='online'?'#22c55e':u.status==='away'?'#facc15':'#64748b';
    div.innerHTML = `
      <div class="dm-avatar" style="background:#1e1e35">
        ${u.emoji}
        <div class="online-dot" style="background:${dotColor}"></div>
      </div>
      <div class="dm-name">${u.name}</div>
      ${badgeCounts[key] ? `<div class="room-badge">${badgeCounts[key]}</div>` : ''}
    `;
    div.onclick = () => openRoom(key, 'dm', u);
    list.appendChild(div);
  });
}

function filterRooms(q) {
  renderRoomList(q);
  renderDMList(q);
}

/* ── OPEN ROOM ── */
function openRoom(id, type, dmUser = null) {
  currentRoom = id;
  currentType = type;
  badgeCounts[id] = 0;

  // Hide welcome
  document.getElementById('welcome-placeholder').style.display = 'none';
  document.getElementById('messages-list').style.display = 'flex';
  document.getElementById('messages-list').style.flexDirection = 'column';
  document.getElementById('messages-list').style.gap = '2px';

  if (type === 'room') {
    const r = ROOMS.find(x => x.id === id);
    document.getElementById('ch-icon').textContent  = r.icon;
    document.getElementById('ch-name').textContent  = '#' + r.name;
    document.getElementById('ch-meta').textContent  = r.desc;
    document.getElementById('msg-input').placeholder = `Message #${r.name}`;
  } else {
    document.getElementById('ch-icon').textContent  = dmUser.emoji;
    document.getElementById('ch-name').textContent  = dmUser.name;
    document.getElementById('ch-meta').textContent  = dmUser.status === 'online' ? '● Online' : dmUser.status === 'away' ? '● Away' : '● Offline';
    document.getElementById('msg-input').placeholder = `Message ${dmUser.name}`;
  }

  renderMessages();
  renderRoomList();
  renderDMList();
  renderMemberPanel();
  document.getElementById('msg-input').focus();
}

/* ── RENDER MESSAGES ── */
function renderMessages(highlight = '') {
  const list  = document.getElementById('messages-list');
  const msgs  = allMessages[currentRoom] || [];
  list.innerHTML = '';

  let lastDate = '';
  msgs.forEach(m => {
    const dateStr = fmtDate(m.time);
    if (dateStr !== lastDate) {
      const sep = document.createElement('div');
      sep.className = 'date-sep';
      sep.textContent = dateStr;
      list.appendChild(sep);
      lastDate = dateStr;
    }

    const row = document.createElement('div');
    row.className = 'msg-row' + (m.own ? ' own' : '');
    row.id = 'msg-'+m.id;

    const reactHtml = Object.entries(m.reactions||{}).map(([e,users]) =>
      `<div class="reaction-chip" onclick="addReaction('${m.id}','${e}')">${e} ${users.length}</div>`
    ).join('');

    const bubbleText = highlight
      ? m.text.replace(new RegExp(`(${highlight})`, 'gi'), '<mark style="background:#facc15;color:#000">$1</mark>')
      : m.text;

    row.innerHTML = `
      ${!m.own ? `<div class="msg-avatar-sm">${m.emoji}</div>` : ''}
      <div class="msg-content">
        ${!m.own ? `<div class="msg-sender">${m.from}</div>` : ''}
        <div class="msg-bubble">${bubbleText}${m.file ? `<img src="${m.file}" alt="attachment" />` : ''}</div>
        ${reactHtml ? `<div class="msg-reactions">${reactHtml}</div>` : ''}
        <div class="msg-time-row">
          <div class="msg-time">${fmtTime(m.time)}</div>
          ${m.own ? `<div class="msg-status">✓✓</div>` : ''}
          ${m.pinned ? `<div class="msg-status" title="Pinned">📌</div>` : ''}
        </div>
      </div>
      ${m.own ? `<div class="msg-avatar-sm">${me.emoji}</div>` : ''}
      <div class="msg-actions">
        <button class="msg-act-btn" onclick="addReaction('${m.id}','❤️')" title="React">❤️</button>
        <button class="msg-act-btn" onclick="replyTo('${m.id}')" title="Reply">↩️</button>
        ${m.own ? `<button class="msg-act-btn" onclick="deleteMsg('${m.id}')" title="Delete">🗑️</button>` : ''}
      </div>
    `;
    list.appendChild(row);
  });

  scrollBottom();
}

function scrollBottom() {
  const wrap = document.getElementById('messages-wrap');
  wrap.scrollTop = wrap.scrollHeight;
}

/* ── SEND MESSAGE ── */
function sendMessage() {
  const input = document.getElementById('msg-input');
  const text  = input.value.trim();
  if (!text || !currentRoom) return;

  const msg = {
    id: uid(), from: me.name, emoji: me.emoji,
    text, time: new Date(), own: true, reactions: {},
  };
  allMessages[currentRoom].push(msg);
  input.value = '';
  renderMessages();
  renderRoomList();
  renderDMList();

  // Simulate reply after 1–3s
  const delay = 1000 + Math.random() * 2000;
  const isRoom = currentType === 'room';
  const pool = isRoom ? (BOT_REPLIES[currentRoom] || BOT_REPLIES.general) : BOT_DM;
  const responder = isRoom
    ? DM_USERS[Math.floor(Math.random() * DM_USERS.length)]
    : DM_USERS.find(u => 'dm_'+u.id === currentRoom);

  // Show typing
  showTyping(responder);
  setTimeout(() => {
    hideTyping();
    const reply = {
      id: uid(),
      from: responder.name, emoji: responder.emoji,
      text: pool[Math.floor(Math.random() * pool.length)],
      time: new Date(), own: false, reactions: {},
    };
    allMessages[currentRoom].push(reply);
    renderMessages();
    renderRoomList();
    renderDMList();
  }, delay);
}

function handleKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
}

/* ── TYPING ── */
let userTypingTimer = null;
function handleTyping() {
  // Real user typing — just used for UX placeholder here
}

function showTyping(user) {
  const bar = document.getElementById('typing-bar');
  bar.innerHTML = `${user.emoji} <strong>${user.name}</strong> is typing<span class="typing-dots"><span></span><span></span><span></span></span>`;
}
function hideTyping() {
  document.getElementById('typing-bar').innerHTML = '';
}

/* ── REACTIONS ── */
function addReaction(msgId, emoji) {
  const msgs = allMessages[currentRoom];
  const m = msgs.find(x => x.id === msgId);
  if (!m) return;
  if (!m.reactions[emoji]) m.reactions[emoji] = [];
  const idx = m.reactions[emoji].indexOf(me.name);
  if (idx === -1) m.reactions[emoji].push(me.name);
  else m.reactions[emoji].splice(idx, 1);
  if (m.reactions[emoji].length === 0) delete m.reactions[emoji];
  renderMessages();
}

/* ── REPLY ── */
function replyTo(msgId) {
  const msgs = allMessages[currentRoom];
  const m = msgs.find(x => x.id === msgId);
  if (!m) return;
  document.getElementById('msg-input').value = `↩ @${m.from}: `;
  document.getElementById('msg-input').focus();
}

/* ── DELETE ── */
function deleteMsg(msgId) {
  allMessages[currentRoom] = allMessages[currentRoom].filter(x => x.id !== msgId);
  renderMessages();
}

/* ── FILE ATTACH ── */
function handleFile(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const msg = {
      id: uid(), from: me.name, emoji: me.emoji,
      text: `📎 ${file.name}`, time: new Date(), own: true,
      reactions: {},
      file: file.type.startsWith('image/') ? e.target.result : null,
    };
    allMessages[currentRoom].push(msg);
    renderMessages();
  };
  reader.readAsDataURL(file);
  input.value = '';
}

/* ── EMOJI PICKER ── */
function toggleEmoji() {
  document.getElementById('emoji-picker').classList.toggle('open');
}
document.addEventListener('click', e => {
  if (!e.target.closest('.emoji-toggle') && !e.target.closest('.emoji-picker'))
    document.getElementById('emoji-picker').classList.remove('open');
});

/* ── SEARCH ── */
function toggleSearchBar() {
  const bar = document.getElementById('msg-search-bar');
  bar.classList.toggle('open');
  if (bar.classList.contains('open')) document.getElementById('msg-search-input').focus();
  else renderMessages();
}

function searchMessages(q) {
  renderMessages(q);
}

/* ── MEMBER PANEL ── */
function toggleMemberPanel() {
  memberPanelOpen = !memberPanelOpen;
  document.getElementById('member-panel').classList.toggle('open', memberPanelOpen);
}

function renderMemberPanel() {
  const members = currentType === 'room'
    ? [...DM_USERS, { id:'me', name:me.name, emoji:me.emoji, status:'online' }]
    : DM_USERS.filter(u => 'dm_'+u.id === currentRoom || true).slice(0,1)
        .concat([{ id:'me', name:me.name, emoji:me.emoji, status:'online' }]);

  document.getElementById('mp-count').textContent = `(${members.length})`;
  document.getElementById('mp-list').innerHTML = members.map(u => {
    const dotColor = u.status==='online'?'#22c55e':u.status==='away'?'#facc15':'#64748b';
    return `<div class="mp-member">
      <div class="mp-av">${u.emoji}</div>
      <div class="mp-name">${u.id==='me'?'You ('+me.name+')':u.name}</div>
      <div class="mp-dot" style="background:${dotColor}"></div>
    </div>`;
  }).join('');
}

/* ── ENTER on login ── */
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && document.getElementById('login-screen').classList.contains('active'))
    doLogin();
});