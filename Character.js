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
    });

    document.addEventListener("keyup", (e) => {
      const dir = this.keys[e.which];
      const index = this.held_directions.indexOf(dir);
      if (index > -1) this.held_directions.splice(index, 1);
    });
  }

  updatePosition() {
    const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--pixel-size"));
    const tileSize = pixelSize * 16;

    const held = this.held_directions[0];
    let newX = this.tileX;
    let newY = this.tileY;

    if (held === "right") newX++;
    if (held === "left") newX--;
    if (held === "down") newY++;
    if (held === "up") newY--;

    if (this.levelMap[newY] && this.levelMap[newY][newX] === 0) {
      this.tileX = newX;
      this.tileY = newY;
      this.character.setAttribute("facing", held);
    }

    this.character.setAttribute("walking", held ? "true" : "false");

    const x = this.tileX * tileSize;
    const y = this.tileY * tileSize;
    const camera_left = pixelSize * 66;
    const camera_top = pixelSize * 42;

    this.map.style.transform = `translate3d(${-x + camera_left}px, ${-y + camera_top}px, 0)`;
    this.character.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }
}