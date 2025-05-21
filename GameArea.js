import { Character } from "./Character.js";

const TILE_TYPES = {
  0: { name: 'floor', class: 'floor' },
  1: { name: 'wall', class: 'wall' },
  2: { name: 'lava', class: 'lava' },        // Add `.lava` CSS class
  3: { name: 'grass', class: 'grass' },      // Add `.grass` CSS class
  4: { name: 'door', class: 'door' },        // Add `.door` CSS class
};

export class GameArea {
  constructor() 
  {
    this.characterElement = document.querySelector(".character");
    this.mapElement = document.querySelector(".map");
    this.levelMap = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 1], // lava at [4][10]
      [1, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 1], // grass at [5][5]
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 4, 0, 0, 1], // door at [7][9]
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
  
    this.init();
  }

  init() 
  {
    this.renderTiles();
    this.character = new Character(this.mapElement, this.characterElement, this.levelMap);
    this.loop();
  }

  renderTiles() {
    this.mapElement.innerHTML = "";

    const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--pixel-size"));
    const tileSize = pixelSize * 16;

    for (let row = 0; row < this.levelMap.length; row++) {
      for (let col = 0; col < this.levelMap[row].length; col++) {
        const tileType = this.levelMap[row][col];
        const tileInfo = TILE_TYPES[tileType] || { name: 'unknown', class: 'unknown' };

        const tile = document.createElement("div");
        tile.classList.add("tile", tileInfo.class);

        tile.dataset.tileType = tileInfo.name;

        tile.style.left = `${col * tileSize}px`;
        tile.style.top = `${row * tileSize}px`;
        this.mapElement.appendChild(tile);
      }
    }

    this.mapElement.appendChild(this.characterElement);
  }

  loop() {
    this.character.updatePosition();
    requestAnimationFrame(() => this.loop());
  }
}