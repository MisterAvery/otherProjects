//variables to be used later for the canvas
const canvas = document.querySelector('canvas'),
      ctx = canvas.getContext('2d');
let {width, height} = canvas;
let lineColor = '#e8e8e8';
let scribbles = true;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

resize();
window.addEventListener('resize', resize);

//variables to be used for the clock
const timeElement = document.querySelector('h1'),
      switches = document.querySelectorAll('input'),
      root = document.documentElement;

//create event listeners for switched
switches[0].addEventListener('change', colorModeSwitchChange);
switches[1].addEventListener('change', getTime);
switches[2].addEventListener('change', scribbleSwitchChange);

//start the clock loop
getTime();
setInterval(getTime, 1000);


//////////////////////////////FUNCTIONS//////////////////////////////
function getTime() {
  const time = new Date();
  const militaryHour = time.getHours();
  const endText = militaryHour >= 12 ? 'PM' : 'AM';
  
  let standardHour = militaryHour % 12;
  if(standardHour === 0) standardHour = 12;
  
  let minute = time.getMinutes();
  if(minute <= 9) minute = `0${minute}`;

  if(switches[1].checked) timeElement.innerText = `${militaryHour}:${minute} MI`;
  else timeElement.innerText = `${standardHour}:${minute} ${endText}`;
}

function colorModeSwitchChange() {
  if(!this.checked) {
    lineColor = '#3e424b';
    
    root.style.setProperty('--bg', '#e8e8e8');
    root.style.setProperty('--containerBg', '#f2f5f8');
    root.style.setProperty('--containerColor', 'black');
    root.style.setProperty('--h1Color', 'dodgerblue');
  } else {
    lineColor = '#e8e8e8';
    
    root.style.setProperty('--bg', '#3e424b');
    root.style.setProperty('--containerBg', '#777b7e');
    root.style.setProperty('--containerColor', 'white');
    root.style.setProperty('--h1Color', 'lime');
  }
}

function scribbleSwitchChange() {
  scribbles = switches[2].checked;
}
