export class ItemBar {
    constructor() {
        this.items = [];  // Will now store objects with {type, count}
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
        // Check if the item already exists
        const existingItemIndex = this.items.findIndex(item => item.type === itemType);
        console.log("Trying to add:", itemType);
console.log("Current items:", this.items);
console.log("Found existing index:", existingItemIndex);
        console.log(`Adding item: ${itemType}, existing index: ${existingItemIndex}`);
        
        if (existingItemIndex !== -1) {
            // Item exists, increment counter
            this.items[existingItemIndex].count++;
        } else if (this.items.length < 6) {
            // New item, add it with count 1
            this.items.push({ type: itemType, count: 1 });
        }
        this.updateDisplay();
    }

    removeItem(index) {
        if (index >= 0 && index < this.items.length) {
            const item = this.items[index];
            if (item.count > 1) {
                item.count--;
            } else {
                this.items.splice(index, 1);
            }
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
                itemElement.classList.add(this.items[index].type);
                
                // Add counter if count > 1
                if (this.items[index].count > 1) {
                    const counter = document.createElement('div');
                    counter.className = 'item-counter';
                    counter.textContent = this.items[index].count;
                    itemElement.appendChild(counter);
                }
                
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