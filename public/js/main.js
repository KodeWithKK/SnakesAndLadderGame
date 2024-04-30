"use strict";

import { btnRollFun } from "./modules/btnRollFun.js";

/* --------------------------
          VARIABLES
 ---------------------------*/

// Player Box Varaibles
const player00CounterBox = document.querySelector(
  ".player-0-box:has(.player-counter-img)"
);
const player01CounterBox = document.querySelector(
  ".player-1-box:has(.player-counter-img)"
);
const player00ArrowBox = document.querySelector(
  ".player-0-box:has(.player-arrow-img"
);
const player01ArrowBox = document.querySelector(
  ".player-1-box:has(.player-arrow-img"
);

// gameplay Container btns Variable
const dice = document.querySelector(".dice-img");
const btnRoll = document.querySelector(".btn-roll");
const btnRollText = document.querySelector(".btn-roll-text");
const btnRestart = document.querySelector(".btn-restart");
const containerWinner = document.querySelector(".container-winner");
const winnerText = document.querySelector(".container-winner .winner-text");

// Stats Container Variables
const player00SnakeBitesText = document.querySelector(
  ".stats__player-0 .snakes-bites"
);
const player00LadderClimbsText = document.querySelector(
  ".stats__player-0 .ladder-climbs"
);
const player00TrophyIcon = document.querySelector(
  ".stats__player-0 .trophy-icon img"
);
const player01SnakeBitesText = document.querySelector(
  ".stats__player-1 .snakes-bites"
);
const player01LadderClimbsText = document.querySelector(
  ".stats__player-1 .ladder-climbs"
);
const player01TrophyIcon = document.querySelector(
  ".stats__player-1 .trophy-icon img"
);

// Navbar btns Variables
const navBar = document.querySelector("nav");
const containerNavBtns = document.querySelector(".container-nav-btns");
const menuBtn = document.querySelector(".menu-btn");
const navBtnNewGame = document.querySelector(".nav-btn__new-game");
const navBtnRestart = document.querySelector(".nav-btn__restart-game");
const navBtnSideBar = document.querySelector(".nav-btn__side-bar");
const navBtnSideBarIcon = document.querySelector(".nav-btn__side-bar img");
const navBtnCustomize = document.querySelector(".nav-btn__customize");

// player00CounterBox.style.translate = `${9*100}% -${9*100}%`;
// player00CounterBox.style.left = '1.05%';
// player00CounterBox.style.bottom = '1.05%';
// player00CounterBox.style.border = '1px solid yellow';

// player01CounterBox.style.left = `${-(10 - 0.2) + 0.95}%`;
// player01CounterBox.style.bottom = `${-(10 - 0.2) + 0.9}%`;

// [snake head Coordinates, snake tail Coordinates, Pos Shift]
const snakesMapping = [
  [[5, 2], [6, 1], 10],
  [[7, 5], [6, 3], 21],
  [[9, 5], [10, 3], 19],
  [[5, 6], [8, 6], 3],
  [[2, 7], [2, 2], 43],
  [[3, 7], [1, 6], 3],
  [[7, 9], [4, 3], 63],
  [[8, 10], [8, 8], 20],
  [[6, 10], [6, 8], 20],
  [[3, 10], [3, 8], 20],
];

// [Ladder head Coordinates, Ladder tail Coordinates, Pos Shift]
const laddersMapping = [
  [[1, 1], [3, 4], 37],
  [[4, 1], [7, 2], 10],
  [[9, 1], [10, 4], 22],
  [[1, 3], [2, 5], 21],
  [[8, 3], [4, 9], 56],
  [[5, 4], [4, 5], 8],
  [[10, 6], [7, 7], 16],
  [[10, 8], [10, 10], 20],
  [[1, 8], [1, 10], 20],
];

const player00 = {
  name: "Red Player",
  counterBox: player00CounterBox,
  arrowBox: player00ArrowBox,
  posX: 0,
  posY: 1,
  tilesMoved: 0,
  snakeBitesText: player00SnakeBitesText,
  ladderClimbsText: player00LadderClimbsText,
  trophyIcon: player00TrophyIcon,
  snakeBites: 0,
  ladderClimbs: 0,
  isActivePlayer: true,
};

const player01 = {
  name: "Yellow Player",
  counterBox: player01CounterBox,
  arrowBox: player01ArrowBox,
  posX: 0,
  posY: 1,
  tilesMoved: 0,
  snakeBitesText: player01SnakeBitesText,
  ladderClimbsText: player01LadderClimbsText,
  trophyIcon: player01TrophyIcon,
  snakeBites: 0,
  ladderClimbs: 0,
  isActivePlayer: false,
};

const playerObjArr = [player00, player01];

/* --------------------------
      INTIALIZE FUNCITON
 ---------------------------*/
const initialize = function () {
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth; // 105vh + 200px
  const smallScreenBreakpointWidth = windowHeight * 1.05 + 200; // tablets and mobiles

  // change display property after it reaches the initital position
  setTimeout(() => {
    player00.arrowBox.style.display = "flex";
    player01.arrowBox.style.display = "none";
  }, 300);

  player00.counterBox.style.translate = "0";
  player00.counterBox.style.left = "-8.5vh";
  player00.counterBox.style.bottom = "2vh";
  player00.arrowBox.style.translate = "0";
  player00.arrowBox.style.left = "-8.5vh";
  player00.arrowBox.style.bottom = "2vh";

  if (windowWidth <= smallScreenBreakpointWidth) {
    player00.counterBox.style.left = "-9%";
    player00.counterBox.style.bottom = "0.5%";
    player00.arrowBox.style.left = "-9%";
    player00.arrowBox.style.bottom = "0.5%";
  }

  player01.counterBox.style.translate = "0";
  player01.counterBox.style.left = "-8.5vh";
  player01.counterBox.style.bottom = "2vh";
  player01.counterBox.style.marginBottom = "4%";

  player01.arrowBox.style.translate = "0";
  player01.arrowBox.style.left = "-8.5vh";
  player01.arrowBox.style.bottom = "2vh";
  player01.arrowBox.style.marginBottom = `4%`;

  if (windowWidth <= smallScreenBreakpointWidth) {
    player01.counterBox.style.left = "-9%";
    player01.counterBox.style.bottom = "0.5%";
    player01.arrowBox.style.left = "-9%";
    player01.arrowBox.style.bottom = "0.5%";
  }

  player00.snakeBitesText.textContent = "0";
  player00.ladderClimbsText.textContent = "0";
  player00.trophyIcon.style.visibility = "hidden";
  player00.snakeBites = 0;
  player00.ladderClimbs = 0;
  player00.tilesMoved = 0;

  player01.snakeBitesText.textContent = "0";
  player01.ladderClimbsText.textContent = "0";
  player01.trophyIcon.style.visibility = "hidden";
  player01.snakeBites = 0;
  player01.ladderClimbs = 0;
  player01.tilesMoved = 0;

  containerWinner.style.display = "none";

  btnRoll.style.display = "block";
  dice.src = "img/Dice Images/Dice-1.svg";

  player00.isActivePlayer = true;
  player00.posX = 0;
  player00.posY = 1;
  player01.isActivePlayer = false;
  player01.posX = 0;
  player01.posY = 1;
};

// initialize();

/* ----------------------------------------
      MAIN CONTAINER EVENT LISTENERS
 ----------------------------------------*/

// ----- ROLL BUTTON ----- //
btnRoll.onclick = function () {
  btnRollFun(
    playerObjArr,
    snakesMapping,
    laddersMapping,
    containerWinner,
    winnerText,
    btnRoll,
    btnRollText,
    dice
  );
};

// ----- SPACE BAR KEYPRESS ----- //
const body = document.querySelector("body");
body.addEventListener("keypress", (event) => {
  // console.log(event);
  // console.log(event.key);

  const containerWinnerDisplay =
    window.getComputedStyle(containerWinner).display;

  if (event.key === " " && containerWinnerDisplay == "none") {
    event.preventDefault(); // Prevent the default behavior of the spacebar key
    // window.scrollTo(0, 0); // Scroll the page to the top

    btnRollFun(
      playerObjArr,
      snakesMapping,
      laddersMapping,
      containerWinner,
      winnerText,
      btnRoll,
      btnRollText,
      dice
    );
  }
});

// ----- RESTART BTN ----- //
btnRestart.onclick = () => {
  initialize();
};

/* --------------------------------
      NAVBAR EVENT LISTENERS
 --------------------------------*/

// ----- MENU BTN ----- //
menuBtn.addEventListener("click", () => {
  const containerNavBtnsDisplay =
    window.getComputedStyle(containerNavBtns).display;

  if (containerNavBtnsDisplay == "none") {
    containerNavBtns.style.display = "flex";
  } else {
    containerNavBtns.style.display = "none";
  }
});

// ----- NEW GAME BTN ----- //
navBtnNewGame.addEventListener("click", () => {
  const smallScreenBreakpointWidth = window.innerHeight * 1.05 + 200;

  if (window.innerWidth <= smallScreenBreakpointWidth) {
    containerNavBtns.style.display = "none";
  }

  alert("Feature Adding Soon");
});

// ----- RESTART BTN ----- //
navBtnRestart.onclick = function () {
  initialize();
  const smallScreenBreakpointWidth = window.innerHeight * 1.05 + 200;

  if (window.innerWidth <= smallScreenBreakpointWidth) {
    containerNavBtns.style.display = "none";
  }
};

// ----- SIDE BAR ----- //
navBtnSideBar.addEventListener("click", () => {
  if (navBar.classList.contains("collapse-sidebar")) {
    // expanding
    navBar.classList.remove("collapse-sidebar");
    navBtnSideBarIcon.src = "img/Collapse-Side-Bar.svg";
  } else {
    // collapsing
    navBar.classList.add("collapse-sidebar");
    navBtnSideBarIcon.src = "img/Reveal-Side-Bar.svg";
  }
});

// ----- CUSTOMIZE BTN ----- //
navBtnCustomize.addEventListener("click", () => {
  const smallScreenBreakpointWidth = window.innerHeight * 1.05 + 200;

  if (window.innerWidth <= smallScreenBreakpointWidth) {
    containerNavBtns.style.display = "none";
  }

  alert("Feature Adding Soon");
});

/* ----------** IMPORTANT NOTES ---------------*

  -> setTimeout() is an Asynchronous function i.e it won't block the exection of code below it.

  setTimeout(() => {
    console.log("Hello, world!");
  }, 1000);

  console.log("This message will print immediately.");


  -> The message "This message will print immediately" will print immediately, but the message "Hello, world!" will not print until 1000 milliseconds (1 second) has passed.

  */
