import GameArea from "../GameArea.js";  

function itemTobbItemDb() {
    const gameArea = new GameArea();

    gameArea.itemBar.addItem('plant');
    gameArea.itemBar.addItem('plant');


      const expected = { type: 'plant', count: 2 };

    const actual = gameArea.itemBar.items[0];
    console.assert(
        JSON.stringify(actual) === JSON.stringify(expected),
        actual,
        expected,
        "Hiba: nem egyezik az itemBar tartalma"
    );
    console.log("Teszt sikeres: itemBar tartalma egyezik a várt értékkel");
}


itemTobbItemDb();


function itemImageRenderTest() {
    const gameArea = new GameArea();


    gameArea.itemBar.addItem('plant');

    const firstSlot = document.querySelectorAll('.item-slot')[0];


    const itemElement = firstSlot.querySelector('.plant');


    console.assert(
        itemElement !== null,
        firstSlot.innerHTML,
        "Hiba: nem jelent meg a 'plant' kép az első slotban"
    );

    console.log("Teszt sikeres: a 'plant' kép megjelent az első slotban");
}

itemImageRenderTest();

