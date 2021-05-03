const keys = [65, 83, 68, 70, 71];

let controller = {
  keyEvent: e => {
    if(GAMEOVER) return;
    let eventType = e.type == 'keydown';
    
    switch(e.keyCode) {
      case 65:
        tiles[0].pressed = eventType;
        if(eventType) {
          tiles[0].press();
          playSound(C);
        }
        break;
        
      case 83:
        tiles[1].pressed = eventType;
        if(eventType) {
          tiles[1].press();
          playSound(D);
        }
        break;
        
      case 68:
        tiles[2].pressed = eventType;
        if(eventType) {
          tiles[2].press();
          playSound(E);
        }
        break;
        
      case 70:
        tiles[3].pressed = eventType;
        if(eventType) {
          tiles[3].press();
          playSound(F);
        }
        break;
        
      case 71:
        tiles[4].pressed = eventType;
        if(eventType) {
          tiles[4].press();
          playSound(G);
        }
        break;
    }
  }
};