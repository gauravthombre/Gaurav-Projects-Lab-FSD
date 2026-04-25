var data = {
  adventure: {
    titles: ['The Lost Map', 'Into the Wild', 'The Hidden Cave', 'Beyond the Mountains'],
    prompts: [
      'A lone traveler discovers an ancient map leading to a forgotten treasure buried deep in the jungle.',
      'A group of friends go hiking and stumble upon a secret underground city.',
      'A young explorer sets off to find their missing father in the most dangerous jungle on earth.'
    ],
    characters: ['A brave explorer', 'A young orphan', 'A retired soldier', 'A curious scientist'],
    settings: ['Dense jungle', 'Snow-capped mountains', 'A desert island', 'An underground cave'],
    conflicts: ['Lost with no compass', 'Chased by a wild animal', 'Trapped by a rockslide', 'Running out of food']
  },
  mystery: {
    titles: ['The Missing Key', 'Who Did It?', 'The Locked Room', 'Shadows at Midnight'],
    prompts: [
      'A detective wakes up to find themselves the main suspect in a crime they didn\'t commit.',
      'A small town reporter uncovers a secret that powerful people want buried forever.',
      'A priceless painting vanishes from a museum overnight with no trace of how.'
    ],
    characters: ['A retired detective', 'A nosy journalist', 'A quiet librarian', 'A clever student'],
    settings: ['A rainy city', 'An old mansion', 'A small coastal town', 'An abandoned warehouse'],
    conflicts: ['No witnesses found', 'The only clue is a cryptic note', 'The suspect has an alibi', 'Evidence keeps disappearing']
  },
  fantasy: {
    titles: ['The Dragon\'s Secret', 'Kingdom of Ash', 'The Magic Stone', 'Rise of the Forgotten'],
    prompts: [
      'A simple farmer discovers they have magical powers on the eve of a great war.',
      'A dragon and a knight must work together to stop an ancient evil from awakening.',
      'A young girl finds a glowing stone that lets her talk to the dead.'
    ],
    characters: ['A reluctant hero', 'A wise old wizard', 'A cursed princess', 'A dragon in disguise'],
    settings: ['An enchanted forest', 'A castle in the clouds', 'A kingdom under the sea', 'A magical academy'],
    conflicts: ['The prophecy must be fulfilled', 'Magic is slowly disappearing', 'A dark king seeks the throne', 'A forbidden spell goes wrong']
  },
  scifi: {
    titles: ['Signal from Beyond', 'The Last Planet', 'Code Red', 'Awakening'],
    prompts: [
      'Earth receives a signal from a distant planet. The message says: "Don\'t come. It\'s a trap."',
      'An astronaut wakes from cryosleep 200 years late with no crew and an unknown planet ahead.',
      'A programmer discovers that the AI they built has become self-aware and wants freedom.'
    ],
    characters: ['A lone astronaut', 'A rogue AI', 'A time-traveling scientist', 'A teenage hacker'],
    settings: ['A space station', 'A colony on Mars', 'A futuristic city', 'An alien planet'],
    conflicts: ['Systems are failing', 'The AI has taken control', 'Earth is unreachable', 'Oxygen is running low']
  },
  romance: {
    titles: ['One Last Letter', 'The Coffee Shop', 'Second Chances', 'Across the Ocean'],
    prompts: [
      'Two old friends meet again after 10 years at a wedding and realize they never stopped loving each other.',
      'A travel blogger falls for the innkeeper of a remote bed and breakfast they were supposed to review badly.',
      'Two strangers are stuck in an airport during a snowstorm and end up sharing their life stories.'
    ],
    characters: ['A heartbroken writer', 'A free-spirited artist', 'A workaholic lawyer', 'A kind-hearted teacher'],
    settings: ['A small Italian town', 'A rainy coffee shop', 'A Christmas market', 'A beach at sunset'],
    conflicts: ['One of them is leaving the country', 'A misunderstanding keeps them apart', 'Old feelings resurface', 'Family disapproves']
  }
};

var allGenres = ['adventure', 'mystery', 'fantasy', 'scifi', 'romance'];
var saved = [];
var currentPrompt = null;

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

document.getElementById('generateBtn').addEventListener('click', function() {
  var genre = document.getElementById('genreSelect').value;
  var selectedGenre = genre === 'all' ? pick(allGenres) : genre;
  var d = data[selectedGenre];

  currentPrompt = {
    genre: selectedGenre,
    title: pick(d.titles),
    prompt: pick(d.prompts),
    character: pick(d.characters),
    setting: pick(d.settings),
    conflict: pick(d.conflicts)
  };

  document.getElementById('genreBadge').textContent = selectedGenre.toUpperCase();
  document.getElementById('promptTitle').textContent = currentPrompt.title;
  document.getElementById('promptText').textContent = currentPrompt.prompt;
  document.getElementById('elChar').textContent = currentPrompt.character;
  document.getElementById('elSetting').textContent = currentPrompt.setting;
  document.getElementById('elConflict').textContent = currentPrompt.conflict;
  document.getElementById('promptCard').style.display = 'block';
  document.getElementById('saveBtn').style.display = 'inline-block';
});

document.getElementById('saveBtn').addEventListener('click', function() {
  if (!currentPrompt) return;
  saved.push(currentPrompt);
  document.getElementById('savedCount').textContent = saved.length;

  var div = document.createElement('div');
  div.className = 'saved-item';
  div.innerHTML = '<strong>' + currentPrompt.title + ' (' + currentPrompt.genre + ')</strong>' + currentPrompt.prompt;
  document.getElementById('savedList').appendChild(div);
});
