let themeIndex = 0;
const themes = [
  { bg: "#f5f5f5", text: "#202124" }, // デフォルト（ライト）
  { bg: "#202124", text: "#e8eaed" }, // ダーク
  { bg: "#e3f2fd", text: "#0d47a1" }, // Googleブルー
  { bg: "#ffebee", text: "#b71c1c" }, // レッド
  { bg: "#e8f5e9", text: "#1b5e20" }, // グリーン
  { bg: "#fff3e0", text: "#ef6c00" }, // オレンジ
];

const hiddenControls = document.getElementById("hiddenControls");
const settingsModal = document.getElementById("settingsModal");
const colorSelect = document.getElementById("colorSelect");
const fontSelect = document.getElementById("fontSelect");
const designSelect = document.getElementById("designSelect");

let currentTheme = 0;

function updateClock() {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, "0");
  const m = now.getMinutes().toString().padStart(2, "0");
  const s = now.getSeconds().toString().padStart(2, "0");
  document.getElementById("digital-clock").textContent = `${h}:${m}:${s}`;
  drawAnalogClock(now);
}

// 背景クリックでボタン表示
document.body.addEventListener("click", (e) => {
  if (e.target === document.body) {
    if (hiddenControls.style.display === "none") {
      hiddenControls.style.display = "flex";
      setTimeout(() => {
        hiddenControls.style.opacity = 1;
      }, 10);
    }
  }
});

function openSettings() {
  settingsModal.style.display = "flex";
}

function closeSettings() {
  settingsModal.style.display = "none";
}

// 設定画面の閉じるボタン
document.getElementById("closeSettingsBtn").addEventListener("click", () => {
  closeSettings();
});

// 設定画面で色選択
colorSelect.addEventListener("change", () => {
  const [bg, text] = colorSelect.value.split(",");
  document.body.style.setProperty("--bg-color", bg);
  document.body.style.setProperty("--text-color", text);
});

// 設定画面でフォント選択
fontSelect.addEventListener("change", () => {
  document.body.style.setProperty("--font-family", `'${fontSelect.value}', sans-serif`);
});

// 設定画面でデザイン選択
designSelect.addEventListener("change", () => {
  changeDesign(designSelect.value);
});

function changeDesign(mode) {
  const clock = document.getElementById("digital-clock");
  const analog = document.getElementById("analog-clock");

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

function drawAnalogClock(now) {
  const canvas = document.getElementById("analog-clock");
  const ctx = canvas.getContext("2d");
  const radius = canvas.height / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(radius, radius);

  // 時計盤
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.95, 0, 2 * Math.PI);
  ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue("--text-color");
  ctx.lineWidth = 8;
  ctx.stroke();

  // 針描画関数呼び出し
  const hour = now.getHours() % 12;
  const minute = now.getMinutes();
  const second = now.getSeconds();

  drawHand(ctx, (hour + minute / 60) * 30 * Math.PI / 180, radius * 0.5, 6);
  drawHand(ctx, (minute + second / 60) * 6 * Math.PI / 180, radius * 0.7, 4);
  drawHand(ctx, second * 6 * Math.PI / 180, radius * 0.9, 2, true);

  ctx.restore();
}

function drawHand(ctx, pos, length, width, isSecond = false) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.strokeStyle = isSecond
    ? "red"
    : getComputedStyle(document.body).getPropertyValue("--text-color");
  ctx.stroke();
  ctx.rotate(-pos);
}

setInterval(updateClock, 1000);
updateClock();
