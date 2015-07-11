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

    var animationFrame = {},
        previousTime = 0,
        prefixes = ['moz', 'webkit', 'o'],
        i;
    var vendor = ['RequestAnimationFrame', 'CancelAnimationFrame', 'CancelRequestAnimationFrame'];

    function dateNow() {
        return Date.now() || new Date().getTime();
    }


    function setRequestAnimationFramePrefix(iter) {
        if (!root.requestAnimationFrame) {
            animationFrame.request = root[prefixes[iter] + vendor[0]];
            animationFrame.cancel = root[prefixes[iter] + vendor[1]] || root[prefixes[iter] + vendor[2]];
        } else {
            animationFrame.request = root.requestAnimationFrame;
            animationFrame.cancel = root.cancelAnimationFrame;
        }
    }


    function setRequestAnimationFramePolyfill() {
        if (!animationFrame.request) {
            animationFrame.request = function(callback, element) {
                var currTime = dateNow(),
                    timeToCall = Math.max(0, 16 - (currTime - previousTime)),
                    id = root.setTimeout(function() {
                        callback(currTime + timeToCall);
                    }, timeToCall);
                previousTime = currTime + timeToCall;
                console.log('yea');
                return id;
            };
        }
    }


    function setCancelAnimationFramePolyfill() {
        if (!animationFrame.cancel) {
            animationFrame.cancel = function(id) {
                root.clearTimeout(id);
                console.log('yea');
            };
        }
    }

    function setTimingFunctions() {
        //   for (i = 0; i < prefixes.length; ++i) {
        //       setRequestAnimationFramePrefix(i);
        //   }
        function setNativeTimingFunctions() {
            prefixes.map(function(prefix) {
                if (!root.requestAnimationFrame) {
                    animationFrame.request = root[prefix + vendor[0]];
                    animationFrame.cancel = root[prefix + vendor[1]] || root[prefix + vendor[2]];
                } else {
                    animationFrame = root;
                    animationFrame.request = requestAnimationFrame;
                    animationFrame.cancel = cancelAnimationFrame;
                }
            });
        }

        setNativeTimingFunctions();
        setRequestAnimationFramePolyfill();
        setCancelAnimationFramePolyfill();
    }


    var requestTimeout = function(fn, delay) {
        var start = dateNow();

        function increment(d) {
            this.k = !this.k ? d : null;
            return this.k += 1;
        }

        function loop() {
            this.delta = dateNow() - start;
            // **Lint**
            this.callHandler = this.delta >= delay ? fn.call() : animationFrame.request(loop);
        }

        animationFrame.request(loop);
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

    setTimingFunctions();
}(window));
