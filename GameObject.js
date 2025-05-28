

export const OBJECT_TYPES = {
  0: { name: "empty", display_name: "Empty Space", interactable: false, objectId: 0 , texture: "./textures/empty.png", description: "A space with no objects."},
  1: { name: "floor_crack", display_name: "Cracked Floor", interactable: false, objectId: 1, texture: "./textures/floor_01_crack.png", description: "A crack in yo booty."},
  2: { name: "chest", display_name: "Storage Chest", interactable: true, objectId: 2, texture: "./textures/chest.png", description: "What's inside?"},
  3: { name: "plant", display_name: "Space Plant", interactable: false, objectId: 3, texture: "./textures/plant.png", description: "A space plant???"},
  4: { name: "signpost", display_name: "Information Sign", interactable: true, objectId: 4, texture: "./textures/obj_sign.png", description: "Craftmine. "},
  5: { name: "wall_pipe", display_name: "Vent", interactable: false, objectId: 5, texture: "./textures/wall_pipe.png", description: "Amogus"},
  6: { name: "table_chair", display_name: "Workstation", interactable: false, objectId: 6, texture: "./textures/obj_tableChair.png", description: "WAP."},
  7: { name: "floor_drain", display_name: "Floor Drain", interactable: false, objectId: 7, texture: "./textures/floor_01_drain.png", description: "Dr.Diddy."},
  8: { name: "vending_mach", display_name: "Vending Machine", interactable: false, objectId: 8, texture: "./textures/obj_vendingMach.png", description: "Big thirst."},
  9: { name: "antenna", display_name: "Communication Antenna", interactable: false, objectId: 9 , texture: "./textures/obj_antenna.png", description: "Bee movie"},
  10: { name: "door", display_name: "Door", interactable: true, objectId: 10 , texture: "./textures/door_01.png", description: "Where's the bathroom?"},
};


export class GameObject 
{
  constructor(mapElement, objectMatrix) 
  {
    this.mapElement = mapElement;
    this.objectMatrix = objectMatrix;
    this.objectLayer = document.createElement("div");
    this.objectLayer.classList.add("object-layer");
    this.mapElement.appendChild(this.objectLayer);

    this.renderObjects();
  }

  updateObjects(newObjectMatrix) {
    this.objectMatrix = newObjectMatrix;
    this.renderObjects();
  }

  renderObjects() 
  {
    const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--pixel-size"));
    const tileSize = pixelSize * 16;
    const objectTileSize = tileSize / 2;

    this.objectLayer.innerHTML = "";

    for (let row = 0; row < this.objectMatrix.length; row++) 
    {
      for (let col = 0; col < this.objectMatrix[row].length; col++) 
      {
        const objectId = this.objectMatrix[row][col];
        const objectInfo = OBJECT_TYPES[objectId] || { name: "unknown", interactable: false };

        if (objectInfo.name !== "empty") 
        {
          const objectTile = document.createElement("div");
          objectTile.classList.add("object", objectInfo.name);

          objectTile.dataset.interactable = objectInfo.interactable;

          objectTile.style.left = `${col * objectTileSize}px`;
          objectTile.style.top = `${row * objectTileSize}px`;

          this.objectLayer.appendChild(objectTile);
        }
      }
    }
  }

  destroy() {
    if (this.objectLayer && this.objectLayer.parentNode) {
      this.objectLayer.parentNode.removeChild(this.objectLayer);
    }
  }
}
