import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const inputDatetimeEl = document.querySelector('input#datetime-picker');
const startBtnEl = document.querySelector('button[data-start]');
const timerDayEl = document.querySelector('[data-days]');
const timerHourEl = document.querySelector('[data-hours]');
const timerMinEl = document.querySelector('[data-minutes]');
const timerSecEl = document.querySelector('[data-seconds]');

startBtnEl.disabled = true;

let timerId = null;

let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtnEl.disabled = false;
      return (selectedDate = selectedDates[0]);
    }
  },
};

const fp = flatpickr(inputDatetimeEl, options);

startBtnEl.addEventListener('click', handleStartBtnClick);

function handleStartBtnClick(e) {
  startBtnEl.disabled = true;

  timerId = setInterval(() => {
    const timerTime = selectedDate - Date.now();
    
    const timerData = convertMs(timerTime);

    timerDayEl.textContent = timerData.days;
    timerHourEl.textContent = timerData.hours;
    timerMinEl.textContent = timerData.minutes;
    timerSecEl.textContent = timerData.seconds;

    if (timerTime < 1000) {
      clearInterval(timerId);
      return;
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));

  const hours = addLeadingZero(Math.floor((ms % day) / hour));

  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));

  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}