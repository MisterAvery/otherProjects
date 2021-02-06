"use strict";

const sliderGravity = document.querySelector('.gravitySlide');
const sliderWind = document.querySelector('.windSlide');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

let dots = [
	new Dot({x: width/2 + 50, y: height/2}, 4), 
	new Dot({x: width/2 - 50, y: height/2}, 2)
];
let gravity = {down: 0.8, right: 0};
let wind = {down: 0, right: sliderWind.value};
let slipCo = 1.85;

function loop() {
	ctx.clearRect(0, 0, width, height);
	wind.right = sliderWind.value;
//	gravity.down = sliderGravity.value;
	
	for(let i in dots) {
		dots[i].addForce(gravity);
		dots[i].addForce(wind);
		
		dots[i].show();
		dots[i].move();
		
		dots[i].acl = {down: 0, right: 0};
	}
	
	window.requestAnimationFrame(loop);
}

window.addEventListener('click', function(event) {
	const edges = canvas.getBoundingClientRect();
	const mouseX = event.clientX - edges.top;
	const mouseY = event.clientY - edges.left;
	
	if(mouseX >= edges.left && mouseX <= edges.right && mouseY >= edges.top && mouseY <= edges.bottom) {
		dots.push(new Dot({x: mouseX, y: mouseY}, Math.floor(Math.random() * 10)));
	}
});

loop();
	
	
	
	
	
	
	
	
	
