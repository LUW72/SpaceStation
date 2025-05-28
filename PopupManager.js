export class PopupManager {
    constructor() {
        this.popup = document.querySelector('.signpost-popup');
        this.popupText = document.querySelector('.popup-text');
        this.closeButton = document.querySelector('.close-popup');
        
        // Bind the close handler
        this.closeButton.addEventListener('click', () => this.hidePopup());
        
        // Add keyboard listener for closing popup with ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hidePopup();
            }
        });
    }

    showPopup(text) {
        if (this.popup && this.popupText) {
            this.popupText.textContent = text;
            this.popup.style.display = 'flex';
            
            // Prevent character movement while popup is open
            document.dispatchEvent(new CustomEvent('popup-opened'));
        }
    }

    hidePopup() {
        if (this.popup) {
            this.popup.style.display = 'none';
            
            // Re-enable character movement
            document.dispatchEvent(new CustomEvent('popup-closed'));
        }
    }

    isPopupVisible() {
        return this.popup && this.popup.style.display === 'flex';
    }
} 