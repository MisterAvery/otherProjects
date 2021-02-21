const playerLeft = new Image();
playerLeft.src = './assets/fish-left.png';
const playerRight = new Image();
playerRight.src = './assets/fish-right.png';

//player
class Player {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.r = 40;
    this.a = 0;
    this.image = playerLeft;
    this.frameW = 1992 / 4;
    this.frameH = 981 / 3;
    this.imageScale = 0.23;
    this.frameX = 0;
    this.frameY = 0;
    this.frame = 0;
  }

  update() {
    let dx = this.x - mouse.x;
    let dy = this.y - mouse.y;
    let hypotenuse = Math.sqrt(dx * dx + dy * dy);

    let sinOfA = dy / hypotenuse;
    this.a = this.image == playerLeft ? Math.asin(sinOfA) : -Math.asin(sinOfA);

    if(mouse.x != this.x) this.x -= dx / 14;
    if(mouse.y != this.y) this.y -= dy / 14;
  }

  draw() {
    if(mouse.click) {
      this.image = mouse.x < this.x ? playerLeft : playerRight;

      ctx.strokeStyle = 'yellow';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
      ctx.closePath();
    }

    // ctx.fillStyle = 'dodgerblue';
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    // ctx.fill();
    // ctx.closePath();

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.a);
    ctx.drawImage(this.image, this.frameX, this.frameY, this.frameW, this.frameH,  -55, -40, this.frameW * this.imageScale, this.frameH * this.imageScale);
    ctx.translate(-this.x, -this.y);
    ctx.restore();
  }
}
