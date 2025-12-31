'use strict';

const canvas = document.getElementById('sorobanCanvas');
const ctx = canvas.getContext('2d');
const valueLabel = document.getElementById('value');

const RODS = 13;
const BEADS_PER_ROD = 5; // 1 heaven + 4 earth
const ROD_WIDTH = 60;
const BEAD_RADIUS = 14;
const BAR_Y_RATIO = 0.45;

let rods = [];

// ================= RESIZE =================

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// ================= DATA =================

function createRods() {
  rods = [];
  for (let i = 0; i < RODS; i++) {
    rods.push({
      heaven: false,      // 5
      earth: 0            // 0–4
    });
  }
}
createRods();

// ================= DRAW =================

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const barY = canvas.height * BAR_Y_RATIO;
  ctx.fillRect(0, barY, canvas.width, 4);

  rods.forEach((rod, i) => {
    const x = canvas.width - (i + 1) * ROD_WIDTH;

    // Rod line
    ctx.fillRect(x + ROD_WIDTH / 2, 40, 4, canvas.height - 80);

    // Heaven bead
    drawBead(
      x + ROD_WIDTH / 2,
      rod.heaven ? barY - 30 : barY - 70
    );

    // Earth beads
    for (let j = 0; j < 4; j++) {
      const active = j < rod.earth;
      drawBead(
        x + ROD_WIDTH / 2,
        barY + 30 + j * 30 - (rod.earth * 30),
        active
      );
    }
  });

  updateValue();
}

function drawBead(x, y, active = false) {
  ctx.beginPath();
  ctx.arc(x, y, BEAD_RADIUS, 0, Math.PI * 2);
  ctx.fillStyle = active ? '#ff9800' : '#999';
  ctx.fill();
}

// ================= VALUE =================

function updateValue() {
  let value = 0;
  rods.forEach((rod, i) => {
    let digit = rod.earth + (rod.heaven ? 5 : 0);
    value += digit * Math.pow(10, i);
  });
  valueLabel.textContent = value.toString();
}

// ================= INPUT =================

canvas.addEventListener('click', e => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const rodIndex = Math.floor((canvas.width - x) / ROD_WIDTH);
  if (rodIndex < 0 || rodIndex >= RODS) return;

  const barY = canvas.height * BAR_Y_RATIO;

  // Heaven toggle
  if (y < barY - 20) {
    rods[rodIndex].heaven = !rods[rodIndex].heaven;
  }
  // Earth beads
  else if (y > barY + 20) {
    let count = Math.floor((y - barY) / 30);
    rods[rodIndex].earth = Math.min(4, Math.max(0, count));
  }

  draw();
});

// ================= INIT =================

draw();
