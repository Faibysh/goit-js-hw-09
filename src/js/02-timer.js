import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';


let elements = selector => document.querySelector(selector);

const dateEl = elements('#datetime-picker');
const startBtn = elements('[data-start]');
const daysEl = elements('[data-days]');
const hoursEl = elements('[data-hours]');
const minutesEl = elements('[data-minutes]');
const secondsEl = elements('[data-seconds]');

let timeDifference = 0;
let timerId = null;
let formatDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    console.log(selectedDates[0]);
    currentDifferenceDate(selectedDates[0]);
  },
};

startBtn.setAttribute('disabled', true);
flatpickr(dateEl, options);


startBtn.addEventListener('click', onBtnStart);

window.addEventListener('keydown', e => {
  if (e.code === 'Escape' && timerId) {
    clearInterval(timerId);
    dateEl.removeAttribute('disabled');
    startBtn.setAttribute('disabled', true);
    secondsEl.textContent = '00';
    minutesEl.textContent = '00';
    hoursEl.textContent = '00';
    daysEl.textContent = '00';
  }
});

function onBtnStart() {
  startBtn.setAttribute('disabled', true);
  dateEl.setAttribute('disabled', true);
  timerId = setInterval(startTimer, 1000);
}

function currentDifferenceDate(selectedDates) {
  const currentDate = Date.now();
  if (selectedDates < currentDate) {
    startBtn.setAttribute('disabled', true);
    return Notify.failure('Please choose a date in the future');
  }
  timeDifference = selectedDates.getTime() - currentDate;
  formatDate = convertMs(timeDifference);
  renderDate(formatDate);
  startBtn.removeAttribute('disabled');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function startTimer() {
  timeDifference -= 1000;
  if (secondsEl.textContent <= 0 && minutesEl.textContent <= 0) {
    Notify.success('Time end');
    clearInterval(timerId);
  } else {
    formatDate = convertMs(timeDifference);
    renderDate(formatDate);
  }
}

function renderDate(formatDate) {
  secondsEl.textContent = formatDate.seconds;
  minutesEl.textContent = formatDate.minutes;
  hoursEl.textContent = formatDate.hours;
  daysEl.textContent = formatDate.days;
}

// Пришвидшена дата, css, 