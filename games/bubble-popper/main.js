const player = new Player();
let bubbles = [];

canvas.addEventListener('mousedown', e => {
  mouse.x = Math.floor(e.x - clientRect.x);
  mouse.y = Math.floor(e.y - clientRect.y);
  mouse.click = true;
});

canvas.addEventListener('mouseup', e => mouse.click = false);

//functions
function handlePlayer() {
  player.draw();
  player.update();
}

function handleBubbles() {
  for(let i = bubbles.length - 1; i > 0; i--) {
    const bubble = bubbles[i];
    
    bubble.draw();
    bubble.update();
    
    if(bubble.y < -100) bubbles.splice(i, 1);
    if(circleCollision(bubble, player)) {
      bubbles.splice(i, 1);
      score += 10;
    }
  }
}

function circleCollision(c1, c2) {
  let dx = c2.x - c1.x;
  let dy = c2.y - c1.y;
  let diagonal = Math.sqrt(dx * dx + dy * dy);
  
  return diagonal < c1.r + c2.r;
}

function loop() {
  ctx.clearRect(0, 0, width, height);
  frameCount++;
  
  ctx.fillStyle = '#444';
  ctx.fillText(`Score: ${score}`, 10, 45);
  
  if(frameCount % 45 === 0) bubbles.push(new Bubble());
  
  handlePlayer();
  handleBubbles();
  
  requestAnimationFrame(loop);
}

loop();