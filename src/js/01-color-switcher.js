const btnStartEl = document.querySelector('button[data-start]');
const btnStopEl = document.querySelector('button[data-stop]');
btnStopEl.disabled = true;
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btnStartEl.addEventListener('click', () => {
  btnStartEl.disabled = true;
  btnStopEl.disabled = false;

  timerId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 1000);
});

btnStopEl.addEventListener('click', () => {
  clearInterval(timerId);
  btnStartEl.disabled = false;
  btnStopEl.disabled = true;
});

