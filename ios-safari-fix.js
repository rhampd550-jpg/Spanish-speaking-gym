(function () {
  function isIosSafari() {
    var ua = navigator.userAgent || "";
    var isIos = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    var isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS/.test(ua);
    return isIos && isSafari;
  }

  if (!isIosSafari()) return;

  var message = "iPhone Safari can record your audio, but it does not reliably provide speech-to-text for Listen to me. Use Record myself for playback.";

  window.listeningSupport = function () {
    if (typeof window.micAccessSupport === "function") {
      var micSupport = window.micAccessSupport();
      if (!micSupport.ok) return micSupport;
    }
    return { ok: false, reason: message };
  };

  window.addEventListener("load", function () {
    var status = document.querySelector("#micStatus");
    if (status) {
      status.textContent = "Microphone recording is available if permission is allowed. " + message;
      status.className = "status-box good";
    }
  });
})();
