let ctx, balls, loop;

ctx = document.querySelector('.canvas').getContext('2d');

class ball {
  constructor(color = '#2498') {
    this.x = Math.floor(Math.random() * ctx.canvas.width);
    this.y = Math.floor(Math.random() * ctx.canvas.height);
    this.xVel = 2;
    this.yVel = 2;
    this.radius = 20;
    this.color = color;
  }
}

balls = [];

for(let i = 0; i < 8; i++) {
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
   
    if(balls[ball].x >= ctx.canvas.width || balls[ball].x <= 0 || balls[ball].y >= ctx.canvas.height || balls[ball].y <= 0) {
      balls[ball].xVel *= -1;
      balls[ball].yVel *= -1;
    }
  }
  
  window.requestAnimationFrame(loop);
};

document.addEventListener('click', function(event) {
  let rect = ctx.canvas.getBoundingClientRect();
  let mouseX = event.clientX - rect.left;
  let mouseY = event.clientY - rect.top;
  
  if(mouseX <= ctx.canvas.width && mouseX >= 0 && mouseY <= ctx.canvas.height && mouseY >= 0) {
    for(let ball in balls) {
      let xDistance = balls[ball].x - mouseX;
      let yDistance = balls[ball].y - mouseY;
      
      balls[ball].xVel = xDistance / 20;
      balls[ball].yVel = yDistance / 20;
    }
  }
});

loop();