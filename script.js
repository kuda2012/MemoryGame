const gameContainer = document.getElementById("game");

var clicked = false;
var colorMatch1;
var colorMatch2;
var removal;
var lockboard = true;
var score = 0;
var scoreBoard;
var matches = 0;
var bestScoreLabel;
var intialScore = 0;
var firstClick;
var secondClick;

function randomInteger() {
  return Math.floor(Math.random() * (8 - 3 + 1)) + 3;
}

let randomNumber = randomInteger();
var COLORS = [];

function createColors() {
  for (i = 0; i < randomNumber; i++) {
    let keyName = "color" + i;

    COLORS[i] = {
      ["color" + i]: `rgb(${
        (Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256))
      },${
        (Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256))
      },${
        (Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256))
      })`,
    };
  }

  COLORS = COLORS.concat(COLORS);
}

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let i = 0; i < colorArray.length; i++) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(Object.keys(colorArray[i]));

    newDiv.id = [i];

    newDiv.style.backgroundColor = "skyblue";

    newDiv.setAttribute("data-color", Object.values(colorArray[i]));

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if (event.target.style.backgroundColor != "skyblue") {
    return;
  }

  if (!lockboard) {
    return;
  }

  if (!clicked) {
    if (event.target.classList[1]) {
      console.log(`${event.target.classList[1]}`);

      return;
    }
    clicked = true;
    colorMatch1 = event.target.classList[0];
    var dataColor = event.target.getAttribute("data-color");
    event.target.style.backgroundColor = dataColor;
    firstClick = document.getElementById(`${event.target.id}`);

    return;
  }

  if (clicked) {
    if (event.target.classList[1]) {
      return;
    }
    lockboard = false;
    clicked = false;
    colorMatch2 = event.target.classList[0];
    secondClick = document.getElementById(`${event.target.id}`);
    dataColor = event.target.getAttribute("data-color");
    event.target.style.backgroundColor = dataColor;

    setTimeout(function () {
      theRemoval();
    }, 500);
  }

  function theRemoval() {
    if (colorMatch1 != colorMatch2) {
      secondClick.style.backgroundColor = "skyblue";
      firstClick.style.backgroundColor = "skyblue";

      lockboard = true;
      score++;
      scoreBoard = document.getElementById("currentScore");
      scoreBoard.innerText = `Current Score: ${score}`;
    }
    if (colorMatch1 === colorMatch2) {
      lockboard = true;
      matches++;

      if (matches === COLORS.length / 2) {
        lockboard = false;
        var gameOver = document.getElementById("finalScore");
        gameOver.innerText = `Final Score: ${score}`;

        var newScore = localStorage.getItem("score");

        if (newScore === "" || newScore === null) {
          newScore = score;
          bestScoreLabel = document.getElementById("bestScore");
          bestScoreLabel.innerText = `Best Score: ${score}`;
          localStorage.setItem("score", newScore);
        }

        if (score < newScore) {
          bestScoreLabel = document.getElementById("bestScore");
          bestScoreLabel.innerText = `Best Score: ${score}`;
          localStorage.setItem("score", score);
        }
      }
    }
  }
}

var initalScoreLabel = document.getElementById("currentScore");
initalScoreLabel.innerText = initalScoreLabel.innerText
  .concat(" ")
  .concat(`${intialScore}`);

bestScoreLabel = document.getElementById("bestScore");
if (localStorage.getItem("score") === null) {
  bestScoreLabel.innerText = "Best score: ";
} else {
  bestScoreLabel.innerText = bestScoreLabel.innerText
    .concat(" ")
    .concat(localStorage.getItem("score"));
}

var resetButton = document.querySelector("#resetBestScore");

resetButton.addEventListener("click", function () {
  window.localStorage.clear();
  if (localStorage.getItem("score") === null) {
    bestScoreLabel.innerText = "Best score: ";
  }
});

// you can use event.target to see which element was clicked

// when the DOM loads

var startGame = document.querySelector("#startGame");

startGame.addEventListener("click", function () {
  createColors();
  let shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
  startGame.parentNode.removeChild(startGame);

  var resetGame = document.getElementById("resetGame");
  resetGame.addEventListener("click", function () {
    removal();
  });
});

var gamePiece = document.getElementById("game");

function removal() {
  while (gamePiece.firstChild) {
    gamePiece.removeChild(gamePiece.firstChild);
  }
  repopulate();
}

function repopulate() {
  lockboard = true;
  matches = 0;
  score = 0;

  var currentScoreReset = document.getElementById("currentScore");
  currentScoreReset.innerText = "Current Score:";
  var finalScoreReset = document.getElementById("finalScore");
  finalScoreReset.innerText = "Final Score:";
  COLORS = [];
  randomNumber = randomInteger();
  createColors();
  let shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
}
