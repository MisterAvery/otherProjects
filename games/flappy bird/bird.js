let img = document.getElementById('bird');

class Bird {
  constructor() {
    this.x = 50;
    this.y = 100;
    this.diam = 55;
    this.fallSpeed = 2;
  }
  
  draw() {
    ctx.drawImage(img, this.x, this.y, this.diam, this.diam);
  }
  
  move() {
    this.y += this.fallSpeed;
    this.fallSpeed += 3;
  }
  
  jump() {
    this.fallSpeed = -20;
  }
}