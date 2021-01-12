"use strict";

// EFFECTS ANIMATION
// all elements that have fadeIn class will get the effect by getting animateFadeIn when they enter viewport
let elementsToFade = document.querySelectorAll(".fadeIn");
// all elements that have slideMe class will get the effect by getting animateSlide when they enter viewport
let elementsToSlide = document.querySelectorAll(".slideMe");

function callbackFunc(entries, observer) {
  entries.forEach((entry) => {
    // var txt = entry.target.classList[0] + " visibility: " + entry.isIntersecting;
    // console.log(entry);
    if (entry.isIntersecting) {
      if (entry.target.classList.contains("fadeIn")) {
        entry.target.classList.add("animateFadeIn");
        return;
      }
      if (entry.target.classList.contains("slideMe")) {
        entry.target.classList.add("animateSlide");
      }
    }
  });
}

let options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3, //30% of the element has to enter viewport to trigger callbackFunction
};

let observer = new IntersectionObserver(callbackFunc, options);

// observing fade elements
elementsToFade.forEach(function (element) {
  observer.observe(element);
});
// observing slide elements
elementsToSlide.forEach(function (element) {
  observer.observe(element);
});
// end of EFFECTS ANIMATION




// ********** fixed navbar color change ************
// variable to add the desired color
const myBackgroundColorClass = "bg-white"

const scrollLinks = document.querySelectorAll(".nav-link, .my-nav-link");
const navbar = document.querySelector(".navbar");
const linksContainer = document.getElementById("navbarLinks");
const colapsedNavHeight = 90;

//nav background change on button press
document.querySelector(".navbar-toggler").addEventListener("click", function() {

  
  const containerHeight = linksContainer.getBoundingClientRect().height;
  //if the navbar was closed,add the bg in any case
  if(containerHeight<colapsedNavHeight){
    navbar.classList.add(myBackgroundColorClass);
  }
  // if the navbar was open on button press check the scroll position of the page
  // if the page has not been scrolled past the desired height then remove the bg class
  else if(window.pageYOffset < colapsedNavHeight){
    navbar.classList.remove(myBackgroundColorClass);
  };
})

//nav background change and shadow on page scroll
window.addEventListener("scroll", function () {
  const scrollHeight = window.pageYOffset;
  const containerHeight = linksContainer.getBoundingClientRect().height;
  // if the navbar is open do not do anything and if it is closed then decide accordingly
  if (!(containerHeight > colapsedNavHeight)) { // if it is not open
    if (scrollHeight > colapsedNavHeight) { // if we scrolled past navheight
      navbar.classList.add(myBackgroundColorClass);
      navbar.classList.add("shadow");
      
    } else { // if we are at the starting position
      navbar.classList.remove(myBackgroundColorClass);
      navbar.classList.remove("shadow");
      
    };
  };
});


// ********** scroll correction ************


// select links


scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // prevent default
     e.preventDefault();
    // navigate to specific spot
    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);

    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    let position = element.offsetTop - navHeight;

    
    if (navHeight > colapsedNavHeight) {
      position = position + containerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });
    
    // close
    linksContainer.classList.remove("show");
  });
});

/*
// Mouse trail animation
function createTrailElements(colorClass) {
        //control logic
      var dots = [],
      mouse = {
        x: 0,
        y: 0
      };

      var Dot = function() {
      this.x = 0;
      this.y = 0;
      this.node = (function(){
      var n = document.createElement("div");
      n.className = colorClass;
      document.body.appendChild(n);
      return n;
      }());
      };

      Dot.prototype.draw = function() {
      this.node.style.left = this.x + "px";
      this.node.style.top = this.y + "px";
      };

      for (var i = 0; i < 30; i++) {
      var d = new Dot();
      dots.push(d);
      }


      function draw() {

      var x = mouse.x + 2, // this offset is important for the links to be clickable(element is not on mouse point)
          y = mouse.y + 5;
        
      dots.forEach(function(dot, index, dots) {
      var nextDot = dots[index + 1] || dots[0];

      dot.x = x;
      dot.y = y;
      dot.draw();
      x += (nextDot.x - dot.x) * .6;
      y += (nextDot.y - dot.y) * .6;

      });
      };

      function animate() {
        draw();
        requestAnimationFrame(animate);
      }
      animate();
      addEventListener("mousemove", function(event) {
        mouse.x = event.pageX;
        mouse.y = event.pageY;
      });
      
};



function removePaint() {
  document.querySelectorAll(".MouseTrail-red, .MouseTrail-yellow").forEach(function(element) {
    element.remove();
  });
};




// animation buttons event listeners

//for red button
document.getElementById("red").addEventListener("click", function(event) { 
  // 1. remove all previous trail elements if there are any
  removePaint();
  // 2. create new trails with the color class
  createTrailElements("MouseTrail-red");
});

//for yellow button
document.getElementById("yellow").addEventListener("click", function(event) { 
  removePaint();

  createTrailElements("MouseTrail-yellow");
});

//for none button
document.getElementById("none").addEventListener("click", function(event) { 
  // stop the animation
  removePaint();
  
});

*/

// DRAWING LOGIC
//
(function drawingLogic(){

  let mouseState = "mouseup";
  let trailColor;  //color will be defined depending which button was pressed

   
 // add/remove listeners for the mousedown event
  function startMouseListen() {
    document.body.addEventListener("mousedown", initiateDrawing);
  };
  function stopMouseListen() {
    document.body.removeEventListener("mousedown", initiateDrawing);
  };

  function initiateDrawing() {
    
     mouseState = "mousedown";
     requestAnimationFrame(startDrawing);
    
  };
  
  // listener for the mouseup event
  document.body.addEventListener("mouseup", function(event) {
    mouseState = "mouseup";
  });

  
  
  
  //stored mouse coordinates 
  var mouse = {
                x: 0,
                y: 0,
                screenX: 0,
                screenY: 0
              };
  // getting the mouse coordinates
  window.addEventListener("mousemove", function(event) {
    mouse.x = event.pageX;
    mouse.y = event.pageY;
    mouse.clientX = event.clientX
    mouse.clientY = event.clientY   
    
  });

  //this offset is so that links and buttons can be clicked on with no issues
  let offset = 2;
  
  var Dot = function(mouseX,mouseY) {
          this.x = mouseX + offset;
          this.y = mouseY + offset;
          this.dotElement = `<div class="MouseTrail" style="left:${this.x}px;top:${this.y}px;background:${trailColor};"></div>`
          };
  
  function startDrawing() {
    // If the mouse button is pressed, draw elements. Otherwise don't.
    if (mouseState === "mousedown") {
      // 1. create element 
        let e = new Dot(mouse.x,mouse.y);
        
      // 2. insert it in the DOM if coordinates are not over buttons
      let brushContainer = document.getElementById("brush-container");
      let contTop = brushContainer.getBoundingClientRect().top;
      let contWidth = brushContainer.getBoundingClientRect().width;
      let contBottom = brushContainer.getBoundingClientRect().bottom;
      let x = mouse.clientX;
      let y = mouse.clientY;
      
      if (!(( 0<=x && x<contWidth) && ( contTop < y && y < contBottom ))) {
        document.body.insertAdjacentHTML("beforeend", e.dotElement);
      };
        
      // 3. start another frame 
        requestAnimationFrame(startDrawing);
      
    };
  };
  
  function removePaint() {
    document.querySelectorAll(".MouseTrail").forEach(function(element) {
      element.remove();
    });
  };
  // animation buttons event listeners
  
  //for red button
  document.getElementById("red").addEventListener("click", function(event) { 
    trailColor = "rgb(230, 7, 7)"
    preventDragAndSelect();
    startMouseListen();
  });
  
  //for yellow button
  document.getElementById("yellow").addEventListener("click", function(event) { 
    trailColor = "rgb(255, 238, 0)"
    preventDragAndSelect();
    startMouseListen();
  
  });
  
  //for blue button
  document.getElementById("blue").addEventListener("click", function(event) { 
    trailColor = "#1d3557"
    preventDragAndSelect();
    startMouseListen();
  
  });

  //for input field
  let FavColor = document.getElementById("favcolor");
  FavColor.addEventListener("input", function(event) {
     
    trailColor = FavColor.value;
    preventDragAndSelect();
    startMouseListen();
    
    
  });
  
  //for pause button
  document.getElementById("pause-btn").addEventListener("click", function(event) { 
    enableDragAndSelect();
    stopMouseListen();
    
    
  });
  
  //for off button
  document.getElementById("off-btn").addEventListener("click", function(event) { 
    enableDragAndSelect();
    removePaint();
    stopMouseListen();
  });
  
  
  // right mouse click menu enable/disable
  function stopEvent(event) {
    event.preventDefault();
  };
  
  function preventDragAndSelect() {
    document.addEventListener('selectstart', stopEvent);
    document.addEventListener('dragstart', stopEvent);
    
  };
   
  function enableDragAndSelect() {
    document.removeEventListener('selectstart', stopEvent);
    document.removeEventListener('dragstart', stopEvent);
  };

})();
// end of DRAW LOGIC

//tooltips FIX

// var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
// var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
//   return new bootstrap.Tooltip(tooltipTriggerEl)
// })

//color adjustments for dark mode
function adjustForDarkMode(){
  // find and select all dripping sections
  let drippingSections = document.querySelectorAll(".dripping-section");

  drippingSections.forEach((section)=>{
     //get the background of the next section
    let nextSection = section.nextElementSibling;
    console.log(section);
    let nextSectionColor = window.getComputedStyle(nextSection).backgroundColor;
    // select path within the section to fill it with color
    let path = section.querySelector("path");
    // path needs to be filled with the same color as the Nextsection background color
    path.style.fill = nextSectionColor;
    
    
  });
};

window.addEventListener('DOMContentLoaded', (event) => {
  adjustForDarkMode();
});








      


    