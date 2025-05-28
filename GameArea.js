import { Character } from "./Character.js";
import { GameObject } from "./GameObject.js"; // assuming separate file
import { ItemBar } from "./ItemBar.js";

const TILE_TYPES = {
  0: { name: 'floor'},
  1: { name: 'wall'},
  2: { name: 'wall_top'},        
  3: { name: 'wall_bottom'},      
  4: { name: 'door' },        
  5: { name: 'floor_cracked'},   
  6: { name: 'wall_corner_SE'},   
  7: { name: 'wall_corner_NE'},   
  8: { name: 'wall_corner_NW'},   
  9: { name: 'wall_corner_SW'},   
  10: { name: 'wall_top_2'},   
  11: { name: 'sign'},   

  
};

export class GameArea {
  constructor() 
  {
    this.characterElement = document.querySelector(".character");
    this.mapElement = document.querySelector(".map");
    this.levelMap = [
      [1, 10, 10, 10, 10, 10, 4, 10, 10, 11, 10, 10, 7],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 0, 0, 5, 0, 0, 0, 1, 0, 2, 0, 1], 
      [1, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 1], 
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 4, 0, 0, 1], 
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 5, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8],
    ];

    this.objectMatrix = [
  [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,3],
  [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 3,0],
  
  [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 1,0, 0,0, 0,0, 1,0, 0,0, 0,0, 0,0],
  [0,1, 0,0, 0,0, 0,1, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 1,0],

  [0,0, 0,0, 0,0, 0,0, 0,0, 0,2, 0,0, 0,0, 0,0, 0,0, 0,0, 0,1, 0,0],
  [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],

  [0,0, 0,0, 0,0, 0,0, 0,0, 1,0, 0,0, 0,0, 0,0, 1,0, 0,0, 0,0, 0,0],
  [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],

  [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 2,0],
  [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],

  [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 1,0, 0,0, 0,0, 1,0, 0,0, 0,0, 0,0],
  [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],

  [0,0, 0,0, 0,0, 0,0, 0,0, 3,0, 0,0, 0,0, 0,0, 3,0, 0,0, 0,0, 0,0],
  [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],

  [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
  [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],

  [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
  [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],

  [0,0, 0,0, 0,0, 0,0, 0,0, 4,0, 0,0, 0,0, 0,0, 4,0, 0,0, 0,0, 0,0],
  [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],

  [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
  [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],

  [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
  [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],

  [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
  [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
];

  
    this.init();
  }

  init() 
  {
    this.setMapSize();
    this.renderTiles();
    this.character = new Character(this.mapElement, this.characterElement, this.levelMap);
    this.gameObjects = new GameObject(this.mapElement, this.objectMatrix);
    this.itemBar = new ItemBar();
    
    // Add some test items
    this.itemBar.addItem('key');
    this.itemBar.addItem('health');
    this.itemBar.addItem('weapon');
    
    this.loop();
  }

    renderTiles() 
    {
        this.mapElement.innerHTML = "";

        const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--pixel-size"));
        const tileSize = pixelSize * 16;

        for (let row = 0; row < this.levelMap.length; row++) {
        for (let col = 0; col < this.levelMap[row].length; col++) {
            const tileType = this.levelMap[row][col];
            const tileInfo = TILE_TYPES[tileType] || { name: 'unknown' };

            const tile = document.createElement("div");
            tile.classList.add("tile", tileInfo.name);

            tile.dataset.tileType = tileInfo.name;

            tile.style.left = `${col * tileSize}px`;
            tile.style.top = `${row * tileSize}px`;
            this.mapElement.appendChild(tile);
        }
        }

        this.mapElement.appendChild(this.characterElement);
    }

    setMapSize() 
    {
        const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--pixel-size"));
        const tileSize = pixelSize * 16;
        const rows = this.levelMap.length;
        const cols = this.levelMap[0].length;

        this.mapElement.style.width = `${cols * tileSize}px`;
        this.mapElement.style.height = `${rows * tileSize}px`;
    }

  loop() {
    this.character.updatePosition();
    requestAnimationFrame(() => this.loop());
  }
}