let started = false;
let currentSequence = [];
let userSequence = [];
let points = 0;
let level = 1;
const tl = document.querySelector(".tl");
const tr = document.querySelector(".tr");
const bl = document.querySelector(".bl");
const br = document.querySelector(".br");
const levelEl = document.querySelector(".level");
const pointsEl = document.querySelector(".points");
const sound1 = new Audio("1.wav");
const sound2 = new Audio("2.wav");
const sound3 = new Audio("3.wav");
const sound4 = new Audio("4.wav");

const buttons = [
  { el: tl, sound: sound1 },
  { el: tr, sound: sound2 },
  { el: bl, sound: sound3 },
  { el: br, sound: sound4 },
];
pointsEl.innerHTML = `Ваши баллы: ${points}`;
levelEl.innerHTML = `Уровень: ${level}`;
const centerButton = document.querySelector(".center");

function buttonsHeight() {
  buttons.forEach((btn) => {
    btn.el.style.height = `${btn.el.clientWidth}px`;
    console.log(btn.el.clientWidth);
  });
}
function checkStarted(started) {
  if (started === true) {
    centerButton.disabled = true;
    tl.disabled = false;
    tr.disabled = false;
    bl.disabled = false;
    br.disabled = false;
  } else {
    centerButton.disabled = false;
    tl.disabled = true;
    tr.disabled = true;
    bl.disabled = true;
    br.disabled = true;
  }
}
function levelMod() {
  if (level < 10) {
    return level * 0.2;
  }
  else {
    return 2
  }
}
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

function start() {
  checkStarted(false);
  centerButton.addEventListener(
    "click",
    function () {
      levelEl.innerHTML = `Уровень: 1`;
      if (currentSequence.length < 1) {
        randomise();
        checkStarted(true);
      }
    },
    false
  );
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
      alert(`Вы проиграли. Ваши баллы: ${points}`);
      userSequence = [];
      currentSequence = [];
      points = 0;
      level = 1;
      checkStarted(false);
    }
  }
  document.addEventListener(
    "click",
    function (btn) {
      if (buttons.some((x) => x.el === btn.target)) {
        userSequence.push(btn.target);
        buttons.find((x) => x.el === btn.target).sound.play();
        checkIfRight();
        pointsEl.innerHTML = `Ваши баллы: ${points}`;
        levelEl.innerHTML = `Уровень: ${level}`;
      }
    },
    false
  );
}

window.addEventListener(
  "load",
  function () {
    start();
    buttonsHeight();
  },
  false
);
