const screens = {
  intro: document.querySelector('[data-screen="intro"]'),
  clouds: document.querySelector('[data-screen="clouds"]'),
  hearts: document.querySelector('[data-screen="hearts"]'),
  finale: document.querySelector('[data-screen="finale"]'),
};

const cloudArea = document.querySelector("[data-cloud-area]");
const heartArea = document.querySelector("[data-heart-area]");
const messageBubble = document.querySelector("[data-message]");

const cloudCount = document.querySelector("[data-cloud-count]");
const cloudTotal = document.querySelector("[data-cloud-total]");
const heartCount = document.querySelector("[data-heart-count]");
const heartTotal = document.querySelector("[data-heart-total]");

const cloudPositions = [
  { x: 16, y: 24, size: 92 },
  { x: 36, y: 36, size: 108 },
  { x: 58, y: 28, size: 96 },
  { x: 78, y: 43, size: 104 },
  { x: 24, y: 66, size: 102 },
  { x: 52, y: 70, size: 116 },
];

const heartPositions = [
  { x: 16, y: 34, size: 60 },
  { x: 32, y: 62, size: 66 },
  { x: 49, y: 38, size: 58 },
  { x: 65, y: 66, size: 64 },
  { x: 78, y: 34, size: 60 },
  { x: 24, y: 78, size: 58 },
  { x: 52, y: 82, size: 62 },
  { x: 84, y: 78, size: 58 },
];

const messages = [
  "Estoy muy orgulloso de vos.",
  "Aunque hoy fue difícil, lo hiciste igual.",
  "Sos muy fuerte mi amor, qué linda sos <3",
  "Te amo muchísimo.",
  "Gracias por seguir, incluso con estrés y pocas ganas.",
  "Para mí, hoy ya ganaste.",
  "Merecés descansar y venir a despejarte conmigo.",
  "Qué lindo tu esfuerzo de hoy bb, te pasaste.",
];

let clearedClouds = 0;
let enlargedHearts = 0;

function showScreen(name) {
  Object.values(screens).forEach((screen) => screen.classList.remove("active"));
  screens[name].classList.add("active");
}

function createSparkle(x, y, parent) {
  const sparkle = document.createElement("span");
  sparkle.className = "sparkle";
  sparkle.style.left = `${x}%`;
  sparkle.style.top = `${y}%`;
  parent.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 850);
}

function buildClouds() {
  cloudArea.innerHTML = "";
  clearedClouds = 0;
  cloudTotal.textContent = cloudPositions.length;
  cloudCount.textContent = clearedClouds;

  cloudPositions.forEach((cloud, index) => {
    const button = document.createElement("button");
    button.className = "cloud";
    button.type = "button";
    button.setAttribute("aria-label", "Convertir nube fea en estrella");
    button.style.left = `${cloud.x}%`;
    button.style.top = `${cloud.y}%`;
    button.style.setProperty("--size", `${cloud.size}px`);

    button.addEventListener(
      "click",
      () => {
        button.classList.add("done");
        button.disabled = true;
        createSparkle(cloud.x, cloud.y, cloudArea);
        clearedClouds += 1;
        cloudCount.textContent = clearedClouds;

        if (clearedClouds === cloudPositions.length) {
          setTimeout(startHearts, 900);
        }
      },
      { once: true }
    );

    button.style.animationDelay = `${index * 90}ms`;
    cloudArea.appendChild(button);
  });
}

function buildHearts() {
  heartArea.innerHTML = "";
  enlargedHearts = 0;
  heartTotal.textContent = heartPositions.length;
  heartCount.textContent = enlargedHearts;
  messageBubble.textContent = "Tocá un corazón para recibir amorcito.";

  heartPositions.forEach((heart, index) => {
    const button = document.createElement("button");
    button.className = "heart";
    button.type = "button";
    button.setAttribute("aria-label", "Enormizar corazón");
    button.style.left = `${heart.x}%`;
    button.style.top = `${heart.y}%`;
    button.style.setProperty("--size", `${heart.size}px`);

    button.addEventListener(
      "click",
      () => {
        button.classList.add("done");
        button.disabled = true;
        createSparkle(heart.x, heart.y, heartArea);
        messageBubble.textContent = messages[index];
        messageBubble.classList.remove("pop");
        void messageBubble.offsetWidth;
        messageBubble.classList.add("pop");
        enlargedHearts += 1;
        heartCount.textContent = enlargedHearts;

        if (enlargedHearts === heartPositions.length) {
          setTimeout(() => showScreen("finale"), 1300);
        }
      },
      { once: true }
    );

    heartArea.appendChild(button);
  });
}

function startClouds() {
  buildClouds();
  showScreen("clouds");
}

function startHearts() {
  buildHearts();
  showScreen("hearts");
}

document.querySelector("[data-start]").addEventListener("click", startClouds);
document.querySelector("[data-restart]").addEventListener("click", () => {
  showScreen("intro");
});
