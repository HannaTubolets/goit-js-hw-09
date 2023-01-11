import flatpickr from 'flatpickr';
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    textEl: document.querySelector('#datetime-picker'),
    timerHtmlEl: document.querySelector('.timer'),
    btnStartEl: document.querySelector('button[data-start]'),
    daysEl: document.querySelector('span[data-days]'),
    hoursEl: document.querySelector('span[data-hours]'),
    minutesEl: document.querySelector('span[data-minutes]'),
    secondsEl: document.querySelector('span[data-seconds]'),
}

refs.btnStartEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.btnStartEl.disabled = true;
    } else {
      refs.btnStartEl.disabled = false;
    }
  },
};

flatpickr(refs.textEl, options);

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

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

refs.btnStartEl.addEventListener('click', () => {
  let timer = setInterval(() => {
    let countdown = new Date(refs.textEl.value) - new Date();
    refs.btnStartEl.disabled = true;
    if (countdown >= 0) {
      let timeObject = convertMs(countdown);
      refs.daysEl.textContent = addLeadingZero(timeObject.days);
      refs.hoursEl.textContent = addLeadingZero(timeObject.hours);
      refs.minutesEl.textContent = addLeadingZero(timeObject.minutes);
      refs.secondsEl.textContent = addLeadingZero(timeObject.seconds);
      if (countdown <= 10000) {
        refs.timerHtmlEl.style.color = '#F37F13';
      }
    } else {
      Notiflix.Notify.success('Countdown finished');
      refs.timerHtmlEl.style.color = '#1B1717';
      clearInterval(timer);
    }
  }, 1000);
});