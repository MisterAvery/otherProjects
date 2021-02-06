let btm = document.getElementById('bottom');
let tp = document.getElementById('top');

class Pipe {
  constructor() {
    this.x = canvas.width;
    this.speed = 11;
    this.gap = 150;
    this.width = 95;
    this.top = 100 + Math.floor(Math.random() * (canvas.height - 275));
    this.spawnedAnother = false;
    this.counted = false;
  }
  
  draw() {
    let gradient = ctx.createLinearGradient(this.x, 0, this.x + this.width, 0);
    gradient.addColorStop(0, '#8e8');
    gradient.addColorStop(1, '#44bd32');
    
    ctx.fillStyle = gradient;
    
    ctx.shadowColor = '#222';
    ctx.shadowBlur = 5;

    ctx.fillRect(this.x, 0, this.width, this.top);
    ctx.fillRect(this.x, this.top + this.gap, this.width, canvas.height);
    
    //pipe tip
    ctx.fillRect(this.x - 10, this.top - 45, this.width + 20, 45);
    ctx.fillRect(this.x - 10, this.top + this.gap, this.width + 20, 45);
  }
  
  move() {
    this.x -= this.speed;
  }
}