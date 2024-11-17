class CopyButton {
  constructor(buttonElement, getValue) {
    this.button = buttonElement;
    this.getValue = getValue;
    this.copyIcon = this.button.querySelector(".icon");
    this.initialIcon = this.copyIcon.textContent;
    this.setupEventListeners();
  }

  async copyToClipboard() {
    try {
      const value = this.getValue();
      await navigator.clipboard.writeText(value);
      this.showCopiedFeedback();
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }

  showCopiedFeedback() {
    this.copyIcon.textContent = "✓";
    setTimeout(() => {
      this.copyIcon.textContent = this.initialIcon;
    }, 2000);
  }

  setupEventListeners() {
    this.button.addEventListener("click", () => this.copyToClipboard());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const copyBtn = document.getElementById("copyBtn");
  new CopyButton(
    copyBtn,
    () => document.querySelector("#secretField").textContent
  );
});
