export class Men {
  constructor(message = "Welcome to Space Station!") {
    this.message = message;
    this.hasShown = false;
    this.popupElement = null;
  }

  show() {
    if (this.hasShown) return;
    this.hasShown = true;

    // Create overlay
    this.popupElement = document.createElement("div");
    this.popupElement.className = "men-popup-overlay";

    // Create content container
    const content = document.createElement("div");
    content.className = "men-popup-content";
    content.innerHTML = `
      <h2>${this.message}</h2>
      <button class="menu-button" id="newGameBtn">New Game</button>
      <button class="menu-button" id="loadGameBtn">Load Game</button>
      <button class="menu-button" id="settingsBtn">Settings</button>
      <button class="menu-button" id="exitBtn">Exit</button>
    `;

    // Append to overlay and body
    this.popupElement.appendChild(content);
    document.body.appendChild(this.popupElement);

    // Add event listeners
    document.getElementById("newGameBtn").onclick = () => {
      this.startNewGame();
    };
    document.getElementById("loadGameBtn").onclick = () => {
      this.loadGame();
    };
    document.getElementById("settingsBtn").onclick = () => {
      this.openSettings();
    };
    document.getElementById("exitBtn").onclick = () => {
      this.exitGame();
    };
  }

  startNewGame() {
    console.log("Starting new game...");
    this.close();
    // Add your actual game start logic here
  }

  loadGame() {
    console.log("Loading game...");
    this.close();
    // Add load game logic
  }

  openSettings() {
    console.log("Opening settings...");
    // Optional: open another popup or section
  }

    exitGame() {
  console.log("Exiting game...");
  this.close();

  // Clear everything and show the final message
  document.body.innerHTML = `
    <div style="
      background: black;
      color: white;
      font-family: 'Press Start 2P', monospace;
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      text-align: center;
      padding: 40px;
    ">
      My final message, save the world. Goodbye :((
    </div>
  `;
  document.body.style.margin = "0";
}

  

  close() {
    if (this.popupElement) {
      document.body.removeChild(this.popupElement);
      this.popupElement = null;
    }
  }
}
