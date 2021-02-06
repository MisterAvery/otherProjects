let hourHand = document.querySelector('.hour');
let minuteHand = document.querySelector('.minute');
let secondHand = document.querySelector('.second');

setInterval(() => {
  let now = new Date();
  let hour = now.getHours() * 30;
  let minute = now.getMinutes() * 6;
  let second = now.getSeconds() * 6;

  setTime(hourHand, hour);
  setTime(minuteHand, minute);
  setTime(secondHand, second);
}, 1000); 

function setTime(element, timeAmnt) {
  element.style.setProperty('--handrotate', timeAmnt);
}