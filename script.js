// Hearts Canvas Animation
const canvas = document.getElementById('hearts-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Heart {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 50;
    this.size = Math.random() * 20 + 10;
    this.speedX = (Math.random() - 0.5) * 2;
    this.speedY = Math.random() * -4 + -2;
    this.opacity = Math.random() * 0.5 + 0.5;
    this.rotation = 0;
    this.rotationSpeed = (Math.random() - 0.5) * 0.05;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += 0.1; // gravity
    this.rotation += this.rotationSpeed;
    this.opacity -= 0.005;

    if (this.y > canvas.height || this.opacity <= 0) {
      this.y = -50;
      this.opacity = 1;
      this.x = Math.random() * canvas.width;
    }

    if (this.x < 0 || this.x > canvas.width) {
      this.speedX *= -1;
    }
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    
    // Cute heart shape
    ctx.fillStyle = '#ff9ff3';
    ctx.strokeStyle = '#ff1493';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#ff69b4';
    ctx.shadowBlur = 10;
    
    ctx.beginPath();
    ctx.moveTo(0, -this.size / 2);
    ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size / 2, 0, 0, this.size / 2);
    ctx.bezierCurveTo(this.size / 2, 0, this.size / 2, -this.size / 2, 0, -this.size / 2);
    ctx.fill();
    ctx.stroke();
    
    ctx.restore();
  }
}

let hearts = [];
function createHeart() {
  if (hearts.length < 40) {
    hearts.push(new Heart());
  }
}

function animateHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((heart, index) => {
    heart.update();
    heart.draw();
  });
  requestAnimationFrame(animateHearts);
}

// Start animation
setInterval(createHeart, 300);
animateHearts();

// Cute Messages Rotation
const messages = document.querySelectorAll('.message');
const nextBtn = document.getElementById('next-message');
const randomBtn = document.getElementById('random-message');
let currentMessageIndex = 0;

function showMessage(index) {
  // Hide all messages
  messages.forEach(msg => {
    msg.classList.remove('active');
  });
  
  // Show current message
  setTimeout(() => {
    messages[index].classList.add('active');
  }, 300);
  
  currentMessageIndex = index;
}

nextBtn.addEventListener('click', () => {
  const nextIndex = (currentMessageIndex + 1) % messages.length;
  showMessage(nextIndex);
  
  // Heart explosion effect
  for (let i = 0; i < 15; i++) {
    setTimeout(() => createHeart(), i * 50);
  }
});

randomBtn.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * messages.length);
  showMessage(randomIndex);
  
  // Double heart effect for surprise
  for (let i = 0; i < 25; i++) {
    setTimeout(() => createHeart(), i * 30);
  }
});

// Auto rotate messages every 5 seconds
setInterval(() => {
  const nextIndex = (currentMessageIndex + 1) % messages.length;
  showMessage(nextIndex);
}, 5000);

// Typing effect for title (cute enhancement)
const title = document.querySelector('.love-title');
const originalText = title.getAttribute('data-text');
let titleIndex = 0;

function typeTitle() {
  if (titleIndex < originalText.length) {
    title.textContent = originalText.slice(0, titleIndex + 1);
    titleIndex++;
    setTimeout(typeTitle, 150);
  }
}

// Start typing after page load
setTimeout(typeTitle, 1000);

// Mouse trail hearts
let mousePos = { x: 0, y: 0 };

document.addEventListener('mousemove', (e) => {
  mousePos.x = e.clientX;
  mousePos.y = e.clientY;
  
  // Create heart on mouse move
  if (Math.random() > 0.8) {
    const heart = new Heart();
    heart.x = mousePos.x;
    heart.y = mousePos.y;
    heart.speedY = Math.random() * -2 - 1;
    heart.size = Math.random() * 15 + 8;
    hearts.push(heart);
  }
});

// Click explosion
document.addEventListener('click', (e) => {
  for (let i = 0; i < 20; i++) {
    const angle = (Math.PI * 2 * i) / 20;
    const velocity = 4 + Math.random() * 3;
    const heart = new Heart();
    heart.x = e.clientX;
    heart.y = e.clientY;
    heart.speedX = Math.cos(angle) * velocity;
    heart.speedY = Math.sin(angle) * velocity - 2;
    heart.size = Math.random() * 12 + 6;
    hearts.push(heart);
  }
});

// Show initial message
document.addEventListener('DOMContentLoaded', () => {
  showMessage(0);
});
