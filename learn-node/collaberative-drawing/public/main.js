//establish socket connection
let socket = io.connect('http://penguin.linux.test:1800/');

//grab DOM elements and initialize ctx
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let bound = canvas.getBoundingClientRect();
let mouseState = false;

//draw and send circles to the server
document.addEventListener('mousedown', function() {mouseState = true;});
document.addEventListener('mouseup', function() {mouseState = false;});

document.addEventListener('mousemove', function(event) {
  if(mouseState) {
    let mouseX = event.clientX - bound.left;
    let mouseY = event.clientY - bound.top;
    if(mouseX < canvas.width && mouseX > 0 && mouseY < canvas.height && mouseY > 0) {
      ctx.fillStyle = 'dodgerblue';
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
      socket.emit('message', {
        x: mouseX,
        y: mouseY
      });
    }
  }
});

  //receve and draw circles
  socket.on('reply', function(obj) {
   ctx.fillStyle = '#f41';
   ctx.beginPath();
   ctx.arc(obj.x, obj.y, 20, 0, Math.PI * 2);
   ctx.fill();
   ctx.closePath();
 });
