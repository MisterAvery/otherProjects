class Ball {
  constructor() {
    this.x = Math.floor(Math.random() * width);
    this.y =  Math.floor(Math.random() * height);

    this.multiplierX = Math.random() <= 0.5 ? 1 : -1;
    this.multiplierY = Math.random() <= 0.5 ? 1 : -1;
    this.vel = {
      x: (Math.random() * 0.2 + 0.1) * this.multiplierX,
      y: (Math.random() * 0.2 + 0.1) * this.multiplierY
    };
  }
  
  move() {
    this.x += this.vel.x;
    this.y += this.vel.y;
  }
}