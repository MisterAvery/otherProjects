const controller = {
  keyEvnt: (gameArena, e) => {//listen for each event
    switch(e.keyCode) {

      case 37:
        //try to move to the left
        if(e.type == 'keydown' && player.canMove(gameArena, player.shape, -1)) player.x--;
        break;

      case 38:
        //try to rotate the player
        if(e.type == 'keydown') player.rotate(gameArena);
        break;

      case 39:
        //try to move to the right
        if(e.type == 'keydown' && player.canMove(gameArena, player.shape, 1)) player.x++;
        break;

      case 40:
        //code for soft drops
        FPS = e.type == 'keydown' ? 30 : level < 29 ? 60 / speeds[level] : 60;
        framesBetweenMoves = 60 / FPS;
        break;
    }
  }
}
