//globals
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const pumpkinImage = new Image();
pumpkinImage.src = './pumpkins.svg';
const frameW = 3333/5;
const frameH = 1774/3;

const width = canvas.width;
const height = canvas.height;
let particleCount = 10;

//particle
let particles = [];
class Particle {
  constructor() {
    this.resetProperties();
  }
  
  resetProperties() {
    this.x = Math.floor(Math.random() * width);
    this.y = -200;
    this.size = Math.floor(Math.random() * 60 + 40);
    this.fallSpeed = Math.floor(Math.random() * 8 + 3);
    this.frameX = Math.floor(Math.random() * 4);
    this.frameY = Math.floor(Math.random() * 2 + 1);
    this.angle = 0;
    this.rotate = Math.random() < 0.5 ? -1 : 1;
  }
  
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle * Math.PI / 365);
    
    ctx.drawImage(pumpkinImage, this.frameX * frameW, this.frameY * frameH, frameW, frameH, 0, 0, this.size, this.size * (frameH / frameW));
    
    ctx.translate(-this.x, -this.y);
    ctx.restore();
  }
  
  update() {
    this.y += this.fallSpeed;
    this.angle += this.rotate;
  }
}
//helper functions
function initalizeParticles() {
  for(let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function handleParticles() {
  for(let p of particles) {
    p.draw();
    p.update();
    
    if(p.y >= height + 110) p.resetProperties();
  }
}

//game loop
initalizeParticles();
function loop() {
  ctx.clearRect(0, 0, width, height);
  
  handleParticles();
  
  requestAnimationFrame(loop);
}
loop();