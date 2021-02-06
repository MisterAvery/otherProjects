const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

let width, height;
let xRotate = yRotate = 0;

let corners = [
	{x: -150, y: 150, z: -150}, //0
	{x: 150, y: 150, z: -150},  //1
	{x: 150, y: 150, z: 150},   //2
	{x: -150, y: 150, z: 150},  //3
	{x: -150, y: -150, z: -150},//4
	{x: -150, y: -150, z: 150}, //5
	{x: 150, y: -150, z: -150}, //6
	{x: 150, y: -150, z: 150}   //7
];

let faces = [
	[corners[3], corners[2], corners[1], corners[0]],//bottom
	[corners[5], corners[7], corners[2], corners[3]],//front
	[corners[4], corners[5], corners[3], corners[0]],//left
	[corners[4], corners[6], corners[7], corners[5]],//top
	[corners[7], corners[6], corners[1], corners[2]],//right
	[corners[4], corners[6], corners[1], corners[0]]//back
];

faces[0].push(faces[0][0]);
faces[1].push(faces[1][0]);
faces[2].push(faces[2][0]);
faces[3].push(faces[3][0]);
faces[4].push(faces[4][0]);
faces[5].push(faces[5][0]);

function loop() {
	canvas.width = width = window.innerWidth;
	canvas.height = height = window.innerHeight;
	ctx.translate(width/2, height/2);
	
	ctx.clearRect(0, 0, width, height);
	ctx.strokeStyle = "rgba(20, 146, 226)";

	for(let face in faces) {
			ctx.beginPath();
			ctx.moveTo(faces[face].x, faces[face].y);
			
		for(let p in faces[face]) {
			let perspective = 800/(800 + faces[face][p].z);

			ctx.lineTo(faces[face][p].x * perspective, faces[face][p].y * perspective);
			ctx.stroke();
		}
	}
	ctx.closePath();
	
	rotateX(xRotate);
	rotateY(yRotate);
	
	window.requestAnimationFrame(loop);
}

document.addEventListener('keydown', function(event) {
	switch(event.keyCode) {
		case 37: 
			yRotate = 0.01;
			break;
		case 38: 
			xRotate = -0.01
			break;
		case 39: 
			yRotate = -0.01;
			break;
		case 40: 
			xRotate = 0.01;
			break;
	}
});

loop();


function rotateX(radian) {
	let cosine = Math.cos(radian);
	let sine = Math.sin(radian);
	
	for(let p in corners) {
		corners[p].y = corners[p].y * cosine - corners[p].z * sine;
		corners[p].z = corners[p].y * sine + corners[p].z * cosine;
	}
}

function rotateY(radian) {
	let cosine = Math.cos(radian);
	let sine = Math.sin(radian);
	
	for(let p in corners) {
		corners[p].x = corners[p].z * sine + corners[p].x * cosine;
		corners[p].z = corners[p].z * cosine - corners[p].x * sine;
	}
}