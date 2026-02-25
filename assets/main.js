// ================== CONFIGURACIÓN ==================
const LINES = [
  "Bienvenido a ZeroDay Shield",
  "Proyecto académico de ciberseguridad",
  "Aprendiendo hoy para proteger el mañana"
];

const TYPE_SPEED_MS = 70;
const LINE_PAUSE_MS = 600;
const START_DELAY_MS = 400;
const LOOP = false;
// ====================================================


// Detecta reduced motion (accesibilidad)
const prefersReduced =
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const sleep = (ms) => new Promise(r => setTimeout(r, ms));


// ================== EFECTO TYPEWRITER ==================
async function typeText(el, text) {
  for (let i = 1; i <= text.length; i++) {
    el.textContent = text.slice(0, i);
    await sleep(TYPE_SPEED_MS);
  }
}

async function runTyper() {
  const host = document.getElementById('typer');
  if (!host) return; // 🔹 evita errores si no existe

  do {
    host.textContent = '';
    await sleep(START_DELAY_MS);

    if (prefersReduced) {
      host.innerHTML = LINES.join('<br>');
    } else {
      for (let i = 0; i < LINES.length; i++) {
        const lineSpan = document.createElement('span');
        host.appendChild(lineSpan);

        await typeText(lineSpan, LINES[i]);

        if (i < LINES.length - 1) {
          await sleep(LINE_PAUSE_MS);
          host.appendChild(document.createElement('br'));
        }
      }
    }

    if (LOOP) {
      await sleep(900);
    }

  } while (LOOP);
}


// ================== SISTEMA DE PESTAÑAS ==================
function showTab(tabId) {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => tab.classList.remove('active'));

  const target = document.getElementById(tabId);
  if (target) target.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}


// ================== CONTADOR OPCIONAL ==================
const targetDate = new Date("2026-06-11T15:00:00");

function updateCountdown() {
  const container = document.getElementById("countdown");
  if (!container) return; // 🔹 evita errores si no existe

  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    container.innerHTML = "<p>La fecha ha llegado.</p>";
    return;
  }

  const totalSec = Math.floor(diff / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;

  container.innerHTML = `
    <p>
      ${days}d ${hours}h ${minutes}m ${seconds}s
    </p>
  `;
}


// ================== INICIO ==================
document.addEventListener("DOMContentLoaded", () => {
  runTyper();
  updateCountdown();
  setInterval(updateCountdown, 1000);
});

