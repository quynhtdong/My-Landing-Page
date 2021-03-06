/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const btn = [];
const sections = document.querySelectorAll("section");
/**
 * End Global Variables
 * Start Helper Functions
 *
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  console.log(rect)
  console.log( window.innerWidth, screen.height, screen.width)
  return (
    rect.x >= 0 &&
    rect.y >= 0 &&
    rect.height <= screen.height &&
    rect.width <= window.innerWidth
  );
}

function setActive(sections) {
for(let i = 0; i<sections.length; i++) {
  if(isInViewport(sections[i])) {
    sections[i].classList.add("your-active-class");
  } else
  sections[i].classList.remove("your-active-class");
}
}
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */
// build the nav
for (let i = 0; i < sections.length; i++) {
  let li = document.createElement("LI");
  btn[i] = document.createElement("BUTTON");
  btn[i].textContent = document.getElementsByTagName("section")[i].getAttribute("data-nav");
  li.appendChild(btn[i]);
  document.getElementById('navbar__list').appendChild(li);
}
// Add class 'active' to section when near top of viewport
function addClass(current) {
  let currentSectionId = current.toLowerCase().replace(" ", "");
  let currentSection = document.getElementById(currentSectionId);
  document.querySelectorAll(".your-active-class")[0].classList.remove("your-active-class");
  if(isInViewport(currentSection)){
    currentSection.classList.add("your-active-class");
  }
}
// Scroll to anchor ID using scrollTO event
for (let i = 0; i < sections.length; i++) {
  btn[i].classList.add("menu__link");
  document.querySelectorAll(".menu__link")[i].addEventListener("click", function handleClick() {
    let buttonInnerHTML = this.innerHTML;
    addClass(buttonInnerHTML);
    scrollTo(buttonInnerHTML);
  });
}

//Scroll to the top

const toTop = document.createElement("button");
toTop.textContent = "Scroll to the top";
toTop.id = "toTop";
toTop.setAttribute("onclick", "toTopFunction()");
document.body.appendChild(toTop);
document.getElementById("toTop").style.cssText = "position: fixed; bottom: 5vh; left: 45%;";


function toTopFunction() {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}
/**
 * End Main Functions
 * Begin Events
 *
 */

// Scroll to section on link click
function scrollTo(section) {
  for (let i = 0; i < sections.length; i++) {
    if (section === sections[i].getAttribute("data-nav")) {
      sections[i].scrollIntoView({
        behavior: "smooth"
      });
      setTimeout(function(){
      document.getElementsByTagName("nav")[0].style.visibility = "hidden";
      }, 1000);
    }
  }
}
// set time out
window.addEventListener('scroll', function() {

  document.getElementsByTagName("nav")[0].style.visibility = "visible";
setTimeout(function(){
   document.getElementsByTagName("nav")[0].style.visibility = "hidden";
}, 10000);
setActive(sections);
});
