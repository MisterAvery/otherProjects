//initalize the arena
let gameArena = [];
for(let i = 0; i < 200; i++) gameArena.push(0)

//add event listeners
addEventListener('keydown', () => {controller.keyEvnt(gameArena, event)});
addEventListener('keyup', () => {controller.keyEvnt(gameArena, event)});

//game loop
function loop() {
  timeSeinceStart++;//variable from controller
  ctx1.clearRect(0, 0, canvases[0].width, canvases[0].height);
  ctx1.fillText('Turn Up the Music!', canvases[0].width/2, 30);

  //draw grid if setting is selected
  if(preferances[1]) drawGrid();

  //update the player
  if(timeSeinceStart % framesBetweenMoves == 0) player.update(gameArena);

  //draw the arena and the player
  drawMatrix(ctx1, gameArena, 10, 20);
  drawMatrix(ctx2, player.nextPiece.shape, player.nextPiece.w, player.nextPiece.h, player.nextPiece.x, player.nextPiece.y);
  drawMatrix(ctx1, player.shape, player.w, player.h, player.x, player.y);

  //run the game loop
  if(!GAMEOVER) requestAnimationFrame(loop);
  else endGame();
}
