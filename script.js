let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

// Get DOM elements
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapTimesList = document.getElementById('lapTimes');

// Function to format time
function formatTime(ms) {
  const milliseconds = ms % 1000;
  const totalSeconds = Math.floor(ms / 1000);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
}

// Update the timer display
function updateDisplay() {
  timerDisplay.textContent = formatTime(elapsedTime);
}

// Start the stopwatch
function startStopwatch() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
    isRunning = true;
  }
}

// Pause the stopwatch
function pauseStopwatch() {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
  }
}

// Reset the stopwatch
function resetStopwatch() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  isRunning = false;
  updateDisplay();
  lapTimesList.innerHTML = ''; // Clear lap times
}

// Record a lap time
function recordLap() {
  if (isRunning) {
    const lapTime = document.createElement('li');
    lapTime.textContent = formatTime(elapsedTime);
    lapTimesList.appendChild(lapTime);
  }
}

// Event listeners
startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);

// Initialize display
updateDisplay();