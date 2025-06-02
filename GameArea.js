import { Character } from "./Character.js";
import { GameObject, OBJECT_TYPES } from "./GameObject.js";
import { ItemBar } from "./ItemBar.js";
import { PopupManager } from "./PopupManager.js";
import { InteractionDisplay } from './InteractionDisplay.js';

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


export class GameArea 
{
  constructor() 
  {
    this.characterElement = document.querySelector(".character");
    this.mapElement = document.querySelector(".map");
    this.roomHeader = document.querySelector(".room-header");
    this.popupManager = new PopupManager();
    this.interactionDisplay = new InteractionDisplay();

    this.roomNames = {
      'main': 'Main Hall',
      'storage': 'Storage Room',
      'lab': 'Laboratory'
    };

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
          [ 99, 99,  8,  3,  3,  3, 17,  0, 15,  3,  3,  3,  9, 99], // 14
          [ 99, 99, 99, 99, 99, 99,  1,  4, 12, 99, 99, 99, 99, 99], // 15
        ],
        objects: [
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 12,12, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0], // 01
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 12,12, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],

          [0,0, 5,0, 0,0, 0,5, 0,0, 0,0, 0,0, 0,0, 0,0, 0,5, 0,0, 0,0, 0,3, 0,0 ], //02
          [0,0, 0,0, 0,0, 0,5, 0,0, 0,5, 0,0, 0,0, 0,20, 0,0, 0,0, 0,0, 3,0, 0,0],
          
          [0,0, 0,0, 1,1, 0,0, 0,0, 0,0, 1,0, 0,0, 0,0, 1,0, 0,0, 0,0, 0,0, 0,0], // 03
          [0,0, 0,0, 0,1, 0,1, 6,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
    
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,2, 0,0, 0,0, 0,0, 0,0, 0,0, 0,1, 0,0, 0,0], // 04
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,42, 0,0, 0,0, 0,0, 0,0, 0,0], 
    
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,41, 1,0, 0,0, 0,0, 0,0, 0,0], // 05
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,40, 0,0, 0,0, 0,0, 0,0, 0,0],
    
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 2,0, 0,0], // 06
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
    
          [0,0, 0,0, 0,0, 0, 0, 0,0, 3,0, 0,0, 0,0, 0,0, 3,0, 0,0, 0,0, 0,0, 0,0], // 07
          [0,0, 0,0, 0,0, 8,99, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
    
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 11,11], // 08
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 11,11],
    
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 3,0, 0,0, 0,0, 0,0, 0,0], // 09
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,3, 0,0, 0,7, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
    
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0], // 10
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
    
          [0,0, 0,0, 0,0, 0,0, 0,7, 0,24, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0], // 11
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 24,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],
    
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0], // 12
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,3, 0,0, 0,0, 3,0, 0,0, 0,0, 0,0, 0,0, 0,0],
    
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0], // 13
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0]

          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0], // 14
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0]

          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 13,13, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0], // 15
          [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 13,13, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0]

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
          [0,0, 0,0, 0,0, 0,0, 0,0, 10,10, 0,0, 0,0, 0,0],
          [0,0, 0,0, 0,0, 0,0, 0,0, 10,10, 0,0, 0,0, 0,0],

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
        [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0], // 01
        [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],

        [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0], // 02
        [0,0, 8,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,8, 0,0, 0,0],

        [0,0, 5,0, 0,0, 30,31, 0,0, 0,0, 0,0, 0,0, 0,5, 0,0, 0,0], // 03
        [0,0, 0,0, 0,6, 32,33, 0,0, 0,0, 0,6, 0,0, 0,0, 0,0, 0,0],

        [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0], // 04
        [0,0, 0,0, 0,0, 0,0, 0,7, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],

        [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0], // 05
        [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],

        [10,10, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0], // 06
        [10,10, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],

        [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0], // 07
        [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],

        [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0], // 08
        [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0],

        [0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0], // 09
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
    this.updateRoomHeader();
    this.loop();
  }

  updateRoomHeader() {
    if (this.roomHeader && this.roomNames[this.currentRoom]) {
      this.roomHeader.textContent = this.roomNames[this.currentRoom];
    }
  }

  handleDoorInteraction(x, y) {
    this.lastPosition = { x: this.character.tileX, y: this.character.tileY };
    
    if (this.currentRoom === 'main') {
      if (y === 0) {
        this.switchRoom('storage', 5.5, 1.5);
      }
      else if (x === this.levelMap[0].length - 1) {
        this.switchRoom('lab', 1.5, 5);
      }
    } 
    else if (this.currentRoom === 'storage') {
      this.switchRoom('main', 6.5, 1.5);
    }
    else if (this.currentRoom === 'lab') {
      this.switchRoom('main', this.lastPosition.x + 11, this.lastPosition.y + 2.5);
    }
  }

  switchRoom(roomName, targetX, targetY) {
    if (this.rooms[roomName]) {
      this.currentRoom = roomName;
      this.levelMap = this.rooms[roomName].map;
      this.objectMatrix = this.rooms[roomName].objects;
      
      this.setMapSize();
      this.renderTiles();
      
      if (this.gameObjects) {
        this.gameObjects.destroy();
      }
      
      this.gameObjects = new GameObject(this.mapElement, this.objectMatrix);
      this.character.levelMap = this.levelMap;
      
      if (targetX !== undefined && targetY !== undefined) {
        this.character.setPosition(targetX, targetY);
      }

      this.updateRoomHeader();
    }
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

  isWalkable(x, y, halfSize = 0.125) {
    const left   = (x - halfSize);
    const right  = (x + halfSize);
    const top    = (y - halfSize);
    const bottom = (y + halfSize);

    const leftTile   = Math.floor(left);
    const rightTile  = Math.ceil(right) - 1;
    const topTile    = Math.floor(top);
    const bottomTile = Math.ceil(bottom) - 1;

    // Check if any of the coordinates are out of bounds
    if (leftTile < 0 || rightTile >= this.levelMap[0].length ||
        topTile < 0 || bottomTile >= this.levelMap.length) {
      return false;
    }

    for (let y = topTile; y <= bottomTile; y++) {
      for (let x = leftTile; x <= rightTile; x++) {
        const tile = this.levelMap[y][x];
        if (tile === undefined || ![0, 4, 5, 11].includes(tile)) {
          return false;
        }
      }
    }
    return true;
  }

  checkObjectAtPosition(x, y) {
    // Convert map coordinates to object matrix coordinates (2x2 mapping)
    const objX = x * 2;
    const objY = y * 2;

    // Check all four object positions that correspond to this tile
    for (let dy = 0; dy < 2; dy++) {
      for (let dx = 0; dx < 2; dx++) {
        const objectId = this.rooms[this.currentRoom].objects[objY + dy][objX + dx];
        if (objectId && objectId > 0 && OBJECT_TYPES[objectId]) {
          return OBJECT_TYPES[objectId];
        }
      }
    }
    return null;
  }

  updateInteractionDisplay(x, y) {
    const objectInfo = this.checkObjectAtPosition(Math.floor(x), Math.floor(y));
    
    if (objectInfo) {
      this.interactionDisplay.showInteraction(
        objectInfo.name,
        objectInfo.texture,
        objectInfo.display_name,
        objectInfo.interactable,
        objectInfo.description
      );
    } else {
      this.interactionDisplay.clear();
    }
  }

  handleInteraction(objectInfo, targetX, targetY) {
    if (!objectInfo) return;

    console.log('Interacting with:', objectInfo.display_name);
    
    // Handle signpost interactions
    if (objectInfo.name === 'signpost' && objectInfo.text) {
      this.popupManager.showPopup(objectInfo.text);
      return;
    }
    
    // Handle door interactions
    if (objectInfo.name === 'door') {
      this.handleDoorInteraction(targetX, targetY);
      return;
    }
    // Add other special interactions here as needed
  }
}