const rock = new Image();
rock.src = './assets/rock.png';

class Enemy {
  constructor() {
    this.updateProperties();
  }

  updateProperties() {
    this.val = Math.floor(Math.random() * 500)
    this.x = width + this.val;
    this.y = Math.floor(Math.random() * height);
    this.r = Math.floor(Math.random() * 30 + 20);
    this.speed = Math.floor(Math.random() * 5 + 2);
    this.imageScale = this.r * 2;
    this.a = 0;
  }

  update() {
    this.x -= this.speed;

    this.a += 0.05;
    if(this.a * 180 / Math.PI >= 360) this.a = 0;
  }

  draw() {
    // ctx.fillStyle = 'red';
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    // ctx.fill();
    // ctx.closePath();

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.a);
    ctx.drawImage(rock, -this.r, -this.r, this.imageScale, this.imageScale);
    ctx.translate(-this.x, -this.y);
    ctx.restore();
  }
}
