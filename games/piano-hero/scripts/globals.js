const canvas = document.querySelector('canvas'),
      ctx = canvas.getContext('2d');

const {width, height} = canvas,
      colors = ['#004FFF', '#00FF30', '#FFB000', '#FF4E00', '#fe3'];
      
let GAMEOVER = false,
    botEnabled = false,
    notes = [],
    tiles = [],
    tileCount = 3,
    speed = 2,
    framesBetweenSpawns = Math.floor(45/speed),
    framesSeinceStart = 0,
    score = 0;
    
const C = new Audio('./sound/C.wav'),
      D = new Audio('./sound/D.wav'),
      E = new Audio('./sound/E.wav'),
      F = new Audio('./sound/F.wav'),
      G = new Audio('./sound/G.wav');

class Tile {
  constructor(lane) {
    this.lane = lane;
    this.h = 150;
    this.w = width / tileCount;
    this.x = lane * this.w;
    this.y = 400;
    this.pressed = false;
  }
  
  draw() {
    ctx.fillStyle = this.pressed ? '#c6c6c6' : '#fff';
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 2;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.strokeRect(this.x, this.y, this.w, this.h);
    
    if(this.lane !== 0 && this.lane != 3) {
      ctx.fillStyle = 'black';
      ctx.fillRect(this.x - 12, this.y, 24, this.h - 55);
    }
  }
  
  press() {
    for(let i = notes.length - 1; i >= 0; i--) {
      let note = notes[i];
      if(note.lane == this.lane && note.y + note.h >= this.y && note.y <= this.y) {
        score++;
        notes.splice(i, 1);
      } else if(i === 0) gameover(this.lane);
    }
  }
}

class Note {
  constructor(lane) {
    this.lane = lane;
    this.w = width / tileCount - 16;
    this.h = 45;
    this.x = lane * (width / tileCount) + (width / tileCount - this.w) / 2;
    this.y = -this.h;
  }
  
  draw() {
    ctx.fillStyle = colors[this.lane];
    ctx.strokeStyle = '#f7f7f7';
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.strokeRect(this.x, this.y, this.w, this.h);
  }
  
  move() {
    this.y += speed;
  }
}
