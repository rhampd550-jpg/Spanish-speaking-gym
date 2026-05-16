(function () {
  function isIosSafari() {
    const ua = navigator.userAgent;
    const isIos = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS/.test(ua);
    return isIos && isSafari;
  }

  if (!isIosSafari()) return;

  const message = "iPhone Safari can record your audio, but it does not reliably turn speech into words here. Use Record myself to hear your pronunciation.";

  function showMessage() {
    document.querySelectorAll("#focusListenResult, #drillListenResult, .listen-result").forEach((node) => {
      node.textContent = message;
    });

    const micStatus = document.querySelector("#micStatus");
    if (micStatus) {
      micStatus.textContent = message;
      micStatus.className = "status-box warn";
    }
  }

  function disableListenButtons() {
    document.querySelectorAll("#listenFocus, #listenDrill, [data-listen-phrase], [data-roleplay-listen]").forEach((button) => {
      button.disabled = true;
      button.setAttribute("aria-disabled", "true");
      button.title = message;
      button.textContent = "Use Record myself";
    });
  }

  function applyFix() {
    showMessage();
    disableListenButtons();
  }

  document.addEventListener("DOMContentLoaded", applyFix);
  document.addEventListener("click", () => window.setTimeout(applyFix, 0), true);
  window.addEventListener("hashchange", applyFix);
  window.setInterval(applyFix, 1000);
})();
