/**
 * request-frame-modern - Optimal requestAnimationFrame & cancelAnimationFrame polyfill for modern development
 * @version v2.0.3
 * @license MIT
 * Copyright Julien Etienne 2015 All Rights Reserved.
 */
// Initial time of the timing lapse.
var previousTime = 0;

/**
 * Native clearTimeout function for IE-9 cancelAnimationFrame
 * @return {Function}
 */
const clearTimeoutWithId = id => {
    window.clearTimeout(id);
    id = null;
};

/**
 * IE-9 Polyfill for requestAnimationFrame
 * @callback {Number} Timestamp.
 * @return {Function} setTimeout Function.
 */
function setTimeoutWithTimestamp(callback) {
    const immediateTime = Date.now();
    let lapsedTime = Math.max(previousTime + 16, immediateTime);
    return setTimeout(function () {
        callback(previousTime = lapsedTime);
    }, lapsedTime - immediateTime);
}

// Request and cancel functions for IE9+ & modern mobile browsers. 
const requestFrameFn = window.requestAnimationFrame || setTimeoutWithTimestamp;
const cancelFrameFn = window.cancelAnimationFrame || clearTimeoutWithId;

/**
 * Set the requestAnimationFrame & cancelAnimationFrame window functions.
 */
const setNativeFn = (requestFn, cancelFn, winObj) => {
    winObj.requestAnimationFrame = requestFn;
    winObj.cancelAnimationFrame = cancelFn;
};

/**
 * Default function to set the timing.
 * @param  {String} type - request | cancel | native | ''.
 * @return {Function} Timing function.
 */

/**
 *  volve - Tiny, Performant Debounce and Throttle Functions,
 *     License:  MIT
 *      Copyright Julien Etienne 2016 All Rights Reserved.
 *        github:  https://github.com/julienetie/volve
 *‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
 */

/**
 * Date.now polyfill.
 * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date/now}
 */
if (!Date.now) {
    Date.now = function now() {
        return new Date().getTime();
    };
}

/**
 * Throttle a function call during repetiton.
 * @param {Function} - Callback function.
 * @param {Number}   - Limit in milliseconds.
 * @return {Function} - The throttle function. 
 */

const objectAssignPolyfill = () => {
    if (typeof Object.assign != 'function') {
        (function () {
            Object.assign = function (target) {
                'use strict';
                // We must check against these specific cases.

                if (target === undefined || target === null) {
                    throw new TypeError('Cannot convert undefined or null to object');
                }

                var output = Object(target);
                for (var index = 1; index < arguments.length; index++) {
                    var source = arguments[index];
                    if (source !== undefined && source !== null) {
                        for (var nextKey in source) {
                            if (source.hasOwnProperty(nextKey)) {
                                output[nextKey] = source[nextKey];
                            }
                        }
                    }
                }
                return output;
            };
        })();
    }
};

// Add the Object.assign polyfill.
objectAssignPolyfill();

// Obtains the window or global according to the environment.
const windowGlobal = typeof window !== 'undefined' ? window : typeof self === 'object' && self.self === self && self || typeof global === 'object' && global.global === global && global;

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
const addWindowEvent = (handler, windowObject, useCapture) => {
    windowObject.addEventListener('resize', handler, useCapture);
    return handler;
};

const destroyPartial = (directHandler, useCapture, windowObject) => {
    const destroyAPI = type => {
        if (!type || type === 'all') {
            // Remove both event listeners.
            windowObject.removeEventListener('resize', directHandler, useCapture);
            windowObject.removeEventListener('orientationchange', directHandler, useCapture);
        } else {
            // Remove specific event listener.
            windowObject.removeEventListener(type, directHandler, useCapture);
        }
    };
    return destroyAPI;
};

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
        const optionValues = [...APIParameters, ...excessDefaults];

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
        const directHandler = addWindowEvent(handler, windowObject, useCapture);

        // Adds orientationchange event if required.
        if (orientationChange) {
            windowObject.addEventListener('orientationchange', directHandler, useCapture);
        }

        // Returns an destroyAPI method to remove event listeners.
        return {
            destroy: destroyPartial(directHandler, useCapture, windowObject)
        };
    };
};

// Creates the Resizilla function.
const resizilla = resizillaPartial(defaults, windowGlobal);

export default resizilla;
