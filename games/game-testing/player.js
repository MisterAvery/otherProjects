let player = {
  pos: newVector(width/2, height/2),
  sideLength: 20,
  acl: newVector(0, 0),
  vel: newVector(0, 0),
  jumping: false,
  dirBools: {
    ArrowLeft: false,
    ArrowUp: false,
    ArrowRight: false
  }
};
player.updateCollisionPoints = function() {
  player.collisionPoints = {
    topLeft: newVector(player.pos.a + camera.pos.a, player.pos.b + camera.pos.b),
    topRight: newVector(player.pos.a + player.sideLength + camera.pos.a, player.pos.b + camera.pos.b),
    bottomLeft: newVector(player.pos.a + camera.pos.a, player.pos.b + player.sideLength + camera.pos.b),
    bottomRight: newVector(player.pos.a + player.sideLength + camera.pos.a, player.pos.b + player.sideLength + camera.pos.b)
  };
};
player.checkCollision = function() {
  Object.keys(player.collisionPoints).forEach(item => {
    let point = player.collisionPoints[item];
    let oldPos = findDif(point, player.vel);

    //canvas edge collision detection
    if(point.b <= 0) {
      player.vel.b = 0;
      player.pos.b = 0.1;
    } else if(point.b >= camera.pos.b + height) {
      player.vel.b = 0;
      player.pos.b = camera.pos.b + height - player.sideLength - 0.1;
      player.jumping = false;
    }

    if(point.a <= 0) {
      player.vel.a = 0;
      player.pos.a = 1;
    } else if(point.a >= camera.pos.a + width) {
      player.vel.a = 0;
      player.pos.a = camera.pos.a + width - player.sideLength - 0.1;
   }

    //tile collision detection
  let x2Tiles = Math.floor(point.a / tileSideLength);
    let y2Tiles = Math.floor(point.b / tileSideLength);
    let tileOverIndex = y2Tiles * mapSideLength + x2Tiles;
    let tileOverVal = map[tileOverIndex];

    if(tileOverVal !== 0 && tileOverVal != 16 && tileOverVal) {
      let tileOverInfo = tileTypes[tileOverVal];
      let tileOverX = Math.floor(tileOverIndex % mapSideLength) * tileSideLength;
      let tileOverY = Math.floor(tileOverIndex / mapSideLength) * tileSideLength;

      if(tileOverInfo.top && point.b >= tileOverY && oldPos.b < tileOverY) {
        player.vel.b = 0;
        camera.pos.b = tileOverY - player.sideLength - 0.5 - height/2;
        player.jumping = false;
        return;
      } else if(tileOverInfo.bottom && point.b <= tileOverY + tileSideLength && oldPos.b > tileOverY + tileSideLength) {
        player.vel.b = 0;
        camera.pos.b = tileOverY + tileSideLength + 0.5 - height/2;
        return;
      }

      if(tileOverInfo.left && point.a >= tileOverX && oldPos.a < tileOverX) {
        player.vel.a = 0;
        camera.pos.a = tileOverX - player.sideLength - 0.5 - width/2;
        return;
      } else if(tileOverInfo.right && point.a <= tileOverX + tileSideLength && oldPos.a > tileOverX + tileSideLength) {
        player.vel.a = 0;
        camera.pos.a = tileOverX + tileSideLength + 0.5 - width/2;
        return;
      }
    }
  });
};
player.keyPress = function(code, type) {
  if(code == 'ArrowRight' || code == 'ArrowLeft' || code == 'ArrowUp')
    player.dirBools[code] = (type == 'keydown')? true:false;
};
