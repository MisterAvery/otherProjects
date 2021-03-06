const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let map = {
  tileSheet: document.querySelector('img'),
  cols: 32,
  rows: 32,
  tSize: 64,
  layers: [[
    3,1,1,3,1,1,3,3,1,1,3,1,3,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,2,2,2,2,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    2,2,2,1,2,2,2,2,2,1,1,1,1,1,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    2,2,2,2,2,1,2,2,2,2,2,1,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,3,1,2,2,1,2,2,1,2,2,2,1,2,2,3,1,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,
    3,1,3,1,2,2,2,3,1,1,2,2,2,2,3,1,1,1,2,2,2,1,1,1,1,1,1,1,1,1,1,1,
    1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,1,1,1,1,1,1,1,1,1,1,1,
    1,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,
    2,2,2,1,2,2,2,2,2,1,1,1,1,1,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,1,1,1,1,1,1,2,2,1,1,1,1,1,
    1,3,1,2,2,1,2,2,1,2,2,2,2,2,2,3,2,2,2,2,1,1,1,2,2,2,2,2,1,1,1,1,
    3,1,3,1,2,2,2,3,1,1,2,2,2,2,3,1,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,
    1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,1,2,2,2,1,1,1,1,1,2,2,2,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,1,1,1,1,1,1,1,1,1,1,2,2,2,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,1,1,1,1,1,2,2,1,1,1,2,2,2,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,1,1,1,2,2,2,2,2,2,2,2,2,2,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,1,1,2,2,2,2,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,1,1,1,2,2,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ], [
    0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,5,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,5,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,4,0,0,0,0,0,0,0,0,0,5,0,0,0,4,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,
    4,0,4,0,0,5,0,4,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,
    0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,
    0,0,0,5,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,4,0,0,0,0,0,0,0,0,0,5,0,0,0,4,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,
    4,0,4,0,0,5,0,4,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,
    0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,5,0,0,0,0,5,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,5,0,0,0,0,0,5,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,5,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
  ]],
  
  getTile: function(layer, col, row) {
    return this.layers[layer][row * this.cols + col];
  },
  
  drawLayer: function(layer, camera) {
      let startCol = Math.floor(camera.x / this.tSize);
      let endCol = startCol + (camera.width / map.tSize) + 1;
      let startRow = Math.floor(camera.y / this.tSize);
      let endRow = startRow + (camera.height / this.tSize) + 1;
      let offsetX = -camera.x + startCol * this.tSize;
      let offsetY = -camera.y + startRow * this.tSize;

    for(let r = startRow; r <= endRow; r++) {
      for(let c = startCol; c <= endCol; c++) {
        let tile = this.getTile(layer, c, r);
        let tileX = Math.round((c - startCol) * this.tSize + offsetX);
        let tileY = Math.round((r - startRow) * this.tSize + offsetY);

        if(tile > 0) ctx.drawImage(this.tileSheet, (tile - 1) * this.tSize, 0, this.tSize, this.tSize, tileX, tileY, this.tSize, this.tSize);
      }
    }
  }
};

let camera = {
  x: 0,
  y: 0,
  xVel: 0,
  yVel: 0,
  width: 550,
  height: 550,
  
  changeDir: function(event) {
    let code = event.keyCode;
    let modifier = (code == 37 || code == 38)? -1:1;
    let type = event.type == 'keydown'? 7:0;
    
    if(code == 37 || code == 39) this.xVel = type * modifier;
    else if(code == 38 || code == 40) this.yVel = type * modifier;
  },
  
  move: function() {
    let nextX = this.x + this.xVel;
    let nextY = this.y + this.yVel;
    
    if(nextX < 0 || nextX > map.cols * map.tSize - this.width || nextY < 0 || nextY > map.rows * map.tSize - this.height) return;
    
    this.x += this.xVel;
    this.y += this.yVel;
  }
};

canvas.width = camera.width;
canvas.height = camera.height;

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  camera.move();

  map.drawLayer(0, camera);
  map.drawLayer(1, camera);
  
  window.requestAnimationFrame(loop);
}

let functionIsRunning = false;
window.addEventListener('keydown', () => camera.changeDir(event));
window.addEventListener('keyup', () => camera.changeDir(event));
window.onblur = () => {
  camera.xVel = 0;
  camera.yVel = 0;
};

loop();