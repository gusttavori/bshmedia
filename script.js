const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

// Alta definição para telas retina
function setCanvasSize() {
    const ratio = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}
window.addEventListener("resize", setCanvasSize);
setCanvasSize();

// Estrelas com brilho dinâmico
const stars = Array.from({ length: 200 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    radius: Math.random() * 1.3 + 0.3,
    baseAlpha: Math.random() * 0.5 + 0.3,
    alphaChange: (Math.random() * 0.01 + 0.003) * (Math.random() < 0.5 ? 1 : -1),
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.2
}));

let comets = [];

function drawStars() {
    for (let s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        s.baseAlpha += s.alphaChange;

        if (s.baseAlpha <= 0.3 || s.baseAlpha >= 1) s.alphaChange *= -1;

        if (s.x < 0) s.x = window.innerWidth;
        if (s.x > window.innerWidth) s.x = 0;
        if (s.y < 0) s.y = window.innerHeight;
        if (s.y > window.innerHeight) s.y = 0;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.baseAlpha})`;
        ctx.fill();
    }
}

// Criar cometas com rastro flamejante
function spawnComet() {
    const direction = Math.random() < 0.5 ? 'left' : 'top';
    comets.push({
        x: direction === 'left' ? -50 : Math.random() * window.innerWidth,
        y: direction === 'top' ? -50 : Math.random() * window.innerHeight,
        vx: direction === 'left' ? Math.random() * 5 + 4 : (Math.random() - 0.3) * 6,
        vy: direction === 'top' ? Math.random() * 5 + 4 : (Math.random() - 0.3) * 6,
        size: Math.random() * 3 + 3,
        life: 1,
        trail: []
    });
}

function drawComets() {
    for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];

        // Atualizar trilha
        c.trail.unshift({ x: c.x, y: c.y, life: c.life });
        if (c.trail.length > 20) c.trail.pop();

        // Desenhar cauda
        for (let j = 0; j < c.trail.length; j++) {
            const p = c.trail[j];
            const alpha = (p.life - j * 0.05);
            ctx.beginPath();
            ctx.arc(p.x, p.y, c.size - j * 0.15, 0, 2 * Math.PI);
            ctx.fillStyle = `rgba(255, ${200 - j * 5}, 0, ${alpha})`;
            ctx.fill();
        }

        c.x += c.vx;
        c.y += c.vy;
        c.life -= 0.006;

        if (c.life <= 0 || c.x > window.innerWidth + 100 || c.y > window.innerHeight + 100) {
            comets.splice(i, 1);
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStars();
    drawComets();
    requestAnimationFrame(animate);
}

setInterval(() => {
    if (Math.random() < 0.7) spawnComet();
}, 1000);

animate();


/*carrossel*/

const slides = document.querySelectorAll('.slide');
let currentIndex = 0;

document.getElementById('next').addEventListener('click', () => {
  changeSlide(1);
});

document.getElementById('prev').addEventListener('click', () => {
  changeSlide(-1);
});

function changeSlide(direction) {
  slides[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + direction + slides.length) % slides.length;
  slides[currentIndex].classList.add('active');
}

