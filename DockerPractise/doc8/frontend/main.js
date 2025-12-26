const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Glowing Neon Grid
const grid = new THREE.GridHelper(200, 40, 0x00ffff, 0x004444);
grid.position.y = -10;
scene.add(grid);

// Floating Cube
const box = new THREE.Mesh(new THREE.BoxGeometry(2,2,2), new THREE.MeshPhongMaterial({color: 0x00ffcc, wireframe: true}));
scene.add(box);
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(5, 5, 5);
scene.add(light);

camera.position.z = 15;

function animate() {
    requestAnimationFrame(animate);
    grid.position.z += 0.2;
    if(grid.position.z > 5) grid.position.z = 0;
    box.rotation.x += 0.01; box.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();