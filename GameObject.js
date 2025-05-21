const OBJECT_TYPES = {
  0: { name: "empty", interactable: false },
  1: { name: "table", interactable: false },
  2: { name: "chest", interactable: true },
  3: { name: "plant", interactable: false },
  4: { name: "signpost", interactable: true },
};



export class GameObject {
  constructor(mapElement, objectMatrix) {
    this.mapElement = mapElement;
    this.objectMatrix = objectMatrix;
    this.objectLayer = document.createElement("div");
    this.objectLayer.classList.add("object-layer");
    this.mapElement.appendChild(this.objectLayer);

    this.renderObjects();
  }

  renderObjects() {
    const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--pixel-size"));
    const tileSize = pixelSize * 16;
    const objectTileSize = tileSize / 2;

    this.objectLayer.innerHTML = "";

    for (let row = 0; row < this.objectMatrix.length; row++) {
      for (let col = 0; col < this.objectMatrix[row].length; col++) {
        const objectId = this.objectMatrix[row][col];
        const objectInfo = OBJECT_TYPES[objectId] || { name: "unknown", interactable: false };

        if (objectInfo.name !== "empty") {
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
}
