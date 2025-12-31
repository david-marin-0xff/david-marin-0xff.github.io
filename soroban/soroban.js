const canvas = document.getElementById("soroban");
const ctx = canvas.getContext("2d");

/* ===== CONFIG ===== */
const COLUMNS = 9;
const LOWER_BEADS = 4;
const BEAD_RADIUS = 18;
const COLUMN_SPACING = 90;
const BEAD_SPACING = 38;

let rods = [];
let beamY;
let dragging = null;

/* ===== RESIZE ===== */
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 80;
  beamY = canvas.height / 2;
}
window.addEventListener("resize", resize);
resize();

/* ===== INIT ===== */
function init() {
  rods = Array.from({ length: COLUMNS }, () => ({
    upper: 0, // 0 or 1
    lower: 0  // 0–4
  }));
}
init();

/* ===== DRAW LOOP ===== */
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background
  const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
  bg.addColorStop(0, "#3a240f");
  bg.addColorStop(1, "#140b05");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Beam
  ctx.strokeStyle = "#ddd";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, beamY);
  ctx.lineTo(canvas.width, beamY);
  ctx.stroke();

  rods.forEach((rod, i) => {
    const x = (i + 1) * COLUMN_SPACING;

    // Rod
    ctx.strokeStyle = "#eee";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x, 40);
    ctx.lineTo(x, canvas.height - 40);
    ctx.stroke();

    // Upper bead (snaps only)
    const upperY = rod.upper
      ? beamY - BEAD_SPACING
      : beamY - BEAD_SPACING * 2;
    drawBead(x, upperY);

    // Lower beads
    for (let b = 0; b < LOWER_BEADS; b++) {
      const y =
        beamY +
        BEAD_SPACING +
        (b - rod.lower) * BEAD_SPACING;
      drawBead(x, y);
    }
  });

  requestAnimationFrame(draw);
}

function drawBead(x, y) {
  const g = ctx.createRadialGradient(
    x - 6, y - 6, 6,
    x, y, BEAD_RADIUS
  );
  g.addColorStop(0, "#ffe6a0");
  g.addColorStop(1, "#c9972f");

  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, BEAD_RADIUS, 0, Math.PI * 2);
  ctx.fill();
}

/* ===== INTERACTION ===== */
canvas.addEventListener("mousedown", e => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  rods.forEach((rod, i) => {
    const x = (i + 1) * COLUMN_SPACING;

    // Upper bead
    const uy = rod.upper
      ? beamY - BEAD_SPACING
      : beamY - BEAD_SPACING * 2;

    if (Math.hypot(mx - x, my - uy) < BEAD_RADIUS) {
      dragging = { type: "upper", index: i };
    }

    // Lower beads
    for (let b = 0; b < LOWER_BEADS; b++) {
      const y =
        beamY +
        BEAD_SPACING +
        (b - rod.lower) * BEAD_SPACING;

      if (Math.hypot(mx - x, my - y) < BEAD_RADIUS) {
        dragging = { type: "lower", index: i };
      }
    }
  });
});

canvas.addEventListener("mouseup", e => {
  if (!dragging) return;

  const rect = canvas.getBoundingClientRect();
  const my = e.clientY - rect.top;
  const rod = rods[dragging.index];

  if (dragging.type === "upper") {
    rod.upper = my > beamY - BEAD_SPACING * 1.5 ? 1 : 0;
  } else {
    const relative = beamY + BEAD_SPACING - my;
    rod.lower = Math.max(
      0,
      Math.min(
        LOWER_BEADS,
        Math.round(relative / BEAD_SPACING)
      )
    );
  }

  dragging = null;
});

/* ===== START ===== */
draw();
