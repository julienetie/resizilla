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
vVVv    vVVv                 ': |_| \_\___||___/_/___|_|_|_|\__,_| '' */

import { debounce } from 'volve';

/**
 * Check if value is an Array.
 * @param  {Array} type.
 * @return {Boolean}
 */
const isArray = Array.isArray || function(value) {
    return toString.call(value) == '[object Array]';
};


/**
 * Check if value is an object.
 * @param  {Object} value.
 * @return {Boolean}
 */
const isObject = (value) => {
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
export default function resizilla(optionsHandler, delay, incept) {
    const options = {};
    resizilla.options = options;

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


    window.addEventListener('resize',
        debounce(
            options.handler,
            options.delay,
            options.incept),
        options.useCapture
    );


    if (options.orientationChange) {
        window.addEventListener('orientationchange', options.handler, options.useCapture);
    }
}


/**
 * Remove all or one of the event listeners
 * @param  {String} type.
 */
resizilla.destroy = function(type) {
    if (!type || type === 'all') {
        window.removeEventListener('resize', this.options.handler, this.options.useCapture);
        window.removeEventListener('orientationchange', this.options.handler, this.options.useCapture);
    } else {
        window.removeEventListener(type, this.options.handler, this.options.useCapture);
    }
};
