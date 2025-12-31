'use strict';

/* ===== DOM ===== */

const canvas = document.getElementById('sorobanCanvas');
const ctx = canvas.getContext('2d');

const valueLabel = document.getElementById('value');
const fontSlider = document.getElementById('fontSize');
const themeSelect = document.getElementById('theme');
const resetBtn = document.getElementById('reset');

/* ===== RESIZE ===== */

function resize() {
  const topbar = document.getElementById('topbar');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - topbar.offsetHeight;
}

/* ===== DRAW ===== */

function draw() {
  // APPLY FONT SIZE EVERY TIME (THIS IS THE FIX)
  valueLabel.style.fontSize = fontSlider.value + 'px';

  // Background
  ctx.fillStyle = themeSelect.value === 'dark'
    ? '#000'
    : '#2b1b0f';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Middle bar
  const barY = canvas.height * 0.45;
  ctx.fillStyle = '#888';
  ctx.fillRect(0, barY, canvas.width, 4);

  // Test rod (center)
  ctx.fillStyle = '#bbb';
  ctx.fillRect(canvas.width / 2 - 2, 40, 4, canvas.height - 80);
}

/* ===== EVENTS ===== */

fontSlider.addEventListener('input', draw);
themeSelect.addEventListener('change', draw);

resetBtn.addEventListener('click', () => {
  valueLabel.textContent = '0';
  draw();
});

window.addEventListener('resize', () => {
  resize();
  draw();
});

window.addEventListener('load', () => {
  resize();
  draw();
});
