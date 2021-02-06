class Bubble {
  constructor() {
    this.x = Math.floor(Math.random() * width);
    this.y = height + 100;
    this.r = 40;
    this.speed = Math.floor(Math.random() * 3 + 3);
  }
  
  draw() {
    ctx.fillStyle = '#e8e8e8';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
  
  update() {
    this.y -= this.speed;
  }
}