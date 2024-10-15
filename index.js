let currentSequence = [];
let userSequence = [];
let points = 0;
let level = 1;

const startScreen = document.querySelector(".start-screen");
const resultContainer = document.querySelector(".result-container");
const result = document.querySelector(".result");
const content = document.querySelector(".content");
const t = document.querySelector(".t");
const cl = document.querySelector(".cl");
const cr = document.querySelector(".cr");
const b = document.querySelector(".b");
const counter = document.querySelector(".counter");
const info = document.querySelector(".info");
const brainImage = document.querySelector(".brainImage2");
const levelEl = document.querySelector(".level");
const pointsEl = document.querySelector(".points");
const startBtn = document.querySelector(".startBtn");
const tryAgainBtn = document.querySelector(".try-again");
const sound1 = new Audio("1.wav");
const sound2 = new Audio("2.wav");
const sound3 = new Audio("3.wav");
const sound4 = new Audio("4.wav");

const buttons = [
  { el: t, sound: sound1, key: "w", key2: "ArrowUp" },
  { el: cl, sound: sound4, key: "a", key2: "ArrowLeft" },
  { el: cr, sound: sound3, key: "d", key2: "ArrowRight" },
  { el: b, sound: sound2, key: "s", key2: "ArrowDown" },
];
pointsEl.innerHTML = `POINTS ${points}`;
levelEl.innerHTML = `LEVEL ${level}`;

function buttonsHeight() {
  buttons.forEach((btn) => {
    btn.el.style.height = `${btn.el.clientWidth}px`;
    console.log(btn.el.clientWidth);
  });
}
function counterEnable() {
  setTimeout(() => {
    counter.innerHTML = 2;
  }, 1000);
  setTimeout(() => {
    counter.innerHTML = 1;
  }, 2000);
  setTimeout(() => {
    counter.innerHTML = "";
  }, 3000);
}
function levelMod() {
  if (level < 10) {
    return level * 0.2;
  } else {
    return 2;
  }
}

function initStats() {
  startScreen.style.display = "none";
  resultContainer.style.display = "none";
  content.style.opacity = "1";
  info.style.display = "block";
  brainImage.style.display = "block";
}
function initTimeouts() {
  setTimeout(() => {
    counter.innerHTML = "";
    levelEl.innerHTML = `LEVEL 1`;
  }, 3000);
  setTimeout(() => {
    if (currentSequence.length < 1) {
      randomise();
      buttons.forEach((btn) => {
        btn.el.disabled = false;
      });
    }
  }, 3300);
}
startBtn.addEventListener(
  "click",
  function () {
    counterEnable();
    initStats();
    initTimeouts();
  },
  false
);
tryAgainBtn.addEventListener(
  "click",
  function () {
    counterEnable();
    initStats();
    initTimeouts();
  },
  false
);

document.addEventListener("click", writeUserSequence, false);
document.addEventListener("keydown", checkForKeys, false);
document.addEventListener("click", writeUserSequence, false);

function randomise() {
  const number = Math.floor(Math.random() * 4);
  currentSequence.push(buttons[number].el);
  for (let i = 0; i < currentSequence.length; i++) {
    (function (i) {
      setTimeout(() => {
        currentSequence[i].classList.add("active");
        buttons.find((x) => x.el === currentSequence[i]).sound.play();
        console.log(buttons.find((x) => x.el === currentSequence[i]));
        setTimeout(() => {
          currentSequence[i].classList.remove("active");
        }, 300);
      }, (i * 1000) / (1 + levelMod()));
    })(i);
  }
  console.log(currentSequence, "currentSequence");
}

function writeUserSequence(btn) {
  if (buttons.some((x) => x.el === btn.target)) {
    userSequence.push(btn.target);
    buttons.find((x) => x.el === btn.target).sound.play();
    checkIfRight();
    pointsEl.innerHTML = `POINTS ${points}`;
    levelEl.innerHTML = `LEVEL ${level}`;
  }
}

function checkForKeys(e) {
  console.log(e.key);
  if (
    buttons.some(
      (x) => (x.key === e.key || x.key2 === e.key) & (x.el.disabled === false)
    )
  ) {
    let myLovelyButton = buttons.find(
      (x) => x.key === e.key || x.key2 === e.key
    );
    userSequence.push(myLovelyButton.el);
    myLovelyButton.sound.play();
    myLovelyButton.el.classList.add("active");
    setTimeout(() => {
      myLovelyButton.el.classList.remove("active");
    }, 100);
    checkIfRight();
    pointsEl.innerHTML = `POINTS ${points}`;
    levelEl.innerHTML = `LEVEL ${level}`;
    console.log(userSequence);
  }
}

function checkIfRight() {
  if (
    userSequence[userSequence.length - 1] ===
    currentSequence[userSequence.length - 1]
  ) {
    points += 10;
    if (userSequence.length === currentSequence.length) {
      userSequence = [];
      if (currentSequence.length % 5 === 0) {
        level = currentSequence.length / 5 + 1;
        points += 90 * (level - 1);
      }
      setTimeout(() => {
        randomise();
      }, 1000);
    }
  } else {
    content.style.opacity = "0";
    info.style.display = "none";
    resultContainer.style.display = "flex";
    console.log(level);
    if (level < 2) {
      result.innerHTML = `You lose. Level ${level}. Points ${points}`;
    } else if (1 < level < 4) {
      result.innerHTML = `Not bad. Level ${level}. Points ${points}`;
    } else if (4 < level < 8) {
      result.innerHTML = `Brilliant. Level ${level}. Points ${points}`;
    } else {
      result.innerHTML = `Unique. Level ${level}. Points ${points}`;
    }
    userSequence = [];
    currentSequence = [];
    points = 0;
    level = 1;
    counter.innerHTML = 3;
  }
}

window.addEventListener(
  "load",
  function () {
    buttonsHeight();
  },
  false
);
