const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

let camera = {
  zoom: 200,
  //zoom: 2900,
  //x: 0.7,
  //y: 0.6
  xVel: 0,
  yVel: 0
};

window.addEventListener('keydown', () => keyEvent(event));

loop();



function loop() {
  camera.y = height/2 / camera.zoom;
  camera.x = width/2 / camera.zoom - 0.27;
  // ctx.clearRect(0, 0, width, height);

  for(let x = 0; x < width; x++) {
    for(let y = 0; y < height; y++) {
      let pointBelongsToSet = belongsToSet(x/camera.zoom - camera.x, y/camera.zoom - camera.y);
      
      if(pointBelongsToSet === 0) ctx.fillStyle = '#e5e5e5';
      else ctx.fillStyle = `hsl(200, 130%, ${pointBelongsToSet}%)`;
      
      ctx.fillRect(x, y, 1, 1);
    }
  }
  
  // ctx.fillStyle = 'red';
  // ctx.fillRect(width/2, height/2, 1, 1);
}

function belongsToSet(x, y) {
  let realComponent = x;
  let imaginaryComponent = y;
  let maxIterations = 50;
  
  for(let i = 0; i < maxIterations; i++) {
    let tempRealComponent = realComponent * realComponent - imaginaryComponent * imaginaryComponent + x;
    let tempImaginaryComponent = 2 * realComponent * imaginaryComponent + y;

    realComponent = tempRealComponent;
    imaginaryComponent = tempImaginaryComponent;
    
    if(realComponent * imaginaryComponent > 5) return (i/maxIterations * 100);
  }
  
  return 0;
}

function keyEvent(event) {
  let code = event.keyCode;
  
  if(code == 38) camera.zoom += 200;
  else if(code == 40) camera.zoom -= 200;
  
  console.log('loading...');
  loop();
  console.clear();
}