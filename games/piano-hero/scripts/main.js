function initKeys() {
  for(let i = 0; i < tileCount; i++) {
    tiles.push(new Tile(i));
  }
}

function playSound(note) {
  // note.pause();
  note.currentTime = 0;
  note.play();
}

function restart(button) {
  document.querySelector('button').style.display = 'none';
  document.querySelector('.check-con').style.display = 'none';
  document.querySelectorAll('.slider-con').forEach(slider => slider.style.display = 'none');
  notes = [];
  tiles = [];
  tileCount = document.querySelector('#difficultySlider').value;
  speed = Number(document.querySelector('#speedSlider').value);
  botEnabled = document.querySelector('#checkbox').checked;
  score = 0;
  GAMEOVER = false;
  framesBetweenSpawns = Math.floor(45/speed);
  framesSeinceStart = 0;

  initKeys();
  loop();
}

function gameover(lane) {
  GAMEOVER = true;
  requestAnimationFrame(() => {
    ctx.fillStyle = '#fa05';
    ctx.fillRect(lane * width / tileCount, 0, width / tileCount, height - 150);
    
    ctx.fillStyle = 'black';
    ctx.fillText('GAMEOVER', width/2, 120);
    ctx.fillText(score, width/2, 65);
    
    document.querySelector('button').style.display = 'block';
    document.querySelector('.check-con').style.display = 'block';
    document.querySelectorAll('.slider-con').forEach(slider => slider.style.display = 'block');
  });
}

function loop() {
  framesSeinceStart++;
  ctx.clearRect(0, 0, width, height);
  
  if(framesSeinceStart % framesBetweenSpawns === 0) {
    notes.push(new Note(Math.floor(Math.random() * tileCount)));
  }
  
  if(framesSeinceStart % 500 === 0) {
    speed += 0.4;
    framesBetweenSpawns = Math.floor(45/speed);
  }
  
  notes.forEach((note, i) => {
    note.draw();
    note.move();
    if(note.y + note.h >= 400 && botEnabled) {
      controller.keyEvent({type: 'keydown', keyCode: keys[note.lane]});
      tiles[note.lane].pressed = false;
    }
    if(note.y > 400) gameover(note.lane);
  });
  tiles.forEach(tile => tile.draw());
  
  ctx.fillStyle = 'black';
  ctx.fillText(score, width/2, 65);
  
  if(!GAMEOVER) requestAnimationFrame(loop);
}


//setup the game
initKeys();

ctx.font = '75px VT323, mono';
ctx.textAlign = 'center';

window.addEventListener('keydown', controller.keyEvent);
window.addEventListener('keyup', controller.keyEvent);

//start the game loop
loop();
