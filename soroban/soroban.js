'use strict';

/* ================= DOM ================= */

const canvas = document.getElementById('sorobanCanvas');
const ctx = canvas.getContext('2d');

const valueLabel  = document.getElementById('value');
const fontSlider  = document.getElementById('fontSize');
const themeSelect = document.getElementById('theme');
const middleUnits = document.getElementById('middleUnits');
const resetBtn    = document.getElementById('reset');

/* ================= CONFIG ================= */

const RODS = 13;
const ROD_WIDTH = 60;
const BEAD_RADIUS = 14;
const BAR_RATIO = 0.45;

/* ================= STATE ================= */

let rods = [];

/* ================= SAFE RESIZE ================= */

function resizeCanvas() {
  const topbar = document.getElementById('topbar');
  const topHeight = topbar ? topbar.offsetHeight : 0;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - topHeight;
}

/* ================= INIT ================= */

function initRods() {
  rods = [];
  for (let i = 0; i < RODS; i++) {
    rods.push({ heaven: false, earth: 0 });
  }
}

/* ================= DRAW ================= */

function draw() {
  // Background
  ctx.fillStyle = themeSelect.value === 'dark' ? '#000' : '#2b1b0f';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const barY = canvas.height * BAR_RATIO;

  // Middle bar
  ctx.fillStyle = '#666';
  ctx.fillRect(0, barY, canvas.width, 4);

  rods.forEach((rod, i) => {
    const x = canvas.width - (i + 1) * ROD_WIDTH + ROD_WIDTH / 2;

    // Rod
    ctx.fillStyle = '#888';
    ctx.fillRect(x - 2, 30, 4, canvas.height - 60);

    // Heaven bead
    drawBead(
      x,
      rod.heaven ? barY - 30 : barY - 70,
      rod.heaven
    );

    // Earth beads
    for (let j = 0; j < 4; j++) {
      const active = j < rod.earth;
      drawBead(
        x,
        barY + 30 + j * 30 - rod.earth * 30,
        active
      );
    }
  });

  updateValue();
}

function drawBead(x, y, active) {
  ctx.beginPath();
  ctx.arc(x, y, BEAD_RADIUS, 0, Math.PI * 2);
  ctx.fillStyle = active ? '#ff9800' : '#bbb';
  ctx.fill();
}

/* ================= VALUE ================= */

function updateValue() {
  let total = 0;
  const mid = Math.floor(RODS / 2);

  rods.forEach((rod, i) => {
    const digit = rod.earth + (rod.heaven ? 5 : 0);
    const power = middleUnits.checked ? (mid - i) : i;
    total += digit * Math.pow(10, power);
  });

  valueLabel.textContent = middleUnits.checked
    ? total.toFixed(3).replace(/\.?0+$/, '')
    : total.toString();

  valueLabel.style.fontSize = fontSlider.value + 'px';
}

/* ================= INPUT ================= */

canvas.addEventListener('click', e => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const rodIndex = Math.floor((canvas.width - x) / ROD_WIDTH);
  if (rodIndex < 0 || rodIndex >= RODS) return;

  const barY = canvas.height * BAR_RATIO;

  // Heaven bead
  if (y < barY - 20) {
    rods[rodIndex].heaven = !rods[rodIndex].heaven;
  }
  // Earth beads
  else if (y > barY + 20) {
    const count = Math.floor((y - barY) / 30);
    rods[rodIndex].earth = Math.max(0, Math.min(4, count));
  }

  draw();
});

/* ================= CONTROLS ================= */

fontSlider.addEventListener('input', draw);
themeSelect.addEventListener('change', draw);
middleUnits.addEventListener('change', draw);

resetBtn.addEventListener('click', () => {
  rods.forEach(r => {
    r.heaven = false;
    r.earth = 0;
  });
  draw();
});

/* ================= SAFE START ================= */

window.addEventListener('load', () => {
  initRods();
  resizeCanvas();
  draw();
});

window.addEventListener('resize', () => {
  resizeCanvas();
  draw();
});
