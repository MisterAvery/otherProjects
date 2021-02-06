"use strict";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 650;

let walls = [];
let rays = [];

for(let i = 0; i < 5; i++) {
	walls.push(new wall(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height), Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height)));
}

for(let i = -1; i < 1.01; i += 0.01) {
	rays.push(new ray(300, 300, {down: i, right: 1}));
	rays.push(new ray(300, 300, {down: i, right: -1}));
	rays.push(new ray(300, 300, {down: 1, right: i}));
	rays.push(new ray(300, 300, {down: -1, right: i}));
}

function loop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	for(let index in walls) {
			walls[index].show();
	}
	
	for(let index in rays) {			
		let pt = rays[index].cast();
		if(pt) {
			rays[index].show(pt.x, pt.y);
		}
	}

	window.requestAnimationFrame(loop);
}

window.addEventListener('mousemove', function(event) {
	const boundeies = canvas.getBoundingClientRect();
	
	for(let index in rays) {
		rays[index].x = event.clientX - boundeies.left;
		rays[index].y = event.clientY - boundeies.top;
	}
});

loop();
