let cacti = [],
    birds = [];
    

function Sprite(PATH, colNum, w, h) {
  let img = document.createElement('IMG');
  img.src = PATH;
  
  return {
    img: img,
    colW: w / colNum,
    w: w,
    h: h
  };
}

function handleEnemys(arr, color) {
  for(let i = arr.length - 1; i > 0; i--) {
    const obj = arr[i];
    obj.update();
    obj.show(color);
    
    if(obj.x + obj.w < 0) arr.splice(i, 1);
    for(let box of dino.collisionBoxes) {
      if(rectCollision(box, obj.collisionBoxes[0])) GAMEOVER = true;
      if(rectCollision(box, obj.collisionBoxes[1])) GAMEOVER = true;
    }
  }
}

class Cactus {
  constructor() {
    this.size = Math.floor(Math.random() * 2 + 1);
    this.w = 34 * this.size;
    this.h = 50;
    this.x = width;
    this.y = height - this.h;
    this.img = Sprite('./assets/cactus.png', 1, this.w, 70);
    this.frame = 0;
  }
  
  updateCollisionBoxes() {
    this.collisionBoxes = [
      {
        x: this.x + 10,
        y: this.y,
        w: this.w - 20,
        h: this.h
      },
    
      {
        x: this.x,
        y: this.y + 14,
        w: this.w,
        h: this.h - 12
      }
    ];
  }
  
  show(color) {
    ctx.drawImage(this.img.img, this.img.colW * this.frame, 0, this.img.colW, this.img.h, this.x, this.y, this.w, this.h);
  }
  
  update() {
    this.x -= objSpeed;
    if(timeSeinceStart % 15 === 0 && this.frame > -1) this.frame = (this.frame + 1) % (Math.floor(this.img.w / this.img.colW));
    this.updateCollisionBoxes();
  }
}

class Bird extends Cactus {
  constructor() {
    super(Cactus);
    this.w = this.h = 40;
    this.y = height - Math.floor(Math.random() * 3 + 1) * 45;
    this.img = Sprite('./assets/bird.png', 2, 212, 92);
    this.frame = 0;
  }
}