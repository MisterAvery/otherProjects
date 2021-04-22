const homeMenu = document.querySelector('.home'),
      settingsMenu = document.querySelector('.settings'),
      controlsMenu = document.querySelector('.controls'),
      menu = document.querySelector('.menu'),
      //switches
      switches = document.querySelectorAll('.inputBox'),
      sizeSlider = document.querySelector('#slider');

//add event listener to settings switches
switches.forEach((input, i) => input.addEventListener('change', e => preferances[i] = input.checked));
sizeSlider.addEventListener('change', e => {
  if(menu.style.display == 'none') return;
  playerSet = sizeSlider.value - 1;
  alert(`Peice Size set to ${playerSet + 1}`);
});

let position = 0;//keep track of menu position

//fuctions for when game ends and starts
function startGame() {
  clickSound.play();
  setTimeout(() => {
    menu.style.display = 'none';
    canvases[0].style.display = 'block';
    if(preferances[0]) bg.play();//start the best song

    player.nextPiece.reset();
    player.reset(gameArena);//initalize the player
    loop();
  }, 300);
}

function endGame() {
  bg.pause();
  bg.currentTime = 0;//stop and reset music
  ctx2.clearRect(0, 0, canvases[1].width, canvases[1].height);//clear the next piece canvas
  //make screen flash on game over
  let ran = Math.floor(Math.random() * colors.length - 1);
  gameArena = [];
  for(let i = 0; i < 200; i++) {gameArena.push(ran)}
  drawMatrix(ctx1, gameArena, 10, 20);

  setTimeout(() => {
    //reset game and move player back to main menu
    level = linesCleared = score = 0;
    GAMEOVER = false;
    updateText();
    menu.style.display = 'flex';
    canvases[0].style.display = 'none';
  }, 500);

  gameArena = [];//reset game arena
}

//functions for navigating the player around the manu system
function toggleSettings() {
  clickSound.play();//play click sound
  setTimeout(() => {
    //move the player position in the menu
    if(!position) {
      homeMenu.style = 'left: -100%;';
      settingsMenu.style = 'left: 0;';
      position = 1;
    } else {
      settingsMenu.style = 'left: 100%;';
      homeMenu.style = 'left: 0;';
      position = 0;
    }
  }, 100);
}

function toggleControls() {
  clickSound.play();//play click sound
  setTimeout(() => {
    //move the player position in the menu
    if(!position) {
      homeMenu.style = 'left: 100%;';
      controlsMenu.style = 'left: 0;';
      position = 3;
    } else {
      controlsMenu.style = 'left: -100%;';
      homeMenu.style = 'left: 0;';
      position = 0;
    }
  }, 100);
}
