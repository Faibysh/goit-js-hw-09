const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const body = document.querySelector("body");

let interval = 0;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);


function onStartBtnClick(){
  interval = setInterval(getRandomHexColor, 1000);
  startBtn.setAttribute("disabled", true);
}

function onStopBtnClick() {
  startBtn.removeAttribute("disabled");
  clearInterval(interval);
}
  

function getRandomHexColor() {
   body.style.backgroundColor=`#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

