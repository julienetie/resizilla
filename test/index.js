import resizilla from '../src/index';

// Non operational.
const noop = () => {};

// An assignment to test resize events.
var trigger;

// The return value of resizilla.
var resizillaReturnObject;


/** 
 * Triggers a resize event on a given element/object.
 */
const triggerResizeEvent = (element) => {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    element.dispatchEvent(event);
}




function triggerResizilla(n, done) {
    triggerResizeEvent(window);

    expect(trigger).to.equal(n);
    if (n >= 3) {
        done();
    }
}


/**
 * Fire events consecutively and call done.
 */
function fireEventsPerInterval(intervals, delay, callback, done) {
    var i = 0;
    var id = setInterval(function() {
        i++;
        if (i === intervals) {
            clearInterval(id);
        }
        callback(i, done);
    }, delay);
}


// Reset trigger.
beforeEach(() => trigger = false);
afterEach(() => trigger = false);


/** 
 * Main tests
 */
describe('resizilla', () => {
    it('Should be a function', () => {
        expect(resizilla).to.be.a('function');
    });

    it('Should return an object with a destroy method', () => {
        const destroy = resizilla(noop, 100).destroy;
        expect(destroy).to.be.a('function');
    });

    it('Should attach an eventistener to the window object', (done) => {
        resizillaReturnObject = resizilla(() => {
            trigger = true;
        }, 100, false);

        triggerResizeEvent(window);

        expect(trigger).to.be.true;
        done();
    });


    it('Should destroy the previous attached eventistener', (done) => {
        const {destroy} = resizillaReturnObject;

        destroy();

        trigger = false;
        triggerResizeEvent(window);

        expect(trigger).to.be.false;
        done();
    });

    it('Should trigger on multiple resize events', (done) => {
        var once = true;
        var i = 0;
        resizilla(() => {
            i++
            if(trigger !== false || once){
            	trigger = i;
            	once = false;
        	}
            console.log('trigger', trigger);
        }, 16, false);

        /** 
         * Will trigger resizilla three times.
         * each time setting trigger to an incrementing number.
         */
        fireEventsPerInterval(3, 300, triggerResizilla, done);
    });

});
