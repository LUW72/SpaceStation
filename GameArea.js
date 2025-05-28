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
  6: { name: 'wall_corner_a'},
  7: { name: 'wall_corner_b'},
  8: { name: 'wall_corner_c'},
  9: { name: 'wall_corner_d'},
  10: { name: 'wall_top_2'},
  11: { name: 'sign'},
  12: { name: 'wall_right_side'},
  13: { name: 'wall_corner_90_a'},
  14: { name: 'wall_corner_90_b'},
  15: { name: 'wall_corner_90_c'},
  16: { name: 'wall_corner_90_d'},
  17: { name: 'wall_corner_90_b_2'},
  18: { name: 'floor_panel'},
  19: { name: 'emergency_light'},
  20: { name: 'control_panel'},
  99: { name: 'empty'},
};

const SIGNES = [{
  x: 12, 
  y: 23, 
  text: 'sdfsdfdsfds',
},
{
  x: 12, 
  y: 23, 
  text: 'sdfsdfdsfds',
},
];

export class GameArea 
{
  constructor() 
  {
    this.characterElement = document.querySelector(".character");
    this.mapElement = document.querySelector(".map");

    this.currentRoom = 'main';
    this.lastPosition = { x: 0, y: 0 };
    this.rooms = {
      'main': {
        map: [
          [  6,  2,  2,  2,  2, 13,  4, 14,  2,  2,  2,  7, 99, 99], // 01          
          [  1, 10, 10, 10, 10, 10,  0, 10, 10, 10, 10, 14,  7, 99], // 02
          [  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10, 12, 99], // 03
          [  1,  0,  0, 15,  3,  3,  3, 17,  0,  0,  0,  0, 12, 99], // 04
          [  1,  0,  0, 12, 99,  6,  2, 13,  0,  0,  0,  0, 12, 99], // 06
          [  1,  0,  0, 16,  2, 13, 10, 10,  0,  0,  0,  0, 16,  2], // 07
          [  1,  0,  0, 10, 10, 10,  0,  0,  0,  0,  0,  0, 10, 10], // 08
          [  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  4], // 09
          [  8,  3, 17,  0,  0,  0,  0,  0,  0, 15, 17,  0, 15,  3], // 10
          [ 99, 99,  1,  0,  0,  0,  0,  0,  0, 16, 13,  0, 12, 99], // 11
          [ 99, 99,  1,  0,  0,  0,  0,  0,  0, 10, 10,  0, 12, 99], // 12
          [ 99, 99,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0, 12, 99], // 13
          [ 99, 99,  8,  3,  3,  3,  3,  3,  3,  3,  3,  3,  9, 99], // 14
        ],
        objects: [
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],

          [0,0, 5,0, 0,0, 0,5, 0,0, 0,0, 0,0, 0,0, 0,0, 0,5, 0,0, 0,0, 0,3, 0,0],
          [0,0, 0,0, 0,0, 0,5, 0,0, 0,0, 0,0, 0,0, 0,4, 0,0, 0,0, 0,0, 3,0, 0,0],
          
          [0,0, 0,8, 1,1, 0,0, 6,0, 0,0, 1,0, 0,0, 0,0, 1,0, 0,0, 0,0, 0,0, 0,0],
          [0,0, 0,0, 0,1, 0,1, 6,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
    
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,2, 0,0, 0,0, 0,0, 0,0, 0,0, 0,1, 0,0, 0,0],
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
    
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 1,0, 0,0, 0,0, 0,0, 0,0],
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,9, 0,0, 0,0, 0,0, 0,0, 0,0],
    
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 2,0, 0,0],
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,7, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
    
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 1,0, 0,0, 0,0, 1,0, 0,0, 0,0, 0,0, 0,0],
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
    
          [0,0, 0,0, 0,0, 0,0, 0,0, 3,0, 0,0, 0,0, 0,0, 3,0, 0,0, 0,0, 0,0, 0,0],
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
    
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
    
          [0,0, 0,0, 0,0, 0,0, 0,7, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
    
          [0,0, 0,0, 0,0, 0,0, 0,0, 4,0, 0,0, 0,0, 0,0, 4,0, 0,0, 0,0, 0,0, 0,0],
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
    
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
    
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0]
        ]
      },
      'storage': {
        map: [
          [  6,  2,  2,  2, 13,  4, 14,  2, 7],  // 01
          [  1, 10, 10, 10, 10,  0, 10, 10, 12],  // 01
          [  1,  0,  0,  0,  0,  0,  0,  0, 12], // 02
          [  1,  0,  0,  0,  0,  0,  0,  0, 12], // 03
          [  1,  0,  0,  0,  0,  0,  0,  0, 12], // 04
          [  1,  0,  0,  0,  0,  0,  0,  0, 12], // 05
          [  1,  0,  0,  0,  0,  0,  0,  0, 12], // 06
          [  1,  0,  0,  0,  0,  0,  0,  0, 12], // 07
          [  8,  3,  3,  3,  3,  3,  3,  3,  9]  // 08
        ],
        objects: [
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],

          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],

          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
          [0,0, 0,1, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],

          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],

          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],

          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
          [0,0, 0,1, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],

          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,1, 0,0, 0,0],

          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],

          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0]
        ]
      }
    ,
    'lab': {
      map: [
        [  6,  2,  2,  2,  2,  2,  2,  2,  2,  2,  7 ],  // 01
        [  1, 10, 10, 10, 10, 10, 10, 10, 10, 10, 12],  // 02
        [  1,  0,  0,  0,  0,  0,  0,  0,  0,  0, 12],  // 03
        [  1,  0,  0,  0,  0,  0,  0,  0,  0,  0, 12],  // 04
        [ 13,  0,  0,  0,  0,  0,  0,  0,  0,  0, 12],  // 05
        [  4,  0,  0,  0,  0,  0,  0,  0,  0,  0, 12],  // 06 - Door
        [ 17,  0,  0,  0,  0,  0,  0,  0,  0,  0, 12],  // 07
        [  1,  0,  0,  0,  0,  0,  0,  0,  0,  0, 12],  // 08
        [  8,  3,  3,  3,  3,  3,  3,  3,  3,  3,  9 ]  // 09
      ],
      objects: [
        [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
        [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],

        [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
        [0,0, 8,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,8, 0,0, 0,0],

        [0,0, 5,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,5, 0,0, 0,0],
        [0,0, 0,0, 0,6, 0,0, 0,0, 0,0, 0,6, 0,0, 0,0, 0,0, 0,0],

        [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
        [0,0, 0,0, 0,0, 0,0, 0,7, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],

        [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
        [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],

        [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
        [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],

        [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
        [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],

        [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
        [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],

        [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
        [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0]
      ]
    }
    };
    
    this.levelMap = this.rooms['main'].map;
    this.objectMatrix = this.rooms['main'].objects;

    this.init();
  }

  init() 
  {
    this.setMapSize();
    this.renderTiles();
    this.gameObjects = new GameObject(this.mapElement, this.objectMatrix);
    this.character = new Character(this.mapElement, this.characterElement, this.levelMap);
    this.character.setGameArea(this);
    this.loop();
  }


  handleDoorInteraction(x, y) {
    this.lastPosition = { x: this.character.tileX, y: this.character.tileY };
    
    if (this.currentRoom === 'main') {

      if (y === 0) 
      {
        this.switchRoom('storage', 5, 1);
      }
      else if (x === this.levelMap[0].length - 1) 
      {
        this.switchRoom('lab', 1, 5);
      }
    } 
    else if (this.currentRoom === 'storage') 
    {
      this.switchRoom('main', this.lastPosition.x + 1, this.lastPosition.y);
    }
    else if (this.currentRoom === 'lab') 
    {
      this.switchRoom('main', this.lastPosition.x + 11, this.lastPosition.y + 2);
    }
  }

  switchRoom(roomName, targetX, targetY) {
    this.currentRoom = roomName;
    this.levelMap = this.rooms[roomName].map;
    this.objectMatrix = this.rooms[roomName].objects;
    
    this.character.setPosition(targetX, targetY);
    
    this.setMapSize();
    this.renderTiles();
    
    if (this.gameObjects) {
      this.gameObjects.destroy();
    }
    
    this.gameObjects = new GameObject(this.mapElement, this.objectMatrix);
    
    this.character.levelMap = this.levelMap;
  }

  renderTiles() 
  {
    this.mapElement.innerHTML = "";

    const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--pixel-size"));
    const tileSize = pixelSize * 16;

    for (let row = 0; row < this.levelMap.length; row++) 
    {
      for (let col = 0; col < this.levelMap[row].length; col++) 
      {
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

  loop() 
  {
    this.character.updatePosition();
    requestAnimationFrame(() => this.loop());
  }
}