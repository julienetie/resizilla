// Resizilla
(function (root, factory) {
    if (typeof exports === 'object') module.exports = factory();
    else if (typeof define === 'function' && define.amd) define(factory);
    else root.resizilla = factory();
}(this, function () {

    return {

        resizilla: Object.prototype.resizilla = function (handler, delay, inception) {
            var arr = arguments;

            function debounce(func, delay, inception) {
                var timeout;
                return function () {
                    var context = this,
                        args = arguments;
                    var lastCall = function () {
                        timeout = null;
                        if (!inception) func.apply(context, args);
                    };
                    var instant = inception && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(lastCall, delay);
                    if (instant) func.apply(context, args);
                };
            }

            var handlerFunc = debounce(function () {
                arr[0]();
            }, arr[1], arr[2]);
            if (this.attachEvent) {
                this.attachEvent('onresize', handlerFunc);
            } else if (this.addEventListener) {
                this.addEventListener('resize', handlerFunc, true);
            } else {}
        }

    };
}));
