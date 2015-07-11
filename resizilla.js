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
        prefixes = ['moz', 'webkit', 'o'],
        i;
    var rAFname = ['RequestAnimationFrame', 'CancelAnimationFrame', 'CancelRequestAnimationFrame'];

    function dateNow() {
        return Date.now() || new Date().getTime();
    }


    function setRequestAnimationFramePrefix(iter) {
        root.requestAnimationFrame = root[prefixes[iter] + rAFName[0]];
        root.cancelAnimationFrame = root[prefixes[iter] + rAFName[1]] || root[prefixes[iter] + rAFName[2]];
    }


    function setRequestAnimationFramePolyfill() {
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
    }


    function setCancelAnimationFramePolyfill() {
        if (!root.cancelAnimationFrame) {
            root.cancelAnimationFrame = function(id) {
                root.clearTimeout(id);
            };
        }
    }


    for (i = 0; i < prefixes.length && !root.requestAnimationFrame; ++i) {
        setRequestAnimationFramePrefix(i);
    }
    setRequestAnimationFramePolyfill();
    setCancelAnimationFramePolyfill();


    var requestTimeout = function(fn, delay) {
        var start = dateNow();

        function increment(d) {
            !this.k ? this.k = d : null;
            return this.k += 1;
        }

        function loop() {
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
                this.instant = inception && !timeout;
                cancelAnimationFrame(timeout);
                timeout = requestTimeout(lastCall, delay);
                if (this.instant) handler.apply(context, args);
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
