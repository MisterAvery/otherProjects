const canvas = document.querySelector('canvas'),
      ctx = canvas.getContext('2d');
      
let {width, height} = canvas,
      gravity = 0.7;
height -= 30;

let objSpeed = 6;

let timeSeinceStart = 0,
    minTime = 40,
    maxTime = 100,
    timeUntilSpawn = timeOfSpawn = 1;

let GAMEOVER = false,
    score = 0;

const dino =  {
  w: 46,
  h: 72,
  x: 68,
  y: height - 72,
  yVel: 0,
  jumping: false,
  crouched: false,
  collisionBoxes: [],
  
  img: Sprite('./assets/dino-sheet-running.png', 2, 176, 123),
  frame: 0,
  
  updateCollisionBoxes: () => {
    dino.collisionBoxes = [
      {
        x: dino.x + 22,
        y: dino.y + 20,
        w: 22,
        h: 20
      },
      
      {
        x: dino.x,
        y: dino.y + 38,
        w: 30,
        h: 20
      },
      
      {
        x: dino.x + 12,
        y: dino.y + 52,
        w: 18,
        h: 20
      }
    ];
  },
  
  show: () => {
    ctx.drawImage(dino.img.img, dino.img.colW * dino.frame, 0, dino.img.colW, dino.img.h, dino.x, dino.y, dino.w, dino.h);
  },
  
  update: () => {
    if(dino.y + dino.h + dino.yVel > height) {
      dino.yVel = 0;
      dino.y = height - dino.h;
      dino.jumping = 0;
      return;
    }
    
    dino.y += dino.yVel;
    dino.yVel += gravity;
    
    dino.updateCollisionBoxes();
  }
};



//functions
function rectCollision(r1, r2) {
  return !(r1.x > r2.x + r2.w || r1.x + r1.w < r2.x || r1.y > r2.y + r2.h || r1.y + r1.h < r2.y);
}

function loop() {
  timeSeinceStart++;
  if(timeSeinceStart % 5 === 0) score++;
  if(timeSeinceStart % 10 === 0) dino.frame = (dino.frame + 1) % 2;
  if(timeSeinceStart % 100 === 0) objSpeed += 0.3;
  
  ctx.clearRect(0, 0, width, height);
  
  ctx.fillStyle = '#f7d497';
  ctx.fillRect(0, height - 10, width, 40);
  ctx.fillStyle = 'black';
  ctx.fillText(`Score: ${score}`, width - 150, 30);
  
  if(timeSeinceStart === timeOfSpawn) {
    if(score < 200) cacti.push(new Cactus());
    else {
      if(Math.random() < 0.5) birds.push(new Bird());
      else cacti.push(new Cactus());
    }
    timeUntilSpawn = minTime + Math.floor(Math.random() * (maxTime - minTime));
    timeOfSpawn = timeSeinceStart + timeUntilSpawn;
  }

  dino.update();
  dino.show();
  
  handleEnemys(cacti);
  handleEnemys(birds);
  
  if(!GAMEOVER) requestAnimationFrame(loop);
}

window.addEventListener('keydown', e => {
  if(e.keyCode == 38 && !dino.crouched) {
    dino.yVel += !dino.jumping ? -13 : 0;
    dino.jumping = true;
  }
  if(e.keyCode == 40) {
    if(!dino.jumping) {
      dino.h = 48;
      dino.w = 66;
      dino.y = height - dino.h;
      if(!dino.crouched) {
        dino.img = Sprite('./assets/dino-sheet-crouched.png', 2, 240, 88);
      }
      dino.crouched = true;
    } else {
      dino.yVel += 14;
    }
  }
});
window.addEventListener('keyup', e => {
  if(e.keyCode == 40 && !dino.jumping) {
    dino.h = 72;
    dino.w = 46;
    dino.y = height - 72;
    dino.crouched = false;
    dino.img = Sprite('./assets/dino-sheet-running.png', 2, 176, 123);
  }
});

ctx.font = 'bold 27px sans-serif';
dino.updateCollisionBoxes();
loop();
