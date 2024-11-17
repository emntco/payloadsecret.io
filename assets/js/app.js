document.addEventListener("DOMContentLoaded", () => {
  const state = {
    secret: "",
    showSecret: false,
    showUsage: false,
  };

  window.getSecret = () => state.secret;

  const elements = {
    generateBtn: document.getElementById("generateBtn"),
    usageBtn: document.getElementById("usageBtn"),
    secretContainer: document.getElementById("secretContainer"),
    secretField: document.getElementById("secretField"),
    toggleVisibilityBtn: document.getElementById("toggleVisibilityBtn"),
    usageInfo: document.getElementById("usageInfo"),
    eyeIcon: document.getElementById("eyeIcon"),
  };

  function generateSecret() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    state.secret = btoa(String.fromCharCode(...array));
    updateSecretDisplay();
    elements.secretContainer.classList.remove("hidden");
  }

  function updateSecretDisplay() {
    const displayedSecret = state.showSecret
      ? state.secret
      : state.secret.slice(0, 8) + "•".repeat(state.secret.length - 8);
    elements.secretField.textContent = displayedSecret;
  }

  function toggleSecretVisibility() {
    state.showSecret = !state.showSecret;
    updateSecretDisplay();
    elements.eyeIcon.textContent = state.showSecret ? "🙈" : "🙉";
  }

  function toggleUsage() {
    state.showUsage = !state.showUsage;
    elements.usageInfo.classList.toggle("hidden");
  }

  elements.generateBtn.addEventListener("click", generateSecret);
  elements.toggleVisibilityBtn.addEventListener(
    "click",
    toggleSecretVisibility
  );
  elements.usageBtn.addEventListener("click", toggleUsage);
});
