const slider = document.querySelector('.rows');

let changeInterval = 5;	
let startW = 100;

function draw(x, y, w) {
	let newW = w - changeInterval;
	let newY = y + w;
	let newX = x - w/2;
	
	ctx.rect(x, y, w, w);
	ctx.rect(x - w, y, w, w);
	
	if(w > 32) {
		draw(newX, newY, newW)
		draw(newX + w, newY, newW);
	}
}

function change() {
	changeInterval = startW / slider.value;
	
	ctx.clearRect(0, 0, width, height);
	
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#fff';
	ctx.fillStyle = 'hsl(32, 77%, 60%)';
	ctx.rect(width/2 - startW/2, 0, startW, startW);

	startW -= changeInterval;

	draw(width/2, startW + changeInterval, startW);
	ctx.fill();
	ctx.stroke();
	
	startW += 6;
}

change();