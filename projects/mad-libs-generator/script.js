var stories = [
  {
    title: 'The Adventure',
    fields: [
      { id: 'name', label: 'A person\'s name' },
      { id: 'animal', label: 'An animal' },
      { id: 'place', label: 'A place' },
      { id: 'verb', label: 'A verb (action word)' },
      { id: 'adjective', label: 'An adjective' },
      { id: 'food', label: 'A type of food' }
    ],
    template: function(f) {
      return 'One day, <b>' + f.name + '</b> decided to go on a trip to <b>' + f.place + '</b>. '
        + 'On the way, they met a <b>' + f.adjective + '</b> <b>' + f.animal + '</b>. '
        + 'The animal started to <b>' + f.verb + '</b> and everyone was shocked. '
        + 'To calm things down, <b>' + f.name + '</b> offered the animal some <b>' + f.food + '</b>. '
        + 'And they lived happily ever after!';
    }
  },
  {
    title: 'The Birthday Party',
    fields: [
      { id: 'name', label: 'A friend\'s name' },
      { id: 'number', label: 'A number' },
      { id: 'color', label: 'A color' },
      { id: 'food', label: 'A weird food' },
      { id: 'verb', label: 'A silly verb' },
      { id: 'animal', label: 'An animal' }
    ],
    template: function(f) {
      return '<b>' + f.name + '</b> turned <b>' + f.number + '</b> years old today! '
        + 'The birthday cake was <b>' + f.color + '</b> and tasted like <b>' + f.food + '</b>. '
        + 'All the guests started to <b>' + f.verb + '</b> when a <b>' + f.animal + '</b> walked in. '
        + 'It was the most unforgettable birthday party ever!';
    }
  },
  {
    title: 'A Day at School',
    fields: [
      { id: 'teacher', label: 'A teacher\'s name' },
      { id: 'subject', label: 'A school subject' },
      { id: 'student', label: 'Your name' },
      { id: 'verb', label: 'A verb' },
      { id: 'adjective', label: 'An adjective' },
      { id: 'object', label: 'A random object' }
    ],
    template: function(f) {
      return 'In <b>' + f.subject + '</b> class, <b>' + f.teacher + '</b> asked everyone to bring a <b>' + f.object + '</b>. '
        + '<b>' + f.student + '</b> forgot, so they decided to <b>' + f.verb + '</b> instead. '
        + 'The teacher called it the most <b>' + f.adjective + '</b> thing they had ever seen. '
        + 'The whole class laughed for the rest of the day!';
    }
  }
];

function loadStory() {
  var index = parseInt(document.getElementById('storySelect').value);
  var story = stories[index];
  var form = document.getElementById('inputForm');
  form.innerHTML = '';
  story.fields.forEach(function(field) {
    var div = document.createElement('div');
    div.className = 'field-group';
    div.innerHTML =
      '<label>' + field.label + '</label>' +
      '<input type="text" id="field-' + field.id + '" placeholder="Enter ' + field.label.toLowerCase() + '" />';
    form.appendChild(div);
  });
  document.getElementById('storyOutput').style.display = 'none';
}

document.getElementById('generateBtn').addEventListener('click', function() {
  var index = parseInt(document.getElementById('storySelect').value);
  var story = stories[index];
  var values = {};
  var valid = true;

  story.fields.forEach(function(field) {
    var val = document.getElementById('field-' + field.id).value.trim();
    if (!val) { valid = false; }
    values[field.id] = val;
  });

  if (!valid) { alert('Please fill in all the blanks!'); return; }

  var text = story.template(values);
  document.getElementById('storyText').innerHTML = text;
  document.getElementById('storyOutput').style.display = 'block';
  document.getElementById('storyOutput').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('tryAgainBtn').addEventListener('click', function() {
  document.getElementById('storyOutput').style.display = 'none';
  document.querySelectorAll('#inputForm input').forEach(function(i) { i.value = ''; });
});

loadStory();
