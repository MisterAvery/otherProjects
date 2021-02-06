const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const birthThreshold = 6;//amount of caves
const survivalThreshold = 4;//size of caves
const iterations = 5 ;

let mapSideLength = 75;
let tileSideLength = canvas.width / mapSideLength;

let map = createMap(mapSideLength);

map.forEach((tile, i) => {
  let tilePixelX = i % mapSideLength * tileSideLength;
  let tilePixelY = Math.floor(i / mapSideLength) * tileSideLength;

  if(tile == 1) {
    ctx.fillStyle = '#3c3c3c';
  } else {
    ctx.fillStyle = '#e5e5e5';
  }

  ctx.beginPath();
  ctx.rect(tilePixelX, tilePixelY, tileSideLength, tileSideLength);
  ctx.fill();
  ctx.closePath();
});



function createMap(sideLength) {
  let length = sideLength * sideLength;
  let oldMap = [];

  for(let i = 0; i < length; i++) {
    let ran = Math.random();

    if(ran > 1 - 0.45) {
      oldMap[i] = 0;
    } else {
      oldMap[i] = 1;
    }
  }

  for(let i = 0; i < iterations; i++) {
    oldMap = doStep(oldMap, sideLength);
  }

  return oldMap;
}



function doStep(mapIn, sideLength) {
  let newMap = [];

  mapIn.forEach((item, i) => {
    let count = 0;
    for(let x = -1; x < 2; x++) {
      for(let y = -1; y < 2; y++) {
        let tileX = i % mapSideLength;
        let tileY = Math.floor(i / mapSideLength);

        let neighborIndex = i + x + sideLength * y;

        if(x !== 0 || y !== 0) {
          if(tileX - 1 < 0 || tileY - 1 < 0 || tileX + 1 > sideLength || tileY + 1 > sideLength - 1) {
            count++;
          } else if(mapIn[neighborIndex] == 1) {
            count++;
          }

          if(mapIn[i] == 0 && count >= birthThreshold) {
            newMap[i] = 1;
          } else if(mapIn[i] == 1 && count >= survivalThreshold) {
            newMap[i] = 1;
          } else {
            newMap[i] = 0;
          }
        }
      }
    }
  });

  return newMap;
}
