"use strict";

// const startBtn = document.querySelector(".startBtn");
// const showTime = document.querySelector(".showTime");
// const infoTime = document.querySelector(".infoTime");
// const soundEffect = new Audio("./assets/bells-131461.mp3");

// function SessionHandler() {
//   const incBtn = document.querySelector(".inc");
//   const decBtn = document.querySelector(".dec");
//   const session = document.querySelector(".session");

//   let sessionValue = 45;
//   incBtn.addEventListener("click", () => {
//     sessionValue += 5;
//     session.textContent = sessionValue;
//   });

//   decBtn.addEventListener("click", () => {
//     sessionValue -= 5;
//     session.textContent = sessionValue;
//   });
// }

// function SetTimer(min = 45) {
//   // min to mls
//   let minValue = parseInt(min, 10) * 60000;

//   const End = document.querySelector(".EndBtn");

//   function updateTimer() {
//     const date = new Date();
//     date.setMinutes(date.getMinutes() + parseInt(min));
//     showTime.textContent = date.toLocaleTimeString();
//   }

//   updateTimer();

//   // timer starting
//   console.log("Staring...");

//   console.log(showTime);

//   let id = setInterval(() => {
//     soundEffect.play();
//     updateTimer();
//   }, minValue);

//   End.addEventListener(
//     "click",
//     () => {
//       clearInterval(id);
//       alert("stoped");
//     },
//     { once: true }
//   );
// }

// startBtn.addEventListener("click", () => {
//   let minuteValue = document.getElementById("insert-Min").textContent;

//   if (isNaN(minuteValue) || minuteValue <= 0) {
//     alert("Please enter a valid number greater than 0");
//   }
//   infoTime.textContent = `every ${minuteValue} minutes`;
//   SetTimer(minuteValue);
// });

// SessionHandler();

const timerDisplay = document.getElementById("timerDisplay");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const intervalSlider = document.getElementById("interval");
const intervalValue = document.getElementById("intervalValue");
const nextReminder = document.getElementById("nextReminder");
const notification = document.getElementById("notification");
const closeNotification = document.getElementById("closeNotification");
const notificationInterval = document.getElementById("notificationInterval");
const notificationSound = document.getElementById("notificationSound");

// Variables
let timer;
let timeLeft = 45 * 60; // 45 minutes in seconds
let isRunning = false;
let nextReminderTime = null;

// Initialize
updateTimerDisplay();

// Event Listeners
startBtn.addEventListener("click", toggleTimer);
resetBtn.addEventListener("click", resetTimer);
intervalSlider.addEventListener("input", updateInterval);
closeNotification.addEventListener("click", hideNotification);
notification.addEventListener("click", hideNotification);

// Functions
function toggleTimer() {
  if (isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startBtn.innerHTML = '<i class="fas fa-pause mr-2"></i> Pause';
    startBtn.classList.remove("bg-blue-400", "hover:bg-blue-600");
    startBtn.classList.add("bg-yellow-500", "hover:bg-yellow-600");

    // Calculate next reminder time
    const intervalMinutes = parseInt(intervalSlider.value);
    nextReminderTime = new Date();
    nextReminderTime.setMinutes(
      nextReminderTime.getMinutes() + intervalMinutes
    );
    updateNextReminderDisplay();

    // timer = setInterval(() => {
    //   timeLeft--;
    //   updateTimerDisplay();

    //   if (timeLeft <= 0) {
    //     timerComplete();
    //   }
    // }, 1000);

    const intervalMinutes = parseInt(intervalSlider.value);
    const totalSeconds = intervalMinutes * 60;
    const startTime = Date.now();

    timer = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      timeLeft = totalSeconds - elapsedSeconds;
      updateTimerDisplay();

   if (timeLeft <= 0) {
    clearInterval(timer);
    timerComplete();
  }
}, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
  startBtn.innerHTML = '<i class="fas fa-play mr-2"></i> Start';
  startBtn.classList.remove("bg-yellow-500", "hover:bg-yellow-600");
  startBtn.classList.add("bg-blue-400", "hover:bg-blue-600");

  const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
  totalDuration = totalDuration - elapsedSeconds;
}

function resetTimer() {
  pauseTimer();
  timeLeft = parseInt(intervalSlider.value) * 60;
  updateTimerDisplay();
  nextReminderTime = null;
  nextReminder.textContent = "Not scheduled";
}

function timerComplete() {
  pauseTimer();
  showNotification();
  resetTimer();
  startTimer(); // Automatically start next interval
}

function updateTimerDisplay(time = totalDuration) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  if (timeLeft <= 60) {
    timerDisplay.classList.add("text-red-500");
  } else {
    timerDisplay.classList.remove("text-red-500");
  }
}

function updateInterval() {
  const minutes = intervalSlider.value;
  intervalValue.textContent = minutes;
  notificationInterval.textContent = minutes;

  if (!isRunning) {
    timeLeft = minutes * 60;
    updateTimerDisplay();
  }
}

function updateNextReminderDisplay() {
  if (nextReminderTime) {
    const options = { hour: "2-digit", minute: "2-digit" };
    nextReminder.textContent = nextReminderTime.toLocaleTimeString([], options);
  }
}

function showNotification() {
  notificationSound.play();
  notification.classList.add("show");

  // Auto-hide after 30 seconds
  setTimeout(() => {
    if (notification.classList.contains("show")) {
      hideNotification();
    }
  }, 30000);
}

function hideNotification() {
  notification.classList.remove("show");
}

function showTestNotification() {
  showNotification();
}

// Request notification permission
if ("Notification" in window) {
  Notification.requestPermission();
}
