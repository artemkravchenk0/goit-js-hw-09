 function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

  let intervalId;
  const startBtn = document.querySelector('[data-start]');
  const stopBtn = document.querySelector('[data-stop]');
  const body = document.querySelector('body');

  startBtn.addEventListener('click', startColorChanging);
  stopBtn.addEventListener('click', stopColorChanging);

  function startColorChanging() {
    intervalId = setInterval(() => {
      body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    startBtn.disabled = true;
  }

  function stopColorChanging() {
    clearInterval(intervalId);
    startBtn.disabled = false;
  }

