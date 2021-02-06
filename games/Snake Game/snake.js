class Snake {
  constructor() {
    this.x = 5 * scale;
    this.y = 5 * scale;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.tail = [];
  }
  
  draw() {
    ctx.fillStyle = '#f1f1ff';
    ctx.fillRect(this.x, this.y , scale, scale);
    
    for(let i in this.tail) {
      ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
    }
  }
  
  move() {
    // move the tail
    for(let i = this.tail.length - 1; i > -1; i--) {
      if(i === 0) {
        this.tail[i].x = this.x;
        this.tail[i].y = this.y;
      } else {
        this.tail[i].x = this.tail[i - 1].x;
        this.tail[i].y = this.tail[i - 1].y;
      }
    }
    
    //move head
    this.x += this.xSpeed * scale;
    this.y += this.ySpeed * scale;
  }
  
  eat() {
    for(let i = 0; i < 10; i++) {
      this.tail.push({x: this.x + this.xSpeed, y: this.y + this.ySpeed});
    }
    score++;
  }
}