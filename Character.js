import { InteractionDisplay } from './InteractionDisplay.js';
import { OBJECT_TYPES } from './GameObject.js';
import { PopupManager } from './PopupManager.js';

export class Character {
  constructor(mapElement, characterElement, levelMap) {
    this.map = mapElement;
    this.character = characterElement;
    this.levelMap = levelMap;
    this.objectMatrix = null; // Will be set from GameArea
    this.tileX = 2.0;
    this.tileY = 2.0;
    this.held_directions = [];
    this.moveCooldown = 100;
    this.lastMoveTime = 0;
    this.gameArea = null;
    this.interactionDisplay = new InteractionDisplay();
    this.popupManager = new PopupManager();

    // Initialize popup elements after DOM is loaded
    this.initPopupElements();

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

  initPopupElements() {
    // Get popup elements
    this.signpostPopup = document.querySelector('.signpost-popup');
    this.popupText = document.querySelector('.popup-text');
    this.closePopupButton = document.querySelector('.close-popup');

    // Create elements if they don't exist
    if (!this.signpostPopup) {
      this.signpostPopup = document.createElement('div');
      this.signpostPopup.className = 'signpost-popup';
      this.signpostPopup.style.display = 'none';

      const popupContent = document.createElement('div');
      popupContent.className = 'popup-content';

      this.popupText = document.createElement('p');
      this.popupText.className = 'popup-text';

      this.closePopupButton = document.createElement('button');
      this.closePopupButton.className = 'close-popup';
      this.closePopupButton.textContent = 'Close';

      popupContent.appendChild(this.popupText);
      popupContent.appendChild(this.closePopupButton);
      this.signpostPopup.appendChild(popupContent);
      document.body.appendChild(this.signpostPopup);
    }

    // Add close button event listener
    this.closePopupButton.addEventListener('click', () => {
      this.signpostPopup.style.display = 'none';
    });
  }

  setGameArea(gameArea) {
    this.gameArea = gameArea;
  }

  initControls() {
    document.addEventListener("keydown", (e) => {
      const dir = this.keys[e.which];
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
      const dir = this.keys[e.which];
      const index = this.held_directions.indexOf(dir);
      if (index > -1) this.held_directions.splice(index, 1);
    });
  }

  updatePosition() {
    const now = Date.now();
    if (now - this.lastMoveTime < this.moveCooldown) return;

    const pixelSize = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--pixel-size")
    );
    const tileSize = pixelSize * 16;

    const held = this.held_directions[0];
    let newX = this.tileX;
    let newY = this.tileY;

    const step = 0.25;

    if (held === "right") newX += step;
    if (held === "left") newX -= step;
    if (held === "down") newY += step;
    if (held === "up") newY -= step;

    if (held) {
      this.character.setAttribute("facing", held);
    }

    // Check tile you're moving into
    const halfSize = 0.125;
    
    const left   = (newX - halfSize);
    const right  = (newX + halfSize);
    const top    = (newY - halfSize);
    const bottom = (newY + halfSize);

    const leftTile   = Math.floor(left);
    const rightTile  = Math.ceil(right) - 1;
    const topTile    = Math.floor(top);
    const bottomTile = Math.ceil(bottom) - 1;

    let isWalkable = true;
    
    // Check tile map collisions
    for (let y = topTile; y <= bottomTile; y++) {
      for (let x = leftTile; x <= rightTile; x++) {
        const tile = this.levelMap?.[y]?.[x];
        if (tile === undefined || ![0, 5, 11].includes(tile)) {
          isWalkable = false;
          break;
        }
      }
      if (!isWalkable) break;
    }

    // Check object collisions if tile is walkable
    if (isWalkable && this.gameArea) {
      const objMatrix = this.gameArea.rooms[this.gameArea.currentRoom].objects;
      
      // Convert map coordinates to object matrix coordinates (2x2 mapping)
      const objLeft = Math.floor(left * 2);
      const objRight = Math.ceil(right * 2) - 1;
      const objTop = Math.floor(top * 2);
      const objBottom = Math.ceil(bottom * 2) - 1;

      // Check for solid objects
      for (let y = objTop; y <= objBottom; y++) {
        for (let x = objLeft; x <= objRight; x++) {
          const objectId = objMatrix?.[y]?.[x];
          if (objectId && objectId > 0) {
            const objectInfo = OBJECT_TYPES[objectId];
            if (objectInfo && objectInfo.solid) {
              isWalkable = false;
              break;
            }
          }
        }
        if (!isWalkable) break;
      }
    }

    if (isWalkable) {
      this.tileX = newX;
      this.tileY = newY;
      this.lastMoveTime = now;
    }

    this.character.setAttribute("walking", held ? "true" : "false");

    const x = (this.tileX * tileSize) - (tileSize * 0.25);
    const y = (this.tileY * tileSize) - (tileSize * 0.25);
    const camera_left = pixelSize * 75;
    const camera_top = pixelSize * 70;

    this.map.style.transform = `translate3d(${-x + camera_left}px, ${-y + camera_top}px, 0)`;
    this.character.style.transform = `translate3d(${x}px, ${y}px, 0)`;

    // Check what's in front of the character
    this.checkFrontTile();
  }

  checkFrontTile() {
    if (!this.gameArea) return;

    // First check the current tile the character is standing on
    const currentX = Math.floor(this.tileX);
    const currentY = Math.floor(this.tileY);
    
    // Convert current position to object matrix coordinates (2x2 mapping)
    const currentObjX = currentX * 2;
    const currentObjY = currentY * 2;

    // Check the current tile first
    for (let dy = 0; dy < 2; dy++) {
        for (let dx = 0; dx < 2; dx++) {
            const objectId = this.gameArea.rooms[this.gameArea.currentRoom].objects[currentObjY + dy][currentObjX + dx];
            if (objectId && objectId > 0 && OBJECT_TYPES[objectId]) {
                const objectInfo = OBJECT_TYPES[objectId];
                this.interactionDisplay.showInteraction(
                    objectInfo.name,
                    objectInfo.texture,
                    objectInfo.display_name,
                    objectInfo.interactable,
                    objectInfo.description
                );
                
                return; // Exit after finding the first object
            }
        }
    }

    // If nothing found on current tile, check the tile in front
    let offsetX = 0;
    let offsetY = 0;

    const facing = this.character.getAttribute("facing");

    if (facing === "up") offsetY = -1;
    if (facing === "down") offsetY = 1;
    if (facing === "left") offsetX = -1;
    if (facing === "right") offsetX = 1;

    const targetX = Math.floor(this.tileX + offsetX);
    const targetY = Math.floor(this.tileY + offsetY);
    
    // Convert map coordinates to object matrix coordinates (2x2 mapping)
    const objX = targetX * 2;
    const objY = targetY * 2;

    // Check all four object positions that correspond to this tile
    for (let dy = 0; dy < 2; dy++) {
        for (let dx = 0; dx < 2; dx++) {
            const objectId = this.gameArea.rooms[this.gameArea.currentRoom].objects[objY + dy][objX + dx];
            if (objectId && objectId > 0 && OBJECT_TYPES[objectId]) {
                const objectInfo = OBJECT_TYPES[objectId];
                this.interactionDisplay.showInteraction(
                    objectInfo.name,
                    objectInfo.texture,
                    objectInfo.display_name,
                    objectInfo.interactable,
                    objectInfo.description
                );
                return; // Exit after finding the first object
            }
        }
    }

    // If no objects found in either position, clear the display
    this.interactionDisplay.clear();
  }

  checkInteraction() {
    if (!this.gameArea) return;

    let offsetX = 0;
    let offsetY = 0;

    const facing = this.character.getAttribute("facing");

    if (facing === "up") offsetY = -1;
    if (facing === "down") offsetY = 1;
    if (facing === "left") offsetX = -1;
    if (facing === "right") offsetX = 1;

    const targetX = Math.floor(this.tileX + offsetX);
    const targetY = Math.floor(this.tileY + offsetY);

    // Convert map coordinates to object matrix coordinates (2x2 mapping)
    const objX = targetX * 2;
    const objY = targetY * 2;

    // Check all four object positions that correspond to this tile
    for (let dy = 0; dy < 2; dy++) {
        for (let dx = 0; dx < 2; dx++) {
            const objectId = this.gameArea.rooms[this.gameArea.currentRoom].objects[objY + dy][objX + dx];
            if (objectId && objectId > 0 && OBJECT_TYPES[objectId]) {
                const objectInfo = OBJECT_TYPES[objectId];
                console.log('Interacting with:', objectInfo.display_name);
                
                // Handle signpost interactions
                if (objectInfo.name === 'signpost'){
                    if (this.signpostPopup && this.popupText) {
                        this.popupText.textContent = objectInfo.text;
                        this.signpostPopup.style.display = 'flex';
                    }
                    return;
                }
                
                // Handle door interactions
                if (objectInfo.name === 'door') {
                    this.gameArea.handleDoorInteraction(targetX, targetY);
                    return;
                }
                // Add other special interactions here as needed
            }
        }
    }
  }

  setPosition(x, y) {
    this.tileX = x;
    this.tileY = y;
  }

  handleInteraction() {
    const objectInfo = this.getCurrentObject();
    if (objectInfo && objectInfo.interactable) {
      if (objectInfo.name === "signpost" && objectInfo.text) {
        this.popupManager.showPopup(objectInfo.text);
      } else if (objectInfo.name === "door") {
        this.gameArea.handleDoorInteraction(this.tileX, this.tileY);
      }
      // Handle other interactable objects...
    }
  }
}


