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
vVVv    vVVv                 ': |_| \_\___||___/_/___|_|_|_|\__,_| ''v0.3

Copyright (c) 2015 Julien Etienne. MIT License */

(function(root) {

    var previousTime = 0,
        vendors = ['moz', 'webkit', 'o'],
        i;

    function dateNow() {
        return Date.now() || new Date().getTime();
    }

    (function() {
        for (i = 0; i < vendors.length && !root.requestAnimationFrame; ++i) {
            root.requestAnimationFrame = root[vendors[i] +
                'RequestAnimationFrame'];
            root.cancelAnimationFrame = root[vendors[i] +
                'CancelAnimationFrame'] || root[vendors[i] +
                'CancelRequestAnimationFrame'];
        }

        if (!root.requestAnimationFrame) {
            root.requestAnimationFrame = function(callback, element) {
                var currTime = dateNow(),
                    timeToCall = Math.max(0, 16 - (currTime - previousTime)),
                    id = root.setTimeout(function() {
                        callback(currTime + timeToCall);
                    }, timeToCall);
                previousTime = currTime + timeToCall;
                return id;
            };
        }

        if (!root.cancelAnimationFrame) {
            root.cancelAnimationFrame = function(id) {
                root.clearTimeout(id);
            };
        }
    }());

    var requestTimeout = function(fn, delay) {
        function increment(d) {
            !this.k ? this.k = d : null;
            return this.k += 1;
        }

        var start = dateNow();

        function loop(timeStamp) {
            this.delta = dateNow() - start;
            this.delta >= delay ? fn.call() : requestAnimationFrame(loop);
        }

        requestAnimationFrame(loop);
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
                    if (!inception) handler.apply(context, args);
                };
                var instant = inception && !timeout;
                cancelAnimationFrame(timeout);
                timeout = requestTimeout(lastCall, delay);
                if (instant) handler.apply(context, args);
            };
        }

        var handlerFunc = debounce(arguments),
            addEvent = function(handler) {
                if (this.addEventListener)
                    this.addEventListener('resize', handler, true);
                else
                    this.attachEvent('onresize', handler);
            };

        addEvent.call(this, handlerFunc);
    };

}(window));
