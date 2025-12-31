'use strict';

/* ========= DOM ========= */

const canvas = document.getElementById('sorobanCanvas');
const ctx = canvas.getContext('2d');

const valueLabel = document.getElementById('value');
const fontSlider = document.getElementById('fontSize');
const themeSelect = document.getElementById('theme');
const resetBtn = document.getElementById('reset');
const topbar = document.getElementById('topbar');

/* ========= STATE ========= */

const rods = 9;
let columns = [];

/* ========= INIT ========= */

function initSoroban() {
  columns = [];
  for (let i = 0; i < rods; i++) {
    columns.push({
      heaven: false, // 5
      earth: 0       // 0–4
    });
  }
  updateValue();
}

/* ========= RESIZE ========= */

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - topbar.offsetHeight;
}

/* ========= VALUE ========= */

function updateValue() {
  let total = 0;
  for (let r = 0; r < rods; r++) {
    let v = columns[r].earth + (columns[r].heaven ? 5 : 0);
    total += v * Math.pow(10, rods - r - 1);
  }
  valueLabel.textContent = total.toString();
}

/* ========= DRAW ========= */

function draw() {
  valueLabel.style.fontSize = fontSlider.value + 'px';

  ctx.fillStyle = themeSelect.value === 'dark' ? '#000' : '#2b1b0f';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const spacing = canvas.width / (rods + 1);
  const barY = canvas.height * 0.45;
  const r = Math.min(spacing * 0.25, 22);

  // Middle bar
  ctx.fillStyle = '#aaa';
  ctx.fillRect(0, barY, canvas.width, 4);

  for (let i = 0; i < rods; i++) {
    const x = spacing * (i + 1);

    // Rod
    ctx.fillStyle = '#bbb';
    ctx.fillRect(x - 2, 40, 4, canvas.height - 80);

    // Heaven bead
    const hy = columns[i].heaven ? barY - r - 8 : 80;
    drawBead(x, hy, r);

    // Earth beads (stacked — NO GAPS)
    for (let e = 0; e < 4; e++) {
      const active = e < columns[i].earth;
      const y = active
        ? barY + r + 8 + e * (r * 2 + 6)
        : canvas.height - 80 - e * (r * 2 + 6);
      drawBead(x, y, r);
    }
  }
}

/* ========= BEAD ========= */

function drawBead(x, y, r) {
  const g = ctx.createRadialGradient(x - r / 3, y - r / 3, r / 4, x, y, r);
  g.addColorStop(0, '#fff1b8');
  g.addColorStop(1, '#b88b3c');

  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

/* ========= CLICK ========= */

canvas.addEventListener('click', e => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const spacing = canvas.width / (rods + 1);
  const barY = canvas.height * 0.45;
  const r = Math.min(spacing * 0.25, 22);

  for (let i = 0; i < rods; i++) {
    const cx = spacing * (i + 1);

    // Heaven bead
    const hy = columns[i].heaven ? barY - r - 8 : 80;
    if (Math.hypot(x - cx, y - hy) < r) {
      columns[i].heaven = !columns[i].heaven;
      updateValue();
      draw();
      return;
    }

    // Earth area (set count based on click height)
    if (Math.abs(x - cx) < r * 1.5 && y > barY) {
      const offset = y - (barY + r + 8);
      const idx = Math.floor(offset / (r * 2 + 6)) + 1;
      columns[i].earth = Math.max(0, Math.min(4, idx));
      updateValue();
      draw();
      return;
    }
  }
});

/* ========= EVENTS ========= */

fontSlider.addEventListener('input', draw);
themeSelect.addEventListener('change', draw);

resetBtn.addEventListener('click', () => {
  initSoroban();
  draw();
});

window.addEventListener('resize', () => {
  resize();
  draw();
});

window.addEventListener('load', () => {
  resize();
  initSoroban();
  draw();
});
