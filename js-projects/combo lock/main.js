let digits = [document.getElementById('d1'), document.getElementById('d2'), document.getElementById('d3'),
              document.getElementById('d4'), document.getElementById('d5'), document.getElementById('d6'),
              document.getElementById('d7'), document.getElementById('d8'), document.getElementById('d9'),
              document.getElementById('d10')];
let d1 = d2 = d3 = d4 = d5 = d6 = d7 = d8 = d9 = d10 = 0;

setInterval(() => {
  digits[0].innerHTML = d1;
  digits[1].innerHTML = d2;
  digits[2].innerHTML = d3;
  digits[3].innerHTML = d4;
  digits[4].innerHTML = d5;
  digits[5].innerHTML = d6;
  digits[6].innerHTML = d7;
  digits[7].innerHTML = d8;
  digits[8].innerHTML = d9;
  digits[9].innerHTML = d10;
  
  if(d1 == 10) {d1 = 0}
  if(d2 == 10) {d2 = 0}
  if(d3 == 10) {d3 = 0}
  if(d4 == 10) {d4 = 0}
  if(d5 == 10) {d5 = 0}
  if(d6 == 10) {d6 = 0}
  if(d7 == 10) {d7 = 0}
  if(d8 == 10) {d8 = 0}
  if(d9 == 10) {d9 = 0}
  if(d10 == 10) {d10 = 0}
  
  if(d1 == 5 && d2 == 5 && d3 == 5 && d4 == 5 && d5 == 5 && d6 == 5 && d7 == 5 && d8 == 5 && d9 == 5 && d10 == 5) {
    document.getElementById('lock').style.background = '#148d02';
  }
}, 1000/60);