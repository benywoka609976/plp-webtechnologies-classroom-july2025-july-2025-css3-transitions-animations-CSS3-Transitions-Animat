/* ===== PART 2: JAVASCRIPT FUNCTIONS - SCOPE, PARAMETERS & RETURN VALUES ===== */

// ===== GLOBAL VARIABLES (GLOBAL SCOPE) =====
let cardCounter = 0;           // Tracks total cards created
let flipCounter = 0;           // Tracks total card flips
let cardColors = [             // Array of available colors
    '#ff6b6b', '#4ecdc4', '#45b7d1', 
    '#96ceb4', '#feca57', '#ff9ff3'
];
let cardDatabase = [];         // Stores all card data objects

/* ===== FUNCTION DEMONSTRATIONS ===== */

/**
 * FUNCTION 1: Card Data Creator
 * Demonstrates: Parameters with defaults, return values, local scope
 * @param {string} title - Card title (optional)
 * @param {string} description - Card description (optional) 
 * @param {number} id - Unique identifier (optional)
 * @returns {Object} Card data object
 */
function createCardData(title, description, id) {
    // LOCAL VARIABLES (LOCAL SCOPE)
    const randomColor = getRandomColor();
    const creationTime = new Date().toLocaleTimeString();
    const defaultTitle = `Magic Card ${cardCounter + 1}`;
    const defaultDesc = generateRandomDescription();
    
    // RETURN VALUE: Object with card properties
    return {
        id: id || Date.now(),
        title: title || defaultTitle,          // Default parameter usage
        description: description || defaultDesc, // Default parameter usage
        color: randomColor,
        createdAt: creationTime,
        flipped: false
    };
}

/**
 * FUNCTION 2: Random Color Selector
 * Demonstrates: Array manipulation, Math operations, return values
 * @returns {string} Hex color code
 */
function getRandomColor() {
    // LOCAL VARIABLE
    const randomIndex = Math.floor(Math.random() * cardColors.length);
    
    // RETURN VALUE: Color from global array
    return cardColors[randomIndex];
}

/**
 * FUNCTION 3: Random Description Generator  
 * Demonstrates: Multiple local arrays, string manipulation, local scope
 * @returns {string} Generated description
 */
function generateRandomDescription() {
    // LOCAL VARIABLES (LOCAL SCOPE)
    const adjectives = ['mysterious', 'powerful', 'ancient', 'glowing', 'enchanted', 'mystical'];
    const nouns = ['crystal', 'spell', 'potion', 'artifact', 'rune', 'charm'];
    const verbs = ['reveals', 'unleashes', 'channels', 'summons', 'transforms', 'protects'];
    
    // LOCAL VARIABLES for random selections
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const verb = verbs[Math.floor(Math.random() * verbs.length)];
    
    // RETURN VALUE: Constructed string
    return `This ${adj} ${noun} ${verb} incredible magical powers when activated.`;
}

/**
 * FUNCTION 4: DOM Element Builder
 * Demonstrates: Parameter usage, DOM manipulation, return values
 * @param {Object} cardData - Card data object with properties
 * @returns {HTMLElement} Complete card DOM element
 */
function createCardElement(cardData) {
    // LOCAL VARIABLES
    const cardElement = document.createElement('div');
    const darkerColor = adjustBrightness(cardData.color, -20);
    
    // Set properties using parameter data
    cardElement.className = 'card slide-in';
    cardElement.dataset.cardId = cardData.id;
    
    // Build HTML structure
    cardElement.innerHTML = `
        <div class="card-inner">
            <div class="card-face card-front" style="background: linear-gradient(135deg, ${cardData.color} 0%, ${darkerColor} 100%);">
                <div class="card-title">${cardData.title}</div>
                <div class="card-description">Click to reveal secrets...</div>
            </div>
            <div class="card-face card-back">
                <div class="card-title">Revealed!</div>
                <div class="card-description">${cardData.description}</div>
                <small>Created: ${cardData.createdAt}</small>
            </div>
        </div>
    `;
    
    // RETURN VALUE: Complete DOM element
    return cardElement;
}

/**
 * FUNCTION 5: Color Brightness Adjuster
 * Demonstrates: String manipulation, mathematical operations, return calculations
 * @param {string} hex - Hex color code
 * @param {number} percent - Brightness adjustment percentage
 * @returns {string} Adjusted hex color
 */
function adjustBrightness(hex, percent) {
    // LOCAL VARIABLE: Remove # symbol
    const color = hex.replace('#', '');
    
    // LOCAL VARIABLES: Convert hex to RGB
    const r = parseInt(color.substr(0, 2), 16);
    const g = parseInt(color.substr(2, 2), 16);
    const b = parseInt(color.substr(4, 2), 16);
    
    // LOCAL VARIABLES: Calculate new values
    const newR = Math.max(0, Math.min(255, r + (r * percent / 100)));
    const newG = Math.max(0, Math.min(255, g + (g * percent / 100)));
    const newB = Math.max(0, Math.min(255, b + (b * percent / 100)));
    
    // RETURN VALUE: New hex color
    return `#${Math.round(newR).toString(16).padStart(2, '0')}${Math.round(newG).toString(16).padStart(2, '0')}${Math.round(newB).toString(16).padStart(2, '0')}`;
}

/**
 * FUNCTION 6: Async Loading with Callback
 * Demonstrates: Callback functions, setTimeout, parameter functions
 * @param {number} duration - Loading duration in milliseconds
 * @param {Function} callback - Function to execute after loading
 */
function showLoadingWithCallback(duration, callback) {
    // LOCAL VARIABLE
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    // Show loading (no return value needed)
    loadingOverlay.style.display = 'flex';
    
    // Execute callback after duration
    setTimeout(() => {
        loadingOverlay.style.display = 'none';
        
        // CALLBACK EXECUTION: Check if callback is a function
        if (callback && typeof callback === 'function') {
            callback(); // Execute the passed function
        }
    }, duration);
}

/**
 * FUNCTION 7: Statistics Updater
 * Demonstrates: Global scope access, DOM manipulation, no return value
 */
function updateStats() {
    // ACCESS GLOBAL VARIABLES and update DOM
    document.getElementById('cardCount').textContent = cardDatabase.length;
    document.getElementById('flipCount').textContent = flipCounter;
    // No return value - this function performs actions only
}

/**
 * FUNCTION 8: Validation Function
 * Demonstrates: Parameter validation, boolean return values
 * @param {string} input - Input to validate
 * @returns {boolean} True if valid, false otherwise
 */
function isValidInput(input) {
    // LOCAL VARIABLES for validation
    const trimmed = input ? input.trim() : '';
    const isNotEmpty = trimmed.length > 0;
    const isNotTooLong = trimmed.length <= 50;
    
    // RETURN VALUE: Boolean result
    return isNotEmpty && isNotTooLong;
}

/* ===== PART 3: COMBINING CSS ANIMATIONS WITH JAVASCRIPT ===== */

/**
 * FUNCTION 9: Ripple Effect Controller
 * Demonstrates: Event handling, CSS class manipulation, animation timing
 * @param {HTMLElement} button - Button element to add ripple effect
 */
function addRippleEffect(button) {
    button.addEventListener('click', function() {
        // Add CSS class to trigger animation
        this.classList.add('ripple');
        
        // Remove class after CSS animation completes
        setTimeout(() => {
            this.classList.remove('ripple');
        }, 600); // Matches CSS animation duration
    });
}

/**
 * FUNCTION 10: Card Flip Animation Trigger
 * Demonstrates: CSS class toggling, data manipulation, visual feedback
 * @param {HTMLElement} cardElement - Card DOM element to flip
 */
function flipCard(cardElement) {
    // LOCAL VARIABLES
    const cardId = cardElement.dataset.cardId;
    const cardData = cardDatabase.find(card => card.id == cardId);
    
    if (cardData) {
        // Update data (GLOBAL SCOPE access)
        cardData.flipped = !cardData.flipped;
        flipCounter++; // Increment global counter
        
        // TRIGGER CSS ANIMATION by toggling class
        cardElement.classList.toggle('flipped');
        
        // Visual feedback with temporary scaling
        cardElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            cardElement.style.transform = '';
        }, 200);
        
        // Update global statistics
        updateStats();
    }
}

/**
 * FUNCTION 11: Shuffle Animation Orchestrator
 * Demonstrates: Complex animation sequencing, array manipulation, timing coordination
 */
function shuffleCards() {
    // LOCAL VARIABLES
    const container = document.getElementById('cardContainer');
    const cards = Array.from(container.children);
    
    // PHASE 1: Animate cards out with staggered timing
    cards.forEach((card, index) => {
        setTimeout(() => {
            // Apply random transforms via CSS
            const randomX = Math.random() * 400 - 200;
            const randomY = Math.random() * 200 - 100;
            const randomRotation = Math.random() * 360;
            
            card.style.transform = `translateX(${randomX}px) translateY(${randomY}px) rotate(${randomRotation}deg)`;
            card.style.opacity = '0.3';
        }, index * 100);
    });
    
    // PHASE 2: Shuffle array and animate back in
    setTimeout(() => {
        // Fisher-Yates shuffle algorithm
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]]; // Swap elements
        }
        
        // Clear and rebuild with shuffled order
        container.innerHTML = '';
        cards.forEach((card, index) => {
            setTimeout(() => {
                // Reset transforms and trigger slide-in animation
                card.style.transform = '';
                card.style.opacity = '';
                card.classList.add('slide-in');
                container.appendChild(card);
            }, index * 150);
        });
    }, 1000);
}

/**
 * FUNCTION 12: Modal Animation Controller
 * Demonstrates: CSS class manipulation for show/hide animations
 * @param {string} message - Message to display in modal
 */
function showModal(message) {
    // LOCAL VARIABLES
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modalText');
    
    // Set content and show modal
    modalText.textContent = message;
    modal.style.display = 'flex';
    
    // Trigger CSS animation with slight delay
    setTimeout(() => {
        modal.classList.add('show'); // This triggers CSS transition
    }, 10);
}

/**
 * FUNCTION 13: Modal Hide Controller
 * Demonstrates: Reverse CSS animations, cleanup timing
 */
function hideModal() {
    // LOCAL VARIABLE
    const modal = document.getElementById('modal');
    
    // Remove animation class (triggers CSS transition)
    modal.classList.remove('show');
    
    // Hide element after CSS animation completes
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300); // Matches CSS transition duration
}

/**
 * FUNCTION 14: Batch Animation Controller
 * Demonstrates: Looping with delays, batch operations
 * @param {NodeList} elements - Elements to animate
 * @param {string} animationClass - CSS class to add
 * @param {number} delay - Delay between animations
 */
function animateSequence(elements, animationClass, delay) {
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add(animationClass);
            
            // Remove class after animation to allow re-triggering
            setTimeout(() => {
                element.classList.remove(animationClass);
            }, 1000);
        }, index * delay);
    });
}

/* ===== APPLICATION INITIALIZATION ===== */

/**
 * MAIN INITIALIZATION FUNCTION
 * Demonstrates: Event listeners, function orchestration, application setup
 */
function initializeApp() {
    // Create initial cards using our functions
    for (let i = 0; i < 3; i++) {
        // FUNCTION CALLS with different scopes
        const cardData = createCardData(); // No parameters - uses defaults
        cardDatabase.push(cardData);       // Modify global array
        cardCounter++;                     // Increment global counter
        
        // Create and add DOM element
        const cardElement = createCardElement(cardData);
        document.getElementById('cardContainer').appendChild(cardElement);
        
        // Add event listeners for interactivity
        cardElement.addEventListener('click', () => flipCard(cardElement));
        cardElement.addEventListener('dblclick', () => {
            showModal(`You double-clicked "${cardData.title}"! Created at ${cardData.createdAt}.`);
        });
    }
    
    // Get button references
    const addCardBtn = document.getElementById('addCardBtn');
    const flipAllBtn = document.getElementById('flipAllBtn');
    const shuffleBtn = document.getElementById('shuffleBtn');
    
    // Add ripple effects to all buttons
    addRippleEffect(addCardBtn);
    addRippleEffect(flipAllBtn);
    addRippleEffect(shuffleBtn);
    
    // Add Card Button - demonstrates callback usage
    addCardBtn.addEventListener('click', () => {
        showLoadingWithCallback(800, () => {
            // This function runs AFTER loading completes
            const cardData = createCardData();
            cardDatabase.push(cardData);
            cardCounter++;
            
            const cardElement = createCardElement(cardData);
            document.getElementById('cardContainer').appendChild(cardElement);
            
            // Add event listeners to new card
            cardElement.addEventListener('click', () => flipCard(cardElement));
            cardElement.addEventListener('dblclick', () => {
                showModal(`New card "${cardData.title}" created at ${cardData.createdAt}!`);
            });
            
            updateStats(); // Update global statistics
        });
    });
    
    // Flip All Cards Button - demonstrates batch animation
    flipAllBtn.addEventListener('click', () => {
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                flipCard(card); // Each card flips with delay
            }, index * 200);
        });
    });
    
    // Shuffle Button - triggers complex animation sequence  
    shuffleBtn.addEventListener('click', shuffleCards);
    
    // Modal close functionality
    document.getElementById('closeModal').addEventListener('click', hideModal);
    document.getElementById('modal').addEventListener('click', (e) => {
        if (e.target.id === 'modal') {
            hideModal(); // Close when clicking outside modal content
        }
    });
    
    // Initialize statistics display
    updateStats();
}

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);