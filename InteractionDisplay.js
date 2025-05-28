export class InteractionDisplay {
    constructor() {
        this.display = document.querySelector('.interaction-display');
        this.textureSection = document.querySelector('.texture-display');
        this.textSection = document.querySelector('.text-display');
        this.descriptionElement = document.querySelector('.description-text');
        this.hintElement = document.querySelector('.interaction-hint');
        
        // Verify elements exist
        if (!this.display || !this.textureSection || !this.textSection || !this.hintElement || !this.descriptionElement) {
            console.error('Required interaction display elements not found in the DOM');
            return;
        }
    }

    showInteraction(type, texturePath, displayName = '', isInteractable = false, description = '') {
        // Guard against null elements
        if (!this.display || !this.textureSection || !this.textSection || !this.hintElement || !this.descriptionElement) {
            console.error('Cannot show interaction: display elements not found');
            return;
        }

        // Clear previous content
        this.clear();

        // Set the texture
        this.textureSection.style.backgroundImage = `url(${texturePath})`;

        // Set the text
        this.textSection.textContent = displayName;

        // Set and show description if available
        if (description) {
            this.descriptionElement.textContent = description;
            this.descriptionElement.style.display = 'block';
        }

        // Show/hide interaction hint based on interactability
        this.hintElement.style.display = displayName && isInteractable ? 'block' : 'none';
    }

    clear() {
        // Guard against null elements
        if (!this.textureSection || !this.textSection || !this.hintElement || !this.descriptionElement) {
            return;
        }

        this.textureSection.style.backgroundImage = 'none';
        this.textSection.textContent = '';
        this.descriptionElement.style.display = 'none';
        this.descriptionElement.textContent = '';
        this.hintElement.style.display = 'none';
    }
} 