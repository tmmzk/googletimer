const lines = document.getElementById('lines');
const nums = document.getElementById('num-container');
const fins = document.getElementById('fins');
const endTimeInput = document.getElementById('endTimeInput');
const startStopBtn = document.getElementById('startStopBtn');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const body = document.body;

endTimeInput.addEventListener('input', updateEndTime);

let left = 15;
let right = 45;
let endTime = 1;
let remainingSeconds = endTime * 60;
let timerInterval;

for (let i = 0; i < 30; i++) {
  const line = document.createElement('div');
  line.classList.add('line');
  line.style.transform = `rotate(${i * 6}deg)`;

  if (i % 5 === 0) {
    line.classList.add('thick');
  }

  lines.append(line);
}

for (let i = 0; i < 6; i++) {
  const numBox = document.createElement('div');
  numBox.classList.add('num-box');
  numBox.style.transform = `rotate(${i * 30}deg)`;

  const spanLeft = document.createElement('span');
  const spanRight = document.createElement('span');

  const leftText = left - 5 * i;
  spanLeft.textContent = leftText < 0 ? leftText + 60 : leftText;
  spanRight.textContent = right - 5 * i;

  spanLeft.style.transform = `rotate(${-30 * i}deg)`;
  spanRight.style.transform = `rotate(${-30 * i}deg)`;

  numBox.append(spanLeft, spanRight);
  nums.append(numBox);
}

function updateFins() {
  fins.innerHTML = '';

  for (let min = 0; min < endTime; min++) {
    for (let sec = 0; sec < 60; sec++) {
      const remainFin = document.createElement('div');
      remainFin.classList.add('fin');
      const deg = min * 6 + sec * 0.1;
      remainFin.style.transform = `rotate(${-deg}deg)`;
      fins.append(remainFin);
    }
  }
}

function tickSec() {
  const lastFin = fins.lastChild;
  if (lastFin) {
    lastFin.remove();
    remainingSeconds--;
    updateRemainingTime();
  }

  if (remainingSeconds <= 0) {
    clearInterval(timerInterval);
    playAlertSound();
    endTimeInput.style.display = 'block'; // input 요소 보이기
    
  }
}

function updateRemainingTime() {
  const minutes = Math.floor(remainingSeconds / 60).toString().padStart(2, '0');
  const seconds = (remainingSeconds % 60).toString().padStart(2, '0');
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
}

function startStopTimer() {
  if (timerInterval) {
    endTimeInput.style.display = 'block'; // input 요소 보이기
    clearInterval(timerInterval);
    timerInterval = null;
    startStopBtn.textContent = '시작';
  } else {
    endTimeInput.style.display = 'none'; // input 요소 숨기기
    timerInterval = setInterval(tickSec, 1000);
    startStopBtn.textContent = '정지';
  }
}

function updateEndTime() {
  const input = endTimeInput.value;
  if (input === '') {
    remainingSeconds = 0;
  } else {
    endTime = parseInt(input);
    remainingSeconds = endTime * 60;
  }
  updateRemainingTime();
  updateFins();
}

function playAlertSound() {
  const audio = new Audio('alert.wav');
  audio.play();
}

function toggleTheme() {
  body.classList.toggle('dark-theme');
  const theme = body.classList.contains('dark-theme') ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
  themeToggleBtn.innerHTML = theme;
}

