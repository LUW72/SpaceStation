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
    const halfSize = 0.125; // Quarter of original size
    
    // Adjust position to account for the smaller character size
    const left   = (newX - halfSize);
    const right  = (newX + halfSize);
    const top    = (newY - halfSize);
    const bottom = (newY + halfSize);

    const leftTile   = Math.floor(left);
    const rightTile  = Math.ceil(right) - 1;
    const topTile    = Math.floor(top);
    const bottomTile = Math.ceil(bottom) - 1;

    
    let isWalkable = true;
    
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
    console.log(`Trying to move to: (${newX}, ${newY})`);
    console.log({ leftTile, rightTile, topTile, bottomTile });
    
    


if (isWalkable) {
  this.tileX = newX;
  this.tileY = newY;
  this.lastMoveTime = now;
}


    this.character.setAttribute("walking", held ? "true" : "false");

    const x = (this.tileX * tileSize) - (tileSize * 0.25); // Adjust for smaller size
    const y = (this.tileY * tileSize) - (tileSize * 0.25); // Adjust for smaller size
    const camera_left = pixelSize * 75;
    const camera_top = pixelSize * 70;

    this.map.style.transform = `translate3d(${-x + camera_left}px, ${-y + camera_top}px, 0)`;
    this.character.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  checkInteraction() {
    let offsetX = 0;
    let offsetY = 0;

    const facing = this.character.getAttribute("facing");

    if (facing === "up") offsetY = -1;
    if (facing === "down") offsetY = 1;
    if (facing === "left") offsetX = -1;
    if (facing === "right") offsetX = 1;

    const targetX = Math.floor(this.tileX + offsetX);
    const targetY = Math.floor(this.tileY + offsetY);

    const tileValue = this.levelMap?.[targetY]?.[targetX];

    if (tileValue === 4) {
      alert("You interacted with the object!");
    }
  }
}
