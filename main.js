/**
 * F1 AI Race Predictor - Main Application Entry Point
 * 
 * This file initializes the application and coordinates between modules.
 * It sets up the initial state and handles the main application lifecycle.
 */

// Application State
const AppState = {
    currentTrack: 'austria',
    currentQualiGrid: {},
    editModeActive: false,
    originalQualiGrid: {},
    chaosMode: false,
    featureWeights: {
        track: 0.85,
        pace: 0.90,
        quali: 0.85,
        team: 0.68,
        weather: 0.45
    },
    defaultWeights: {
        track: 0.85,
        pace: 0.90,
        quali: 0.85,
        team: 0.68,
        weather: 0.45
    }
};

/**
 * Initialize the application
 */
function initializeApp() {
    try {
        console.log('🏁 Initializing F1 AI Race Predictor...');
        
        // Initialize UI components
        UIController.populateTrackGrid();
        UIController.setupSliders();
        
        // Set default track
        selectTrack('austria');
        
        // Setup event listeners
        setupEventListeners();
        
        // Initial prediction update
        updatePredictions();
        
        console.log('✅ Application initialized successfully!');
    } catch (error) {
        console.error('❌ Error initializing application:', error);
        showError('Failed to initialize application. Please refresh the page.');
    }
}

/**
 * Setup global event listeners
 */
function setupEventListeners() {
    // Window resize handler for responsive design
    window.addEventListener('resize', debounce(() => {
        UIController.handleResize();
    }, 250));
    
    // Prevent form submissions if any forms are added later
    document.addEventListener('submit', (e) => {
        e.preventDefault();
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Handle browser navigation
    window.addEventListener('beforeunload', (e) => {
        // Could save state here if needed
    });
}

/**
 * Handle keyboard shortcuts
 * @param {KeyboardEvent} e - Keyboard event
 */
function handleKeyboardShortcuts(e) {
    // Ctrl/Cmd + R: Regenerate qualifying
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        regenerateQualifying();
    }
    
    // Ctrl/Cmd + E: Toggle edit mode
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        toggleQualiEdit();
    }
    
    // Space: Toggle chaos mode
    if (e.key === ' ' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        toggleChaosMode();
    }
}

/**
 * Select and load a specific track
 * @param {string} trackKey - Track identifier
 */
function selectTrack(trackKey) {
    try {
        if (!F1_TRACKS[trackKey]) {
            throw new Error(`Track ${trackKey} not found`);
        }

        AppState.currentTrack = trackKey;
        const track = F1_TRACKS[trackKey];

        // Clear current qualifying grid to force regeneration
        AppState.currentQualiGrid = {};

        // Update UI
        UIController.updateActiveTrack(trackKey);
        UIController.updateHeaderInfo(track);
        UIController.updateWeatherInfo(track);
        UIController.updateTrackCharacteristics(track);

        // Update predictions for new track
        updatePredictions();
        
        console.log(`🏁 Selected track: ${track.name}`);
    } catch (error) {
        console.error('Error selecting track:', error);
        showError(`Failed to load track: ${trackKey}`);
    }
}

/**
 * Update all predictions based on current state
 */
function updatePredictions() {
    try {
        const track = F1_TRACKS[AppState.currentTrack];
        
        if (!track) {
            throw new Error(`Track not found: ${AppState.currentTrack}`);
        }
        
        // Use current qualifying grid or simulate new one
        if (!AppState.currentQualiGrid || Object.keys(AppState.currentQualiGrid).length === 0) {
            AppState.currentQualiGrid = QualifyingSimulator.simulate(track);
        }
        
        // Generate race predictions
        const predictions = PredictionEngine.generatePredictions(
            track, 
            AppState.currentQualiGrid, 
            AppState.featureWeights,
            AppState.chaosMode
        );
        
        // Update UI with new predictions
        UIController.updatePodium(predictions.slice(0, 3));
        UIController.updateResultsTable(predictions);
        UIController.updateFeatureBars(AppState.featureWeights);
        UIController.updateModelMetrics(track, AppState.featureWeights);
        UIController.displayQualifyingGrid(AppState.currentQualiGrid);
        
    } catch (error) {
        console.error('Error in updatePredictions:', error);
        showError('Failed to update predictions. Please try again.');
    }
}

/**
 * Regenerate qualifying session
 */
function regenerateQualifying() {
    try {
        const track = F1_TRACKS[AppState.currentTrack];
        AppState.currentQualiGrid = QualifyingSimulator.simulate(track);
        UIController.displayQualifyingGrid(AppState.currentQualiGrid);
        updatePredictions();
        
        console.log('🔄 Qualifying session regenerated');
    } catch (error) {
        console.error('Error regenerating qualifying:', error);
        showError('Failed to regenerate qualifying. Please try again.');
    }
}

/**
 * Toggle qualifying edit mode
 */
function toggleQualiEdit() {
    try {
        AppState.editModeActive = !AppState.editModeActive;
        
        if (AppState.editModeActive) {
            AppState.originalQualiGrid = { ...AppState.currentQualiGrid };
            UIController.showQualiEditMode(AppState.currentQualiGrid);
        } else {
            UIController.hideQualiEditMode();
        }
        
        console.log(`✏️ Qualifying edit mode: ${AppState.editModeActive ? 'ON' : 'OFF'}`);
    } catch (error) {
        console.error('Error toggling edit mode:', error);
        showError('Failed to toggle edit mode.');
    }
}

/**
 * Apply qualifying changes from edit mode
 */
function applyQualiChanges() {
    try {
        AppState.editModeActive = false;
        UIController.hideQualiEditMode();
        UIController.displayQualifyingGrid(AppState.currentQualiGrid);
        updatePredictions();
        
        console.log('✅ Qualifying changes applied');
    } catch (error) {
        console.error('Error applying qualifying changes:', error);
        showError('Failed to apply qualifying changes.');
    }
}

/**
 * Cancel qualifying edit and restore original grid
 */
function cancelQualiEdit() {
    try {
        AppState.currentQualiGrid = { ...AppState.originalQualiGrid };
        AppState.editModeActive = false;
        UIController.hideQualiEditMode();
        
        console.log('❌ Qualifying edit cancelled');
    } catch (error) {
        console.error('Error cancelling edit:', error);
        showError('Failed to cancel edit.');
    }
}

/**
 * Toggle chaos mode
 */
function toggleChaosMode() {
    try {
        AppState.chaosMode = !AppState.chaosMode;
        UIController.updateChaosMode(AppState.chaosMode);
        updatePredictions();
        
        console.log(`🎲 Chaos mode: ${AppState.chaosMode ? 'ENABLED' : 'DISABLED'}`);
    } catch (error) {
        console.error('Error toggling chaos mode:', error);
        showError('Failed to toggle chaos mode.');
    }
}

/**
 * Reset feature weights to defaults
 */
function resetWeights() {
    try {
        AppState.featureWeights = { ...AppState.defaultWeights };
        UIController.updateSliders(AppState.featureWeights);
        updatePredictions();
        
        console.log('🔄 Feature weights reset to defaults');
    } catch (error) {
        console.error('Error resetting weights:', error);
        showError('Failed to reset weights.');
    }
}

/**
 * Update feature weight from slider input
 * @param {string} feature - Feature name
 * @param {number} value - New weight value (0-100)
 */
function updateFeatureWeight(feature, value) {
    try {
        AppState.featureWeights[feature] = value / 100;
        console.log(`🎛️ Updated ${feature} weight to ${value}%`);
    } catch (error) {
        console.error('Error updating feature weight:', error);
    }
}

/**
 * Show error message to user
 * @param {string} message - Error message
 */
function showError(message) {
    // Create or update error display
    let errorDiv = document.getElementById('error-display');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.id = 'error-display';
        errorDiv.className = 'error';
        document.querySelector('.container').prepend(errorDiv);
    }
    
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (errorDiv) {
            errorDiv.style.display = 'none';
        }
    }, 5000);
}

/**
 * Show success message to user
 * @param {string} message - Success message
 */
function showSuccess(message) {
    // Create or update success display
    let successDiv = document.getElementById('success-display');
    if (!successDiv) {
        successDiv = document.createElement('div');
        successDiv.id = 'success-display';
        successDiv.className = 'success';
        document.querySelector('.container').prepend(successDiv);
    }
    
    successDiv.textContent = message;
    successDiv.style.display = 'block';
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        if (successDiv) {
            successDiv.style.display = 'none';
        }
    }, 3000);
}

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Global error handler
 */
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    showError('An unexpected error occurred. Please refresh the page.');
});

/**
 * Handle unhandled promise rejections
 */
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    showError('An unexpected error occurred. Please refresh the page.');
});

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Expose global functions for HTML onclick handlers
window.selectTrack = selectTrack;
window.updatePredictions = updatePredictions;
window.regenerateQualifying = regenerateQualifying;
window.toggleQualiEdit = toggleQualiEdit;
window.applyQualiChanges = applyQualiChanges;
window.cancelQualiEdit = cancelQualiEdit;
window.toggleChaosMode = toggleChaosMode;
window.resetWeights = resetWeights;
window.updateFeatureWeight = updateFeatureWeight;