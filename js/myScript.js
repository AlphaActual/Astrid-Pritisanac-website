"use strict";

window.addEventListener("load", runAnimations);
function runAnimations() {


  // EFFECTS ANIMATION
  // all elements that have fadeIn class will get the effect by getting animateFadeIn when they enter viewport
  let elementsToFade = document.querySelectorAll(".fadeIn");
  // all elements that have slideMeRight class will get the effect by getting animateSlideRight when they enter viewport
  let elementsToSlideRight = document.querySelectorAll(".slideMeRight");
  // all elements that have slideMeLeft class will get the effect by getting animateSlideLeft when they enter viewport
  let elementsToSlideLeft = document.querySelectorAll(".slideMeLeft");
  // all elements that have slideMeBottom class will get the effect by getting animateSlideBottom when they enter viewport
  let elementsToSlideBottom = document.querySelectorAll(".slideMeBottom");

  function callbackFunc(entries, observer) {
    entries.forEach((entry) => {
      // var txt = entry.target.classList[0] + " visibility: " + entry.isIntersecting;
      // console.log(entry);
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("fadeIn")) {
          entry.target.classList.add("animateFadeIn");
          return;
        };
        if (entry.target.classList.contains("slideMeRight")) {
          entry.target.classList.add("animateSlideRight");
          return
        };
        if (entry.target.classList.contains("slideMeLeft")) {
          entry.target.classList.add("animateSlideLeft");
          return

        };
        if (entry.target.classList.contains("slideMeBottom")) {
          entry.target.classList.add("animateSlideBottom");

        };
      };
    });
  };

  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.0, // even one pixel of the element has to enter viewport to trigger callbackFunction
  };

  let observer = new IntersectionObserver(callbackFunc, options);

  // observing fade elements
  elementsToFade.forEach(function (element) {
    observer.observe(element);
  });
  // observing slide elements
  elementsToSlideRight.forEach(function (element) {
    observer.observe(element);
  });
  elementsToSlideLeft.forEach(function (element) {
    observer.observe(element);
  });
  elementsToSlideBottom.forEach(function (element) {
    observer.observe(element);
  });


};
// end of EFFECTS ANIMATION


// selected elements
const scrollLinks = document.querySelectorAll(".my-nav-link");
const navbar = document.querySelector(".navbar");
const linksContainer = document.getElementById("navbarLinks");
const colapsedNavHeight = 90;


//nav shadow on page scroll
window.addEventListener("scroll", function () {
  const scrollHeight = window.pageYOffset;
  const containerHeight = linksContainer.getBoundingClientRect().height;
  // if the navbar is open do not do anything and if it is closed then decide accordingly
  if (!(containerHeight > colapsedNavHeight)) { // if it is not open
    if (scrollHeight > colapsedNavHeight) { // if we scrolled past navheight
      navbar.classList.add("shadow");
    } else { // if we are at the starting position
      navbar.classList.remove("shadow");
    };
  };
  // setup back to top link
  const topLink = document.querySelector(".top-link");
  if (scrollHeight > 500) {
    topLink.classList.add("show-link");
  } else {
    topLink.classList.remove("show-link");
  }
});


// ********** scroll correction ************


// select links


scrollLinks.forEach((link) => {
  link.addEventListener("click", scrollToElement)
});

function scrollToElement(event, elementID = 0) {
  let id;
  // prevent default
  if (event != undefined) {
    event.preventDefault();
  };

  // navigate to specific spot
  // if no id is passed in to function get id from event
  if (elementID === 0) {
    id = event.currentTarget.getAttribute("href").slice(1);
  } else { id = elementID };


  let element = document.getElementById(id);

  //if the element is located inside this page's DOM scroll to it
  if (element != null) {

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

    // close dropdown menu if it was open
    linksContainer.classList.remove("show");
  }
  // if the element is not on this page(it is on index page) then store it and redirect to index.html
  else {
    storeIdAndRedirect(id);
  };
};

function storeIdAndRedirect(id) {
  // store id
  localStorage.setItem("scrollElementID", id);
  // redirect to index.html - had to put absolute path here to avoid 404 error
  // window.location.assign("https://alphaactual.github.io/Astrid-Pritisanac-website/");
  window.location.assign("./index.html");

};
// on page load check if there is some element ID in the storage
window.onload = function () {
  checkStorage();
};

function checkStorage() {
  let elementID = localStorage.getItem("scrollElementID");
  // if there is an ID in the storage
  if (elementID != null) {
    // scroll to it
    scrollToElement(undefined, elementID);
    //clear storage
    localStorage.removeItem("scrollElementID");
  };
};



// DRAWING LOGIC
//
(function drawingLogic() {

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
  document.body.addEventListener("mouseup", function (event) {
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
  window.addEventListener("mousemove", function (event) {
    mouse.x = event.pageX;
    mouse.y = event.pageY;
    mouse.clientX = event.clientX
    mouse.clientY = event.clientY

  });

  //this offset is so that links and buttons can be clicked on with no issues
  let offset = 2;

  var Dot = function (mouseX, mouseY) {
    this.x = mouseX + offset;
    this.y = mouseY + offset;
    this.dotElement = `<div class="MouseTrail" style="left:${this.x}px;top:${this.y}px;background:${trailColor};"></div>`
  };

  function startDrawing() {
    // If the mouse button is pressed, draw elements. Otherwise don't.
    if (mouseState === "mousedown") {
      // 1. create element 
      let e = new Dot(mouse.x, mouse.y);

      // 2. insert it in the DOM if coordinates are not over buttons
      let brushContainer = document.getElementById("brush-container");
      let contTop = brushContainer.getBoundingClientRect().top;
      let contWidth = brushContainer.getBoundingClientRect().width;
      let contBottom = brushContainer.getBoundingClientRect().bottom;
      let x = mouse.clientX;
      let y = mouse.clientY;

      if (!((0 <= x && x < contWidth) && (contTop < y && y < contBottom))) {
        document.body.insertAdjacentHTML("beforeend", e.dotElement);
      };

      // 3. start another frame 
      requestAnimationFrame(startDrawing);

    };
  };

  function removePaint() {
    document.querySelectorAll(".MouseTrail").forEach(function (element) {
      element.remove();
    });
  };
  // animation buttons event listeners

  //for red button
  document.getElementById("red").addEventListener("click", function (event) {
    trailColor = "rgb(230, 7, 7)"
    preventDragAndSelect();
    startMouseListen();
  });

  //for yellow button
  document.getElementById("yellow").addEventListener("click", function (event) {
    trailColor = "rgb(255, 238, 0)"
    preventDragAndSelect();
    startMouseListen();

  });

  //for blue button
  document.getElementById("blue").addEventListener("click", function (event) {
    trailColor = "#1d3557"
    preventDragAndSelect();
    startMouseListen();

  });

  //for input field
  let FavColor = document.getElementById("favcolor");
  FavColor.addEventListener("input", function (event) {

    trailColor = FavColor.value;
    preventDragAndSelect();
    startMouseListen();


  });

  //for pause button
  document.getElementById("pause-btn").addEventListener("click", function (event) {
    enableDragAndSelect();
    stopMouseListen();


  });

  //for off button
  document.getElementById("off-btn").addEventListener("click", function (event) {
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

//tooltips 
(function tooltips() {
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  });
})();

//footer date
const date = document.querySelector(".date");
date.innerHTML = new Date().getFullYear() + ".";












