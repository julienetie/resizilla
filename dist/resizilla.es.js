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

/**
 * Check if value is an Array.
 * @param  {Array} type.
 * @return {Boolean}
 */
const isArray = Array.isArray || function (value) {
    return toString.call(value) == '[object Array]';
};

/**
 * Check if value is an object.
 * @param  {Object} value.
 * @return {Boolean}
 */
const isObject = value => {
    return value != null && typeof value === 'object' && isArray(value) === false;
};

/**
 * resizilla function
 * @public
 * @param  {Function | Object} optionsHandler The handler or options as an 
 * object literal.
 * @param  {Number} delay          Delay in MS
 * @param  {Boolean} incept        Incept from start of delay or till the end.
 */
function resizilla$1(optionsHandler, delay, incept) {
    var options = {};
    resizilla$1.options = options;

    // Defaults
    options.orientationChange = true;
    options.useCapture = true;
    options.incept = false;

    if (isObject(optionsHandler)) {
        options.handler = optionsHandler.handler;
        options.delay = optionsHandler.delay;
        options.incept = optionsHandler.incept;
        options.orientationChange = optionsHandler.orientationChange;
        options.useCapture = optionsHandler.useCapture;
    } else {
        options.handler = optionsHandler;
        options.delay = delay;
        options.incept = typeof options.incept === 'undefined' ? options.incept : incept;
    }

    window.addEventListener('resize', debounce(options.handler, options.delay, options.incept), options.useCapture);

    if (options.orientationChange) {
        window.addEventListener('orientationchange', options.handler, options.useCapture);
    }
}

/**
 * Remove all or one of the event listeners
 * @param  {String} type.
 */
resizilla$1.destroy = function (type) {
    if (!type || type === 'all') {
        window.removeEventListener('resize', this.options.handler, this.options.useCapture);
        window.removeEventListener('orientationchange', this.options.handler, this.options.useCapture);
    } else {
        window.removeEventListener(type, this.options.handler, this.options.useCapture);
    }
};

export default resizilla$1;
