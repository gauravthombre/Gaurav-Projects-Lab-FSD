var signs = [
  { name: 'Aries',       emoji: '♈', dates: 'Mar 21 – Apr 19' },
  { name: 'Taurus',      emoji: '♉', dates: 'Apr 20 – May 20' },
  { name: 'Gemini',      emoji: '♊', dates: 'May 21 – Jun 20' },
  { name: 'Cancer',      emoji: '♋', dates: 'Jun 21 – Jul 22' },
  { name: 'Leo',         emoji: '♌', dates: 'Jul 23 – Aug 22' },
  { name: 'Virgo',       emoji: '♍', dates: 'Aug 23 – Sep 22' },
  { name: 'Libra',       emoji: '♎', dates: 'Sep 23 – Oct 22' },
  { name: 'Scorpio',     emoji: '♏', dates: 'Oct 23 – Nov 21' },
  { name: 'Sagittarius', emoji: '♐', dates: 'Nov 22 – Dec 21' },
  { name: 'Capricorn',   emoji: '♑', dates: 'Dec 22 – Jan 19' },
  { name: 'Aquarius',    emoji: '♒', dates: 'Jan 20 – Feb 18' },
  { name: 'Pisces',      emoji: '♓', dates: 'Feb 19 – Mar 20' }
];

var horoscopes = [
  'Today is a great day to take bold steps. Trust your instincts and don\'t be afraid to speak your mind. A surprise opportunity may come your way — be ready to grab it!',
  'Focus on stability today. Avoid rushing into decisions. A calm and steady approach will bring better results. Someone close to you may offer valuable advice.',
  'Your social energy is high today. Reach out to old friends or make new connections. Communication is your strength — use it wisely in both personal and professional matters.',
  'Take care of your emotional well-being today. Spend time with family or loved ones. A small act of kindness will go a long way and come back to you in unexpected ways.',
  'Your confidence shines bright today. This is a good time to present your ideas and take the lead. Creative projects will flourish — don\'t hold back your unique vision.',
  'Pay attention to the details today. A careful review of your plans will reveal something important you may have missed. Health and routine are your focus right now.',
  'Balance is key today. Avoid extremes and try to find middle ground in conflicts. A relationship matter needs your attention — listen before you react.',
  'Deep focus and determination will get you far today. Avoid distractions and stay committed to your goals. Trust your gut feeling — it is more reliable than you think.',
  'Adventure calls today! Be open to new experiences and ideas from unexpected sources. Traveling, even a short trip, could lift your spirits significantly.',
  'Hard work pays off today. Stay disciplined and keep your long-term goals in mind. Financial matters look favorable — a good day to plan or review your budget.',
  'Your innovative thinking sets you apart today. Do not be afraid to challenge old ideas and suggest new solutions. Friendships and group activities bring joy.',
  'Your intuition is especially strong today. Pay attention to your dreams and inner feelings. Creative work, music, or art will bring you peace and inspiration.'
];

var colors = ['Red', 'Gold', 'Yellow', 'Silver', 'Orange', 'Blue', 'Pink', 'Indigo', 'Purple', 'Green', 'Aqua', 'Lavender'];
var luckyNums = [3, 7, 12, 5, 9, 21, 4, 8, 14, 6, 11, 18];

function makeStars(count) {
  var s = '';
  for (var i = 0; i < 5; i++) s += i < count ? '⭐' : '☆';
  return s;
}

// Set today's date
document.getElementById('todayDate').textContent = new Date().toLocaleDateString('en-IN', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});

// Build sign grid
var grid = document.getElementById('signsGrid');
signs.forEach(function(sign, i) {
  var btn = document.createElement('button');
  btn.className = 'sign-btn';
  btn.innerHTML = '<span class="s-emoji">' + sign.emoji + '</span><span class="s-name">' + sign.name + '</span>';
  btn.addEventListener('click', function() {
    document.querySelectorAll('.sign-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    showHoroscope(i);
  });
  grid.appendChild(btn);
});

function showHoroscope(index) {
  var sign = signs[index];
  // Use day + index to vary readings daily but consistently per sign per day
  var dayNum = new Date().getDate();
  var horoIndex = (index + dayNum) % horoscopes.length;
  var loveStars    = ((index + dayNum) % 3) + 3;
  var careerStars  = ((index + dayNum + 1) % 3) + 3;
  var healthStars  = ((index + dayNum + 2) % 3) + 3;

  document.getElementById('signEmoji').textContent = sign.emoji;
  document.getElementById('signName').textContent = sign.name;
  document.getElementById('signDates').textContent = sign.dates;
  document.getElementById('horoscopeText').textContent = horoscopes[horoIndex];
  document.getElementById('loveStars').textContent = makeStars(loveStars);
  document.getElementById('careerStars').textContent = makeStars(careerStars);
  document.getElementById('healthStars').textContent = makeStars(healthStars);
  document.getElementById('luckyNum').textContent = luckyNums[(index + dayNum) % luckyNums.length];
  document.getElementById('luckyColor').textContent = colors[(index + dayNum) % colors.length];
  document.getElementById('horoscopeCard').style.display = 'block';
  document.getElementById('horoscopeCard').scrollIntoView({ behavior: 'smooth' });
}
