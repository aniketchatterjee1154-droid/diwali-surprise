
/* ==========================================
   SHRIYA'S DIWALI SURPRISE ❤️
   Complete JavaScript
========================================== */


/* ==========================================
   1. PERSONALISATION
========================================== */

const CONFIG = {
  herName: "Shriya",

  secretTitle: "One little promise ❤️",

  secretMessage:
    "No matter how many Diwalis come and go, I hope I get to celebrate many more of them with you. More laughter, more adventures, more memories and more reasons to choose each other. ❤️"
};

document.getElementById("herName").textContent = CONFIG.herName;


/* ==========================================
   2. SMOOTH NAVIGATION
========================================== */

const beginButton = document.getElementById("beginButton");

beginButton.addEventListener("click", () => {
  document.getElementById("diyas").scrollIntoView({
    behavior: "smooth"
  });
});


/* ==========================================
   3. INTERACTIVE DIYAS
========================================== */

const wishMessages = {
  happiness:
    "May your life always be filled with happiness and laughter. ❤️",

  love:
    "May you always feel loved, appreciated and cherished. ♡",

  dreams:
    "May every dream you have find its way to becoming reality. ✨"
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


/* ==========================================
   4. ANIMATED LOVE LETTER
========================================== */

const letterButton = document.getElementById("letterButton");
const letterCard = document.getElementById("letterCard");
const letterContent = document.getElementById("letterContent");

if (letterButton && letterCard && letterContent) {

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

}


/* ==========================================
   5. BACKGROUND MUSIC
========================================== */

const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const musicLabel = document.getElementById("musicLabel");

if (music && musicButton) {

  musicButton.addEventListener("click", async () => {

    if (music.paused) {

      try {

        await music.play();

        musicLabel.textContent = "Pause music";

        musicButton.setAttribute(
          "aria-label",
          "Pause background music"
        );

      } catch (error) {

        musicLabel.textContent = "Music unavailable";

        console.error("Music playback failed:", error);

      }

    } else {

      music.pause();

      musicLabel.textContent = "Play music";

      musicButton.setAttribute(
        "aria-label",
        "Play background music"
      );

    }

  });

  music.addEventListener("error", () => {
    musicLabel.textContent = "Music unavailable";
  });

}


/* ==========================================
   6. SECRET SURPRISE
========================================== */

const secretButton = document.getElementById("secretButton");
const secretTitle = document.getElementById("secretTitle");
const secretMessage = document.getElementById("secretMessage");

if (secretButton) {

  secretButton.addEventListener("click", () => {

    secretTitle.textContent = CONFIG.secretTitle;
    secretMessage.textContent = CONFIG.secretMessage;

    secretButton.textContent = "Surprise revealed ❤️";
    secretButton.disabled = true;
    secretButton.style.opacity = "0.65";

  });

}


/* ==========================================
   7. FIREWORKS CANVAS SETUP
========================================== */

const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;

let particles = [];

let animationFrame = null;
let animationUntil = 0;
let lastBurst = 0;

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;


function resizeCanvas() {

  if (!canvas || !ctx) return;

  const rect = canvas.getBoundingClientRect();

  const dpr = Math.min(
    window.devicePixelRatio || 1,
    2
  );

  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


/* ==========================================
   8. CREATE FIREWORK PARTICLES
========================================== */

function createFirework(x, y) {

  const colors = [
    "#FFD27D",
    "#FFAD68",
    "#F8E6B8",
    "#F48C8C",
    "#FFE7A0"
  ];

  const color = colors[
    Math.floor(Math.random() * colors.length)
  ];

  const particleCount = reducedMotion ? 25 : 65;

  for (let i = 0; i < particleCount; i++) {

    const angle = Math.random() * Math.PI * 2;

    const speed = 1.2 + Math.random() * 4;

    particles.push({

      x: x,
      y: y,

      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,

      alpha: 1,

      decay: 0.009 + Math.random() * 0.012,

      color: color

    });

  }

}


/* ==========================================
   9. FIREWORK ANIMATION
========================================== */

function animateFireworks(now) {

  if (!canvas || !ctx) return;

  const rect = canvas.getBoundingClientRect();

  ctx.clearRect(
    0,
    0,
    rect.width,
    rect.height
  );

  // Generate fireworks only during the active show.

  if (
    now - lastBurst > (reducedMotion ? 1500 : 420) &&
    now < animationUntil
  ) {

    createFirework(
      rect.width * (0.15 + Math.random() * 0.7),

      rect.height * (0.12 + Math.random() * 0.45)
    );

    lastBurst = now;

  }


  // Animate individual particles.

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

    ctx.arc(
      p.x,
      p.y,
      2,
      0,
      Math.PI * 2
    );

    ctx.fill();

  });

  ctx.globalAlpha = 1;


  // Continue until the show and all particles finish.

  if (now < animationUntil || particles.length > 0) {

    animationFrame = requestAnimationFrame(animateFireworks);

  } else {

    animationFrame = null;

    ctx.clearRect(
      0,
      0,
      rect.width,
      rect.height
    );

  }

}


/* ==========================================
   10. LAUNCH FIREWORKS
========================================== */

function launchFireworks() {

  if (!canvas || !ctx) return;

  const rect = canvas.getBoundingClientRect();

  if (!rect.width || !rect.height) return;

  const now = performance.now();

  animationUntil = now + (reducedMotion ? 1800 : 6500);

  if (animationFrame === null) {

    lastBurst = 0;

    animationFrame = requestAnimationFrame(
      animateFireworks
    );

  }

}


/* ==========================================
   11. FINAL LOVE REVEAL
========================================== */

const fireworksButton = document.getElementById("fireworksButton");

const finalContent = document.getElementById("finalContent");

const loveReveal = document.getElementById("loveReveal");


if (fireworksButton && finalContent && loveReveal) {

  fireworksButton.addEventListener("click", () => {

    // Hide the original Diwali greeting.

    finalContent.classList.add("hidden");

    // Reveal the dedicated romantic screen.

    loveReveal.classList.add("active");

    // Launch the fireworks behind the message.

    launchFireworks();

  });

}


/* ==========================================
   END OF SCRIPT
========================================== */
