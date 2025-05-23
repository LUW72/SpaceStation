export class Character 
{
  constructor(mapElement, characterElement, levelMap) 
  {
    this.map = mapElement;
    this.character = characterElement;
    this.levelMap = levelMap;
    this.tileX = 1;
    this.tileY = 1;
    this.held_directions = [];
    this.moveCooldown = 150; // in ms, adjust to make movement slower/faster
    this.lastMoveTime = 0;
    this.checkInteraction;


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

  const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--pixel-size"));
  const tileSize = pixelSize * 16;

  const held = this.held_directions[0];
  let newX = this.tileX;
  let newY = this.tileY;

  if (held === "right") newX++;
  if (held === "left") newX--;
  if (held === "down") newY++;
  if (held === "up") newY--;

  if (held) {
    this.character.setAttribute("facing", held);
  }

  if (this.levelMap[newY] && this.levelMap[newY][newX] === 0) {
    this.tileX = newX;
    this.tileY = newY;
    this.lastMoveTime = now; 
  }

  this.character.setAttribute("walking", held ? "true" : "false");

  const x = this.tileX * tileSize;
  const y = this.tileY * tileSize;
  const camera_left = pixelSize * 70;
  const camera_top = pixelSize * 65;

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

  const targetX = this.tileX + offsetX;
  const targetY = this.tileY + offsetY;

  const tileValue = this.levelMap?.[targetY]?.[targetX];

  if (tileValue === 4) {
    // Show interaction, dialog, item pickup, etc.
    alert("You interacted with the object!");
  }
}


}