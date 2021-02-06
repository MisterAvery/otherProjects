const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;


function clear() {
  ctx.clearRect(0, 0, width, height);
};


//shapes
function rect(x, y, width, height, fill = '#fff', stroke = fill) {
  ctx.beginPath();
  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;

  ctx.rect(x, y, width, height);
  ctx.fill();
  ctx.stroke();
}

function circ(x, y, r, fill = '#fff', stroke = fill) {
  ctx.beginPath();
  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;

  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}

function line(x1, y1, x2, y2, stroke = fill) {
  ctx.beginPath();
  ctx.strokeStyle = stroke;

  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function tri(x1, y1, x2, y2, x3, y3, fill = '#fff', stroke = fill) {
  ctx.beginPath();
  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;

  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.lineTo(x1, y1);

  ctx.fill();
  ctx.stroke();
}



//vectors
function newVector(n1, n2) {
  return {a: n1, b: n2};
}

    function add(vec1, vec2) {
      vec1.a += vec2.a;
      vec1.b += vec2.b;

      return vec1;
    }

    function sub(vec1, vec2) {
      vec1.a -= vec2.a;
      vec1.b -= vec2.b;

      return vec1;
    }

    function mult(vec1, vec2) {
      vec1.a *= vec2.a;
      vec1.b *= vec2.b;

      return vec1;
    }

    function div(vec1, vec2) {
      vec1.a /= vec2.a;
      vec1.b /= vec2.b;

      return vec1;
    }

    function findSum(vec1, vec2) {
      return newVector(vec1.a + vec2.a, vec1.b + vec2.b);
    }

    function findDif(vec1, vec2) {
      return newVector(vec1.a - vec2.a, vec1.b - vec2.b);
    }

    function findProd(vec1, vec2) {
        return newVector(vec1.a * vec2.a, vec1.b * vec2.b);
    }

    function findQuoc(vec1, vec2) {
      return newVector(vec1.a / vec2.a, vec1.b / vec2.b);
    }

    function findOps(vec) {
      let a = vec.a * -1;
      let b = vec.b * -1;

      return newVector(a, b);
    }

    function findMag(vec) {
      let a = vec.a * vec.a;
      let b = vec.b * vec.b;

      return Math.sqrt(a + b);
    }

    function setMag(vec, num) {
      let mag = findMag(vec);

      if(mag >= num || mag <= num * -1) {
        vec.a *= 1/mag * num;
        vec.b *= 1/mag * num;
      }

      return vec;
    }

    function zeroOut(vec) {
      vec.a = 0;
      vec.b = 0;

      return vec;
    }



//math formulas
function dist(x1, y1, x2, y2) {
  let sideA = x2 - x1;
  let sideB = y2 - y1;

  return Math.sqrt(sideA * sideA + sideB * sideB);
}

function mid(x1, y1, x2, y2) {
  let xAvg = (x1 + x2) / 2;
  let yAvg = (y1 + y2) / 2;

  return new newVector(xAvg, yAvg);
}

function random(min, max, round) {
  let num = Math.random() * (max - min) + min;

  if(round || round === 0) {num = Math.round(num * Math.pow(10, round)) / Math.pow(10, round);}

  return num;
}


//collision formulas
function rect2rect(x1, y1, x2, y2, w1, h1, w2, h2) {
  let rec1Top = y1;
  let rec1Right = x1 + w1;
  let rec1Bottom = y1 + h1;
  let rec1Left = x1;

  let rec2Top = y2;
  let rec2Right = x2 + w2;
  let rec2Bottom = y2 + h2;
  let rec2Left = x2;

  return rec2Bottom - rec1Top >= 0 && rec2Top - rec1Bottom <= 0 && rec2Right - rec1Left >= 0 && rec2Left - rec1Right <= 0;
}

function circ2circ(x1, y1, x2, y2, r1, r2) {
  return dist(x1, y1, x2, y2) - (r1 + r2) <= 0;
}

function rect2circ(x1, y1, x2, y2, w, h, r) {
  let top = y1;
  let right = x1 + w;
  let bottom = y1 + h;
  let left = x1;

  return top - y2 - r < 0 && bottom - y2 + r > 0 && left - x2 - r < 0 && right - x2 + r > 0;
}

// function line2line(x11, y11, x12, y12, x21, y21, x22, y22) {
//
// }
