import requestFrame from 'request-frame-modern';
import { debounce } from 'volve';
import objectAssignPolyfill from '../libs/object-assign-polyfill';

// Add the Object.assign polyfill.
objectAssignPolyfill();

// Obtains the window or global according to the environment.
const windowGlobal = typeof window !== 'undefined' ? window : (typeof self === 'object' && self.self === self && self) ||
    (typeof global === 'object' && global.global === global && global);


// A list of option names to make naming and renaming simple.
const optionNames = 'handler,delay,incept,useCapture,orientationchange'.split(',');


// Default options that correspond with the optionNames.
const defaults = [() => {}, 16, false, false, true];


/** 
 * Each option name is paired with the option value
 * @return {Object}
 */
const convertPairsToLiterals = (value, i) => ({
    [optionNames[i]]: value });


/** 
 * Adds the window event with the provided options.
 * Returns the same handler for removeEventListeners.
 * @return {Function}
 */
const addWindowEvent = (handler, delay, incept, windowObject, useCapture) => {
    const debounced = debounce(handler, delay, incept);
    windowObject.addEventListener('resize', debounced, useCapture);
    return debounced;
}


const destroyPartial = (directHandler, useCapture, windowObject)=>{
    const destroyAPI = (type) => {
        if (!type || type === 'all') {
            // Remove both event listeners.
            windowObject.removeEventListener('resize', directHandler, useCapture);
            windowObject.removeEventListener('orientationchange', directHandler, useCapture);
        } else {
            // Remove specific event listener.
            windowObject.removeEventListener(type, directHandler, useCapture);
        }
    }
    return destroyAPI;
}

/** 
 * Partially apply variables as defaults
 * @param {Array} defaults - Array of consecutive defaults.
 * @param {object} windowObject -  The window | global object.
 */
const resizillaPartial = (defaults, windowObject) => {

    /** 
     * The API
     * @param {Function} handler - The callback to execute on resize
     * @param {Number} delay - Debounce delay in milliseconds
     * @param {Boolean} incept - Debounce style
     * @param {Boolean} useCapture - Bubbling/ capture options for events
     * @param {Boolean} orientationChange - respond on orientation change
     */
    return function resizillaFinal(...APIParameters) {

        // The unchosen excess defaults.
        const excessDefaults = defaults.slice(APIParameters.length, defaults.length);

        // Concatenate the API options with the excess defaults.
        const optionValues = [
            ...APIParameters,
            ...excessDefaults
        ];

        // Final options as an object.
        const mergedOptions = Object.assign(...optionValues.map(convertPairsToLiterals));

        // Destructured options.
        const {
            handler,
            delay,
            incept,
            useCapture,
            orientationChange
        } = mergedOptions;

        // A direct reference to the added handler.
        const directHandler = addWindowEvent(handler, delay, incept, windowObject, useCapture);

        // Adds orientationchange event if required.
        if (orientationChange) {
            windowObject.addEventListener('orientationchange', directHandler, useCapture);
        }

        // Returns an destroyAPI method to remove event listeners.
        return {
            destroy: destroyPartial(directHandler, useCapture, windowObject)
        };
    }
}

// Creates the Resizilla function.
const resizilla = resizillaPartial(defaults, windowGlobal);


export default resizilla;
