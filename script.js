const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingBtn = document.getElementById("setting-btn");
const settings = document.getElementById("setting");
const settingsForm = document.getElementById("setting-form");
const difficultySelect = document.getElementById("difficulty");

//list of words
const words = ["adones", "jude", "kimmy", "adrian", "nikko", "prince", "grace", "Happy", "ThankYou", "peacock", "data structures", "competitive coding","MachineLearning", "Artificial Intelligence", "github", "vs code", "internship","amazing", "cool", "awesome","python","c language", "python","Javascript","MongoDB", "Express JS","React JS", "Nodejs","Linear","regression"];

//init word
let randomWord;
let score = 0;
let time = 10;
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "average";
//set diff select value
difficultySelect.value = difficulty;
//focus on text
text.focus();
//start count down
const timeInterval = setInterval(updateTime, 1000);
//generate random word
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}
//add word to dom
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}
addWordToDOM();
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}
function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";
  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}
function gameOver() {
  endgameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Restart</button>
    `;
  endgameEl.style.display = "flex";
}
text.addEventListener("input", (e) => {
  const insetedText = e.target.value;
  if (insetedText === randomWord) {
    addWordToDOM();
    updateScore();
    e.target.value = "";
    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "average") {
      time += 3;
    } else {
      time += 4;
    }

    updateTime();
  }
});
settingBtn.addEventListener("click", () => settings.classList.toggle("hide"));
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});