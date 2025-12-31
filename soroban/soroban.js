// =====================
// CANVAS SETUP
// =====================
const canvas = document.getElementById("sorobanCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - document.querySelector(".topbar").offsetHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// =====================
// STATE
// =====================
const ROD_COUNT = 13;
const columns = Array.from({ length: ROD_COUNT }, () => ({
  heaven: false,
  earth: 0
}));

let fontSize = 28;
let theme = "ClassicWood";

// =====================
// THEMES
// =====================
const themes = {
  ClassicWood: {
    bg: "#2b1a0e",
    rod: "#cfcfcf",
    bead: "#f2d58a",
    bar: "#bfbfbf"
  },
  Dark: {
    bg: "#111",
    rod: "#666",
    bead: "#aaa",
    bar: "#777"
  }
};

// =====================
// DRAWING
// =====================
function drawBead(x, y, r) {
  const g = ctx.createRadialGradient(x - r / 3, y - r / 3, r / 3, x, y, r);
  g.addColorStop(0, "#fff6c7");
  g.addColorStop(1, themes[theme].bead);

  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

function draw() {
  const t = themes[theme];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = t.bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const spacing = canvas.width / (ROD_COUNT + 1);
  const barY = canvas.height / 2;
  const r = 18;

  // Bar
  ctx.strokeStyle = t.bar;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, barY);
  ctx.lineTo(canvas.width, barY);
  ctx.stroke();

  for (let i = 0; i < ROD_COUNT; i++) {
    const x = spacing * (i + 1);

    // Rod
    ctx.strokeStyle = t.rod;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x, barY - 220);
    ctx.lineTo(x, barY + 260);
    ctx.stroke();

    // Heaven bead
    const heavenY = columns[i].heaven ? barY - r - 8 : barY - 90;
    drawBead(x, heavenY, r);

    // Earth beads (FIXED SLOTS)
    const earthBase = barY + r + 12;
    const gap = r * 2 + 6;

    for (let e = 0; e < 4; e++) {
      const engaged = e < columns[i].earth;
      const y = engaged
        ? earthBase + e * gap
        : earthBase + 4 * gap + e * gap;

      drawBead(x, y, r);
    }
  }

  drawValue();
}

function drawValue() {
  let total = 0;
  for (let i = 0; i < ROD_COUNT; i++) {
    const power = ROD_COUNT - 1 - i;
    const val = (columns[i].heaven ? 5 : 0) + columns[i].earth;
    total += val * Math.pow(10, power);
  }

  ctx.fillStyle = "#fff";
  ctx.font = `bold ${fontSize}px Consolas, monospace`;
  ctx.textBaseline = "top";
  ctx.fillText(total.toString(), 20, 10);
}

// =====================
// INPUT
// =====================
canvas.addEventListener("mousedown", e => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const spacing = canvas.width / (ROD_COUNT + 1);
  const barY = canvas.height / 2;
  const r = 18;

  for (let i = 0; i < ROD_COUNT; i++) {
    const cx = spacing * (i + 1);

    // Heaven click
    if (Math.abs(x - cx) < r * 1.5 && y < barY) {
      columns[i].heaven = !columns[i].heaven;
      draw();
      return;
    }

    // Earth click (stable)
    if (Math.abs(x - cx) < r * 1.5 && y > barY) {
      const earthBase = barY + r + 12;
      const gap = r * 2 + 6;

      const clicked = Math.floor((y - earthBase) / gap) + 1;
      columns[i].earth = Math.max(0, Math.min(4, clicked));
      draw();
      return;
    }
  }
});

// =====================
// UI
// =====================
document.getElementById("fontSize").addEventListener("input", e => {
  fontSize = e.target.value;
  draw();
});

document.getElementById("themeSelect").addEventListener("change", e => {
  theme = e.target.value;
  draw();
});

document.getElementById("resetBtn").addEventListener("click", () => {
  columns.forEach(c => {
    c.heaven = false;
    c.earth = 0;
  });
  draw();
});

// =====================
// START
// =====================
draw();
