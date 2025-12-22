const wishes = {
    friend: "Cheers to another year of chaos and laughter! Thanks for being there.",
    gf: "Every second with you is a gift. Let's make 2024 our most romantic year yet. ❤️",
    bestie: "To the one who knows all my secrets—Happy New Year! Let's conquer the world.",
    colleague: "Wishing you professional growth and a stress-free 2024. Let's kill it!",
    relative: "Wishing you and the family health, wealth, and happiness this year."
};

function startCelebration() {
    const name = document.getElementById('userName').value;
    const rel = document.getElementById('relation').value;

    if(!name || !rel) return alert("Please fill in the details!");

    document.getElementById('overlay').classList.add('hidden');
    document.getElementById('wishContainer').classList.remove('hidden');
    
    document.getElementById('mainWish').innerText = `Happy New Year, ${name}!`;
    document.getElementById('personalNote').innerText = `${wishes[rel]} \n- With love, Rohit Mishra`;

    initFireworks();
    startGame();
}

// Simple Game Logic
let score = 0;
function startGame() {
    const area = document.getElementById('gameCanvas');
    setInterval(() => {
        const spark = document.createElement('div');
        spark.innerHTML = "✨";
        spark.style.position = "absolute";
        spark.style.left = Math.random() * 90 + "%";
        spark.style.top = Math.random() * 90 + "%";
        spark.style.cursor = "pointer";
        spark.style.fontSize = "2rem";
        spark.onclick = () => {
            score++;
            document.getElementById('score').innerText = score;
            spark.remove();
        };
        area.appendChild(spark);
        setTimeout(() => spark.remove(), 2000);
    }, 1000);
}

// Basic Firework Particle Effect
function initFireworks() {
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function Particle(x, y) {
        this.x = x; this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }

    let particles = [];
    function animate() {
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fillRect(0,0,canvas.width, canvas.height);
        if(particles.length < 100) particles.push(new Particle(Math.random()*canvas.width, Math.random()*canvas.height));
        
        particles.forEach((p, i) => {
            p.x += p.speedX; p.y += p.speedY;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    animate();
}