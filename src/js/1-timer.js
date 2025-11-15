import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// DOM references
const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');

startBtn.disabled = true;

let userSelectedDate = null;
let timerId = null;

// Flatpickr config
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const pickedDate = selectedDates[0];
    const now = new Date();

    if (pickedDate <= now) {
      startBtn.disabled = true;

      iziToast.error({
        title: "Error",
        message: "Please choose a date in the future",
        position: "topRight"
      });

      return;
    }

    userSelectedDate = pickedDate;
    startBtn.disabled = false;
  },
};

flatpickr(dateInput, options);

// ----------------------------
//      TIMER LOGIC
// ----------------------------

// Формат добавления ведущего 0
function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

// Конвертация миллисекунд
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

// Обновление UI
function updateTimer({ days, hours, minutes, seconds }) {
  daysField.textContent = days;
  hoursField.textContent = addLeadingZero(hours);
  minutesField.textContent = addLeadingZero(minutes);
  secondsField.textContent = addLeadingZero(seconds);
}

// Старт таймера
startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  dateInput.disabled = true;

  timerId = setInterval(() => {
    const now = new Date();
    const diff = userSelectedDate - now;

    if (diff <= 0) {
      clearInterval(timerId);
      updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });

      iziToast.success({
        title: "Done",
        message: "Countdown finished!",
        position: "topRight"
      });

      dateInput.disabled = false;
      return;
    }

    const time = convertMs(diff);
    updateTimer(time);

  }, 1000);
});
