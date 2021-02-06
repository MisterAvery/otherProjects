class Snake {
  constructor() {
    this.x = Math.floor(Math.random() * gameSideLength) * tilePixelSideLength;
    this.y = Math.floor(Math.random() * gameSideLength) * tilePixelSideLength;
    this.dir = {x: 0, y: 0};
    this.lastMove;
    this.tail = [];
  }
  
  show() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, tilePixelSideLength, tilePixelSideLength);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }
  
  changeDir(event) {
    let newDir = this.dir;
    
    switch(event.keyCode) {
      case 37:
        newDir.x = -1 * tilePixelSideLength;
        newDir.y = 0;
        break;
      case 38:
        newDir.y = -1 * tilePixelSideLength;
        newDir.x = 0;
        break;
      case 39:
        newDir.x = tilePixelSideLength;
        newDir.y = 0;
        break;
      case 40:
        newDir.y = tilePixelSideLength;
        newDir.x = 0;
        break;
    }
      
    if(newDir != this.dir) {
      this.dir = newDir;
    }
  }
    
  move() {
    this.x += this.dir.x;
    this.y += this.dir.y;
        
    if(this.x + tilePixelSideLength > width || this.x < 0 || this.y + tilePixelSideLength > height || this.y < 0) GAMESTATE = 'over';
  }
        
  eat() {
    if(this.x == apple.x && this.y == apple.y) {
    // for(let i = 0; i < 15; i++) {//uncomment for cheats
        this.tail.push({x: this.x + this.dir.x * tilePixelSideLength, y: this.y + this.dir.y * tilePixelSideLength});
           
          score++;
    // }
        apple.pickLocation();
    }
  }
}