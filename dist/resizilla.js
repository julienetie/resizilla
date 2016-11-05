(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.resizilla = factory());
}(this, (function () { 'use strict';

// import { debounce } from 'volve';


// const request = requestFrame('request');
// const cancel = requestFrame('cancel');

var self = window;
/**
 * An Alternative to setTimeout using requestAnimationFrame
 * @param  {Function} handler
 * @param  {Number}   delay - In milisectonds 
 * @return {Number}   time lapse
 */
// function requestTimeout(handler, delay) {
//     start = Date.now();

//     function increment(constant) {
//         store.k = !store.k ? constant : null;
//         return store.k += 1;
//     }

//     function loop() {
//         store.delta = Date.now() - start;
//         store.callHandler = store.delta >= delay ? handler.call() : request(loop);
//     }

//     request(loop);
//     return increment(0);
// }


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
    options.incept = incept;

    if (optionsHandler.constructor === {}.constructor) {
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

    // const debounce = (callback, delay, incept) => {
    //         let timeout;

    //         return function(parameters) {
    //             function lastCall() {
    //                 timeout = 0;
    //                 if (!incept) {
    //                     callback(parameters);
    //                 }
    //             };

    //             this.instant = incept && !timeout;
    //             cancel(timeout);
    //             timeout = setAnimationFrame(lastCall, delay);

    //             if (this.instant) {
    //                 callback(parameters);
    //             }
    //         };
    //     }
    // function debounce(callback, delay) {
    //     let lastCallTime;
    //     let newDelayTime;
    //     let call;
    //     return function (parameters) {
    //         const currentCallTime = Date.now();
    //         const durationSinceLastCall = currentCallTime - lastCallTime;
    //         cancelAnimationFrame(call);
    //         if (!lastCallTime || durationSinceLastCall > delay) {
    //             console.log('Called on delay')
    //             callback(parameters);
    //             lastCallTime = currentCallTime;
    //         }else{
    //             console.log('delayed')
    //             call = setAnimationFrame(callback(parameters),delay)
    //             lastCallTime = currentCallTime + delay;
    //         }
    //     };
    // }

    function debounce(callback, delay, trail) {
        var debounceRange = 0;
        var currentTime;
        var lastCall;
        var setDelay;
        var timeoutId;
        var frame;

        var call = function call(parameters) {
            callback(parameters);
        };

        return function (parameters) {
            if (trail) {
                console.log('trail');
                /**
                 * setTimeout is only used with the trail option.
                 */
                clearTimeout(timeoutId);
                timeoutId = setTimeout(function () {
                    call(parameters);
                }, delay);
            } else {
                console.log('lead');
                currentTime = Date.now();
                if (currentTime > debounceRange) {
                    callback(parameters);
                }
                debounceRange = currentTime + delay;
            }
        };
    }

    window.addEventListener('resize', debounce(options.handler, options.delay, options.incept), options.useCapture);

    if (options.orientationChange) {
        self.addEventListener('orientationchange', options.handler, options.useCapture);
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

return resizilla$1;

})));
