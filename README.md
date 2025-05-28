# Space Station

A játék @viktoriazs közreműködésével készült.

## Kezelés

A játék angol nyelvű, az irányítás a nyilakkal történik, interaktálni pedig a space-szel lehetséges.

## Háttér

Az ötletünk az volt, hogy egy felülnézetes/platformer játékot készítsünk, amely egy általunk kitalált sci-fi világban játszódik. Bár az eredeti elképzelésünk szerint csupán  táblákról lehetett volna szövegeket olvasni, (ezzel pedig valamilyen történet kerekedett volna ki), de ezt viszonylag hamar elkezdtük kibővíteni.

A témaválasztás után találtunk egy, a mi ötletünkhöz nagyon [hasonló projektet](https://codepen.io/punkydrewster713/pen/WNrXPrb), így arra építettük fel a vázat.

### Források

A felhasznált képek mindegyike publikus asset könyvtárakból szrmazik, azonban az összes átszabásra és kiegészítésre került.

## Tesztelés


# UML Ábra

| **GameArea** |
|--------|
| -characterElement: HTMLElement |
| -mapElement: HTMLElement |
| -currentRoom: string |
| -rooms: Object |
| -levelMap: Array<Array<number>> |
| -objectMatrix: Array<Array<number>> |
| -gameObjects: GameObject |
| -character: Character |
||
| +constructor() |
| +init() |
| +handleDoorInteraction(x: number, y: number) |
| +switchRoom(roomName: string, targetX: number, targetY: number) |
| +renderTiles() |
| +setMapSize() |
| +loop() |

| **Character** |
|--------|
| -map: HTMLElement |
| -character: HTMLElement |
| -levelMap: Array<Array<number>> |
| -tileX: number |
| -tileY: number |
| -held_directions: Array<string> |
| -moveCooldown: number |
| -lastMoveTime: number |
| -gameArea: GameArea |
| -directions: Object |
| -keys: Object |
||
| +constructor(mapElement: HTMLElement, characterElement: HTMLElement, levelMap: Array<Array<number>>) |
| +setGameArea(gameArea: GameArea) |
| +initControls() |
| +updatePosition() |
| +checkInteraction() |
| +setPosition(x: number, y: number) |

| GameObject |
|--------|
| -mapElement: HTMLElement |
| -objectMatrix: Array<Array<number>> |
| -objects: Array<HTMLElement> |
||
| +constructor(mapElement: HTMLElement, objectMatrix: Array<Array<number>>) |
| +render() |
| +destroy() |

| **ItemBar** |
|--------|
| -element: HTMLElement |
| -slots: Array<HTMLElement> |
| -selectedSlot: number |
| -items: Array<string> |
||
| +constructor() |
| +addItem(itemType: string) |
| +selectSlot(index: number) |
| +render() |


