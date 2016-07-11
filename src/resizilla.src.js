var previousTime = 0;
var i;
var request = requestFrame('request');
var cancel = requestFrame('cancel');
var self = this;
var enableMobile = false;
var store = {};


function requestTimeout(fn, delay) {
    var start = Date.now();

    function increment(d) {
        store.k = !store.k ? d : null;
        return store.k += 1;
    }

    function loop() {
        store.delta = Date.now() - start;
        store.callHandler = store.delta >= delay ? fn.call() : request(loop);
    }

    request(loop);
    return increment(0);
};


function resizilla(handler, delay, inception) {

    function debounce(handler, delay, inception) {
        var timeout;

        function handlerCallback(handler, delay, inception){
            handler.apply(self, handler, delay, inception);
        }

        return function() {
            var lastCall = function() {
                timeout = 0;
                if (!inception) {
                    handlerCallback(handler, delay, inception);
                }
            };

            store.instant = inception && !timeout;
            cancel(timeout);
            timeout = requestTimeout(lastCall, delay);

            if (store.instant) {
                handlerCallback(handler, delay, inception);
            }
        };
    }


    function addEvent(handler) {
        self.addEventListener('resize', handler, true);
    };


    if (typeof window.orientation === 'undefined' || enableMobile) {
        addEvent(debounce(handler, delay, inception));
    }

    var isOrientation = [0,90,180,270].some(function(orientation){
        return orientation === Math.abs(window.orientation);
    })

 //    if(isOrientation){
 //        handler
 //    }
 // alert(isOrientation);
    // if(window.orientation === 0){
    //     handler
    // }

};


resizilla.enableMobileResize = function() {
    enableMobile = true;
};

// alert(window.orientation)
