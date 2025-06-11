export const OBJECT_TYPES = {
  0: { name: "empty", display_name: "Empty Space", interactable: false, objectId: 0 , texture: "./textures/empty.png", description: "A space with no objects.", solid: false},
  1: { name: "floor_crack", display_name: "Cracked Floor", interactable: false, objectId: 1, texture: "./textures/floor_01_crack.png", description: "A crack in yo booty.", solid: false},
  2: { name: "trashcan", display_name: "Trashcan", interactable: true, objectId: 2, texture: "./textures/obj_trashcan.png", description: "Trash can", solid: true},
  3: { name: "plant", display_name: "Space Plant", interactable: true, objectId: 3, texture: "./textures/obj_plant.png", description: "A space plant???", solid: true},
  4: { name: "signpost", display_name: "Information Sign", interactable: true, objectId: 4, texture: "./textures/obj_sign.png", description: "Craftmine. ", solid: true},
  5: { name: "wall_pipe", display_name: "Vent", interactable: false, objectId: 5, texture: "./textures/wall_pipe.png", description: "Amogus", solid: false},
  6: { name: "table_chair", display_name: "Chair and Table", interactable: false, objectId: 6, texture: "./textures/obj_tableChair.png", description: "WAP.", solid: true},
  7: { name: "floor_drain", display_name: "Floor Drain", interactable: false, objectId: 7, texture: "./textures/floor_01_drain.png", description: "Dr.Diddy.", solid: false},
  8: { name: "vending_mach", display_name: "Vending Machine", interactable: true, objectId: 8, texture: "./textures/obj_vendingMach.png", description: "Big thirst.",text:"Needs a coin to operate", solid: true},
  9: { name: "bottles", display_name: "Bottles", interactable: false, objectId: 9, texture: "./textures/obj_bottles.png", description: "Bottles", solid: true},
    

  10: { name: "door", display_name: "Back to Main Hall", interactable: true, objectId: 10 , texture: "./textures/door_01.png", description: "I will piss myself?", solid: false},
  11: { name: "door", display_name:"Door to Storage Room", interactable: true, objectId: 11, texture:"./textures/door_01.png", description: "Bathroom?", solid: false},
  12: { name: "door", display_name:"Door to Lab", interactable: true, objectId: 12, texture:"./textures/door_01.png", description: "Where is the pee room?", solid: false},
  13: { name: "door", display_name: "Door to the Navigation Room", interactable: true, objectId: 13, texture:"./textures/door_01.png", description: "Navigating to the navigation room...", solid: false},

  20: { name: "signpost", display_name: "Information Sign", interactable: true, objectId: 4, texture: "./textures/obj_sign.png", description: "Craftmine. ", text: "You could have it all...", solid: true},
  21: { name: "signpost", display_name: "Information Sign", interactable: true, objectId: 21, texture: "./textures/obj_sign.png", description: "Craftmine. ", text: "My empire of cheese...", solid: true},
  22: { name: "signpost", display_name: "Information Sign", interactable: true, objectId: 22, texture: "./textures/obj_sign.png", description: "Craftmine. ", text: "I will shit my pants...", solid: true},
  23: { name: "signpost", display_name: "Information Sign", interactable: true, objectId: 23, texture: "./textures/obj_sign.png", description: "Craftmine. ", text: "I will make you sneeeeeeze!!!", solid: true},

  
  24: { name:"floor_cable", display_name:"Broken Cables", interactable: false, objectId: 24, texture: "./textures/floor_01_cable.png", description: "Not the best way to handle a wire.", solid: false},

  30: { name:"workstation_a", display_name:"Workstation", interactable: false, objectId: 30, texture: "./textures/itemBar_workstation_a.png", description: "Workstation", solid: false},
  31: { name:"workstation_b", display_name:"", interactable: false, objectId: 31, texture: "", description: "", solid: false},
  32: { name:"workstation_c", display_name:"", interactable: false, objectId: 32, texture: "", description: "", solid: true},
  33: { name:"workstation_d", display_name:"", interactable: false, objectId: 33, texture: "", description: "", solid: true},
  34: { name:"workstation_a_papiers", display_name:"Workstation", interactable: false, objectId: 34, texture: "./textures/itemBar_workstation_a.png", description: "Workstation", solid: false},


  40: { name: "antenna_a_base", display_name: "", interactable: false, objectId: 40, texture: "", description: "", solid: true},
  41: { name: "antenna_a_middle", display_name: "Communication Antenna", interactable: false, objectId: 41, texture: "./textures/obj_antenna.png", description: "Bee movie", solid: false},
  42: { name: "antenna_a_top", display_name: "Communication Antenna", interactable: false, objectId: 42, texture: "./textures/obj_antenna.png", description: "Bee movie", solid: false},
  43: { name: "antenna_b_base", display_name: "", interactable: false, objectId: 43, texture: "", description: "", solid: true},
  44: { name: "antenna_b_middle", display_name: "Incom Antenna", interactable: false, objectId: 44, texture: "./textures/obj_antenna2.png", description: "Bee movie", solid: false},
  45: { name: "antenna_b_top", display_name: "Incom Antenna", interactable: false, objectId: 45, texture: "./textures/obj_antenna2.png", description: "Bee movie", solid: false},
  46: { name: "antenna_b2_middle", display_name: "Long Range Communication Antenna", interactable: false, objectId: 46, texture: "./textures/obj_antenna3.png", description: "Bee movie", solid: false},
  47: { name: "antenna_b2_top", display_name: "Long Range Communication Antenna", interactable: false, objectId: 47, texture: "./textures/obj_antenna3.png", description: "Bee movie", solid: false},


  50: {name:"dismantled_ventillation_unit", display_name:"Dismantled Ventillation Unit", interactable: false, objectId: 50, texture: "./textures/obj_dismantled_ventillator.png", description: "Bee movie", solid: false},  

  99: { name: "empty", display_name: "", interactable: false, objectId: 99, texture: "./textures/obj_vendingMach.png", description: "", solid: true},  

  100: { name: "key_plant", display_name: "Space Plant", interactable: true, objectId: 100, texture: "./textures/obj_plant.png", description: "A space plant???", solid: true},
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
