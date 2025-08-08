/**
 * Utility Helper Functions
 * 
 * Common helper functions used throughout the application
 */

const Helpers = {
    
    /**
     * Format time in F1 timing format
     * @param {number} seconds - Time in seconds
     * @param {boolean} showMilliseconds - Whether to show milliseconds
     * @returns {string} Formatted time string
     */
    formatF1Time(seconds, showMilliseconds = true) {
        if (seconds === null || seconds === undefined) return '--:--';
        
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (hours > 0) {
            return `${hours}:${String(minutes).padStart(2, '0')}:${secs.toFixed(showMilliseconds ? 3 : 0).padStart(showMilliseconds ? 6 : 2, '0')}`;
        } else if (minutes > 0) {
            return `${minutes}:${secs.toFixed(showMilliseconds ? 3 : 0).padStart(showMilliseconds ? 6 : 2, '0')}`;
        } else {
            return `${secs.toFixed(showMilliseconds ? 3 : 0)}s`;
        }
    },
    
    /**
     * Format time gap in F1 style
     * @param {number} gap - Time gap in seconds
     * @param {boolean} isLapped - Whether the driver is lapped
     * @returns {string} Formatted gap string
     */
    formatTimeGap(gap, isLapped = false) {
        if (gap === 0) return 'Leader';
        if (isLapped) {
            const laps = Math.floor(gap / 85); // Assume ~85s average lap
            return `+${laps} lap${laps > 1 ? 's' : ''}`;
        }
        
        if (gap < 60) {
            return `+${gap.toFixed(3)}`;
        } else {
            const minutes = Math.floor(gap / 60);
            const seconds = gap % 60;
            return `+${minutes}:${seconds.toFixed(3).padStart(6, '0')}`;
        }
    },
    
    /**
     * Generate random number within range
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @param {number} decimals - Number of decimal places
     * @returns {number} Random number
     */
    randomBetween(min, max, decimals = 0) {
        const random = Math.random() * (max - min) + min;
        return decimals > 0 ? parseFloat(random.toFixed(decimals)) : Math.floor(random);
    },
    
    /**
     * Clamp number between min and max
     * @param {number} value - Value to clamp
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} Clamped value
     */
    clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    },
    
    /**
     * Linear interpolation between two values
     * @param {number} start - Start value
     * @param {number} end - End value
     * @param {number} factor - Interpolation factor (0-1)
     * @returns {number} Interpolated value
     */
    lerp(start, end, factor) {
        return start + (end - start) * this.clamp(factor, 0, 1);
    },
    
    /**
     * Convert percentage to decimal
     * @param {number} percentage - Percentage value
     * @returns {number} Decimal value
     */
    percentageToDecimal(percentage) {
        return percentage / 100;
    },
    
    /**
     * Convert decimal to percentage
     * @param {number} decimal - Decimal value
     * @param {number} decimals - Number of decimal places
     * @returns {number} Percentage value
     */
    decimalToPercentage(decimal, decimals = 1) {
        return parseFloat((decimal * 100).toFixed(decimals));
    },
    
    /**
     * Shuffle array using Fisher-Yates algorithm
     * @param {Array} array - Array to shuffle
     * @returns {Array} Shuffled array (new array)
     */
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },
    
    /**
     * Deep clone an object
     * @param {Object} obj - Object to clone
     * @returns {Object} Cloned object
     */
    deepClone(obj) {
        if (obj === null || typeof obj !== 'object') return obj;
        if (obj instanceof Date) return new Date(obj.getTime());
        if (Array.isArray(obj)) return obj.map(item => this.deepClone(item));
        
        const cloned = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                cloned[key] = this.deepClone(obj[key]);
            }
        }
        return cloned;
    },
    
    /**
     * Debounce function calls
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    /**
     * Throttle function calls
     * @param {Function} func - Function to throttle
     * @param {number} limit - Time limit in milliseconds
     * @returns {Function} Throttled function
     */
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    /**
     * Check if device is mobile
     * @returns {boolean} True if mobile device
     */
    isMobile() {
        return window.innerWidth <= UI_CONSTANTS.BREAKPOINTS.MOBILE;
    },
    
    /**
     * Check if device is tablet
     * @returns {boolean} True if tablet device
     */
    isTablet() {
        return window.innerWidth > UI_CONSTANTS.BREAKPOINTS.MOBILE && 
               window.innerWidth <= UI_CONSTANTS.BREAKPOINTS.TABLET;
    },
    
    /**
     * Check if device is desktop
     * @returns {boolean} True if desktop device
     */
    isDesktop() {
        return window.innerWidth > UI_CONSTANTS.BREAKPOINTS.TABLET;
    },
    
    /**
     * Validate driver code format
     * @param {string} code - Driver code to validate
     * @returns {boolean} True if valid
     */
    isValidDriverCode(code) {
        return VALIDATION_RULES.DRIVER_CODE.PATTERN.test(code);
    },
    
    /**
     * Calculate position change color class
     * @param {number} change - Position change (positive = gained, negative = lost)
     * @returns {string} CSS class name
     */
    getPositionChangeClass(change) {
        if (change > 0) return 'position-change-positive';
        if (change < 0) return 'position-change-negative';
        return 'position-change-neutral';
    },
    
    /**
     * Get confidence level description
     * @param {number} confidence - Confidence percentage
     * @returns {string} Confidence level description
     */
    getConfidenceLevel(confidence) {
        if (confidence >= PERFORMANCE_THRESHOLDS.CONFIDENCE_LEVELS.HIGH) {
            return 'High';
        } else if (confidence >= PERFORMANCE_THRESHOLDS.CONFIDENCE_LEVELS.MEDIUM) {
            return 'Medium';
        } else {
            return 'Low';
        }
    },
    
    /**
     * Calculate weighted average
     * @param {Array} values - Array of {value, weight} objects
     * @returns {number} Weighted average
     */
    weightedAverage(values) {
        const totalWeight = values.reduce((sum, item) => sum + item.weight, 0);
        const weightedSum = values.reduce((sum, item) => sum + (item.value * item.weight), 0);
        return totalWeight > 0 ? weightedSum / totalWeight : 0;
    },
    
    /**
     * Generate UUID v4
     * @returns {string} UUID string
     */
    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    
    /**
     * Format number with proper separators
     * @param {number} num - Number to format
     * @param {number} decimals - Number of decimal places
     * @returns {string} Formatted number
     */
    formatNumber(num, decimals = 0) {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(num);
    },
    
    /**
     * Calculate lap time difference significance
     * @param {number} difference - Time difference in seconds
     * @returns {string} Significance level
     */
    getLapTimeDifferenceSignificance(difference) {
        const abs = Math.abs(difference);
        if (abs > PERFORMANCE_THRESHOLDS.LAP_TIME_DIFFERENCE.DOMINANT) {
            return 'dominant';
        } else if (abs > PERFORMANCE_THRESHOLDS.LAP_TIME_DIFFERENCE.COMPETITIVE) {
            return 'competitive';
        } else {
            return 'close';
        }
    },
    
    /**
     * Safe DOM element selector
     * @param {string} selector - CSS selector
     * @param {Element} parent - Parent element (optional)
     * @returns {Element|null} Found element or null
     */
    $(selector, parent = document) {
        try {
            return parent.querySelector(selector);
        } catch (error) {
            console.warn(`Invalid selector: ${selector}`, error);
            return null;
        }
    },
    
    /**
     * Safe DOM elements selector
     * @param {string} selector - CSS selector
     * @param {Element} parent - Parent element (optional)
     * @returns {NodeList} Found elements
     */
    $$(selector, parent = document) {
        try {
            return parent.querySelectorAll(selector);
        } catch (error) {
            console.warn(`Invalid selector: ${selector}`, error);
            return [];
        }
    },
    
    /**
     * Add event listener with automatic cleanup
     * @param {Element} element - Target element
     * @param {string} event - Event name
     * @param {Function} handler - Event handler
     * @param {Object} options - Event options
     * @returns {Function} Cleanup function
     */
    addEventListenerWithCleanup(element, event, handler, options = {}) {
        element.addEventListener(event, handler, options);
        return () => element.removeEventListener(event, handler, options);
    },
    
    /**
     * Animate element with CSS classes
     * @param {Element} element - Element to animate
     * @param {string} animationClass - CSS animation class
     * @param {number} duration - Animation duration in ms
     * @returns {Promise} Promise that resolves when animation completes
     */
    animateElement(element, animationClass, duration = 300) {
        return new Promise((resolve) => {
            element.classList.add(animationClass);
            setTimeout(() => {
                element.classList.remove(animationClass);
                resolve();
            }, duration);
        });
    },
    
    /**
     * Check if element is in viewport
     * @param {Element} element - Element to check
     * @param {number} threshold - Visibility threshold (0-1)
     * @returns {boolean} True if element is visible
     */
    isElementInViewport(element, threshold = 0.1) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        
        const verticalVisible = (rect.top <= windowHeight * (1 - threshold)) && 
                               ((rect.top + rect.height) >= windowHeight * threshold);
        const horizontalVisible = (rect.left <= windowWidth * (1 - threshold)) && 
                                 ((rect.left + rect.width) >= windowWidth * threshold);
        
        return verticalVisible && horizontalVisible;
    },
    
    /**
     * Local storage wrapper with error handling
     * @param {string} key - Storage key
     * @param {*} value - Value to store (optional, if not provided, retrieves value)
     * @returns {*} Retrieved value or boolean indicating success
     */
    storage(key, value) {
        try {
            if (value !== undefined) {
                // Store value
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } else {
                // Retrieve value
                const stored = localStorage.getItem(key);
                return stored ? JSON.parse(stored) : null;
            }
        } catch (error) {
            console.warn('Local storage operation failed:', error);
            return value !== undefined ? false : null;
        }
    }
};

// Export for ES6 modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Helpers;
}