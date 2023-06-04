// DOM 요소 가져오기
const lines = document.getElementById('lines');
const nums = document.getElementById('num-container');
const fins = document.getElementById('fins');
const endTimeInput = document.getElementById('endTimeInput');
const startStopBtn = document.getElementById('startStopBtn');
const remainingTime = document.getElementById('remainingTime');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const settingsBtn = document.getElementById('settingsBtn');
const settingsPopup = document.getElementById('settingsPopup');
const body = document.body;

endTimeInput.addEventListener('input', updateEndTime);

let left = 15;
let right = 45;
let endTime = 0;
let remainingSeconds = endTime * 60;
let timerInterval;
let isAlarmOn = true;

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
    endTimeInput.style.display = 'block';
    clearInterval(timerInterval);
    playAlertSound();
    startStopBtn.textContent = '시작';
    donePopup.style.display = 'flex';
  }
}

function updateRemainingTime() {
  const minutes = Math.floor(remainingSeconds / 60).toString().padStart(2, '0');
  if (isNaN(minutes)) {
    minutes = '00';
  }  
  const seconds = (remainingSeconds % 60).toString().padStart(2, '0');
  if (isNaN(seconds)) {
    seconds = '00';
  }
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
}

function startStopTimer() {
  if (!timerInterval) { // timerInterval이 null일 때만 타이머 시작
    endTimeInput.style.display = 'none';
    timerInterval = setInterval(tickSec, 1000);
    const input = document.getElementById('endTimeInput');
    input.value = '';
    startStopBtn.textContent = '정지';
  }
  else { // timerInterval이 null이 아니면 타이머 중지
    endTimeInput.style.display = 'block';
    clearInterval(timerInterval);
    timerInterval = null;
    startStopBtn.textContent = '시작';
  }
}

function updateEndTime() {
  const input = endTimeInput.value;
  let inputValue = parseInt(input);
  inputValue = isNaN(inputValue) ? 0 : inputValue;
  inputValue = Math.min(inputValue, 60);
  inputValue = Math.max(inputValue, 0);
  endTime = inputValue;
  remainingSeconds = endTime * 60;
  updateRemainingTime();
  updateFins();
}

function playAlertSound() {
  const audio = new Audio('alarm.wav');
  if (isAlarmOn === true) {
    audio.play();
  }
}

function openSettings() {
  settingsPopup.style.display = 'flex';
  body.classList.add('blur');
}

function closeSettings() {
  settingsPopup.style.display = 'none';
  donePopup.style.display = 'none';
  body.classList.remove('blur');
}

function toggleDarkMode() {
  body.classList.toggle('dark-theme');
  const darkModeButton = document.getElementById('darkModeButton');
  if (body.classList.contains('dark-theme')) {
    darkModeButton.textContent = '라이트 모드';
  } else {
    darkModeButton.textContent = '다크 모드';
  }
}

function toggleRemainingTime() {
  const remainingTime = document.getElementById('remainingTime');
  const remainingTimeButton = document.getElementById('showTimeButton');
  remainingTime.style.display = remainingTime.style.display === 'block' ? 'none' : 'block';
  if (remainingTime.style.display === 'none') {
    remainingTimeButton.textContent = '남은 시간 보기';
  } else {
    remainingTimeButton.textContent = '남은 시간 숨기기';
  }
}

function AlarmButton() {
  const alarmButton = document.getElementById('AlarmButton');
  if (!isAlarmOn) {
    alarmButton.textContent = '완료 알림 끄기';
    isAlarmOn = true;
    console.log(isAlarmOn);
  } else {
    alarmButton.textContent = '완료 알림 켜기';
    isAlarmOn = false;
    console.log(isAlarmOn);
  }
}