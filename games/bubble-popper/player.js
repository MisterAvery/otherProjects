//player
class Player {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.r = 50;
    this.a = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.frame = 0;
    this.frameW = 1992 / 4;
    this.frameH = 981 / 3;
  }
  
  update() {
    let dx = this.x - mouse.x;
    let dy = this.y - mouse.y;
    
    if(mouse.x != this.x) this.x -= dx / 20;
    if(mouse.y != this.y) this.y -= dy / 20;
  }
  
  draw() {
    if(mouse.click) {
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
      ctx.closePath();
    }
    
    ctx.fillStyle = 'dodgerblue';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}