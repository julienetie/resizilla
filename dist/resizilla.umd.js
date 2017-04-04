/*           _.-~-.
           7''  Q..\
        _7         (_
      _7  _/    _q.  /
    _7 . ___  /VVvv-'_                                            .
   7/ / /~- \_\\      '-._     .-'                      /       //
  ./ ( /-~-/  ||'=.__  '::. '-~'' {             ___   /  //     ./{
 V   V-~-~|   ||   __''_   ':::.   ''~-~.___.-'' _/  // / {_   /  {  /
  VV/-~-~-|  / \ .'__'. '.  '::  ____               _ _ _        ''.
  / /~~~~||  VVV/ /  \ )  \     |  _ \ ___  ___(_)___(_) | | __ _   .::'
 / (~-~-~\\.-' /    \'   \::::. | |_) / _ \/ __| |_  / | | |/ _` | :::'
/..\    /..\__/      '     '::: |  _ <  __/\__ \ |/ /| | | | (_| | ::'
vVVv    vVVv                 ': |_| \_\___||___/_/___|_|_|_|\__,_| ''
*/
/*
 Version: 0.8.3
 Description: A Better Window Resize
 Author: Julien Etienne
 Repository: https://github.com/julienetie/resizilla
*/

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.resizilla = factory());
}(this, (function () { 'use strict';

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
var clearTimeoutWithId = function clearTimeoutWithId(id) {
    window.clearTimeout(id);
    id = null;
};

/**
 * IE-9 Polyfill for requestAnimationFrame
 * @callback {Number} Timestamp.
 * @return {Function} setTimeout Function.
 */
function setTimeoutWithTimestamp(callback) {
    var immediateTime = Date.now();
    var lapsedTime = Math.max(previousTime + 16, immediateTime);
    return setTimeout(function () {
        callback(previousTime = lapsedTime);
    }, lapsedTime - immediateTime);
}

// Request and cancel functions for IE9+ & modern mobile browsers. 
var requestFrameFn = window.requestAnimationFrame || setTimeoutWithTimestamp;
var cancelFrameFn = window.cancelAnimationFrame || clearTimeoutWithId;

/**
 * Set the requestAnimationFrame & cancelAnimationFrame window functions.
 */
var setNativeFn = function setNativeFn(requestFn, cancelFn, winObj) {
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

    var call = function call(parameters) {
        callback(parameters);
    };

    return function (parameters) {
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

var defaults = {
    handler: function handler() {},
    delay: 16,
    incept: false,
    useCapture: false,
    orientationChange: true
};

var addWindowEvent = function addWindowEvent(handler, windowObject, useCapture) {
    windowObject.addEventListener('resize', handler, useCapture);
};

var resizillaCurried = function resizillaCurried(defaults, windowObject) {
    return function resizillaApplied(handler, delay, incept, useCapture, orientationChange) {
        var options = {
            handler: handler || defaults.handler,
            delay: delay || defaults.delay,
            incept: incept || defaults.incept,
            useCapture: useCapture || defaults.useCapture,
            orientationChange: orientationChange || defaults.orientationChange,
            windowObject: windowObject
        };

        resizillaApplied.options = options;

        addWindowEvent(debounce(options.handler, options.delay, options.incept), windowObject, options.useCapture);

        if (options.orientationChange) {
            windowObject.addEventListener('orientationchange', options.handler, options.useCapture);
        }
    };
};

var resizilla = resizillaCurried(defaults, window);

resizilla.destroy = function (type) {
    var _options = this.options,
        handler = _options.handler,
        useCapture = _options.useCapture,
        windowObject = _options.windowObject;

    if (!type || type === 'all') {
        windowObject.removeEventListener('resize', handler, useCapture);
        windowObject.removeEventListener('orientationchange', handler, useCapture);
    } else {
        windowObject.removeEventListener(type, handler, useCapture);
    }
};

return resizilla;

})));