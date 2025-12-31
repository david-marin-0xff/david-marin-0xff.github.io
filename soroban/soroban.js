'use strict';

const canvas = document.getElementById('sorobanCanvas');
const ctx = canvas.getContext('2d');

const valueLabel = document.getElementById('value');
const fontSlider = document.getElementById('fontSize');
const themeSelect = document.getElementById('theme');
const resetBtn = document.getElementById('reset');

function resize() {
  const topbar = document.getElementById('topbar');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - topbar.offsetHeight;
}

function draw() {
  ctx.fillStyle = themeSelect.value === 'dark' ? '#000' : '#2b1b0f';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // TEST ROD
  ctx.fillStyle = '#aaa';
  ctx.fillRect(canvas.width / 2 - 2, 40, 4, canvas.height - 80);
}

fontSlider.addEventListener('input', () => {
  valueLabel.style.fontSize = fontSlider.value + 'px';
});

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
