let xRotate = 0;
let yRotate = 0;


let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;

let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor('#eee');
renderer.setSize(window.innerWidth, window.innerHeight);

let geometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshLambertMaterial({color: 0x37f0ff});
let mesh = new THREE.Mesh(geometry, material);
mesh.position.set(-3, 2, 0);

let light = new THREE.PointLight(0xffff88, 1.5, 100);
light.position.set(0, 0, 0);


document.body.appendChild(renderer.domElement);

scene.add(mesh);
scene.add(light);

render();



function render() {
	requestAnimationFrame(render);
	
	camera.position.x += xRotate;
	camera.position.y += yRotate;
	
	renderer.render(scene, camera);
}



window.addEventListener('keydown', function(event) {
	switch(event.keyCode) {
		case 37:
			xRotate = 0.05;
			break;
		case 38:
			yRotate = -0.05;
			break;
		case 39:
			xRotate = -0.05;
			break;
		case 40:
			yRotate = 0.05;
			break;
	}
});

window.addEventListener('keyup', function(event) {
	switch(event.keyCode) {
		case 37:
			xRotate = 0;
			break;
		case 38:
			yRotate = 0;
			break;
		case 39:
			xRotate = 0;
			break;
		case 40:
			yRotate = 0;
			break;
	}
});

window.addEventListener('resize', function() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
});