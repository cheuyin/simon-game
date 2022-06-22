const buttonColours = ["red", "blue", "green", "yellow"];
const h1 = document.querySelector("h1");

let winningSequence = [];
let userSequence = [];
let level = 0;
let gameStart = true;

addButtonPressHandler();

// Check if conditions are valid to start game
document.addEventListener("keydown", (e) => {
  if (e.key === " " && gameStart) {
    startGame();
  }
});

function startGame() {
  // Reset all values
  winningSequence = [];
  userSequence = [];
  level = 0;
  h1.textContent = "Press the Spacebar to Start"

  nextLevel();

  setTimeout(() => {
    nextItem();
  }, 200);

  gameStart = false;
}


function nextItem() {
  // Add random new color to winningSequence list
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  winningSequence.push(randomChosenColour);

  // Select the corresponding button
  const randomButton = document.querySelector(`#${randomChosenColour}`);
  // Play sound of the random button
  playSound(randomButton);
  // Make the new button "flash"
  flash(randomButton);
}

// Checks if recent user button press is valid
function checkPress() {
  if (userSequence[userSequence.length - 1] ===
    winningSequence[userSequence.length - 1]) {
    return true;
  } else {
    return false;
  }
}

function nextLevel() {
  level += 1;
  const h1 = document.querySelector("h1");
  h1.textContent = `Level ${level}`;

  resetUserSequence();
}

function resetUserSequence() {
  userSequence = [];
}

function addButtonPressHandler() {
  const buttons = document.querySelectorAll(".container .btn");
  buttons.forEach(btn => btn.addEventListener("click", (e) => {
    const selectedButton = e.target;

    playSound(selectedButton);
    animatePress(selectedButton);
    recordPress(selectedButton);

    // Check if the pressed button was right choice
    if (checkPress()) {
      if (userSequence.length === winningSequence.length) {
        nextLevel();
        setTimeout(() => {
          nextItem();
        }, 1000)
      } else {
        return;
      }
    } else {
      endGame();
    }
  }))
}

function recordPress(pressedButton) {
  const selectedColor = pressedButton.getAttribute("id");
  userSequence.push(selectedColor);
}

function endGame() {
  h1.textContent = "Game Over, Press the Spacebar to Restart";

  const wrongPressSound = new Audio("./sounds/wrong.mp3");
  wrongPressSound.play();

  // Apply game over flash effect
  const body = document.querySelector("body");
  body.classList.add("game-over");
  setTimeout(() => {
    body.classList.remove("game-over")
  }, 200);

  gameStart = true;
}

function flash(button) {
  button.classList.add("black-flash");
  setTimeout(() => {
    button.classList.remove("black-flash");
  }, 50);
}

function playSound(button) {
  const buttonColor = button.getAttribute("id");
  const audio = new Audio(`./sounds/${buttonColor}.mp3`);
  audio.play();
}

function animatePress(button) {
  button.classList.add("pressed");
  setTimeout(() => {
    button.classList.remove("pressed");
  }, 50);
}

