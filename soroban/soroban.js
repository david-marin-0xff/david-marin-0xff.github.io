// ================= BASIC SETUP =================

const canvas = document.getElementById('sorobanCanvas');
const ctx = canvas.getContext('2d');
const themeSelect = document.getElementById('themeSelect');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// ================= THEMES =================

const Themes = {
  ClassicWood: {
    background: '#f5ebdc',
    rod: '#8b4513',
    bead: '#ffe4c4',
    beadActive: '#a0522d',
    bar: '#8b4513'
  },
  Dark: {
    background: '#000000',
    rod: '#808080',
    bead: '#696969',
    beadActive: '#ff9800',
    bar: '#a9a9a9'
  },
  BlueSteel: {
    background: '#f5f5f5',
    rod: '#000080',
    bead: '#b0c4de',
    beadActive: '#ffd700',
    bar: '#000080'
  },
  Jade: {
    background: '#f0fff0',
    rod: '#006400',
    bead: '#98fb98',
    beadActive: '#228b22',
    bar: '#006400'
  },
  Crimson: {
    background: '#ffe4e1',
    rod: '#8b0000',
    bead: '#f08080',
    beadActive: '#b22222',
    bar: '#8b0000'
  },
  Solarized: {
    background: '#fdf6e3',
    rod: '#8b4513',
    bead: '#eee8aa',
    beadActive: '#ff4500',
    bar: '#8b4513'
  },
  Midnight: {
    background: '#0f0f1e',
    rod: '#6a5acd',
    bead: '#4682b4',
    beadActive: '#00ffff',
    bar: '#6a5acd'
  },
  Ivory: {
    background: '#fffff0',
    rod: '#a0522d',
    bead: '#ffe4c4',
    beadActive: '#cd853f',
    bar: '#a0522d'
  },
  HighContrast: {
    background: '#ffffff',
    rod: '#000000',
    bead: '#ffffff',
    beadActive: '#ff0000',
    bar: '#000000'
  },
  Retro: {
    background: '#ffffe0',
    rod: '#800000',
    bead: '#d2b48c',
    beadActive: '#ff8c00',
    bar: '#800000'
  }
};

let currentTheme = Themes.ClassicWood;

// ================= THEME APPLY =================

function applyTheme(name) {
  currentTheme = Themes[name] || Themes.ClassicWood;

  document.body.style.background = currentTheme.background;
  canvas.style.background = currentTheme.background;

  drawPlaceholder();
}

themeSelect.addEventListener('change', () => {
  applyTheme(themeSelect.value);
});

// ================= PLACEHOLDER DRAW =================

function drawPlaceholder() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw center bar
  ctx.fillStyle = currentTheme.bar;
  ctx.fillRect(
    canvas.width * 0.1,
    canvas.height / 2 - 5,
    canvas.width * 0.8,
    10
  );

  // Title text
  ctx.fillStyle = currentTheme.rod;
  ctx.font = '28px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(
    'Soroban Trainer (Web)',
    canvas.width / 2,
    canvas.height / 2 - 40
  );
}

// ================= INIT =================

applyTheme(themeSelect.value);
