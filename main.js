// ===== 閒置 5 分鐘自動返回首頁 =====

let idleTime = 0; // 閒置秒數
const IDLE_LIMIT = 10; // 5 分鐘 = 300 秒

// 強制回到首頁的函式（不依賴 hash 是否改變）
function goHome() {
  // 強制捲動到最上方
  window.scrollTo({ top: 0, behavior: "smooth" });

  // 同步設定 hash，確保狀態一致
  history.replaceState(null, "", "#page-1");
}

// 每秒累計閒置時間
setInterval(() => {
  idleTime++;
  if (idleTime >= IDLE_LIMIT) {
    goHome();
    idleTime = 0; // 重置計時，確保可重複觸發
  }
}, 1000);

// 偵測使用者行為，重置閒置時間
const resetIdleTime = () => {
  idleTime = 0;
};

// 任何互動都視為「有操作」
["mousemove", "wheel", "keydown", "touchstart", "scroll"].forEach((event) => {
  window.addEventListener(event, resetIdleTime, { passive: true });
});

console.log(
  "Idle timer enabled: repeatable auto return to homepage after 5 minutes"
);
