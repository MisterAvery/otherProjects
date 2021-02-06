let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let bounds = canvas.getBoundingClientRect();

let width = canvas.width;
let height = canvas.height;
let gameSideLength = 20;
let tilePixelSideLength = Math.floor(width / gameSideLength);
let GAMESTATE = 'title';
let score = 0;
let highScore = 0;
  
let apple = new Apple();
apple.pickLocation();

let snake = new Snake();

window.addEventListener('click', function(event) {mouseClicked(event);});
window.addEventListener('keydown', function(event) {snake.changeDir(event)});

title();


function title() {
  ctx.clearRect(0, 0, width, height);
  ctx.textAlign = 'center';
  
  text('Lets Play', '50px', '#444', 100);
  text('SNAKE', 'bold 75px', 'dodgerblue', 170);
  text('Ready?', '30px', '#444', 250);
  text(`Highscore: ${highScore}`, 'bold 30px', '#444', 287);
  
  ctx.fillStyle = 'dodgerblue';
  ctx.fillRect(width/2 - 75, 340, 150, 60);
  text('Lets Go!', '30px', '#e5e5e5', 380);
  
  text('(Click Me ^)', '18px', '#f20a', 430);
}
      
function loop() {
  ctx.clearRect(0, 0, width, height);
  
  ctx.lineWidth = 2;
  
  ctx.fillStyle = '#f20a';
  apple.show();
  
  
  ctx.fillStyle = 'dodgerblue';
  ctx.strokeStyle = '#e5e5e5';
  snake.move();
  snake.eat();

  for(let i = snake.tail.length - 1; i >= 0; i--) {
    let seg = snake.tail[i];
    
    ctx.beginPath();
    ctx.rect(seg.x, seg.y, tilePixelSideLength, tilePixelSideLength);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    
  if(i === 0) {
    seg.x = snake.x;
    seg.y = snake.y;
  } else {
    seg.x = snake.tail[i - 1].x;
    seg.y = snake.tail[i - 1].y;
    
    if(seg.x == snake.x && seg.y == snake.y) {
      GAMESTATE = 'over';
    }
  }
  
    if(seg.x == apple.x && seg.y == apple.y) apple.pickLocation();
  }
  
  snake.show();
  text(`Score:${score}`, 'bold 25px', '#444', 30, 15);
  text(`High Score:${highScore}`, 'bold 25px', '#444', 30, width - 210);
  
  if(score >= highScore) highScore = score;
  
  setTimeout(function() {
    if(GAMESTATE == 'running') {
      window.requestAnimationFrame(loop);
    } else {
      gameIsOver();
    }
  }, 1000/10);
}

function gameIsOver() {
  ctx.fillStyle = '#e5e5e5aa';
  ctx.fillRect(0, 0, width, height);
  
  ctx.textAlign = 'center';
  
  text('GAMEOVER', 'bold 75px', '#444', 100);
  text('Your Score:', '30px', '#444', 160);
  text(score, 'bold 50px', 'dodgerblue', 220);
  text('Great Job! Wanna Play Again?', '30px', '#444', 280);


  ctx.fillStyle = 'dodgerblue';
  ctx.fillRect(width/2 - 75, 340, 150, 60);
  text('Again!', '30px', '#e5e5e5', 380);
  
  ctx.fillStyle = '#f20a';
  ctx.fillRect(width/2 - 75, 420, 150, 60);
  text('To Title', '30px', '#e5e5e5', 460);
}

function text(message, fontSize, color, y, x = width/2) {
  ctx.fillStyle = color;
  
  ctx.font = `${fontSize} mono`;
  ctx.fillText(message, x, y);
}

function mouseClicked(event) {
  let mouseX = Math.round(event.clientX - bounds.left);
  let mouseY = Math.round(event.clientY - bounds.top);

  if(GAMESTATE == 'over' || GAMESTATE == 'title') {
    if(mouseX >= width/2 - 55 && mouseX <= width/2 + 95 && mouseY >= 360 && mouseY <= 420) {
      GAMESTATE = 'running';
      score = 0;
      ctx.textAlign = 'start';
      
      apple = new Apple();
      apple.pickLocation();
      snake = new Snake(5, 5);
      
      loop();
    } else if(GAMESTATE == 'over' && mouseX >= width/2 - 55 && mouseX <= width/2 + 95 && mouseY >= 440 && mouseY <= 500) {
      GAMESTATE = 'title';
      title();
    }
  }
}