class Apple {
  constructor() {
    this.x;
    this.y;
  }
  
  pickLocation() {
    this.x = Math.floor(Math.random() * gameSideLength) * tilePixelSideLength;
    this.y = Math.floor(Math.random() * gameSideLength) * tilePixelSideLength;
  }
  
  show() {
    ctx.fillRect(this.x, this.y, tilePixelSideLength, tilePixelSideLength);
  }
}