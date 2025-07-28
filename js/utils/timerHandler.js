export const timers = {};

export function setupTimerButtons(id) {
  const startBtn = document.querySelector(`.startBtn[data-id="${id}"]`);
  const stopBtn = document.querySelector(`.stopBtn[data-id="${id}"]`);
  const display = document.querySelector(`.timerDisplay[data-id="${id}"]`);

  if (!timers[id]) {
    const timer = new easytimer.Timer();
    timer.addEventListener("secondsUpdated", () => {
      display.textContent = timer.getTimeValues().toString();
    });

    timers[id] = {
      timer,
      isRunning: false,
    };
  }

  const currentTimer = timers[id];

  startBtn.addEventListener("click", () => {
    if (!currentTimer.isRunning) {
      currentTimer.timer.start({
        startValues: { seconds: 0 },
        countdown: false,
      });
      currentTimer.isRunning = true;
    }
  });

  stopBtn.addEventListener("click", () => {
    if (currentTimer.isRunning) {
      currentTimer.timer.pause();
      currentTimer.isRunning = false;
    }
  });
}
