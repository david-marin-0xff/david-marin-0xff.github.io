'use strict';

// DOM references
const canvas = document.getElementById('soroban');
const ctx = canvas.getContext('2d');

const valueLabel = document.getElementById('value');
const fontSizeSlider = document.getElementById('fontSize');
const themeSelect = document.getElementById('theme');
const middleUnitsCheck = document.getElementById('middleUnits');
const resetButton = document.getElementById('reset');

// Resize canvas to fit container and device pixel ratio
function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

// Temporary draw placeholder
function drawPlaceholder() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = '20px Consolas';
  ctx.fillStyle = '#555';
  ctx.fillText('Soroban rendering will appear here', 20, 40);
}

// Event wiring
fontSizeSlider.addEventListener('input', () => {
  valueLabel.style.fontSize = fontSizeSlider.value + 'px';
});

resetButton.addEventListener('click', () => {
  console.log('Reset clicked');
});

themeSelect.addEventListener('change', () => {
  console.log('Theme changed:', themeSelect.value);
});

middleUnitsCheck.addEventListener('change', () => {
  console.log('Middle = Units:', middleUnitsCheck.checked);
});

// Initial setup
window.addEventListener('resize', () => {
  resizeCanvas();
  drawPlaceholder();
});

resizeCanvas();
drawPlaceholder();
