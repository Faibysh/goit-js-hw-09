const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const body = document.querySelector("body");
stopBtn.disabled = true;
let interval = 0;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);


function onStartBtnClick() {
  stopBtn.disabled = false;
  interval = setInterval(getRandomHexColor, 1000);
  startBtn.disabled = true;
  
}

function onStopBtnClick() {
  stopBtn.disabled = true;
  startBtn.disabled = false;
  clearInterval(interval);
}


function getRandomHexColor() {
   body.style.backgroundColor=`#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

