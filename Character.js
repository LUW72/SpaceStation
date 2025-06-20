import { InteractionDisplay } from './InteractionDisplay.js';
import { OBJECT_TYPES } from './GameObject.js';

export class Character {
  constructor(mapElement, characterElement, levelMap) {
    this.map = mapElement;
    this.character = characterElement;
    this.levelMap = levelMap;
    this.tileX = 2.0;
    this.tileY = 3.0;
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


