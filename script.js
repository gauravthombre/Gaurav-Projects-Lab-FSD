const projects = [

  {
    name: "Tourism Static Website",
    description: "A tourism website showcasing destinations using static HTML and CSS.",
    image: "./assets/tourism.png",
    live: "./projects/tourism-static-website/index.html",
    code: "https://github.com/gauravthombre/Gaurav-Projects-Lab-FSD/tree/main/projects/tourism-static-website"
  },

  {
    name: "Online Food Ordering",
    description: "Food ordering website with menu, UI interactions, and responsive design.",
    image: "./assets/food-order.png",
    live: "./projects/online-food-ordering/index.html",
    code: "https://github.com/gauravthombre/Gaurav-Projects-Lab-FSD/tree/main/projects/online-food-ordering"
  },

  {
    name: "Bulb ON/OFF Cat Eyes",
    description: "JavaScript DOM project to toggle bulb and cat eyes interaction.",
    image: "./assets/bulb.png",
    live: "./projects/bulb-on-off-cat-eyes/index.html",
    code: "https://github.com/gauravthombre/Gaurav-Projects-Lab-FSD/tree/main/projects/bulb-on-off-cat-eyes"
  },
  {
    name: "Wikipedia",
    description: "It is wikipedia website showcasing destinations using static HTML CSS,JAVASCRIPT.",
    image: "./assets/wikipedia.png",
    live: "./projects/Wikipedia-js-website/index.html",
    code: "https://github.com/gauravthombre/Gaurav-Projects-Lab-FSD/tree/main/projects/Wikipedia-js-website"
  },
  {
    name: "Note App",
    description: "A sticky notes application with local storage for saving thoughts.",
    image: "./assets/note-app.png",
    live: "./projects/note-app/index.html",
    code: "https://github.com/gauravthombre/Gaurav-Projects-Lab-FSD/tree/main/projects/note-app"
  },
  {
    name: "Pomodoro Timer",
    description: "A productivity tool to manage work-break intervals effectively.",
    image: "./assets/pomodoro.png",
    live: "./projects/pomodoro-timer/index.html",
    code: "https://github.com/gauravthombre/Gaurav-Projects-Lab-FSD/tree/main/projects/pomodoro-timer"
  },
  {
    name: "Image Search App",
    description: "An app that fetches images from Unsplash API based on keywords.",
    image: "./assets/image-search.png",
    live: "./projects/image-search-app/index.html",
    code: "https://github.com/gauravthombre/Gaurav-Projects-Lab-FSD/tree/main/projects/image-search-app"
  },

  // --- Fun & Interactive Projects ---
  {
    name: "Dice Roll Simulator",
    description: "A random dice generator using JavaScript Math functions.",
    image: "./assets/dice-roll.png",
    live: "./projects/dice-roll-simulator/index.html",
    code: "https://github.com/gauravthombre/Gaurav-Projects-Lab-FSD/tree/main/projects/dice-roll-simulator"
  },
  {
    name: "Emoji Rating",
    description: "An interactive rating system that changes emojis based on selection.",
    image: "./assets/emoji-rating.png",
    live: "./projects/emoji-rating/index.html",
    code: "https://github.com/gauravthombre/Gaurav-Projects-Lab-FSD/tree/main/projects/emoji-rating"
  },
  {
    name: "Meme Viewer",
    description: "Fetches and displays trending memes from various subreddits.",
    image: "./assets/meme-viewer.png",
    live: "./projects/meme-viewer/index.html",
    code: "https://github.com/gauravthombre/Gaurav-Projects-Lab-FSD/tree/main/projects/meme-viewer"
  },

  // --- UI/UX Components ---
  {
    name: "Animated Search Bar",
    description: "A CSS-heavy expanding search bar with smooth transitions.",
    image: "./assets/search-bar.png",
    live: "./projects/animated-search-bar/index.html",
    code: "https://github.com/gauravthombre/Gaurav-Projects-Lab-FSD/tree/main/projects/animated-search-bar"
  },
  {
    name: "Blurred Background Popup",
    description: "A modal implementation with a modern blurred backdrop effect.",
    image: "./assets/popup.png",
    live: "./projects/blurred-background-popup/index.html",
    code: "https://github.com/gauravthombre/Gaurav-Projects-Lab-FSD/tree/main/projects/blurred-background-popup"
  },
  {
    name: "Social Media Selector",
    description: "A custom dropdown menu for social media navigation.",
    image: "./assets/social-menu.png",
    live: "./projects/social-media-selector-menu/index.html",
    code: "https://github.com/gauravthombre/Gaurav-Projects-Lab-FSD/tree/main/projects/social-media-selector-menu"
  },

  // --- Converters & Calculators ---
  {
    name: "Temperature Converter",
    description: "Instantly converts between Celsius, Fahrenheit, and Kelvin.",
    image: "./assets/temp-converter.png",
    live: "./projects/temperature-converter/index.html",
    code: "https://github.com/gauravthombre/Gaurav-Projects-Lab-FSD/tree/main/projects/temperature-converter"
  },
  {
    name: "Loan Calculator",
    description: "Calculates EMI and total interest for personal or home loans.",
    image: "./assets/loan-calc.png",
    live: "./projects/loan-calculator/index.html",
    code: "https://github.com/gauravthombre/Gaurav-Projects-Lab-FSD/tree/main/projects/loan-calculator"
  },
  {
    name: "Weight Converter",
    description: "Converts pounds to kilograms and other units in real-time.",
    image: "./assets/weight-converter.png",
    live: "./projects/weight-converter/index.html",
    code: "https://github.com/gauravthombre/Gaurav-Projects-Lab-FSD/tree/main/projects/weight-converter"
  }

];


const grid = document.getElementById("projectsGrid");
const count = document.getElementById("projectCount");


projects.forEach(project => {

  const card = document.createElement("div");
  card.className = "project-card";

  card.innerHTML = `
    <img src="${project.image}" class="project-image">
    
    <div class="project-content">
    
      <h3>${project.name}</h3>
      
      <p>${project.description}</p>
      
      <div class="buttons">
      
        <a href="${project.live}" class="btn primary">
        Open Project
        </a>
        
        <a href="${project.code}" class="btn secondary">
        Source Code
        </a>
        
      </div>
      
    </div>
  `;

  grid.appendChild(card);

});


count.textContent = projects.length;
