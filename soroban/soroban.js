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

const rods = 9;               // number of columns
const beadsPerRod = 5;        // 1 heaven + 4 earth
let beads = [];               // bead positions

/* ========= INIT ========= */

function initBeads() {
  beads = [];
  for (let r = 0; r < rods; r++) {
    beads[r] = {
      heaven: false,          // false = up, true = down (counts as 5)
      earth: [false, false, false, false] // false = down, true = up
    };
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
    let colValue = 0;
    if (beads[r].heaven) colValue += 5;
    beads[r].earth.forEach(b => { if (b) colValue += 1; });

    total += colValue * Math.pow(10, rods - r - 1);
  }

  valueLabel.textContent = total.toString();
}

/* ========= DRAW ========= */

function draw() {
  valueLabel.style.fontSize = fontSlider.value + 'px';

  // Background
  ctx.fillStyle = themeSelect.value === 'dark' ? '#000' : '#2b1b0f';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const spacing = canvas.width / (rods + 1);
  const barY = canvas.height * 0.45;
  const beadRadius = Math.min(spacing * 0.25, 22);

  // Middle bar
  ctx.fillStyle = '#888';
  ctx.fillRect(0, barY, canvas.width, 4);

  for (let r = 0; r < rods; r++) {
    const x = spacing * (r + 1);

    // Rod
    ctx.fillStyle = '#aaa';
    ctx.fillRect(x - 2, 40, 4, canvas.height - 80);

    // Heaven bead
    const heavenY = beads[r].heaven ? barY - beadRadius - 8 : 80;
    drawBead(x, heavenY, beadRadius);

    // Earth beads
    for (let i = 0; i < 4; i++) {
      const earthY = beads[r].earth[i]
        ? barY + beadRadius + 8 + i * (beadRadius * 2 + 6)
        : canvas.height - 80 - i * (beadRadius * 2 + 6);
      drawBead(x, earthY, beadRadius);
    }
  }
}

/* ========= BEAD ========= */

function drawBead(x, y, r) {
  const grad = ctx.createRadialGradient(x - r / 3, y - r / 3, r / 4, x, y, r);
  grad.addColorStop(0, '#fff2c2');
  grad.addColorStop(1, '#b68b3c');

  ctx.fillStyle = grad;
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
  const beadRadius = Math.min(spacing * 0.25, 22);

  for (let r = 0; r < rods; r++) {
    const bx = spacing * (r + 1);

    // Heaven bead
    let hy = beads[r].heaven ? barY - beadRadius - 8 : 80;
    if (Math.hypot(x - bx, y - hy) < beadRadius) {
      beads[r].heaven = !beads[r].heaven;
      updateValue();
      draw();
      return;
    }

    // Earth beads
    for (let i = 0; i < 4; i++) {
      let ey = beads[r].earth[i]
        ? barY + beadRadius + 8 + i * (beadRadius * 2 + 6)
        : canvas.height - 80 - i * (beadRadius * 2 + 6);

      if (Math.hypot(x - bx, y - ey) < beadRadius) {
        beads[r].earth[i] = !beads[r].earth[i];
        updateValue();
        draw();
        return;
      }
    }
  }
});

/* ========= EVENTS ========= */

fontSlider.addEventListener('input', draw);
themeSelect.addEventListener('change', draw);

resetBtn.addEventListener('click', () => {
  initBeads();
  draw();
});

window.addEventListener('resize', () => {
  resize();
  draw();
});

window.addEventListener('load', () => {
  resize();
  initBeads();
  draw();
});
