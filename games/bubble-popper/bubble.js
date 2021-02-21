const sound = {
  pop1: document.createElement('audio'),
  pop2: document.createElement('audio'),
}

sound.pop1.src = './assets/pop1.mp3';
sound.pop2.src = './assets/pop2.mp3';

class Bubble {
  constructor() {
    this.sound = Math.random() <= 0.5 ? 'pop1' : 'pop2';
    this.x = Math.floor(Math.random() * width);
    this.y = height + 100;
    this.r = 40;
    this.speed = Math.floor(Math.random() * 3 + 3);
    this.bubbleImg = new Image();
    this.bubbleImg.src = './assets/bubble.png'
    this.imageScale = 0.63;
  }

  draw() {
    // ctx.fillStyle = '#e8e8e8';
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    // ctx.fill();
    // ctx.closePath();

    ctx.drawImage(this.bubbleImg, this.x - 40, this.y - 40, this.bubbleImg.width * this.imageScale, this.bubbleImg.height * this.imageScale);
  }

  update() {
    this.y -= this.speed;
  }
}
