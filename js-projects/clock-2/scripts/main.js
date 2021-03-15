//initalize the array of balls
let balls = [];
for(let i = 0; i < 120; i++) {
  balls.push(new Ball());
}

//start the game loop
loop();


//////////////////////////////FUNCTIONS//////////////////////////////
function loop() {
  ctx.clearRect(0, 0, width, height);
  handleBalls();

  requestAnimationFrame(loop);
}

function handleBalls() {
  balls.forEach((ball, i) => {
    ball.move();
    
    if(ball.y + 1 >= height) {
      ball.vel.y *= -1;
      ball.y = height - 1.1;
    } else if(ball.y - 1 <= 0) {
      ball.vel.y *= -1;
      ball.y = 1.1;
    }
    
    if(ball.x + 1 >= width) {
      ball.vel.x *= -1;
      ball.x = width - 0.9;
    } else if(ball.x - 1 <= 0) {
      ball.vel.x *= -1;
      ball.x = 1.1;
    }
    
    if(scribbles) {
      balls.forEach((otherBall, j) => {
        if(j <= i) return;
        if(checkLine(ball, otherBall)) {
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 5;
          
          ctx.beginPath();
          ctx.moveTo(ball.x, ball.y);
          ctx.lineTo(otherBall.x, otherBall.y);
          ctx.stroke();
          ctx.closePath();
        }
      });
    }
  });
}

function checkLine(b1, b2) {
  let dx = b2.x - b1.x,
      dy = b2.y - b1.y;
      hypotenuse = Math.sqrt(dx * dx + dy * dy);
      
  return hypotenuse <= 120;
}