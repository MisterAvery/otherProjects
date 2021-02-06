let ctx, balls, loop;

ctx = document.querySelector('.canvas').getContext('2d');

class ball {
  constructor(color = '#2498') {
    this.x = Math.floor(Math.random() * ctx.canvas.width);
    this.y = Math.floor(Math.random() * ctx.canvas.height);
    this.xVel = Math.ceil(Math.random() * 4 + 3);
    this.yVel = Math.ceil(Math.random() * 4 + 3);
    this.radius = 20;
    this.color = color;
  }
}

balls = [];

for(let i = 0; i < 2; i++) {
  balls.push(new ball());
}

loop = function() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  for(let ball in balls) {
    ctx.fillStyle = balls[ball].color;
    ctx.beginPath();
    ctx.arc(balls[ball].x, balls[ball].y, balls[ball].radius, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();
    
    balls[ball].x += balls[ball].xVel;
    balls[ball].y += balls[ball].yVel;
   
    for(let ball2 in balls) {
      let hit = collision(balls[ball].x, balls[ball].y, balls[ball2].radius, balls[ball2].x, balls[ball2].y, balls[ball2].radius);
  
      if(hit) {
        balls[ball].xVel *= -1;
        balls[ball].yVel *= -1;
        balls[ball2].xVel *= -1;
        balls[ball2].yVel *= -1;
      }
    }
    
    if(balls[ball].x >= ctx.canvas.width || balls[ball].x <= 0) {
      balls[ball].xVel *= -1;
    }
    
    if(balls[ball].y >= ctx.canvas.height || balls[ball].y <= 0) {
      balls[ball].yVel *= -1;
    }
  }
  
  window.requestAnimationFrame(loop);
};

loop();



function collision(circ1x, circ1y, circ1r, circ2x, circ2y, circ2r) {
  let sideBLength = Math.abs(circ1x - circ2x)
  let sideALength = Math.abs(circ1y - circ2y);
  let sideCLength = Math.sqrt((sideBLength*sideBLength) + (sideALength*sideALength));
  
  return sideCLength <= circ1r + circ2r;
}