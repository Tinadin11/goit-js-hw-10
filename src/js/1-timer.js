import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const buttonTimer = document.querySelector('button[data-start]');
const input = document.querySelector('#datetime-picker');
const day = document.querySelector('span[data-days]');
const hour = document.querySelector('span[data-hours]');
const minute = document.querySelector('span[data-minutes]');
const second = document.querySelector('span[data-seconds]');

buttonTimer.addEventListener('click', updateCounter);

buttonTimer.disabled = true;
let userSelectedDate = '';
let intervalId = '';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        color: '#ef4040',
      });
    } else {
      buttonTimer.disabled = false;
      userSelectedDate = selectedDates[0];
    }
  },
};

flatpickr(input, options);

function updateCounter() {
  intervalId = setInterval(addTimer, 1000);
  buttonTimer.disabled = true;
  input.disabled = true;
}

const addLeadingZero = value => value.toString().padStart(2,'0');

function addTimer() {
  const msDiff = userSelectedDate - new Date();
  if (msDiff >= 0) {
    let time = convertMs(msDiff);
    day.textContent = addLeadingZero(time.days);
    hour.textContent = addLeadingZero(time.hours);
    minute.textContent = addLeadingZero(time.minutes);
    second.textContent = addLeadingZero(time.seconds);
  } else {
    iziToast.success({
      title: 'Ok!',
      message: 'Countdown is over',
      color: '#59a10d',
    });
    clearTimer();
  }
}

function clearTimer() {
  clearInterval(intervalId);
  buttonTimer.disabled = true;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}