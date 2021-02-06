class Toby {
  constructor() {
    this.diam = 40;
    this.x = 100;
    this.y = canvas.height - this.diam;
    this.xVel = 0;
    this.yVel = 0;
    this.jumping = false;
  }
  
  draw() {
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 4;
    
    ctx.fillStyle = '#fa0';
    ctx.fillRect(this.x, this.y, this.diam, this.diam);
  }
  
  move() {
    this.x += this.xVel;
    this.y += this.yVel;
    
    if(this.yVel < 12) {
      this.yVel += 1;
    }
    
    if(this.y > canvas.height - this.diam) {
      this.yVel = 0;
      this.y = canvas.height - this.diam;
      this.jumping = false;
    }
    
    
    //loop around
    if(this.x >= canvas.width) {
      this.x = -1 * this.diam;
    }
    
    if(this.x + this.diam + 1 <= 0) {
      this.x = canvas.width - 1;
    }
  }
  
  left() {
    this.xVel = -8;

  }
  
  right() {
    this.xVel = 8;
  }
  
  jump() {
    this.yVel = -12;
    this.jumping = true;
  }
}