"use strict";

const startBtn = document.querySelector(".startBtn");
const showTime = document.querySelector(".showTime");
const infoTime = document.querySelector(".infoTime");
const soundEffect = new Audio("./assets/bells-131461.mp3");

function SessionHandler() {
  const incBtn = document.querySelector(".inc");
  const decBtn = document.querySelector(".dec");
  const session = document.querySelector(".session");

  let sessionValue = 45;
  incBtn.addEventListener("click", () => {
    sessionValue += 5;
    session.textContent = sessionValue;
  });

  decBtn.addEventListener("click", () => {
    sessionValue -= 5;
    session.textContent = sessionValue;
  });
}

function SetTimer(min = 45) {
  // min to mls
  let minValue = parseInt(min, 10) * 60000;

  const End = document.querySelector(".EndBtn");

  function updateTimer() {
    const date = new Date();
    date.setMinutes(date.getMinutes() + parseInt(min));
    showTime.textContent = date.toLocaleTimeString();
  }

  updateTimer();

  // timer starting
  console.log("Staring...");

  console.log(showTime);

  let id = setInterval(() => {
    soundEffect.play();
    updateTimer();
  }, minValue);

  End.addEventListener(
    "click",
    () => {
      clearInterval(id);
      alert("stoped");
    },
    { once: true }
  );
}

startBtn.addEventListener("click", () => {
  let minuteValue = document.getElementById("insert-Min").textContent;

  if (isNaN(minuteValue) || minuteValue <= 0) {
    alert("Please enter a valid number greater than 0");
  }
  infoTime.textContent = `every ${minuteValue} minutes`;
  SetTimer(minuteValue);
});

SessionHandler();
