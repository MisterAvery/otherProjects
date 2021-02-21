let player = new Player();
//functions
function handleEnemys() {
  enemys.forEach(enemy => {
    enemy.update();
    enemy.draw();

    if(enemy.x <= -enemy.val) enemy.updateProperties();
    if(circleCollision(player, enemy)) {
      gameoverSound.play();
      gameState = 'title';
      setTimeout(() => title(score), 500);
    }
  });
}

function handlePlayer() {
  player.update();
  player.draw();
}

function handleBubbles() {
  bubbles.forEach((bubble, i) => {
    bubble.update();
    bubble.draw();

    if(bubble.y < -100) bubbles.splice(i, 1);
    if(circleCollision(bubble, player)) {
      sound[bubble.sound].play();
      bubbles.splice(i, 1);
      score += 10;
    }
  });
}

function circleCollision(c1, c2) {
  let dx = c2.x - c1.x;
  let dy = c2.y - c1.y;
  let diagonal = Math.sqrt(dx * dx + dy * dy);

  return diagonal <= c1.r + c2.r;
}

function title(score) {
  ctx.textAlign = 'center';

  ctx.fillStyle = '#e8e8e8c9';
  ctx.fillRect(width/2 - 250, 0, 500, height);
  text('Lets Play', 'bold 50px', '#444', 70);
  text('BUBBLE POPPER', 'bold 55px', 'dodgerblue', 140);
  if(isNaN(score)) {
    text('Ready?', 'bold 30px', '#444', 190);
    text('Click the Button', 'bold 30px', '#444', 230);
  } else {
    text(`Your Score: ${score}`, 'bold 40px', 'limegreen', 220);
  }

  text('Click or Tap', '20px', 'red', 270);
  text('to Collect Bubbles', '20px', 'red', 295)
  text('and Avoid the Rocks', '20px', 'red', 320)

  ctx.fillStyle = 'dodgerblue';
  ctx.fillRect(width/2 - 85, 340, 170, 60);
  text('Lets Go!', '30px', '#e5e5e5', 380);

  text('(Click Me ^)', '18px', '#f20', 422);
}

function loop() {
  ctx.clearRect(0, 0, width, height);
  frameCount++;

  ctx.textAlign = 'left';
  text(`Score: ${score}`, 'bold 40px', '#444', 45, 10);

  if(frameCount % 45 === 0) bubbles.push(new Bubble());

  handlePlayer();
  handleEnemys();
  handleBubbles();

  if(gameState == 'running') requestAnimationFrame(loop);
}

title();
