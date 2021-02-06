let canvas, ctx, dino, cacs, loop;
let gameover = false;
let img = document.querySelector('#dino');

canvas = document.querySelector('#canvas');
ctx = canvas.getContext('2d');

canvas.width = 700;
canvas.height = 200;

  class Dino {
    constructor() {
      this.width = 55;
      this.height = 55;
      this.yVel = 0;
      this.x = 75;
      this.y = canvas.height - this.height;
      this.jumping = false;
    }

    draw() {
      ctx.drawImage(img, 455.5, 0, 21, 23, this.x, this.y, this.width, this.height);
    }

    move() {
      //jump cancilation
      this.y += this.yVel;

      if(this.jumping) {
        this.yVel += 0.8;
      }

      if(this.y + this.height >= canvas.height) {
        this.jumping = false;
        this.yVel = 0;
        this.y = canvas.height - this.height;
      }
    }
  }

  class Cactus {
    constructor() {
      this.xVel = 5;
      this.width = Math.floor(Math.random() * 40 + 27);
      this.height = 52;
      this.x = canvas.width;
      this.y = canvas.height - this.height;
    }

    draw() {
      ctx.drawImage(img, 118, 0, 17, 15, this.x, this.y, this.width, this.height);
    }

    move() {
      this.x -= this.xVel + gameSpeed;
    }
  }

let distance = 0;
let framesPassed = 0;
let gameSpeed = 0;
dino = new Dino();
cacs = [new Cactus()];

loop = function() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.imageBluring = false;

  for(let cactus in cacs) {
    cacs[cactus].draw();
    cacs[cactus].move();

    //hit detection
    if(dino.x + dino.width - 6 >= cacs[cactus].x && dino.x + dino.width - 7 <= cacs[cactus].x + cacs[cactus].width && dino.y + dino.height >= cacs[cactus].y) {
      gameover = true;
    } else if(dino.y + dino.height - 7 >= cacs[cactus].y) {
      if(dino.x > cacs[cactus].x && dino.x < cacs[cactus].x + cacs[cactus].width) {
        gameover = true;
      }
    }

    //automation
    if(cacs[cactus].x - (dino.x + dino.width) <= 20 * (gameSpeed + 1) && cacs[cactus].x - (dino.x + dino.width) >= 15 && !dino.jumping && document.querySelector('#auto').checked) {
      dino.jumping = true;
      dino.yVel = -13;
    }
  }

  dino.draw();
  dino.move();

  //add cacs
  if(distance >= Math.floor(Math.random() * 100 + 40)) {
    cacs.push(new Cactus());
    distance = 0;
  }

  //despawn cacs
  if(cacs[0].x == -1 * cacs[0].width) {
    cacs.shift();
  }

  //speed up
  if(framesPassed == 100) {
    framesPassed = 0;
    gameSpeed += 0.4;
  }

  distance++;
  framesPassed++;
  if(!gameover) {
    window.requestAnimationFrame(loop);
  }
}

document.addEventListener('keydown', event => {
  if(event.keyCode == 38 && !dino.jumping) {
    dino.yVel = -13;
    dino.jumping = true;
  }
});

loop();