const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;
let gameover = false;

class Platform {
  constructor(x_) {
    this.w = 4;
    this.h = 135;
    this.x = x_;
    this.y = height/2 - this.h/2;
    this.yVel = 0;
  }

  show() {
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  move() {
    //check bounds
    if(this.y <= 0) this.y = 0.1;
    else if(this.y + this.h >= height) this.y = height - this.h - 0.1;
    else this.y += this.yVel;
  }
}

let platformLEFT = new Platform(30);
let platformRIGHT = new Platform(width - 34);


let ball = {
  x: width / 2,
  y: 75,
  xVel: (-1 + (Math.round(Math.random()) * 2)) * 5,
  yVel: 6,
  r: 12,

  show: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  },
  move: function() {
    this.x += this.xVel;
    this.y += this.yVel;

    //check edges
    if(this.y + this.r >= height || this.y - this.r <= 0) this.yVel *= -1;
    if(this.x + this.r >= width || this.x - this.r <= 0) {
      gameover = true;
      let winner = (ball.x > width / 2)? 'LEFT':'RIGHT';

      ctx.font = 'bold 40px mono';
      ctx.textAlign = 'center';
      ctx.fillText(`${winner} PLAYER WINS`, width/2, 50);
    }

    //check platforms
    if(this.x + this.r >= platformRIGHT.x && this.x - this.r <= platformRIGHT.x + platformRIGHT.w && this.y + this.r >= platformRIGHT.y && this.y - this.r <= platformRIGHT.y + platformRIGHT.h) {
      this.xVel *= -1;
    } else if(this.x - this.r <= platformLEFT.x + platformLEFT.w && this.x + this.r >= platformLEFT.x && this.y + this.r >= platformLEFT.y && this.y - this.r <= platformLEFT.y + platformLEFT.h) {
      this.xVel *= -1;
    }
  }
};

function loop() {
  if(!gameover) {
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = '#444';
    ball.show();

    ctx.fillStyle = 'dodgerblue';
    ball.move();

    platformLEFT.show();
    platformLEFT.move();
    platformRIGHT.show();
    platformRIGHT.move();

    window.requestAnimationFrame(loop);
  }
}

window.addEventListener('keydown', () => keyEvent(event.keyCode));
window.addEventListener('keyup', () => keyEvent(event.keyCode));

function keyEvent(code, type = (event.type == 'keydown')? 5:0) {
  let multiplier = (code == 73 || code == 87)? -1:1;

  if(code == 73 || code == 75) platformRIGHT.yVel = type * multiplier;
  if(code == 87 || code == 83) platformLEFT.yVel = type * multiplier;
}


ctx.fillStyle = '#444';
ball.show();
ctx.fillStyle = 'dodgerblue';
platformLEFT.show();
platformRIGHT.show();

setTimeout(loop, 2000);
