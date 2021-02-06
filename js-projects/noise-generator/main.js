const canvas = document.createElement('CANVAS');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

const width = canvas.width = 500;
const height = canvas.height = 600;

const yStep = 5.5;
const xStep = 5;
const pointDensity = width / xStep;

let points = [];
// volume = xStep; width = mass;
for(let i = 0; i < pointDensity; i++) {
  let previousPoint = points[i - 1] || {x: 0, y: height/2};
  let modifier = Math.random() >= 0.5? -yStep: yStep;

  points.push({x: i * xStep, y: previousPoint.y + modifier});
}

function loop() {
  let hue = 360 * (points[points.length - 1].y / height);
  ctx.fillStyle = `hsl(${Math.abs((hue + 100) - 360)}, 100%, 40%)`;
  ctx.clearRect(0, 0, width, height);
  
  ctx.beginPath();
  ctx.moveTo(0, height);

  points.forEach(point => {
    ctx.lineTo(point.x, point.y);

    point.x -= xStep;
    
    if(point.x < 0) points.shift();
  });
  
  ctx.lineTo(width, height);
  ctx.fill();
  ctx.closePath();
  
  for(let i = 0; i < xStep/pointDensity; i++) {
    let modifier = Math.random() >= 0.5? -yStep: yStep;
    let pointY = points[points.length - 1].y + modifier;
  
    if(pointY < 0 || pointY > height) pointY = height/2;
    
    points.push({x: width, y: pointY});
  }

  window.requestAnimationFrame(loop);
}

loop();



//function rewrite
function noise(xStep, yStep, iterations) {
  let points = [];

  for(let its = 0; its < iterations; its++) {
    let previousPoint = points[points.length - 1] || {x: 0, y: 0};
    let modifier = Math.random() >= 0.5? -yStep: yStep;
    let pointY = previousPoint.y + modifier;
    
    points.push({x: previousPoint.x + xStep, y: pointY});
  }
  
  return points;
}