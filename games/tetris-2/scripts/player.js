//player object
let player = {
  nextPiece: {
    reset: () => {
      ctx2.clearRect(0, 0, canvases[1].width, canvases[1].height);
      const index = Math.floor(Math.random() * shapeSets[playerSet].length);

      player.nextPiece.shape = shapeSets[playerSet][index].map;
      player.nextPiece.w = shapeSets[playerSet][index].w;
      player.nextPiece.h = shapeSets[playerSet][index].h;
    }
  },

  reset: matrix => {
    //function for resenting the player properties and creating a new one
    player.shape = player.nextPiece.shape;
    player.w = player.nextPiece.w;
    player.h = player.nextPiece.h;
    player.y = 0;
    player.x = 4;

    player.nextPiece.reset();

    if(!player.hasValidNext_Y_Position(matrix, player.shape)) GAMEOVER = true;
    FPS = level < 29 ? 60 / speeds[level] : 60;
    framesBetweenMoves = 60 / FPS;
  },

  update: matrix => {
    player.y++;
    //create new player piece and add the matrix to the arena
    if(!player.hasValidNext_Y_Position(matrix, player.shape)) {
      player.addToArenaMatrix(matrix);
      checkRowCompleateion(matrix);
      player.reset(matrix);
    }
  },

  rotate: matrix => {
    const roatedMatrix = player.getRotatedMatrix();//get the future matrix
    //push the player out of the wall
    if(player.x < 0 && player.canMove(matrix, roatedMatrix, player.x * -1)) player.x += player.x * -1;//right wall kick
    else if(player.x + player.w > 10) player.x += (player.x + player.w - 10) * -1//left wall kick

    // else if(player.x + player.w > 9) {//left wall kick
    // let count = 0,
    //     used_X_Values = [];//prevent several tiles on the same x-axis from being counted
    //
    // roatedMatrix.forEach((tile, i) => {
    //     const tileX = i % player.w + player.x,//get x positioin of the tile
    //           indexOfTile = used_X_Values.indexOf(tileX);//check if the tile has been used
    //
    //     if(tileX >= 10 && tile > 0 && indexOfTile == -1) {
    //       used_X_Values.push(tileX);//add x value to the array
    //       count++;//incrimint number of tiles out of bounds
    //     }
    //   });
    //   player.x -= count;//adjust the player
    // }

    if(player.canMove(gameArena, roatedMatrix, 0)) player.shape = roatedMatrix;//check if future matrix is a valid location
  },

  getRotatedMatrix: () => {
    const sl = player.w;
    let newMatrix = new Array(sl);//create the new matrix

    player.shape.forEach((tile, i) => {
      const tileX = i % player.w,
            tileY = Math.floor(i / player.w),
            newX = sl - tileY - 1,
            newY = tileX,
            index = newX + newY * sl;//calculate the index

      newMatrix[index] = tile;//modify the gameArena
    });

    return newMatrix;
  },

  canMove: (matrix1, matrix2, xOff) => {
    for(let i = 0; i < matrix2.length; i++) {
      const tile = matrix2[i];
      if(tile < 1) continue;//slight optimization to avoid checking empty tiles

      const tileX = i % player.w + player.x,//get x pos
            tileY = Math.floor(i / player.w) + player.y;//get y pos
            arenaIndex = tileX + tileY * 10;
      if(tileX + xOff < 0 || tileX + xOff >= 10 || matrix1[arenaIndex + xOff] > 0) return false;//check if the future poition is valid
    }
    return true;
  },

  hasValidNext_Y_Position: (matrix1, matrix2) => {
    for(let i = 0; i < matrix2.length; i++) {
      const tile = matrix2[i];
      if(tile < 1) continue;//slight optimization to avoid checking empty tiles

      const tileX = i % player.w + player.x,
            tileY = Math.floor(i / player.w) + player.y;
            arenaIndex = tileX + tileY * 10 + 10;
      if(matrix1[arenaIndex - 10] > 0 || tileY + 1 > 20) return false;//check if the next tile down is not empty
    }
    return true;
  },

  addToArenaMatrix: matrix => {
     player.shape.forEach((tile, i) => {
       if(tile < 1) return;//slight optimization to avoid checking empty tiles

       //get the tile x and y for index calxulations
       const tileX = i % player.w + player.x,
             tileY = Math.floor(i / player.w) + player.y;
       const arenaIndex = tileX + tileY * 10 - 10;//calculate the index
       matrix[arenaIndex] = tile;//modify the gameArena
     });
  }
};
