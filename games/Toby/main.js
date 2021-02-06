const score = document.getElementById('score');
const gameBox = document.getElementById('gameBox');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const toby = new Toby();
let platforms = [new Platform(canvas.height - 70, 100)];
let gameSpeed = 2;
let iterations = 0;

//////////////////
//////setup//////
////////////////

gameBox.scrollTop = canvas.height;

//set the num of platforms
for(let i = 2; i < canvas.height / 70; i++) {
  platforms.push(new Platform(canvas.height - 70 * i));
}

///////////////////////////
//////start the game//////
/////////////////////////
setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  //draw things
  toby.draw();
  toby.move();
  
  //iterate through each platform
  for(let plat in platforms) {
    platforms[plat].draw();
    
    //hit detection for platforms
    if(toby.y <= platforms[plat].y + platforms[plat].h && toby.y >= platforms[plat].y && toby.x + toby.diam > platforms[plat].x && toby.x < platforms[plat].x + platforms[plat].w) {
      toby.yVel = 0;
      toby.y = platforms[plat].y + platforms[plat].h + 1;
    }
    
    if(toby.y + toby.diam > platforms[plat].y && toby.y + toby.diam < platforms[plat].y + platforms[plat].h && toby.x + toby.diam > platforms[plat].x && toby.x < platforms[plat].x + platforms[plat].w) {
      toby.yVel = 0;
      toby.y = platforms[plat].y - toby.diam;
      toby.jumping = false;
    }
    
    if(platforms[plat].y > gameBox.scrollTop + 735) {
      platforms.shift(platforms[plat]);
    }
  }
  
  //load more game
  if(toby.y < 9700) {
    gameBox.scrollTop -= gameSpeed;
    iterations++;
  }
  
  if(iterations == 200) {
    gameSpeed += 0.3;
    iterations = 0;
  }
  
  //detect Death
    if(toby.y + toby.diam > gameBox.scrollTop + 620) {
      die();
    }
  
  
  //score
  score.innerHTML = 'Score: ' + (canvas.height - gameBox.scrollTop - 603);
  
  //controlls
  document.addEventListener('keydown', kDwn);
  document.addEventListener('keyup', kUp);
}, 40);

function kDwn(e) {
  switch(e.keyCode) {
    case 37:
      toby.left();
      break;
    
    case 39:
      toby.right();
      break;
    
    case 38:
      if(toby.jumping === false) {
        toby.jumping = true;
        toby.jump();
      }
      break;
  }
}

function kUp(e) {
  switch(e.keyCode) {
    case 37:
      if(toby.xVel < -7) {
        toby.xVel += 7;
      }
      break;
    
    case 39:
      if(toby.xVel > 7) {
        toby.xVel -= 7;
      }
      break;
  }
}

function die() {
  gameBox.innerHTML = '<h2>Oh No!!</h2><h3>You Died.</h3>';
}