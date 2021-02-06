window.onload = () => {
  
  //RENDERER
  const renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setClearColor('#555555');
  renderer.setSize(600, 600);
  document.body.appendChild(renderer.domElement);
  
  //CAMERA
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  camera.position.z = 5;
  
  //CAMERA CONSTROLS
  // const controls = new OrbitControls(camera, renderer.domElement);
  // controls.update();
  
  let cube = createCube(scene, 1.5, [0, 0, 0]);

  //LIGHTS
  const pointLight = new THREE.PointLight(0xffffff, 1, 100);
  pointLight.position.set(0, 1, 2);
  scene.add(pointLight);
  
  const ambientLight = new THREE.AmbientLight(0x555555);
  scene.add(ambientLight);
  
  //START THE ANIMATION LOOP
  let animate = () => {
    // controls.update();
    
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
  
  animate();
};



function createCube(scene, sl, pos, color = 0x1e90ff) {
  const cubeGeometry = new THREE.BoxGeometry(sl, sl, sl);
  const cubeMaterial = new THREE.MeshLambertMaterial({color: color});
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.set(pos[0], pos[1], pos[2]);

  scene.add(cube);
  return cube;
}

function createSphere(scene, r, pos, color = 0x1e90ff) {
  const sphereGeometry = new THREE.SphereGeometry(r, 32, 32);
  const sphereMaterial = new THREE.MeshLambertMaterial({color: color});
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(pos[0], pos[1], pos[2]);
  
  scene.add(sphere);
  return sphere;
}