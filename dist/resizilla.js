/**
 * request-frame-modern - Optimal requestAnimationFrame & cancelAnimationFrame polyfill for modern development
 * @version v2.0.0
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
 * Debounce a function call during repetiton.
 * @param {Function}  callback - Callback function.
 * @param {Number}    delay    - Delay in milliseconds.
 * @param {Boolean}   lead  - Leading or trailing.
 * @return {Function} - The debounce function. 
 */
function debounce(callback, delay, lead) {
    var debounceRange = 0;
    var currentTime;
    var lastCall;
    var setDelay;
    var timeoutId;

    const call = parameters => {
        callback(parameters);
    };

    return parameters => {
        if (lead) {
            currentTime = Date.now();
            if (currentTime > debounceRange) {
                callback(parameters);
            }
            debounceRange = currentTime + delay;
        } else {
            /**
             * setTimeout is only used with the trail option.
             */
            clearTimeout(timeoutId);
            timeoutId = setTimeout(function () {
                call(parameters);
            }, delay);
        }
    };
}

const defaults = {
    handler: () => {},
    delay: 16,
    incept: false,
    useCapture: false,
    orientationChange: true
};

/** 
 * debounce without setTimeout, works for IE10+ 
 */
// const request = requestFrame('request');
// const cancel = requestFrame('cancel');

/** 
 * debounce without setTimeout, works for IE10+ 
 */
// const requestTimeoutCurried = (callback) => {
//     var callHandler;
//     var delta;
//     var k;
//     var lastCall;
//     var hasLastCall = false;
//     var setDelay;
//     const increment = (d) => k = !k ? d += 1 : 1;


//     const loop = (start) => {
//         delta = Date.now() - start;
//         callHandler = delta >= setDelay ? lastCall() : request(loop);
//     }


//     return function(callback, delay) {
//         const start = Date.now();

//         if (!hasLastCall) {
//             lastCall = callback;
//             hasLastCall = true;
//             setDelay = delay;
//         }

//         request(() => loop(start));
//         return increment(0);
//     }
// }


// const requestTimeout = requestTimeoutCurried();

/** 
 * debounce without setTimeout, works for IE10+ 
 */
// function handlerCallback(handler, delay, incept, windowObject) {
//     handler.apply(windowObject, handler, delay, incept);
// }


const addWindowEvent = (handler, windowObject, useCapture) => {
    windowObject.addEventListener('resize', handler, useCapture);
};

/** 
 * debounce without setTimeout, works for IE10+ 
 */
// const debounceCurried = ({ handler, delay, incept}) => {
// var timeout;
// var instant;
// const delayTime = delay;
// return function debounceApplied() {

//     console.log('debounceApplied')
//     function lastCall() {
//         timeout = 0;
//         if (!incept) {
//             handlerCallback(handler, delayTime, incept, windowObject);
//         }
//     };

//     instant = incept && !timeout;
//     cancel(timeout);

//     timeout = requestTimeout(lastCall, delayTime);
//     console.log(timeout);
//     if (instant) {
//         handlerCallback(handler, delayTime, incept, windowObject);
//     }
// };
// }


const resizillaCurried = (defaults, windowObject) => {
    return function resizillaApplied(handler, delay, incept, useCapture, orientationChange) {
        // console.log('resizillaApplied')
        const options = {
            handler: handler || defaults.handler,
            delay: delay || defaults.delay,
            incept: incept || defaults.incept,
            useCapture: useCapture || defaults.useCapture,
            orientationChange: orientationChange || defaults.orientationChange,
            windowObject: windowObject
        };

        resizillaApplied.options = options;

        addWindowEvent(debounce(options.handler, options.delay, options.incept), windowObject, options.useCapture);

        console.log('options.handler');

        if (options.orientationChange) {
            windowObject.addEventListener('orientationchange', options.handler, options.useCapture);
        }
    };
};

const resizilla = resizillaCurried(defaults, window);

resizilla.destroy = function (type) {
    const { handler, useCapture, windowObject } = this.options;
    if (!type || type === 'all') {
        windowObject.removeEventListener('resize', handler, useCapture);
        windowObject.removeEventListener('orientationchange', handler, useCapture);
    } else {
        windowObject.removeEventListener(type, handler, useCapture);
    }
};

export default resizilla;
