"use strict";

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
 
setInterval(function() {
	fetch('https://api.wheretheiss.at/v1/satellites/25544&units=miles')
		.then(results => results.json())
		.then(data => gotData(data));
}, 1000/0.7);
  
  
function gotData(data) {	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	let x = map(data.latitude, -90, 90, 0, 600);
	let y = map(data.solar_lon, 0, 360, 0, 600);
	
	ctx.fillStyle = "#fff";
	ctx.beginPath();
	ctx.arc(x, y, 15, 0, Math.PI * 2);
	ctx.fill();
	ctx.closePath();
}

function map(inNum, obj1Min, obj1Max, obj2Min, obj2Max) {
	let obj1Total = Math.abs(obj1Min) + Math.abs(obj1Max);
	let obj2Total = Math.abs(obj2Min) + Math.abs(obj2Max);
	
	return Math.round(Math.abs(inNum) * (obj2Total / obj1Total));
}