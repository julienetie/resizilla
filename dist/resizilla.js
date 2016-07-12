/**
 * resizilla
 * Version:  0.6.0
 * License:  MIT
 * Copyright Julien Etienne 2015 - 2016 All Rights Reserved.
 * github:  https://github.com/julienetie/resizilla
 *‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
 */
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

Copyright (c) 2015 Julien Etienne. MIT License */

(function(root) {

    var previousTime = 0,
        i;

    function dateNow() {
        return Date.now() || new Date().getTime();
    }


    /**
     * @param  {String} type - request | cancel | native.
     * @return {Function} Timing function.
     */
    function requestFrame(type) {
    // The only vendor prefixes required.
    var vendors = ['moz', 'webkit'],

        // Disassembled timing function abbreviations.
        aF = 'AnimationFrame',
        rqAF = 'Request' + aF,

        // Final assigned functions.
        assignedRequestAnimationFrame,
        assignedCancelAnimationFrame,

        // Initial time of the timing lapse.
        previousTime = 0,

        mozRAF = window.mozRequestAnimationFrame,
        mozCAF = window.mozCancelAnimationFrame,

        // Checks for firefox 4 - 10 function pair mismatch.
        hasMozMismatch = mozRAF && !mozCAF,

        func;

    // Date.now polyfill, mainly for legacy IE versions.
    if (!Date.now) {
        Date.now = function() {
            return new Date().getTime();
        };
    }

    /**
     * hasIOS6RequestAnimationFrameBug.
     * @See {@Link https://gist.github.com/julienetie/86ac394ec41f1271ff0a}
     * - for Commentary.
     * @Copyright 2015 - Julien Etienne. 
     * @License: MIT.
     */
    function hasIOS6RequestAnimationFrameBug() {
        var webkitRAF = window.webkitRequestAnimationFrame,
            rAF = window.requestAnimationFrame,

            // CSS/ Device with max for iOS6 Devices.
            hasMobileDeviceWidth = screen.width <= 768 ? true : false,

            // Only supports webkit prefixed requestAnimtionFrane.
            requiresWebkitprefix = !(webkitRAF && rAF),

            // iOS6 webkit browsers don't support performance now.
            hasNoNavigationTiming = window.performance ? false : true,

            iOS6Notice = 'setTimeout is being used as a substitiue for' +
            'requestAnimationFrame due to a bug within iOS 6 builds',

            hasIOS6Bug = requiresWebkitprefix && hasMobileDeviceWidth &&
            hasNoNavigationTiming;

        function bugCheckresults(timingFnA, timingFnB, notice) {
            if (timingFnA || timingFnB) {
                console.warn(notice);
                return true;
            } else {
                return false;
            }
        }

        function displayResults() {
            if (hasIOS6Bug) {
                return bugCheckresults(webkitRAF, rAF, iOS6Notice);
            } else {
                return false;
            }
        }

        return displayResults();
    }

    /**
     * Native clearTimeout function.
     * @return {Function}
     */
    function clearTimeoutWithId(id) {
        clearTimeout(id);
    }

    /**
     * Based on a polyfill by Erik, introduced by Paul Irish & 
     * further improved by Darius Bacon.
     * @see  {@link http://www.paulirish.com/2011/
     * requestanimationframe-for-smart-animating}
     * @see  {@link https://github.com/darius/requestAnimationFrame/blob/
     * master/requestAnimationFrame.js}
     * @callback {Number} Timestamp.
     * @return {Function} setTimeout Function.
     */
    function setTimeoutWithTimestamp(callback) {
        var immediateTime = Date.now(),
            lapsedTime = Math.max(previousTime + 16, immediateTime);
        return setTimeout(function() {
                callback(previousTime = lapsedTime);
            },
            lapsedTime - immediateTime);
    }

    /**
     * Queries the native function, prefixed function 
     * or use the setTimeoutWithTimestamp function.
     * @return {Function}
     */
    function queryRequestAnimationFrame() {
        if (Array.prototype.filter) {
            assignedRequestAnimationFrame = window['request' + aF] ||
                window[vendors.filter(function(vendor) {
                    if (window[vendor + rqAF] !== undefined)
                        return vendor;
                }) + rqAF] || setTimeoutWithTimestamp;
        } else {
            return setTimeoutWithTimestamp;
        }
        if (!hasIOS6RequestAnimationFrameBug()) {
            return assignedRequestAnimationFrame;
        } else {
            return setTimeoutWithTimestamp;
        }
    }

    /**
     * Queries the native function, prefixed function 
     * or use the clearTimeoutWithId function.
     * @return {Function}
     */
    function queryCancelAnimationFrame() {
        var cancellationNames = [];
        if (Array.prototype.map) {
            vendors.map(function(vendor) {
                return ['Cancel', 'CancelRequest'].map(
                    function(cancellationNamePrefix) {
                        cancellationNames.push(vendor +
                            cancellationNamePrefix + aF);
                    });
            });
        } else {
            return clearTimeoutWithId;
        }

        /**
         * Checks for the prefixed cancelAnimationFrame implementation.
         * @param  {Array} prefixedNames - An array of the prefixed names. 
         * @param  {Number} i - Iteration start point.
         * @return {Function} prefixed cancelAnimationFrame function.
         */
        function prefixedCancelAnimationFrame(prefixedNames, i) {
            var cancellationFunction;
            for (; i < prefixedNames.length; i++) {
                if (window[prefixedNames[i]]) {
                    cancellationFunction = window[prefixedNames[i]];
                    break;
                }
            }
            return cancellationFunction;
        }

        // Use truthly function
        assignedCancelAnimationFrame = window['cancel' + aF] ||
            prefixedCancelAnimationFrame(cancellationNames, 0) ||
            clearTimeoutWithId;

        // Check for iOS 6 bug
        if (!hasIOS6RequestAnimationFrameBug()) {
            return assignedCancelAnimationFrame;
        } else {
            return clearTimeoutWithId;
        }
    }

    function getRequestFn() {
        if (hasMozMismatch) {
            return setTimeoutWithTimestamp;
        } else {
            return queryRequestAnimationFrame();
        }
    }

    function getCancelFn() {
        return queryCancelAnimationFrame();
    }

    function setNativeFn() {
        if (hasMozMismatch) {
            window.requestAnimationFrame = setTimeoutWithTimestamp;
            window.cancelAnimationFrame = clearTimeoutWithId;
        } else {
            window.requestAnimationFrame = queryRequestAnimationFrame();
            window.cancelAnimationFrame = queryCancelAnimationFrame();
        }
    }

    /**
     * The type value "request" singles out firefox 4 - 10 and 
     * assigns the setTimeout function if plausible.
     */

    switch (type) {
        case 'request':
        case '':
            func = getRequestFn();
            break;

        case 'cancel':
            func = getCancelFn();
            break;

        case 'native':
            setNativeFn();
            break;
        default:
            throw new Error('RequestFrame parameter is not a type.');
    }
    return func;
}

    var request = requestFrame('request');
    var cancel = requestFrame('cancel');



    var requestTimeout = function(fn, delay) {
        var start = dateNow();

        function increment(d) {
            this.k = !this.k ? d : null;
            return this.k += 1;
        }

        function loop() {
            this.delta = dateNow() - start;
            // **Lint**
            this.callHandler = this.delta >= delay ? fn.call() : request(loop);
        }

        request(loop);
        return increment(0);
    };


    root.resizilla = function(handler, delay, inception) {

        function debounce() {
            var timeout;

            return function() {
                var context = this,
                    args = arguments;

                var lastCall = function() {
                    timeout = 0;
                    if (!inception) {
                        handler.apply(context, args);
                    }
                };

                this.instant = inception && !timeout;
                cancel(timeout);
                timeout = requestTimeout(lastCall, delay);

                if (this.instant) {
                    handler.apply(context, args);
                }
            };
        }

        var handlerFunc = debounce(arguments),

            addEvent = function(handler) {
                if (this.addEventListener)
                    this.addEventListener('resize', handler, true);
                else
                    this.attachEvent('onresize', handler);
            };

        if (screen.width > 1023 || this.mobile) {
            addEvent.call(this, handlerFunc);
        }
    };

    resizilla.enableMobileResize = function() {
        root.mobile = true;
    };

}(window));
//.call(this));
