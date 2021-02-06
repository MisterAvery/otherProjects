class Dot {
  constructor(x, y, atractX, atracty) {
    this.pos = newVector(x, y);
    this.aPos = newVector(atractX, atracty);
    this.vel = newVector(0, 0);
    this.acl = newVector(0, 0);
  }

  show() {
    circ(this.pos.a, this.pos.b, 7, "#f418");
  }

  move() {
    let diff = findDif(this.aPos, this.pos);

    //atraction to point
    diff.a /= 14;
    diff.b /= 14;
    add(this.acl, diff);

    add(this.vel, this.acl);
    add(this.pos, this.vel);
  }
}

let dots = [];
let offsetX = (width - 24 * 15)/2;
let offsetY = (height - 24 * 15)/2;
for(let i = 0; i < 24; i++) {
  for(let j = 0; j < 24; j++) {
    dots.push(new Dot(i*15 + offsetX, j*15 + offsetY, i*15 + offsetX, j*15 + offsetY));
  }
}

function loop() {
  ctx.clearRect(0, 0, width, height);

  for(let i in dots) {
    dots[i].show();
    dots[i].move();

    dots[i].acl.a = 0;
    dots[i].acl.b = 0;

    //wiggle factor
    dots[i].vel.a *= 0.7;
    dots[i].vel.b *= 0.7;
  }

  window.requestAnimationFrame(loop);
}

let prevMousePos;
let mouseVel = newVector(0, 0);
let bounds = canvas.getBoundingClientRect();
document.addEventListener('mousemove', function(event) {
  let mousePos = newVector(event.clientX - bounds.left, event.clientY - bounds.top);
  if(prevMousePos) {
    mouseVel = findDif(mousePos, prevMousePos);
  }

  for(let i in dots) {
    let colliding = circ2circ(mousePos.a, mousePos.b, dots[i].pos.a, dots[i].pos.b, 35, 3);

    if(colliding) {
      add(dots[i].acl, mouseVel);
    }
  }

  prevMousePos = mousePos;
});

loop();
