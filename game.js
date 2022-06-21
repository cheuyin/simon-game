const buttonColours = ["red", "blue", "green", "yellow"];
const gamePattern = [];
let level = 0;

// Listen for any key presses
// !!!
document.addEventListener("keydown", function(e) {
  // nextSequence();
  // displayLevel();
  console.log("Key down!")
});

// Play associated sound / animation when button is clicked
const buttons = document.querySelectorAll(".btn");
buttons.forEach(btn => btn.addEventListener("click", (event) => {
  const selectedButton = event.target;
  playSound(selectedButton);
  animatePress(selectedButton);
}))

const h1 = document.querySelector("h1");

function nextSequence() {
  // Push new random color to buttonColours list
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Play sound of the random button
  playSound(randomChosenColour);

  // Make the new button "flash"
  flash(randomChosenColour);
}

function flash(currentColour) {
  const button = document.querySelector(`#${currentColour}`);
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

function displayLevel() {
  h1.textContent = `Level ${level}`;
}