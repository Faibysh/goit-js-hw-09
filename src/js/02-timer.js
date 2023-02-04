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
let selectedDates = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedTime) {
    selectedDates = selectedTime[0]
    currentDifferenceDate(selectedDates);
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
  timeDifference = selectedDates.getTime() - Date.now();

  if (timeDifference <= 0) {
    Notify.success('Time end');
    clearInterval(timerId);
  } else {
    formatDate = convertMs(timeDifference);
    addLeadingZero(formatDate)
    renderDate(formatDate);
  }
}

function renderDate(formatDate) {
  secondsEl.textContent = formatDate.seconds;
  minutesEl.textContent = formatDate.minutes;
  hoursEl.textContent = formatDate.hours;
  daysEl.textContent = formatDate.days;
}

function addLeadingZero(formatDate) {
  formatDate.days = String(formatDate.days).length === 1 ? String(formatDate.days).padStart(2, '0') : formatDate.days
  formatDate.minutes = String(formatDate.minutes).length === 1 ? String(formatDate.minutes).padStart(2, '0') : formatDate.minutes
  formatDate.hours = String(formatDate.hours).length === 1 ? String(formatDate.hours).padStart(2, '0') : formatDate.hours
  formatDate.seconds = String(formatDate.seconds).length === 1 ? String(formatDate.seconds).padStart(2, '0') : formatDate.seconds
  return formatDate
}