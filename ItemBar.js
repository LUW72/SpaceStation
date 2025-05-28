export class ItemBar {
    constructor() {
        this.items = [];
        this.selectedItemIndex = -1;
        this.container = document.querySelector('.item-bar');
        this.initializeKeyBindings();
    }

    initializeKeyBindings() {
        document.addEventListener('keydown', (e) => {
            // Numbers 1-6 for selecting items
            if (e.key >= '1' && e.key <= '6') {
                const index = parseInt(e.key) - 1;
                this.selectItem(index);
            }
        });
    }

    addItem(itemType) {
        if (this.items.length < 6) {
            this.items.push(itemType);
            this.updateDisplay();
        }
    }

    removeItem(index) {
        if (index >= 0 && index < this.items.length) {
            this.items.splice(index, 1);
            this.updateDisplay();
        }
    }

    selectItem(index) {
        if (index >= 0 && index < 6) {
            this.selectedItemIndex = index;
            this.updateDisplay();
        }
    }

    updateDisplay() {
        const slots = this.container.querySelectorAll('.item-slot');
        slots.forEach((slot, index) => {
            // Clear the slot
            slot.innerHTML = '';
            slot.classList.remove('selected');

            // If there's an item in this slot
            if (index < this.items.length) {
                const itemElement = document.createElement('div');
                itemElement.className = 'item';
                itemElement.classList.add(this.items[index]);
                slot.appendChild(itemElement);
            }

            // If this slot is selected
            if (index === this.selectedItemIndex) {
                slot.classList.add('selected');
            }
        });
    }

    getSelectedItem() {
        if (this.selectedItemIndex >= 0 && this.selectedItemIndex < this.items.length) {
            return this.items[this.selectedItemIndex];
        }
        return null;
    }
} 