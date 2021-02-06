const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
let xRotate = yRotate = 0;
let widths = [];

ctx.translate(width/2, height/2);
function sphere(d) {	
	ctx.strokeStyle = '#1660eb';
	for(let i = d; i > 0; i -= d/3) {
		widths.push(i);
		
		ctx.beginPath();
		ctx.ellipse(0, 0, widths[Math.ceil((d/i) - 1)], d, 0, 0, Math.PI * 2);
		ctx.stroke();
	}
	
	if(widths[2] <= 1 || widths[0] > d) {		
		yRotate *= -1;
	}
	
	for(let index in widths) {
		widths[index] -= yRotate;
	}
}

document.addEventListener('keydown', function(event) {
	switch(event.keyCode) {
		case 37: 
			yRotate = 1;
			break;
		case 38: 
			xRotate = -1
			break;
		case 39: 
			yRotate = -1;
			break;
		case 40: 
			xRotate = 1;
			break;
	}
});

function loop() {
	ctx.clearRect(-1 * width, -1 * height, 2 * width,2 * height);
	
	sphere(300);
	
	window.requestAnimationFrame(loop);
}

loop();