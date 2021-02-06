let sprites = document.getElementById('spriteSheet');
let titleImage = document.getElementById('titleScreen');
ctx.drawImage(titleImage, 0, 0, width, height);

let map = createMap(100);

const mapSideLength = Math.sqrt(map.length);
const tileSideLength = 40;
player.sideLength = tileSideLength * 0.8;

let camera = {
  w: width + tileSideLength,
  h: height + tileSideLength,
  pos: newVector(0, 0)
};

function render() {
  let xMin = Math.floor(camera.pos.a / tileSideLength);
  let xMax = Math.ceil((camera.pos.a + camera.w) / tileSideLength);
  let yMin = Math.floor(camera.pos.b / tileSideLength);
  let yMax = Math.ceil((camera.pos.b + camera.h) / tileSideLength);

  if(xMin < 0) {
    camera.pos.a = 0;
    xMin = 0;
  } else if(xMax > mapSideLength) {
    camera.pos.a = mapSideLength * tileSideLength - camera.w;
    xMax = mapSideLength;
  }

  if(yMin < 0) {
    camera.pos.b = 0;
    yMin = 0;
  } else if(yMax > mapSideLength) {
    camera.pos.b = mapSideLength * tileSideLength - camera.h;
    yMax = mapSideLength;
  }
  
  for(let i = xMin; i < xMax; i++) {
    for(let j = yMin; j < yMax; j++) {
      let tile = map[i + j * mapSideLength];
      let tileX = i * tileSideLength - camera.pos.a;
      let tileY = j * tileSideLength - camera.pos.b;
  
      if(tile !== 0) {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(sprites, 0, 0, 32, 32, tileX, tileY, tileSideLength, tileSideLength);
      }
    }
  }
}

let gameover = false;
function loop() {
  clear();

  if(!gameover) {
    render();

    rect(player.pos.a, player.pos.b, player.sideLength, player.sideLength, 'dodgerblue');

    zeroOut(player.acl);

    player.vel.a *= 0.9;

    if(player.dirBools.ArrowLeft) {
      player.acl.a -= 0.6;
    } else if(player.dirBools.ArrowRight) {
      player.acl.a += 0.6;
    }

    if(player.dirBools.ArrowUp && !player.jumping) {
      player.jumping = true;
      player.acl.b -= tileSideLength * 0.37;
    }
    
    // if(player.acl.b < 0.5) player.acl.b += 0.5;

    add(player.vel, player.acl);
    add(camera.pos, player.vel);
  
    // player.updateCollisionPoints();
    // player.checkCollision();
  }

  window.requestAnimationFrame(loop);
}

function startGame() {
  canvas.onclick = null;

  loop();
}

window.addEventListener('keydown', function() {player.keyPress(event.code, event.type)});
window.addEventListener('keyup', function() {player.keyPress(event.code, event.type)});
