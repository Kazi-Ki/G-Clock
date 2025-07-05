let themeIndex = 0;
const themes = [
  { bg: "#f5f5f5", text: "#202124" }, // Light
  { bg: "#202124", text: "#e8eaed" }, // Dark
  { bg: "#e3f2fd", text: "#0d47a1" }, // Blue
];

function updateClock() {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, '0');
  const m = now.getMinutes().toString().padStart(2, '0');
  const s = now.getSeconds().toString().padStart(2, '0');
  document.getElementById('digital-clock').textContent = `${h}:${m}:${s}`;
  drawAnalogClock(now);
}

function toggleTheme() {
  themeIndex = (themeIndex + 1) % themes.length;
  const t = themes[themeIndex];
  document.body.style.setProperty('--bg-color', t.bg);
  document.body.style.setProperty('--text-color', t.text);
}

function changeFont(font) {
  document.body.style.setProperty('--font-family', `'${font}', sans-serif`);
}

function changeDesign(mode) {
  const clock = document.getElementById('digital-clock');
  const analog = document.getElementById('analog-clock');

  document.body.style.justifyContent = mode.includes("top") ? "flex-start" : "center";
  clock.style.marginTop = mode.includes("top") ? "5vh" : "0";

  if (mode.startsWith("analog")) {
    clock.style.display = "none";
    analog.style.display = "block";
  } else {
    clock.style.display = "block";
    analog.style.display = "none";
  }
}

function changeTool(tool) {
  // 今後タイマーやストップウォッチを実装する用
  if (tool !== "clock") {
    alert("この機能は現在開発中です！");
  }
}

function drawAnalogClock(now) {
  const canvas = document.getElementById("analog-clock");
  const ctx = canvas.getContext("2d");
  const radius = canvas.height / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.translate(radius, radius);
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.95, 0, 2 * Math.PI);
  ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--text-color');
  ctx.lineWidth = 8;
  ctx.stroke();
  ctx.rotate(-now.getSeconds() * Math.PI / 30);
  ctx.rotate(now.getSeconds() * Math.PI / 30);
  ctx.translate(-radius, -radius);

  ctx.translate(radius, radius);
  const hour = now.getHours() % 12;
  const minute = now.getMinutes();
  const second = now.getSeconds();

  drawHand(ctx, (hour + minute / 60) * 30 * Math.PI / 180, radius * 0.5, 6);
  drawHand(ctx, (minute + second / 60) * 6 * Math.PI / 180, radius * 0.7, 4);
  drawHand(ctx, second * 6 * Math.PI / 180, radius * 0.9, 2, true);
  ctx.translate(-radius, -radius);
}

function drawHand(ctx, pos, length, width, isSecond = false) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.strokeStyle = isSecond ? "red" : getComputedStyle(document.body).getPropertyValue('--text-color');
  ctx.stroke();
  ctx.rotate(-pos);
}

setInterval(updateClock, 1000);
updateClock();
