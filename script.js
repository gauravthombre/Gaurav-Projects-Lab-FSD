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

  // {
  //   name: "Bulb ON/OFF Cat Eyes",
  //   description: "JavaScript DOM project to toggle bulb and cat eyes interaction.",
  //   image: "./assets/bulb.png",
  //   live: "./projects/bulb-on-off-cat-eyes/index.html",
  //   code: "#"
  // }

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