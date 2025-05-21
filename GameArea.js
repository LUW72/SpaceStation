// GameArea.js
import { Character } from "./Character.js";

export class GameArea {
  constructor() {
    this.characterElement = document.querySelector(".character");
    this.mapElement = document.querySelector(".map");
    this.levelMap = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
  }

  init() {
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
        const tile = document.createElement("div");
        tile.classList.add("tile", this.levelMap[row][col] === 1 ? "wall" : "floor");
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