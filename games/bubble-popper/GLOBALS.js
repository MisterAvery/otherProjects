const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let {width, height} = canvas;
let clientRect = canvas.getBoundingClientRect();

let score = 0;
let frameCount = 0;
let gameState = 'title';
let gameoverSound = document.createElement('audio');
gameoverSound.src = './assets/plonk.mp3';

let bubbles = [];
let enemys = [];

function text(message, fontSize, color, y, x = width/2) {
  ctx.fillStyle = color;

  ctx.font = `${fontSize} mono`;
  ctx.fillText(message, x, y);
}

let mouse = {
  x: width / 2,
  y: height / 2,
  click: false
};

canvas.addEventListener('touchStart', userPress);
canvas.addEventListener('touchEnd', userRelease);
canvas.addEventListener('mousedown', userPress);
canvas.addEventListener('mouseup', userRelease);

resize();
globalThis.onresize = resize;

function resize() {
  clientRect = canvas.getBoundingClientRect();
  let dx = innerWidth - width;
  let dy = innerHeight - height;

  let side = dx <= dy ? 'Width' : 'Height';
  canvas.style = `${side}: ${window['inner' + side] * 0.88}px`;
}

function initalizeEnemys() {
  enemys.push(new Enemy())
  setTimeout(() => enemys.push(new Enemy()), 3000);
  setTimeout(() => enemys.push(new Enemy()), 5000);
}

function userRelease(e) {
  mouse.click = false
}

function userPress(e) {
  mouse.x = e.x - clientRect.x;
  mouse.y = e.y - clientRect.y;
  mouse.click = true;

  if(gameState == 'title') {
    if(mouse.x >= width/2 - 85 && mouse.x <= width/2 + 95 && mouse.y >= 340 && mouse.y <= 420) {
      score = 0;
      bubbles = [];
      enemys = [];
      initalizeEnemys();
      gameState = 'running';
      loop();
    }
  }
}
