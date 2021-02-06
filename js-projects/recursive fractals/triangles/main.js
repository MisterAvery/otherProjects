const canvas = document.createElement('CANVAS');
const width = canvas.width = 600;
const height = canvas.height = 600;
const ctx = canvas.getContext('2d');

let zoom = 50;
let iterations = 1;

document.body.appendChild(canvas);

loop();



function loop() {
  ctx.clearRect(0 , 0, width, height);

  fractalize({x: width/2, y: height/2-zoom}, {x: width/2-zoom * 1.15, y: height/2+zoom}, {x: width/2+zoom * 1.15, y: height/2+zoom}, iterations);
  zoom++;
  if(zoom % 100 === 0) iterations++;
  
  window.requestAnimationFrame(loop);
}

function fractalize(p0, p1, p2, limit) {
  if(limit > 0) {
    let pA = {x: (p0.x + p1.x)/2, y: (p0.y + p1.y)/2};
    let pB = {x: (p1.x + p2.x)/2, y: (p1.y + p2.y)/2};
    let pC = {x: (p2.x + p0.x)/2, y: (p2.y + p0.y)/2};
    
    fractalize(p0, pA, pC, limit - 1);
    fractalize(pA, p1, pB, limit - 1);
    fractalize(pC, pB, p2, limit - 1);
  } else {
    drawTriangle(p0, p1, p2);
  }
}

function drawTriangle(p0, p1, p2) {
  if(triangleIsInScreen([p0, p1, p2])) {
    ctx.fillStyle = '#444';
    
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p0.x, p0.y);
    ctx.fill();
    ctx.closePath();
  }
}

function triangleIsInScreen(ary) {
  let triangleIsInView = true;
  
  ary.forEach(index => {
    if(index.y < -50 || index.y > height + 50 || index.x < -50 || index.x > width + 50) triangleIsInView = false;
  });
  
  return triangleIsInView;
}