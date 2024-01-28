const WIN_BREAKPOINT = 991; //window breakpoint

// adds or removes "active" class to every div of toggler button
// to transform each line so that they formed "menu" button or "close" button
// according to value of "isOpen"
function transformTogglerButton(lines, isOpen) {
  for (let i = 0; i < lines.length; i++) {
    isOpen
      ? lines[i].classList.add("active")
      : lines[i].classList.remove("active");
  }
}



let isRightNavOpen = false;
// assumes if right navbar is open or closed
// and displays "menu" icon or "close" icon accordingly
function handleClick() {
  isRightNavOpen = !isRightNavOpen;
  const toggleLines = toggleButton.children;
  const background = document.getElementsByClassName("offcanvas-backdrop")[0];
  transformTogglerButton(toggleLines, isRightNavOpen);
  if (isRightNavOpen) background.onclick = function () {
    isRightNavOpen = false;
    transformTogglerButton(toggleLines, isRightNavOpen);
  }
}

const toggleButton = document.getElementById("toggler-svg"); //toggler button dom element
toggleButton.addEventListener("click", handleClick); //listens to every click on toggler button 


let lastScroll = 0; // last data of scrolled height number
const navbar = document.querySelector(".navbar");


// listens to scroll event and makes navbar transparent 
// when scrolled down and makes it solid when
// user scrolles up to top of the page
// on mobile version it makes navbar dissapear durig scrolling down
// and appear during scrolling up
window.addEventListener("scroll", function () {
  const navbarStyles = getComputedStyle(navbar);
  const navbarHeight = parseInt(navbarStyles.getPropertyValue("height"), 10);
  const curScroll = window.scrollY || document.documentElement.scrollTop;

  curScroll > navbarHeight
    ? navbar.classList.add("transparent")
    : navbar.classList.remove("transparent");

  curScroll > lastScroll && curScroll > navbarHeight
    ? navbar.classList.add("hidden")
    : navbar.classList?.remove("hidden");

  lastScroll = curScroll;
});

// This function makes carousel fade on small screen
// and slide on large screen
function assumeCarrouselSlideType() {
  const carousel = document.getElementById("carouselExampleFade");
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  const isSmallScreen = windowWidth <= WIN_BREAKPOINT;
  isSmallScreen
    ? carousel.classList?.remove("carousel-fade") &&
    carousel.classList.add("carousel-slide")
    : carousel.classList.add("carousel-fade") &&
    carousel.classList?.remove("carousel-slide");
}

//defines carousel slide type when content is loaded 
assumeCarrouselSlideType();

//listens to window resize and defines carousel slide type accordingly
window.addEventListener("resize", assumeCarrouselSlideType);



const questions = document.getElementsByClassName("question-button");

// initial state of question buttons
let isExpanded = [false, false, false];

// This function closes all the other questions 
// which were open before clicking current question button
// and rotates their arrows as they were initially before opening
function handleOtherQuestions(questionIndex) {
  for (let i = 1; i <= questions.length; i++) {
    if (i !== questionIndex && isExpanded[i - 1]) {
      isExpanded[i - 1] = false;
      document.getElementById(`collapseExample${i}`).classList.remove("show");
      document.getElementById(`arrow-${i}`).classList.remove("rotate");
    }
  }
}

// This function expands or closes currently clicked question, 
// according to it's state, rotates it's "arrow" icon,
// closes any other questions if opened and rotates their arrow icons to initial conditions
function updateQuestionState(questionIndex) {
  isExpanded[questionIndex - 1] = !isExpanded[questionIndex - 1];
  handleOtherQuestions(questionIndex);

  const arrow = document.getElementById(`arrow-${questionIndex}`);
  const answer = document.getElementById(`collapseExample${questionIndex}`);

  isExpanded[questionIndex - 1] ? arrow.classList.add("rotate") : arrow.classList.remove("rotate") && answer.classList.add(show);
}

// Listens to click on every question button 
// and updates question state on click
for (let i = 0; i < questions.length; i++) {
  questions[i].addEventListener("click", () => updateQuestionState(i + 1));
}
