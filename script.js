
// =====================================
// PERSONALISATION
// =====================================

const CONFIG = {
  herName: "Shriya",

  secretTitle: "One little promise ❤️",

  secretMessage:
    "No matter how many Diwalis come and go, I hope I get to celebrate many more of them with you. More laughter, more adventures, more memories and more reasons to choose each other. ❤️"
};

// Set her name here when you're ready.
document.getElementById("herName").textContent = CONFIG.herName;


// =====================================
// SMOOTH NAVIGATION
// =====================================

document.getElementById("beginButton").addEventListener("click", () => {
  document.getElementById("diyas").scrollIntoView({
    behavior: "smooth"
  });
});


// =====================================
// INTERACTIVE DIYAS
// =====================================

const wishMessages = {
  happiness: "May your life always be filled with happiness and laughter. ❤️",
  love: "May you always feel loved, appreciated and cherished. ♡",
  dreams: "May every dream you have find its way to becoming reality. ✨"
};

const wishButtons = document.querySelectorAll(".wish-diya");
const wishMessage = document.getElementById("wishMessage");

wishButtons.forEach(button => {
  button.addEventListener("click", () => {
    const isLit = button.classList.toggle("lit");
    const wish = button.dataset.wish;

    wishMessage.textContent = isLit
      ? wishMessages[wish]
      : "Three little lights, and a million wishes for you.";
  });
});



// =====================================
// LOVE LETTER - ENVELOPE ANIMATION
// =====================================

const letterButton = document.getElementById("letterButton");
const letterCard = document.getElementById("letterCard");
const letterContent = document.getElementById("letterContent");

letterButton.addEventListener("click", () => {

  const isOpening = !letterCard.classList.contains("open");

  if (isOpening) {
    letterContent.hidden = false;

    requestAnimationFrame(() => {
      letterCard.classList.add("open");
    });

    letterButton.innerHTML = "Close my letter ↑";

  } else {
    letterCard.classList.remove("open");

    letterButton.innerHTML = "Open my letter ♡";

    setTimeout(() => {
      if (!letterCard.classList.contains("open")) {
        letterContent.hidden = true;
      }
    }, 850);
  }

});



// =====================================
// BACKGROUND MUSIC
// =====================================

const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const musicLabel = document.getElementById("musicLabel");

musicButton.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicLabel.textContent = "Pause music";
      musicButton.setAttribute("aria-label", "Pause background music");
    } catch (error) {
      musicLabel.textContent = "Music unavailable";
    }
  } else {
    music.pause();
    musicLabel.textContent = "Play music";
    musicButton.setAttribute("aria-label", "Play background music");
  }
});

music.addEventListener("error", () => {
  musicLabel.textContent = "Music unavailable";
});


// =====================================
// SECRET SURPRISE
// =====================================

const secretButton = document.getElementById("secretButton");
const secretTitle = document.getElementById("secretTitle");
const secretMessage = document.getElementById("secretMessage");

secretButton.addEventListener("click", () => {
  secretTitle.textContent = CONFIG.secretTitle;
  secretMessage.textContent = CONFIG.secretMessage;
  secretButton.textContent = "A little more magic ✨";
  secretButton.disabled = true;
  secretButton.style.opacity = "0.65";
});


// =====================================
// FIREWORKS ANIMATION
// =====================================

const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let animationFrame = null;
let animationUntil = 0;
let lastBurst = 0;

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

function createFirework(x, y) {
  const colors = ["#ffd27d", "#ffad68", "#f8e6b8", "#f48c8c"];
  const color = colors[Math.floor(Math.random() * colors.length)];

  for (let i = 0; i < 65; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1.2 + Math.random() * 4;

    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      decay: 0.009 + Math.random() * 0.012,
      color
    });
  }
}

function animateFireworks(now) {
  const rect = canvas.getBoundingClientRect();

  ctx.clearRect(0, 0, rect.width, rect.height);

  if (now - lastBurst > 420 && now < animationUntil) {
    createFirework(
      rect.width * (0.15 + Math.random() * 0.7),
      rect.height * (0.12 + Math.random() * 0.45)
    );
    lastBurst = now;
  }

  particles = particles.filter(p => p.alpha > 0.02);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.025;
    p.vx *= 0.99;
    p.vy *= 0.99;
    p.alpha -= p.decay;

    ctx.globalAlpha = Math.max(0, p.alpha);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.globalAlpha = 1;

  if (now < animationUntil || particles.length > 0) {
    animationFrame = requestAnimationFrame(animateFireworks);
  } else {
    animationFrame = null;
    ctx.clearRect(0, 0, rect.width, rect.height);
  }
}

function launchFireworks() {
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return;

  animationUntil = performance.now() + 5500;

  if (animationFrame === null) {
    lastBurst = 0;
    animationFrame = requestAnimationFrame(animateFireworks);
  }
}

document.getElementById("fireworksButton").addEventListener("click", () => {
  launchFireworks();
});

// One initial burst when the final section is reached.
let finalTriggered = false;

const finalObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !finalTriggered) {
    finalTriggered = true;
    launchFireworks();
  }
}, { threshold: 0.4 });

finalObserver.observe(document.getElementById("final"));


// =====================================
// PERSONALISATION SETTINGS
// =====================================

document.getElementById("secretTitle").textContent =
  "You found the secret!";
