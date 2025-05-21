const character = document.querySelector(".character");
const map = document.querySelector(".map");

const levelMap = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// Start tile position
let tileX = 1;
let tileY = 1;
let held_directions = [];
const directions = {
  up: "up",
  down: "down",
  left: "left",
  right: "right",
};
const keys = {
  38: directions.up,
  37: directions.left,
  39: directions.right,
  40: directions.down,
};

document.addEventListener("keydown", (e) => {
  const dir = keys[e.which];
  if (dir && held_directions.indexOf(dir) === -1) {
    held_directions.unshift(dir);
  }
});
document.addEventListener("keyup", (e) => {
  const dir = keys[e.which];
  const index = held_directions.indexOf(dir);
  if (index > -1) held_directions.splice(index, 1);
});

// Render tilemap to DOM
function renderTiles(mapData) {
  map.innerHTML = "";
  const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--pixel-size"));
  const tileSize = pixelSize * 16;

  for (let row = 0; row < mapData.length; row++) {
    for (let col = 0; col < mapData[row].length; col++) {
      const tile = document.createElement("div");
      tile.classList.add("tile", mapData[row][col] === 1 ? "wall" : "floor");
      tile.style.left = `${col * tileSize}px`;
      tile.style.top = `${row * tileSize}px`;
      map.appendChild(tile);
    }
  }

  map.appendChild(character);
}
renderTiles(levelMap);

// Character placement & movement
function placeCharacter() {
  const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--pixel-size"));
  const tileSize = pixelSize * 16;

  const held = held_directions[0];
  let newX = tileX;
  let newY = tileY;

  if (held === "right") newX++;
  if (held === "left") newX--;
  if (held === "down") newY++;
  if (held === "up") newY--;

  // Wall collision
  if (levelMap[newY] && levelMap[newY][newX] === 0) {
    tileX = newX;
    tileY = newY;
    character.setAttribute("facing", held);
  }

  character.setAttribute("walking", held ? "true" : "false");

  const x = tileX * tileSize;
  const y = tileY * tileSize;

  const camera_left = pixelSize * 66;
  const camera_top = pixelSize * 42;

  map.style.transform = `translate3d(${-x + camera_left}px, ${-y + camera_top}px, 0)`;
  character.style.transform = `translate3d(${x}px, ${y}px, 0)`;
}

function step() {
  placeCharacter();
  requestAnimationFrame(step);
}
step();





document.addEventListener("keydown", (e) => {
  var dir = keys[e.which];
  if (dir && held_directions.indexOf(dir) === -1) {
    held_directions.unshift(dir);
  }
});

document.addEventListener("keyup", (e) => {
  var dir = keys[e.which];
  var index = held_directions.indexOf(dir);
  if (index > -1) {
    held_directions.splice(index, 1);
  }
});

/* BONUS! Dpad functionality for mouse and touch */
var isPressed = false;
const removePressedAll = () => {
  document.querySelectorAll(".dpad-button").forEach((d) => {
    d.classList.remove("pressed");
  });
};
document.body.addEventListener("mousedown", () => {
  console.log("mouse is down");
  isPressed = true;
});
document.body.addEventListener("mouseup", () => {
  console.log("mouse is up");
  isPressed = false;
  held_directions = [];
  removePressedAll();
});
const handleDpadPress = (direction, click) => {
  if (click) {
    isPressed = true;
  }
  held_directions = isPressed ? [direction] : [];

  if (isPressed) {
    removePressedAll();
    document.querySelector(".dpad-" + direction).classList.add("pressed");
  }
};
//Bind a ton of events for the dpad
document
  .querySelector(".dpad-left")
  .addEventListener("touchstart", (e) =>
    handleDpadPress(directions.left, true)
  );
document
  .querySelector(".dpad-up")
  .addEventListener("touchstart", (e) => handleDpadPress(directions.up, true));
document
  .querySelector(".dpad-right")
  .addEventListener("touchstart", (e) =>
    handleDpadPress(directions.right, true)
  );
document
  .querySelector(".dpad-down")
  .addEventListener("touchstart", (e) =>
    handleDpadPress(directions.down, true)
  );

document
  .querySelector(".dpad-left")
  .addEventListener("mousedown", (e) => handleDpadPress(directions.left, true));
document
  .querySelector(".dpad-up")
  .addEventListener("mousedown", (e) => handleDpadPress(directions.up, true));
document
  .querySelector(".dpad-right")
  .addEventListener("mousedown", (e) =>
    handleDpadPress(directions.right, true)
  );
document
  .querySelector(".dpad-down")
  .addEventListener("mousedown", (e) => handleDpadPress(directions.down, true));

document
  .querySelector(".dpad-left")
  .addEventListener("mouseover", (e) => handleDpadPress(directions.left));
document
  .querySelector(".dpad-up")
  .addEventListener("mouseover", (e) => handleDpadPress(directions.up));
document
  .querySelector(".dpad-right")
  .addEventListener("mouseover", (e) => handleDpadPress(directions.right));
document
  .querySelector(".dpad-down")
  .addEventListener("mouseover", (e) => handleDpadPress(directions.down));
