let ctx, game, loop;

ctx = document.querySelector('#canvas').getContext('2d');

class Bullet {
  constructor(x, y, xVel, yVel, player) {
    this.x = x;
    this.y = y;
    this.xVel = xVel + 10;
    this.yVel = yVel;
    this.shooter = player;
  }

  draw() {
    ctx.fillStyle = '#eee';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  move() {
    this.x += this.xVel;
    this.y += this.yVel;
  }
}

class Barrier {
  constructor(x, y, w, h, bg, border) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.bg = bg;
    this.border = border;
  }

  draw() {
    ctx.fillStyle = this.bg;
    ctx.strokeStyle = this.border;
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }
}

game = {
  gameover: false,
  bullets: [],
  barriers: [
    new Barrier(100, 100, 130, 130, '#f44236', '#eee'),
    new Barrier(100, window.innerHeight - 230, 130, 130, '#f44236', '#eee'),
    new Barrier(window.innerWidth - 230, window.innerHeight - 230, 130, 130, '#5fd1f7', '#eee'),
    new Barrier(window.innerWidth - 230, 100, 130, 130, '#5fd1f7', '#eee'),
    new Barrier(window.innerWidth/2 - 140, window.innerHeight/2 - 100, 280, 200, '#338be3', 'transparent')
  ],

  player1: {
    x: 120,
    y: window.innerHeight/2,
    yVel: 0,
    xVel: 0,
    oldX: this.x,
    oldY: this.y,
    radius: 25,
    up: false,
    left: false,
    right: false,
    down: false,
    bg: '#f44236',
    border: '#eee',
    hp: 5,
    lastKeyPress: 'up'
  },
  
  player2: {
    x: window.innerWidth - 120,
    y: window.innerHeight/2,
    oldX: this.x,
    oldY: this.y,
    yVel: 0,
    xVel: 0,
    radius: 25,
    up: false,
    left: false,
    right: false,
    down: false,
    bg: '#5fd1f7',
    border: '#eee',
    hp: 5,
    lastKeyPress: 'up'
  },

  spawnBullet: function(player) {
    let xVel = 0;
    let yVel = 0;

    if(player.lastKeyPress == 'right') {
      xVel = 5;
    }
    if(player.lastKeyPress == 'left') {
      xVel = -5;
    }
    if(player.lastKeyPress == 'down') {
      yVel = 5;
    }
    if(player.lastKeyPress == 'up') {
      yVel = -5;
    }

    game.bullets.push(new Bullet(player.x, player.y, xVel, yVel, player));
  },
  
  keyPress: function(event) {
    let keyState = (event.type == 'keydown')? true:false;
    
    switch(event.keyCode) {
      //p2 controlls
      case 37:
        game.player2.left = keyState;
        if(keyState) {
          game.player2.lastKeyPress = 'left';
        }
        break;
      case 38:
        game.player2.up = keyState;
        if(keyState) {
          game.player2.lastKeyPress = 'up';
        }
        break;
      case 39:
        game.player2.right = keyState;
        if(keyState) {
          game.player2.lastKeyPress = 'right';
        }
        break;
      case 40:
        game.player2.down = keyState;
        if(keyState) {
          game.player2.lastKeyPress = 'down';
        }
        break;
      case 188:
        if(keyState) {
          game.spawnBullet(game.player2);
        }
        break;

      //p1 controlls
      case 65:
        game.player1.left = keyState;
        if(keyState) {
          game.player1.lastKeyPress = 'left';
        }
        break;
      case 87:
        game.player1.up = keyState;
        if(keyState) {
          game.player1.lastKeyPress = 'up';
        }
        break;
      case 68:
        game.player1.right = keyState;
        if(keyState) {
          game.player1.lastKeyPress = 'right';
        }
        break;
      case 83:
        game.player1.down = keyState;
        if(keyState) {
          game.player1.lastKeyPress = 'down';
        }
        break;
      case 49:
        if(keyState) {
          game.spawnBullet(game.player1);
        }
        break;
    }
  }
};

loop = function() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  for(let i = 1; i <= 2; i++) {

    //bullet hit detection and bullet rendering
    for(let b in game.bullets) {
      if(game.bullets[b] !== 0) {
        game.bullets[b].draw();
        game.bullets[b].move();
  
        if(game.bullets[b].x <= 0 || game.bullets[b].y <= 0 || game.bullets[b].x >= ctx.canvas.width || game.bullets[b].y >= ctx.canvas.height) {
          game.bullets[b] = 0;
        }
  
        if(Math.sqrt((game['player' + i].x - game.bullets[b].x) * (game['player' + i].x - game.bullets[b].x) + (game['player' + i].y - game.bullets[b].y) * (game['player' + i].y - game.bullets[b].y)) <= game['player' + i].radius + 4 && game['player' + i] != game.bullets[b].shooter) {
          game['player' + i].hp--;
          document.querySelector('.p' + i).innerHTML = 'Player' + i + ' HP: ' + game['player' + i].hp;
          game.bullets[b] = 0;
        }
      }
    }

    //barrier drawing and hit detection
    for(let b in game.barriers) {
      game.barriers[b].draw();

      if(game['player' + i].xVel > 0 && game['player' + i].x >= game.barriers[b].x && game['player' + i].oldX <= game.barriers[b].x && game['player' + i].y >= game.barriers[b].y && game['player' + i].y <= game.barriers[b].y + game.barriers[b].h) {
        game['player' + i].xVel = 0;
        game['player' + i].x = game.barriers[b].x - 0.1;
      } else if(game['player' + i].xVel < 0 && game['player' + i].x <= game.barriers[b].x + game.barriers[b].w && game['player' + i].oldX >= game.barriers[b].x + game.barriers[b].w && game['player' + i].y >= game.barriers[b].y && game['player' + i].y <= game.barriers[b].y + game.barriers[b].h) {
        game['player' + i].xVel = 0;
        game['player' + i].x = game.barriers[b].x + game.barriers[b].w + 0.1;
      } else if(game['player' + i].yVel > 0 && game['player' + i].y >= game.barriers[b].y && game['player' + i].oldY <= game.barriers[b].y && game['player' + i].x >= game.barriers[b].x && game['player' + i].x <= game.barriers[b].x + game.barriers[b].w) {
        game['player' + i].yVel = 0;
        game['player' + i].y = game.barriers[b].y - 0.1;
      } else if(game['player' + i].yVel < 0 && game['player' + i].y <= game.barriers[b].y + game.barriers[b].h && game['player' + i].oldY >= game.barriers[b].y + game.barriers[b].h && game['player' + i].x >= game.barriers[b].x && game['player' + i].x <= game.barriers[b].x + game.barriers[b].w) {
        game['player' + i].yVel = 0;
        game['player' + i].y = game.barriers[b].y + game.barriers[b].h + 0.1;
      }
    }

    //draw players
    ctx.fillStyle = game['player' + i].bg;
    ctx.strokeStyle = game['player' + i].border;
    
    ctx.beginPath();
    ctx.arc(game['player' + i].x, game['player' + i].y, game['player' + i].radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    //draw the gun
    if(game['player' + i].lastKeyPress == 'right') {
      ctx.fillStyle = '#eee';
      ctx.fillRect(game['player' + i].x + 3, game['player' + i].y - 5.5, 33, 11);
    }
    if(game['player' + i].lastKeyPress == 'left') {
      ctx.fillStyle = '#eee';
      ctx.fillRect(game['player' + i].x - 33, game['player' + i].y - 5.5, 33, 11);
    }
    if(game['player' + i].lastKeyPress == 'down') {
      ctx.fillStyle = '#eee';
      ctx.fillRect(game['player' + i].x - 5.5, game['player' + i].y + 3, 11, 33);
    }
    if(game['player' + i].lastKeyPress == 'up') {
      ctx.fillStyle = '#eee';
      ctx.fillRect(game['player' + i].x - 5.5, game['player' + i].y - 33, 11, 33);
    }

    //player velocity setting
    if(game['player' + i].left) {
      game['player' + i].xVel += -1.2;
    }
    if(game['player' + i].right) {
      game['player' + i].xVel += 1.2;
    }
    if(game['player' + i].up) {
      game['player' + i].yVel += -1.2;
    }
    if(game['player' + i].down) {
      game['player' + i].yVel += 1.2;
    }

    //canvas hit detection
    if(game['player' + i].x >= ctx.canvas.width) {
      game['player' + i].xVel = 0;
      game['player' + i].x = ctx.canvas.width - 0.1;
    }

    if(game['player' + i].x <= 0) {
      game['player' + i].xVel = 0;
      game['player' + i].x = 0.1;
    }

    if(game['player' + i].y >= ctx.canvas.height) {
      game['player' + i].yVel = 0;
      game['player' + i].y = ctx.canvas.height - 0.1;
    }

    if(game['player' + i].y <= 0) {
      game['player' + i].yVel = 0;
      game['player' + i].y = 0.1;
    }

    game['player' + i].oldX = game['player' + i].x;
    game['player' + i].oldY = game['player' + i].y;

    //moving players
    game['player' + i].x += game['player' + i].xVel;
    game['player' + i].y += game['player' + i].yVel;

    //slow the players down
    game['player' + i].xVel *= 0.8;
    game['player' + i].yVel *= 0.8;

    //detect player death
    if(game['player' + i].hp <= 0) {game.gameover = true}
  }
  
  if(!game.gameover) {
    window.requestAnimationFrame(loop);
  } else {
    console.log('gameover');
  }
};

document.addEventListener('keydown', game.keyPress);
document.addEventListener('keyup', game.keyPress);

loop();