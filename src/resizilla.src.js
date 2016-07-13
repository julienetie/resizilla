var request = requestFrame('request');
var cancel = requestFrame('cancel');
var self = this;
var store = {};
var start;


/**
 * An Alternative to setTimeout using requestAnimationFrame
 * @param  {Function} handler
 * @param  {Number}   delay - In milisectonds 
 * @return {Number}   time lapse
 */
function requestTimeout(handler, delay) {
    start = Date.now();

    function increment(constant) {
        store.k = !store.k ? constant : null;
        return store.k += 1;
    }

    function loop() {
        store.delta = Date.now() - start;
        store.callHandler = store.delta >= delay ? handler.call() : request(loop);
    }

    request(loop);
    return increment(0);
}


/**
 * A wrapper for the handler using the window context
 */
function handlerCallback(handler, delay, incept) {
    handler.apply(self, handler, delay, incept);
}


/**
 * [resizilla description]
 * @public
 * @param  {[type]} optionsHandler [description]
 * @param  {[type]} delay          [description]
 * @param  {[type]} incept         [description]
 * @return {[type]}                [description]
 */
function resizilla(optionsHandler, delay, incept) {
    var options = {};
    resizilla.options = options;
  
        // Defaults
        options.orientationChange = true;
        options.useCapture = true;
        options.incept = false;

    if(optionsHandler.constructor === {}.constructor){
        options.handler = optionsHandler.handler;
        options.delay = optionsHandler.delay;
        options.incept = optionsHandler.incept;
        options.orientationChange = optionsHandler.orientationChange;
        options.useCapture = optionsHandler.useCapture;
    }else{
        options.handler = optionsHandler;
        options.delay = delay;
        options.incept = typeof options.incept === 'undefined' ? options.incept : incept;
    }


    function debounce(handler, delay, incept) {
        var timeout;

        return function() {
            var lastCall = function() {
                timeout = 0;
                if (!incept) {
                    handlerCallback(handler, delay, incept);
                }
            };

            store.instant = incept && !timeout;
            cancel(timeout);
            timeout = requestTimeout(lastCall, delay);

            if (store.instant) {
                handlerCallback(handler, delay, incept);
            }
        };
    }


    function addWindowEvent(handler) {
        self.addEventListener('resize', handler, options.useCapture);
    }


    addWindowEvent(debounce(options.handler, options.delay, options.incept));


    if(options.orientationChange){
        self.addEventListener('orientationchange', options.handler, options.useCapture);
    }
}


resizilla.destroy = function(type) {
    if(!type || type === 'all'){
        window.removeEventListener('resize', this.options.handler, this.options.useCapture);
        window.removeEventListener('orientationchange', this.options.handler, this.options.useCapture);
    }else{
        window.removeEventListener(type, this.options.handler, this.options.useCapture);
    }
};
