import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';

// --- THREE.JS SCENE SETUP ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
// Append to the specific container we made in HTML
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Create Stars/Particles
const geometry = new THREE.BufferGeometry();
const vertices = [];
for (let i = 0; i < 6000; i++) {
    vertices.push(THREE.MathUtils.randFloatSpread(2000)); 
    vertices.push(THREE.MathUtils.randFloatSpread(2000)); 
    vertices.push(THREE.MathUtils.randFloatSpread(2000)); 
}
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
const material = new THREE.PointsMaterial({ color: 0x00f2ff, size: 2 });
const particles = new THREE.Points(geometry, material);
scene.add(particles);

camera.position.z = 5;

// Mouse Interaction Logic
let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) / 100;
    mouseY = (e.clientY - window.innerHeight / 2) / 100;
});

function animate() {
    requestAnimationFrame(animate);
    
    // Smooth rotation based on mouse
    particles.rotation.y += 0.001;
    particles.rotation.x += (mouseY * 0.05 - particles.rotation.x) * 0.05;
    particles.rotation.y += (mouseX * 0.05 - particles.rotation.y) * 0.05;

    renderer.render(scene, camera);
}
animate();

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- RECIPE FETCH LOGIC ---

async function searchRecipe() {
    const term = document.getElementById('searchBar').value;
    const resultsGrid = document.getElementById('results-grid');
    
    if (!term) return;

    resultsGrid.innerHTML = '<p class="loading">Searching the culinary universe...</p>';

    try {
        const response = await fetch(`http://localhost:5000/api/recipes?search=${term}`);
        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error("Fetch Error:", error);
        resultsGrid.innerHTML = '<p class="error">Server is offline. Check backend logs.</p>';
    }
}

function displayResults(recipes) {
    const resultsGrid = document.getElementById('results-grid');
    resultsGrid.innerHTML = ''; // Clear loading text

    if (recipes.length === 0) {
        resultsGrid.innerHTML = '<p>No recipes found in the database.</p>';
        return;
    }

    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
            <h3>${recipe.title}</h3>
            <div class="card-meta">
                <span>⏱️ ${recipe.cooking_time} mins</span>
            </div>
            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            <p class="instructions"><strong>Steps:</strong> ${recipe.instructions}</p>
        `;
        resultsGrid.appendChild(card);
    });
}

// Event Listeners
document.getElementById('searchBtn').addEventListener('click', searchRecipe);

// Allow pressing "Enter" to search
document.getElementById('searchBar').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchRecipe();
});