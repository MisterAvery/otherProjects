const canvas = document.createElement('CANVAS');
const ctx = document.body.appendChild(canvas).getContext('2d');

canvas.width = canvas.height = 600;

const distance = canvas.width / 25;
ctx.lineWidth = 2;

for(let y = 0; y < canvas.width; y += distance) {
  for(let x = 0; x < canvas.height; x += distance) {
    if(Math.random() <= 0.5) {
      ctx.moveTo(x, y);
      ctx.lineTo(x + distance, y + distance);
    } else {
      ctx.moveTo(x + distance, y);
      ctx.lineTo(x, y + distance);
    }
  }
}
ctx.stroke();