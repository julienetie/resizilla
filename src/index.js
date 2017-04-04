import requestFrame from 'request-frame-modern';
import { debounce } from 'volve';


const defaults = {
    handler: () => {},
    delay: 16,
    incept: false,
    useCapture: false,
    orientationChange: true
};


const addWindowEvent = (handler, windowObject, useCapture) => {
    windowObject.addEventListener('resize', handler, useCapture);
}


const resizillaCurried = (defaults, windowObject) => {
    return function resizillaApplied(handler, delay, incept, useCapture, orientationChange) {
        const options = {
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
    }
}


const resizilla = resizillaCurried(defaults, window);


resizilla.destroy = function(type) {
    const { handler, useCapture, windowObject } = this.options;
    if (!type || type === 'all') {
        windowObject.removeEventListener('resize', handler, useCapture);
        windowObject.removeEventListener('orientationchange', handler, useCapture);
    } else {
        windowObject.removeEventListener(type, handler, useCapture);
    }
};

export default resizilla;
