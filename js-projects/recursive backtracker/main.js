let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let scale = 30;

let rows = Math.floor(canvas.height / scale);
let cols = Math.floor(canvas.width / scale);
let spots = [];
let visitedSpots = [];



for(let row = 0; row < rows; row++) {
  for(let col = 0; col < cols; col++) {
    spots.push(new spot(col, row));
  }
}

let current = spots[0];
let next;



function loop() {
  for(let index in spots) {
    spots[index].show();
  }
  
  current.visited = true;
  current.highlight();
  next = current.pickNext();
  if(next) {
    next.visited = true;
    visitedSpots.push(current);

    if(current.x - next.x == -1) {
      current.walls[1] = false;
      next.walls[3] = false;
    } else if(current.x - next.x == 1) {
      current.walls[3] = false;
      next.walls[1] = false;
    }
    
    if(current.y - next.y == -1) {
      current.walls[2] = false;
      next.walls[0] = false;
    } else if(current.y - next.y == 1) {
      current.walls[0] = false;
      next.walls[2] = false;
    }
    
    current = next;
  } else if(visitedSpots.length > 0) {
    current = visitedSpots.pop();
  }
  
  if(visitedSpots.length === 0) {console.log(spots); return;}


  window.requestAnimationFrame(loop);
}

loop();



function getIndex(x, y) {
  if(x < 0 || x > cols - 1 || y < 0 || y > rows - 1) {
    return -1;
  }
  
  return x + y * cols;
}

function spot(x, y) {
  this.x = x;
  this.y = y;
  this.visited = false;

  this.walls = [true, true, true, true];

  this.pickNext = function() {
    let possableMoves = [];
    
    let top = spots[getIndex(x, y - 1)];
    let left = spots[getIndex(x - 1, y)];
    let btm = spots[getIndex(x, y + 1)];
    let right = spots[getIndex(x + 1, y)];
    
    if(top && !top.visited) {possableMoves.push(top)}
    if(left && !left.visited) {possableMoves.push(left)}
    if(btm && !btm.visited) {possableMoves.push(btm)}
    if(right && !right.visited) {possableMoves.push(right)}
    
    
    if(possableMoves.length > 0) {
      return possableMoves[Math.floor(Math.random() * possableMoves.length)];
    }
    
    return undefined;
  };
  
  this.highlight = function() {
    let x = this.x * scale;
    let y = this.y * scale;
    
    ctx.fillStyle = "#f20";
    ctx.fillRect(x, y, scale, scale);
  };
  
  this.show = function() {
    let x = this.x * scale;
    let y = this.y * scale;
    
    ctx.strokeStyle = '#f2f2f2';
    ctx.lineWidth = 2;
  
    ctx.beginPath();
    if(this.walls[0]) {
      ctx.moveTo(x, y);
      ctx.lineTo(x + scale, y);
    }
    if(this.walls[1]){
      ctx.moveTo(x + scale, y);
      ctx.lineTo(x + scale, y + scale);
    }
    if(this.walls[2] ){
      ctx.moveTo(x + scale, y + scale);
      ctx.lineTo(x, y + scale);
    }
    if(this.walls[3]) {
      ctx.moveTo(x, y + scale);
      ctx.lineTo(x, y);
    }

    ctx.stroke();
    
    if(this.visited) {
      ctx.beginPath();
      ctx.fillStyle = "#47d";
      ctx.fillRect(x, y, scale, scale);
    }
  };
}