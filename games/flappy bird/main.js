const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const scoreCount = document.getElementById('scoreCounter');
const canvasBg = document.getElementById('bg');

const brd = new Bird();
let pipes = [new Pipe()];

let allowJump = true;
let score = 0;

setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height + 10);
  
  //draw the pipes
  for(let p in pipes) {
    //render and move the pipes
    pipes[p].draw();
    pipes[p].move();
    
    //remove pipes from array
    if(pipes[p].x + pipes[p].width < 0) pipes.shift();
    
    //spawn new pipes
    if(pipes[p].x < 240 && pipes[p].spawnedAnother === false) {
      pipes.push(new Pipe());
      pipes[p].spawnedAnother = true;
    }
    
    //add to score when pipe is passed
    if(pipes[p].x + pipes[p].width <= brd.x && pipes[p].counted === false) {
      score++;
      pipes[p].counted = true;
    }
    
    //pipe hit detection
    if(brd.x + brd.diam >= pipes[p].x && brd.x <= pipes[p].x + pipes[p].width && (brd.y + brd.diam - 10 >= pipes[p].gap + pipes[p].top || brd.y + 10 <= pipes[p].top)) gameOver();
    
    //canvas edge hit detection
    if(brd.y <= 0 || brd.y + brd.diam >= canvas.height) gameOver();
  }
  
  //update score counter
  scoreCount.innerHTML = 'Score: ' + score;
  
  //render the bird
  brd.draw();
  brd.move();
  
  //listen for space being pressed
  document.addEventListener('keydown', press);
}, 40);

function press(e) {
  //handle key input
  if(e.code == 'Space' && allowJump) brd.jump();
}

function gameOver() {
  //detect when the game is over
  allowJump = false;
  
  for(let p in pipes) pipes[p].speed = 0;
}