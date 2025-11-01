// Tab switching
const tabs = document.querySelectorAll('.tabs button');
const contents = document.querySelectorAll('.tab-content');
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => {
    tabs.forEach(btn => btn.classList.remove('active'));
    tab.classList.add('active');
    contents.forEach((c, j) => c.style.display = i === j ? 'block' : 'none');
  });
});

// Stopwatch Logic
let stopwatchInterval, stopwatchTime = 0;
const stopwatchDisplay = document.getElementById('stopwatch-display');
document.getElementById('stopwatch-start').onclick = () => {
  if (!stopwatchInterval) {
    stopwatchInterval = setInterval(() => {
      stopwatchTime++;
      stopwatchDisplay.textContent = formatTime(stopwatchTime);
    }, 1000);
  }
};
document.getElementById('stopwatch-stop').onclick = () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
};
document.getElementById('stopwatch-reset').onclick = () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  stopwatchTime = 0;
  stopwatchDisplay.textContent = formatTime(stopwatchTime);
};
function formatTime(sec) {
  let h = Math.floor(sec/3600);
  let m = Math.floor((sec%3600)/60);
  let s = sec%60;
  return [h,m,s].map(v=>String(v).padStart(2,'0')).join(':');
}

// Timer Logic
let timerInterval, timerTime = 0;
const timerDisplay = document.getElementById('timer-display');
document.getElementById('timer-start').onclick = () => {
  if (!timerInterval) {
    let min = parseInt(document.getElementById('timer-minutes').value) || 0;
    let sec = parseInt(document.getElementById('timer-seconds').value) || 0;
    if (min === 0 && sec === 0) return;
    timerTime = min * 60 + sec;
    timerDisplay.textContent = formatMMSS(timerTime);
    timerInterval = setInterval(() => {
      if (timerTime > 0) {
        timerTime--;
        timerDisplay.textContent = formatMMSS(timerTime);
      } else {
        clearInterval(timerInterval);
        timerInterval = null;
        timerDisplay.textContent = "Time's up!";
      }
    }, 1000);
  }
};
document.getElementById('timer-stop').onclick = () => {
  clearInterval(timerInterval);
  timerInterval = null;
};
document.getElementById('timer-reset').onclick = () => {
  clearInterval(timerInterval);
  timerInterval = null;
  timerDisplay.textContent = '00:00';
  document.getElementById('timer-minutes').value = '';
  document.getElementById('timer-seconds').value = '';
};
function formatMMSS(sec) {
  let m = Math.floor(sec/60);
  let s = sec%60;
  return [m,s].map(v=>String(v).padStart(2,'0')).join(':');
}

// Pomodoro Logic
let pomodoroInterval, pomodoroTime = 0, pomodoroMode = 'work';
const pomodoroDisplay = document.getElementById('pomodoro-display');
const pomodoroStatus = document.getElementById('pomodoro-status');
document.getElementById('pomodoro-start').onclick = () => {
  if (!pomodoroInterval) {
    startPomodoro();
  }
};
document.getElementById('pomodoro-stop').onclick = () => {
  clearInterval(pomodoroInterval);
  pomodoroInterval = null;
};
document.getElementById('pomodoro-reset').onclick = () => {
  clearInterval(pomodoroInterval);
  pomodoroInterval = null;
  pomodoroMode = 'work';
  let workMins = parseInt(document.getElementById('pomodoro-work').value) || 25;
  pomodoroTime = workMins * 60;
  pomodoroDisplay.textContent = formatMMSS(pomodoroTime);
  pomodoroStatus.textContent = 'Work';
};
function startPomodoro() {
  let workMins = parseInt(document.getElementById('pomodoro-work').value) || 25;
  let breakMins = parseInt(document.getElementById('pomodoro-break').value) || 5;
  if (pomodoroMode === 'work') {
    pomodoroTime = workMins * 60;
    pomodoroStatus.textContent = 'Work';
  } else {
    pomodoroTime = breakMins * 60;
    pomodoroStatus.textContent = 'Break';
  }
  pomodoroDisplay.textContent = formatMMSS(pomodoroTime);
  pomodoroInterval = setInterval(() => {
    if (pomodoroTime > 0) {
      pomodoroTime--;
      pomodoroDisplay.textContent = formatMMSS(pomodoroTime);
    } else {
      clearInterval(pomodoroInterval);
      pomodoroInterval = null;
      pomodoroMode = pomodoroMode === 'work' ? 'break' : 'work';
      startPomodoro();
    }
  }, 1000);
}
// Initialize Pomodoro to show the work time by default
document.getElementById('pomodoro-reset').onclick();