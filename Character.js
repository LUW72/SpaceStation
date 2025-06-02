import { InteractionDisplay } from './InteractionDisplay.js';
import { OBJECT_TYPES } from './GameObject.js';

export class Character {
  constructor(mapElement, characterElement, levelMap) {
    this.map = mapElement;
    this.character = characterElement;
    this.levelMap = levelMap;
    this.tileX = 2.0;
    this.tileY = 2.0;
    this.held_directions = [];
    this.moveCooldown = 100;
    this.lastMoveTime = 0;
    this.gameArea = null;
    this.interactionDisplay = new InteractionDisplay();
    this.canMove = true;

    this.directions = {
      up: "up",
      down: "down",
      left: "left",
      right: "right",
    };

    this.keys = {
      38: this.directions.up,
      37: this.directions.left,
      39: this.directions.right,
      40: this.directions.down,
      87: this.directions.up,
      65: this.directions.left,
      68: this.directions.right,
      83: this.directions.down,
    };

    this.initControls();

    // Add popup event listeners
    document.addEventListener('popup-opened', () => {
      this.canMove = false;
    });
    
    document.addEventListener('popup-closed', () => {
      this.canMove = true;
    });
  }

  setGameArea(gameArea) {
    this.gameArea = gameArea;
    this.levelMap = gameArea.levelMap;
  }

  initControls() {
    document.addEventListener("keydown", (e) => {
      if (!this.canMove) return;
      
      const dir = this.keys[e.keyCode];
      if (dir && this.held_directions.indexOf(dir) === -1) {
        this.held_directions.unshift(dir);
      }
      if (e.code === "Space") {
        this.checkInteraction();
      }
      if (e.code === "Enter") {
        console.log(`Character position: X=${this.tileX.toFixed(2)}, Y=${this.tileY.toFixed(2)}`);
      }
    });

    document.addEventListener("keyup", (e) => {
      const dir = this.keys[e.keyCode];
      const index = this.held_directions.indexOf(dir);
      if (index > -1) {
        this.held_directions.splice(index, 1);
      }
    });
  }

  updatePosition() {
    if (!this.gameArea || !this.canMove) return;

    const now = Date.now();
    if (now - this.lastMoveTime < this.moveCooldown) {
      // Keep the walking animation going while key is held
      if (this.held_directions[0]) {
        this.character.setAttribute("walking", "true");
      }
      return;
    }

    const pixelSize = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--pixel-size")
    );
    const tileSize = pixelSize * 16;

    const held = this.held_directions[0];
    if (!held) {
      this.character.setAttribute("walking", "false");
      return;
    }

    let newX = this.tileX;
    let newY = this.tileY;
    const step = 0.25;

    if (held === this.directions.right) newX += step;
    if (held === this.directions.left) newX -= step;
    if (held === this.directions.down) newY += step;
    if (held === this.directions.up) newY -= step;

      this.character.setAttribute("facing", held);

    // Check if new position is walkable
    if (this.gameArea.isWalkable(newX, newY)) {
      this.tileX = newX;
      this.tileY = newY;
      this.lastMoveTime = now;
      this.character.setAttribute("walking", "true");
    } else {
      this.character.setAttribute("walking", "false");
    }

    const x = (this.tileX * tileSize) - (tileSize * 0.25);
    const y = (this.tileY * tileSize) - (tileSize * 0.25);
    const camera_left = pixelSize * 75;
    const camera_top = pixelSize * 70;

    this.map.style.transform = `translate3d(${-x + camera_left}px, ${-y + camera_top}px, 0)`;
    this.character.style.transform = `translate3d(${x}px, ${y}px, 0)`;

    // Update interaction display based on current position
    this.gameArea.updateInteractionDisplay(this.tileX, this.tileY);
  }

  checkInteraction() {
    if (!this.gameArea || !this.canMove) return;

    let offsetX = 0;
    let offsetY = 0;

    const facing = this.character.getAttribute("facing");

    if (facing === this.directions.up) offsetY = -1;
    if (facing === this.directions.down) offsetY = 1;
    if (facing === this.directions.left) offsetX = -1;
    if (facing === this.directions.right) offsetX = 1;

    const targetX = Math.floor(this.tileX + offsetX);
    const targetY = Math.floor(this.tileY + offsetY);

    const objectInfo = this.gameArea.checkObjectAtPosition(targetX, targetY);
    if (objectInfo) {
      this.gameArea.handleInteraction(objectInfo, targetX, targetY);
    }
  }

  setPosition(x, y) {
    this.tileX = x;
    this.tileY = y;
  }
}


