const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;
let gameover = false;
let cols = 8;
let rows = 4;
let brickW = Math.ceil(width/cols);
let brickH = Math.ceil(130/rows);
let score = 0;
let bricks = [];

let platform = {
  h: 3,
  w: 130,
  x: width/2 - 65,
  y: height - 80,
  xVel: 0,
  
  show: function() {
    ctx.fillRect(this.x, this.y, this.w, this.h);
  },
  
  move: function(ball) {
    this.x = ball.x - this.w/2;
    
    if(this.x <= 0) this.x = 0.1;
    else if(this.x + this.w >= width) this.x = width - this.w - 0.1;
    else this.x += this.xVel;
    
  }
};

let ball = {
    x: width/2,
    y: 200,
    r: 11,
    xVel:  (-1 + Math.round(Math.random()) * 2) * 5,
    yVel:  -6,
  
  show: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  },
  
  move: function() {
    this.x += this.xVel;
    this.y += this.yVel;
    
    //canvas edge collision
    if(this.x <= this.r || this.x >= width - this.r) {
      if(this.x <= this.r) this.x = this.r + 0.1;
      else if(this.x >= width - this.r) this.x = width - this.r - 0.1;
      
      this.xVel *= -1;
    }
    
    if(this.y <= this.r || this.y >= height - this.r) {
      if(this.y <= this.r) this.y = this.r + 1;
      else if(this.y >= height - this.r) gameover = true;
      
      this.yVel *= -1;
    }
    
    //platform collision
    if(this.y + this.r >= platform.y && this.y - this.r <= platform.y + platform.h && this.x <= platform.x + platform.w && this.x >= platform.x) this.yVel *= -1;
  }
};

class Brick {
  constructor(x_, y_) {
    this.x = x_ * brickW;
    this.y = y_ * brickH;
    this.color = {
      r: 0,
      g: Math.floor(Math.random() * 180) + 75,
      b: 256
    };
  }
  
  show() {
    // let color = {
    //   r: 0,
    //   g: Math.floor(Math.random() * 180) + 75,
    //   b: 256
    // };
    
    ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
    // ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
    ctx.fillRect(this.x, this.y, brickW, brickH);
  }
  
  checkCollision(ball) {
    let testX = ball.x;
    let testY = ball.y;
    let sideA, sideB, sideC;
    
    if(ball.x < this.x) testX = this.x;
    else if(ball.x > this.x + brickW) testX = this.x + brickW;
    
    if(ball.y < this.y) testY = this.y;
    else if(ball.y > this.y + brickH) testY = this.y + brickH;
    
    sideA = testX - ball.x;
    sideB = testY - ball.y;
    sideC = Math.sqrt((sideA * sideA) + (sideB * sideB));
    if(sideC < ball.r) {
      if(sideB < ball.r) ball.yVel *= -1;
      else if(sideA < ball.r) ball.xVel *= -1;
      
      return true;
    }
    return false;
  }
}

for(let i = 0; i < cols; i++) {
  for(let j = 0; j < rows; j++) {
    bricks.push(new Brick(i, j));
  }
}

function loop() {
  if(!gameover) {
    ctx.clearRect(0, platform.y, width, height - platform.y);
    ctx.fillStyle = '#e5e5e540';
    ctx.fillRect(0, 0, width, platform.y);
    
    ctx.fillStyle = 'dodgerblue';
    platform.show();
    
    ctx.fillStyle = '#444';
    ctx.fillText(`Score: ${score}`, width/2, height - 20);
    
    ball.show();
    ball.move();
    
    platform.move(ball);
    
    let removealList = [];
    bricks.forEach((brick, i) => {
      brick.show();
      if(brick.checkCollision(ball)) {
        removealList.push(i);
        score += 10;
      }
    });
    removealList.forEach(index => bricks.splice(index, 1));
    if(bricks.length === 0) {
      for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
          bricks.push(new Brick(i, j));
        }
      }
    }

    
    window.requestAnimationFrame(loop);
  }
}

function keyEvent(event) {
  if(event.keyCode == 37 || event.keyCode == 39) {
    let multiplier = (event.keyCode == 37)? -1:1;
    let type = (event.type == 'keydown')? 5:0;
    
    platform.xVel = type * multiplier;
  }
}

window.addEventListener('keydown', keyEvent);
window.addEventListener('keyup', keyEvent);

ctx.fillStyle = '#444';
ball.show();

ctx.font = 'bold 22px mono';
ctx.textAlign = 'center';
ctx.fillText(`Score: ${score}`, width/2, height - 20);

ctx.fillStyle = 'dodgerblue';
platform.show();

bricks.forEach(brick => brick.show());
setTimeout(loop, 1500);