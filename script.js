// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  1, // Temporary aspect ratio, we'll set it correctly below
  0.1,
  1000,
);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
const canvasContainer = document.getElementById("canvas-container");
// Initially match the renderer size to the container's
renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
canvasContainer.appendChild(renderer.domElement);

// Correctly set camera aspect ratio based on actual container size
camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
camera.updateProjectionMatrix();

// Handle window resize
function onWindowResize() {
  camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
}

window.addEventListener("resize", onWindowResize);

// GLTF Loader
const loader = new THREE.GLTFLoader();
let loadedModel; // To keep a reference to the loaded model for rotation

loader.load(
  "scene.gltf",
  function (gltf) {
    loadedModel = gltf.scene; // Assign the loaded model
    scene.add(loadedModel);

    // Scale the model appropriately
    loadedModel.scale.set(9, 9, 9); // Adjust scale as needed

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);
  },
  undefined,
  function (error) {
    console.error(error);
  },
);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the model if it has been loaded
  if (loadedModel) {
    loadedModel.rotation.y += 0.005; // Adjust rotation speed as needed
  }

  renderer.render(scene, camera);
}

animate();
