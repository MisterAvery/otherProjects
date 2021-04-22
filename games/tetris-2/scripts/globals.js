//globals
let level = linesCleared = score = highScore = recordLines = recordLevel = 0;

let timeSeinceStart = 0,
    FPS = 1.25,
    framesBetweenMoves = 60 / FPS,
    speeds = [48, 43, 38, 33, 28, 23, 18, 15, 8, 6, 5, 5, 5, 4, 4, 4, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];

let GAMEOVER = false;

//initalize canvas vars
const canvases = document.querySelectorAll('canvas'),
      ctx1 = canvases[0].getContext('2d'),
      ctx2 = canvases[1].getContext('2d');

ctx1.textAlign = 'center';
ctx1.font = '1rem Rubik Mono One, cursive';

const tWidth = canvases[0].width / 10,
      tHeight = canvases[0].height / 20;

//keep track of player preferences
let preferances = [true, false];
let playerSet = 3;


//audio for game
const lineClearSound = new Audio(),
      lineClearTetrisSound = new Audio(),
      bg = new Audio(),
      clickSound = new Audio();

//set audio atributes
bg.setAttribute('loop', true);
bg.setAttribute('src', './audio/bg.mp3');
clickSound.setAttribute('src', './audio/click.mp3');
lineClearSound.setAttribute('src', './audio/line-clear.mp3');
lineClearTetrisSound.setAttribute('src', './audio/line-clear-tetris.mp3');

//get reference to info outputs
const highScoreElement = document.querySelector('.highScore'),
      recordLinesElement = document.querySelector('.recordLines'),
      recordLevelElement = document.querySelector('.recordLevel'),
      playerScoreElement = document.querySelector('.playerScore'),
      playerLinesElement = document.querySelector('.playerLines'),
      playerLevelElement = document.querySelector('.playerLevel');

const colors = ['#c040c0', '#ffe93d', '#f03030', '#ffa500', '#20e070', '#e4a4af', '#1e90ff'];

const shapeSets = [
////////////////////////////////   1 piece shape set    /////////////////////////////
  [
    {
      w: 1,
      h: 1,
      map: [
        4
      ]
    }
  ],
////////////////////////////////   2 piece shape set    /////////////////////////////
  [
    {
      w: 2,
      h: 2,
      map: [
        3, 3,
        0, 0
      ]
    },

    {
      w: 2,
      h: 2,
      map: [
        6, 0,
        0, 6
      ]
    }
  ],
////////////////////////////////   3 piece shape set    /////////////////////////////\
  [
    {
      w: 2,
      h: 2,
      map: [
        0, 1,
        1, 1
      ]
    },

    {
      w: 3,
      h: 3,
      map: [
        0, 0, 0,
        2, 2, 2,
        0, 0, 0,
      ]
    },

    {
      w: 3,
      h: 3,
      map: [
        0, 0, 0,
        0, 3, 3,
        3, 0, 0,
      ]
    },

    {
      w: 3,
      h: 3,
      map: [
        0, 0, 0,
        4, 4, 0,
        0, 0, 4,
      ]
    },

    {
      w: 3,
      h: 3,
      map: [
        0, 5, 0,
        5, 0, 5,
        0, 0, 0,
      ]
    },
  ],
////////////////////////////////   4 piece shape set    /////////////////////////////
  [
    //T Shape: purple
    {
      w: 3,
      h: 3,
      map: [
        1, 1, 1,
        0, 1, 0,
        0, 0, 0
      ]
    },
    //Square Shape: yellow
    {
      w: 2,
      h: 2,
      map: [
        2, 2,
        2, 2
      ]
    },
    //Reverse L Shape: red
    {
      w: 3,
      h: 3,
      map: [
        3, 3, 0,
        0, 3, 0,
        0, 3, 0
      ]
    },
    //L Shape: orange
    {
      w: 3,
      h: 3,
      map: [
        0, 4, 4,
        0, 4, 0,
        0, 4, 0
      ]
    },
    //Hero Shape: lime
    {
      w: 4,
      h: 4,
      map: [
        0, 5, 0, 0,
        0, 5, 0, 0,
        0, 5, 0, 0,
        0, 5, 0, 0
      ]
    },
    //Z Shape: pink
    {
      w: 3,
      h: 3,
      map: [
        6, 0, 0,
        6, 6, 0,
        0, 6, 0
      ]
    },
    // Reverse Z Shape: dodgerblue
    {
      w: 3,
      h: 3,
      map: [
        0, 0, 7,
        0, 7, 7,
        0, 7, 0
      ]
    }
  ],
////////////////////////////////   5 piece shape set    /////////////////////////////
  [
    {
      w: 3,
      h: 3,
      map: [
        0, 0, 0,
        1, 0, 1,
        1, 1, 1,
      ]
    },

    {
      w: 3,
      h: 3,
      map: [
        2, 0, 0,
        2, 2, 0,
        2, 2, 0,
      ]
    },

    {
      w: 3,
      h: 3,
      map: [
        0, 0, 3,
        0, 3, 3,
        0, 3, 3,
      ]
    },

    {
      w: 3,
      h: 3,
      map: [
        4, 4, 4,
        0, 4, 0,
        0, 4, 0,
      ]
    },

    {
      w: 5,
      h: 5,
      map: [
        0, 5, 0, 0, 0,
        0, 5, 0, 0, 0,
        0, 5, 0, 0, 0,
        0, 5, 0, 0, 0,
        0, 5, 0, 0, 0
      ]
    },

    {
      w: 3,
      h: 3,
      map: [
        0, 0, 6,
        0, 6, 6,
        6, 6, 0
      ]
    },

    {
      w: 3,
      h: 3,
      map: [
        7, 0, 0,
        7, 7, 0,
        0, 7, 7
      ]
    },
  ],
////////////////////////////////   6 piece shape set    /////////////////////////////
  [
    {
      w: 4,
      h: 4,
      map: [
        0, 0, 0, 0,
        0, 0, 0, 0,
        1, 0, 0, 1,
        1, 1, 1, 1
      ]
    },

    {
      w: 3,
      h: 3,
      map: [
        2, 2, 0,
        2, 2, 0,
        2, 2, 0
      ]
    },

    {
      w: 4,
      h: 4,
      map: [
        0, 0, 0, 0,
        3, 3, 3, 3,
        0, 3, 3, 0,
        0, 0, 0, 0
      ]
    },

    {
      w: 3,
      h: 3,
      map: [
        0, 0, 4,
        0, 4, 4,
        4, 4, 4
      ]
    },

    {
      w: 4,
      h: 4,
      map: [
        0, 5, 5, 5,
        0, 5, 0, 0,
        0, 5, 0, 0,
        0, 5, 0, 0
      ]
    },

    {
      w: 4,
      h: 4,
      map: [
        5, 5, 5, 0,
        0, 0, 5, 0,
        0, 0, 5, 0,
        0, 0, 5, 0
      ]
    },

    {
      w: 6,
      h: 6,
      map: [
        0, 0, 7, 0, 0, 0,
        0, 0, 7, 0, 0, 0,
        0, 0, 7, 0, 0, 0,
        0, 0, 7, 0, 0, 0,
        0, 0, 7, 0, 0, 0,
        0, 0, 7, 0, 0, 0
      ]
    },
  ]
];



//functions for drawing things
function drawMatrix(ctx, matrix, w, h, offX = 0, offY = 0)  {
    matrix.forEach((tile, i) => {
      if(tile < 1) return;//skip any empty tiles
      //hello this is really cool

      ctx.fillStyle = colors[tile - 1];
      const canvasX = (i % w + offX) * tWidth,
            canvasY = (Math.floor(i / w) + offY) * tHeight;
      ctx.fillRect(canvasX, canvasY, tWidth, tHeight);
    });
}

function drawGrid() {
  ctx1.strokeStyle = '#1b1e21';
  for(let y = 0; y < 20; y++) {
    ctx1.beginPath();
    ctx1.moveTo(0, y * tWidth);
    ctx1.lineTo(canvases[0].width, y * tWidth);
    ctx1.stroke();
    ctx1.closePath();
  }

  for(let x = 0; x < 10; x++) {
    ctx1.beginPath();
    ctx1.moveTo(x * tHeight, 0);
    ctx1.lineTo(x * tHeight, canvases[0].height);
    ctx1.stroke();
    ctx1.closePath();
  }
}

//functions for the matrix
function checkRowCompleateion(matrix) {
  let rowsCleared = 0;
  //loop over every row
  for(let rowNum = 0; rowNum < 20; rowNum++) {
    //loop over every column in the row
    let row = [];
    for(let col = 0; col < 10; col++) {row.push(matrix[col + rowNum * 10])}

    if(row.every(tile => {return tile > 0})) {//check if the row is compleate
      matrix.unshift(...matrix.splice(rowNum * 10, 10).fill(0));//clear the row and move it to the top
      rowsCleared++;//increment the number of cleared rows
    }
  }

  //increment the score
  switch(rowsCleared) {
    case 0: break;

    case 1:
      score += 40 * (level + 1);
      lineClearSound.pause();
      lineClearSound.currentTime = 0;
      lineClearSound.play();
      break;

    case 2:
      score += 100 * (level + 1);
      lineClearSound.pause();
      lineClearSound.currentTime = 0;
      lineClearSound.play();
      break;

    case 3:
      score += 300 * (level + 1);
      lineClearSound.pause();
      lineClearSound.currentTime = 0;
      lineClearSound.play();
      break;

    default:
      score += 1200 * (level + 1);
      lineClearTetrisSound.pause();
      lineClearTetrisSound.currentTime = 0;
      lineClearTetrisSound.play();
      break;
  }

  if((linesCleared + rowsCleared) % 10 < linesCleared % 10) level++;//increment the level
  linesCleared += rowsCleared;//add to the total lines cleared
  FPS = level < 29 ? Math.floor(60 / speeds[level] * 100) / 100 : 60;
  framesBetweenMoves = 60 / FPS;
  updateText()
}


function updateText() {
  //update the data outputs
  playerScoreElement.innerText = score;
  playerLinesElement.innerText = linesCleared;
  playerLevelElement.innerText = level;

  if(score > highScore) highScore = score;
  if(level > recordLevel) recordLevel = level;
  if(linesCleared > recordLines) recordLines = linesCleared;

  highScoreElement.innerText = highScore;
  recordLinesElement.innerText = recordLines;
  recordLevelElement.innerText = recordLevel;
}
