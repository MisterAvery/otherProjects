const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let bounds = canvas.getBoundingClientRect(canvas);

const birthThreshold = 6;//amount of caves
const survivalThreshold = 4;//size of caves
const iterations = 5 ;

let mapSideLength = 150;
let tileSideLength = 20;

let map = createMap(mapSideLength);

let camera = {
  x: 0,
  y: 0,
  w: canvas.width,
  h: canvas.height,
  yVel: 0,
  xVel: 0
};
camera.mouseInput = function(event) {
  let mouseX = event.clientX - bounds.left;
  let mouseY = event.clientY - bounds.top;

  if(mouseX < 30) {camera.xVel = -4; camera.yVel = 0;}
  else if(mouseX > canvas.width - 30) {camera.xVel = 4; camera.yVel = 0;}
  // else {camera.xVel = 0}

  if(mouseY < 30) {camera.yVel = -4; camera.xVel = 0;}
  else if(mouseY > canvas.height - 30) {camera.yVel = 4; camera.xVel = 0;}
  // else {camera.yVel = 0}
};

document.addEventListener('mousemove', function(event) {camera.mouseInput(event)});

loop();



function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  camera.y += camera.yVel;
  camera.x += camera.xVel;

  let xMin = Math.floor(camera.x / tileSideLength);
  let xMax =  Math.ceil((camera.x + camera.w) / tileSideLength);
  let yMin = Math.floor(camera.y / tileSideLength);
  let yMax = Math.ceil((camera.y + camera.h) / tileSideLength);

  if(xMin < 0) {
    camera.x = 0;
    xMin = 0;
  } else if(xMax > mapSideLength) {
    camera.x = mapSideLength * tileSideLength - camera.w;
    xMax = mapSideLength;
  }

  if(yMin < 0) {
    camera.y = 0;
    yMin = 0;
  } else if(yMax > mapSideLength) {
    camera.y = mapSideLength * tileSideLength - camera.h;
    yMax = mapSideLength;
  }


  for (var i = xMin; i < xMax; i++) {
    for (var j = yMin; j < yMax; j++) {
      let tile = map[i + j * mapSideLength];
      let tileX = i * tileSideLength - camera.x;
      let tileY = j * tileSideLength - camera.y;

      if(tile == 1) {
        ctx.fillStyle = '#3c3c3c';
      } else {
        ctx.fillStyle = '#e5e5e5';
      }

      ctx.beginPath();
      ctx.fillRect(tileX, tileY, tileSideLength, tileSideLength);
      ctx.closePath();
    }
  }

  window.requestAnimationFrame(loop);
}

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

          if(mapIn[i] === 0 && count >= birthThreshold) {
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
