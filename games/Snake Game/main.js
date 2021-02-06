const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const scoreCounter = document.getElementById('scoreCounter');

let scale = 20;

const rows = canvas.height / scale;
const cols = canvas.width / scale;

let score = 0
let frameRate = 1000/9;
let snk = new Snake();
let apl = new Apple();

setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snk.draw();
  snk.move();
  
  apl.draw();
  
  //disable apple from spawning ontop of the snake
  for(let i = snk.tail.length - 1; i > -1; i--) {
    if(apl.x == snk.tail[i].x && apl.y == snk.tail[i].y) {
      apl.getNewLoc();
    }
  }
  
  //get bigger snake eats
  if(snk.x == apl.x && snk.y == apl.y) {
    apl.getNewLoc();
    snk.eat();
    document.getElementById('scoreCounter').innerHTML = score;
  }
  
  //die when hits the edge
  if(snk.x > canvas.width || snk.x < 0 || snk.y > canvas.height || snk.y < 0) {
    endGame();
  }
  
  // die when tail intersects itself
  for(let i = snk.tail.length - 1; i > -1; i--) {
    if(snk.x == snk.tail[i].x && snk.y == snk.tail[i].y) {
      endGame();
    }
  }
  
  document.addEventListener('keydown', press);
}, frameRate);

function endGame() {
  scale = 0;
  scoreInterval = 0;
  canvas.style.background = '#111';
}

function press(e) {
  switch(e.code) {
    case 'ArrowLeft':
      //left
      if(snk.xSpeed != 1) {
        snk.xSpeed = -1;
        snk.ySpeed = 0;
      }
      break;
    case 'ArrowUp':
      //up
      if(snk.ySpeed != 1) {
        snk.xSpeed = 0;
        snk.ySpeed = -1;
      }
      break;
    case 'ArrowRight':
      //right
      if(snk.xSpeed != -1) {
        snk.xSpeed = 1;
        snk.ySpeed = 0;
      }
      break;
    case 'ArrowDown':
      //down
      if(snk.ySpeed != -1) {
        snk.xSpeed = 0;
        snk.ySpeed = 1;
      }
      break;
  }
}