let ctx, game, loop, img;

ctx = document.querySelector('#canvas').getContext('2d');
img = document.querySelector('.loader');

game = {
  player: {
    diam: levels[currentLevel].playerDiam,
    x: levels[currentLevel].startX,
    y: levels[currentLevel].startY,
    oldX: this.x,
    oldY: this.y,
    xVel: 0,
    yVel: 0,
    jumping: true,
    imgX: 16*6,
    imgY: 0
  },

  controller: {
    left: false,
    right: false,
    down: false,
    up: false,
    keyPress: function (event) {
      let state = (event.type == "keydown")? true:false;

      switch (event.keyCode) {
        case 37:// left key
          game.controller.left = state;
          break;
        case 38:// up key
          game.controller.up = state;
          break;
        case 39:// right key
          game.controller.right = state;
          break;
        case 40:// right key
          game.controller.down = state;
          break;
      }
    }
  },

  world: {
    tileSize: levels[currentLevel].tileSize,
    cols: levels[currentLevel].cols,
    rows: levels[currentLevel].rows,

    map: levels[currentLevel].map,

    render: function () {
      for (let chunk in this.map) {
        let chunkX = Math.floor(chunk % this.cols);
        let chunkY = Math.floor(chunk / this.cols);
        let imgW = img.width/7;
        let imgH = img.height/3;
        let clipX;
        let clipY;
        let noLeft = (this.map[chunkY * this.cols + (chunkX - 1)] === 0 && this.map[chunkY * this.cols + chunkX] !== 0)? true:false;
        let noRight = (this.map[chunkY * this.cols + (chunkX + 1)] === 0 && this.map[chunkY * this.cols + chunkX] !== 0)? true:false;
        let noTop = (this.map[(chunkY - 1) * this.cols + chunkX] === 0 && this.map[chunkY * this.cols + chunkX] !== 0)? true:false;
        let noBottom = (this.map[(chunkY + 1) * this.cols + chunkX] === 0 && this.map[chunkY * this.cols + chunkX] !== 0)? true:false;

        if(this.map[chunkY * game.world.cols + chunkX] == 18) {
          clipX = imgW * 6;
          clipY = imgH*2;

        } else if(this.map[chunkY * game.world.cols + chunkX] == 17) {
          clipX = imgW * 4;
          clipY = 0;

        } else if(noRight && noLeft && noTop && noBottom) {
          clipX = imgW * 3;
          clipY = 0;

        } else if(noTop && noBottom && noLeft) {
          clipX = imgW * 3;
          clipY = imgH;

        } else if(noTop && noBottom && noRight) {
          clipX = imgW * 4;
          clipY = imgH;

        } else if(noRight && noLeft) {
          clipX = imgW * 3;
          clipY = imgH * 2;

        } else if(noTop && noBottom) {
          clipX = imgW;
          clipY = 0;

        } else if(noRight && noBottom) {
          clipX = imgW * 2;
          clipY = imgH * 2;

        } else if(noLeft && noBottom) {
          clipX = 0;
          clipY = imgH * 2;

        } else if(noRight && noTop) {
          clipX = imgW * 2;
          clipY = 0;

        } else if(noLeft && noTop) {
          clipX = 0;
          clipY = 0;

        } else if(noBottom) {
          clipX = imgW;
          clipY = imgH * 2;

        } else if(noTop) {
          clipX = imgW;
          clipY = 0;

        } else if(noLeft) {
          clipX = 0;
          clipY = imgH;

        } else if(noRight) {
          clipX = imgW * 2;
          clipY = imgH;

        } else if(game.world.map[chunkY * game.world.cols + chunkX] !== 0) {
          clipX = imgW;
          clipY = imgH;

        } else if(chunkY < 4) {
          clipX = imgW * 5;
          clipY = 0;

        } else {
          clipX = imgW * 5;
          clipY = imgH;
        }

        ctx.drawImage(img, clipX, clipY, imgW, imgH, chunkX * this.tileSize, chunkY * this.tileSize, this.tileSize, this.tileSize);
      }
    },
  },

  collision: {
    1: function (object, row, col) {
      this.topCollision(object, row, col);
    },

    2: function (object, row, col) {
      this.bottomCollision(object, row, col);
    },

    3: function (object, row, col) {
      this.rightCollision(object, row, col);
    },

    4: function (object, row, col) {
      this.leftCollision(object, row, col);
    },

    5: function (object, row, col) {
      if(this.leftCollision(object, row, col)) {return;}
      if(this.topCollision(object, row, col)) {return;}
    },

    6: function (object, row, col) {
      if(this.rightCollision(object, row, col)) {return;}
      if(this.topCollision(object, row, col)) {return;}
    },

    7: function (object, row, col) {
      if(this.bottomCollision(object, row, col)) {return;}
      if(this.leftCollision(object, row, col)) {return;}
    },

    8: function (object, row, col) {
      if(this.bottomCollision(object, row, col)) {return;}
      if(this.rightCollision(object, row, col)) {return;}
    },

    9: function (object, row, col) {
      if(this.leftCollision(object, row, col)) {return;}
      if(this.rightCollision(object, row, col)) {return;}
    },

    10: function (object, row, col) {
      if(this.bottomCollision(object, row, col)) {return;}
      if(this.topCollision(object, row, col)) {return;}
    },

    11: function (object, row, col) {
      if(this.topCollision(object, row, col)) {return;}
      if(this.bottomCollision(object, row, col)) {return;}
      if(this.rightCollision(object, row, col)) {return;}
    },

    12: function (object, row, col) {
      if(this.topCollision(object, row, col)) {return;}
      if(this.bottomCollision(object, row, col)) {return;}
      if(this.leftCollision(object, row, col)) {return;}
    },

    13: function (object, row, col) {
      if(this.topCollision(object, row, col)) {return;}
      if(this.rightCollision(object, row, col)) {return;}
      if(this.leftCollision(object, row, col)) {return;}
    },

    14: function (object, row, col) {
      if(this.rightCollision(object, row, col)) {return;}
      if(this.bottomCollision(object, row, col)) {return;}
      if(this.leftCollision(object, row, col)) {return;}
    },

    15: function (object, row, col) {
      if(this.rightCollision(object, row, col)) {return;}
      if(this.leftCollision(object, row, col)) {return;}
      if(this.topCollision(object, row, col)) {return;}
      if(this.bottomCollision(object, row, col)) {return;}
    },

    17: function (object, row, col) {
      this.topCollision(object, row, col);
    },

    //collision functions
    topCollision: function (object, row, col) {
      let top = row * game.world.tileSize;

      if (object.yVel > 0 && object.y + object.diam > top && object.oldY + object.diam <= top) {
        object.yVel = 0;
        object.y = top - object.diam - 0.01;

        object.jumping = false;

        return true;
      }

      return false;
    },

    bottomCollision: function (object, row, col) {
      let bottom = row * game.world.tileSize + game.world.tileSize;

      if (object.yVel < 0 && object.y < bottom && object.oldY >= bottom) {
        object.yVel = 0;
        object.y = bottom + 0.01;

        return true;
      }

      return false;
    },

    rightCollision: function (object, row, col) {
      let right = col * game.world.tileSize + game.world.tileSize;

      if (object.xVel < 0 && object.x < right && object.oldX >= right) {
          object.xVel = 0;
          object.x = right + 0.01;

        return true;
      }

      return false;
    },

    leftCollision: function (object, row, col) {
      let left = col * game.world.tileSize;

      if (object.xVel > 0 && object.x + object.diam > left && object.oldX + object.diam <= left) {
          object.xVel = 0;
          object.x = left - object.diam - 0.01;

        return true;
      }

      return false;
    }
  },

  animation: {
    spriteSets: [ /*set 1*/[[16*6, 0], [16*6, 16]], /*set 2*/[[16*4, 16*2], [16*5, 16*2]] ],
    framesPassed: 0,
    tileSet: 0,
    currentSprite: 0,

    changeSprite: function() {
      if(this.framesPassed >= 15) {
        if(this.currentSprite == 0) {
        this.currentSprite++;
        } else {
          this.currentSprite = 0;
        }

        this.framesPassed = 0;
      }
    }
  }
}

loop = function () {
  ctx.canvas.height = game.world.rows * game.world.tileSize;
  ctx.canvas.width = game.world.cols * game.world.tileSize;

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.imageSmoothingEnabled = false;

  //chunks
  game.world.render();

  //change player sprite X and Y
  game.player.imgX = game.animation.spriteSets[game.animation.tileSet][game.animation.currentSprite][0];
  game.player.imgY = game.animation.spriteSets[game.animation.tileSet][game.animation.currentSprite][1];

  //clearPoint
  ctx.drawImage(img, 16*6, 16*2, 16, 16, Math.floor(levels[currentLevel].clearPoint % game.world.cols) * game.world.tileSize, Math.floor(levels[currentLevel].clearPoint / game.world.cols) * game.world.tileSize, game.world.tileSize, game.world.tileSize);

  //player
  ctx.drawImage(img, game.player.imgX, game.player.imgY, 16, 16, game.player.x, game.player.y, game.player.diam, game.player.diam);

  //text
  ctx.fillStyle = "#111";
  ctx.font = "35px Roboto";
  ctx.fillText(levels[currentLevel].name, 15, 30);

  //controller logic
  if (game.controller.up && !game.player.jumping) {
    game.player.jumping = true;
    game.player.yVel -= Math.abs(game.player.diam - 85);
  } else if (game.controller.down) {
    game.player.yVel += 7;
  } else if (game.controller.left) {
    game.player.xVel -= 1.4;
    game.animation.tileSet = 1;
  } else if (game.controller.right) {
    game.player.xVel += 1.4;
    game.animation.tileSet = 0;
  }

  game.player.yVel += 2;

  game.player.oldX = game.player.x;
  game.player.oldY = game.player.y;

  game.player.x += game.player.xVel;
  game.player.y += game.player.yVel;

  //canvas edge hit detection
  if(game.player.x < 0) {
    game.player.xVel = 0;
    game.player.x = 0.01;
  }

  if(game.player.x + game.player.diam > ctx.canvas.width) {
    game.player.xVel = 0;
    game.player.x = ctx.canvas.width - game.player.diam - 0.01;
  }

  if(game.player.y < 0) {
    game.player.yVel = 0;
    game.player.y = 0.01;
  }

  if(game.player.y + game.player.diam > ctx.canvas.height) {
    game.player.jumping = false;
    game.player.yVel = 0;
    game.player.y = ctx.canvas.height - game.player.diam - 0.01;
  }

  //define player collision points

  let tileX = Math.floor((game.player.x + game.player.diam) / game.world.tileSize);
  let tileY = Math.floor((game.player.y + game.player.diam) / game.world.tileSize);
  let tile_over_val = game.world.map[tileY * game.world.cols + tileX];

  if (tile_over_val != 0 && tile_over_val != 16) {
    game.collision[tile_over_val](game.player, tileY, tileX);
  }
/////////////////////////////////////////////////////
  tileX = Math.floor(game.player.x / game.world.tileSize);
  tileY = Math.floor((game.player.y + game.player.diam) / game.world.tileSize);
  tile_over_val = game.world.map[tileY * game.world.cols + tileX];

  if (tile_over_val != 0 && tile_over_val != 16) {
    game.collision[tile_over_val](game.player, tileY, tileX);
  }
/////////////////////////////////////////////////////
  tileX = Math.floor(game.player.x / game.world.tileSize);
  tileY = Math.floor(game.player.y / game.world.tileSize);
  tile_over_val = game.world.map[tileY * game.world.cols + tileX];

  if (tile_over_val != 0 && tile_over_val != 16) {
    game.collision[tile_over_val](game.player, tileY, tileX);
  }
/////////////////////////////////////////////////////
  tileX = Math.floor((game.player.x + game.player.diam) / game.world.tileSize);
  tileY = Math.floor(game.player.y / game.world.tileSize);
  tile_over_val = game.world.map[tileY * game.world.cols + tileX];

  if (tile_over_val != 0 && tile_over_val != 16) {
    game.collision[tile_over_val](game.player, tileY, tileX);
  }

  game.player.xVel *= 0.75;
  game.player.yVel *= 0.75;

  //go to next level
  if(tileY * game.world.cols + tileX == levels[currentLevel].clearPoint) {
    currentLevel++;
    game.player.jumping = true;
    game.player.x = levels[currentLevel].startX;
    game.player.y = levels[currentLevel].startY;
    game.world.tileSize = levels[currentLevel].tileSize;
    game.player.diam = levels[currentLevel].playerDiam;
    game.world.cols = levels[currentLevel].cols;
    game.world.rows = levels[currentLevel].rows;
    game.world.map = levels[currentLevel].map;
  }

  game.animation.framesPassed++;
  game.animation.changeSprite();

  window.requestAnimationFrame(loop);
}

document.addEventListener("keydown", game.controller.keyPress)
document.addEventListener("keyup", game.controller.keyPress);

loop();
