![img](http://oi68.tinypic.com/33m0pbr.jpg)

## resizilla
### A Better Window Resize

#### Why?
- When the user resizes a range of events are fired when using:  ```window.onresize``` & ```window.addEventListener()```. Resizilla allows you to reduce and control the frequency of calls using a **_debounce_** algorithm. **TLDR It performs better**.
- Resizilla uses the next available animation frame ( **_requestAnimationFrame_** ) rather than setTimeout for better optimization.
- Support for orientation change.
- AMD compliant.
- Built in destroy method.

____
#### How?

##### via npm
```
npm i resizilla --save
```
##### via bower
```
bower i resizilla
```
##### via [src](https://github.com/julienetie/resizilla/tree/master/dist)

#### Usage:

**```resizilla(handler, delay, incept);```** 
 
- handler: Function to execute on resize
- delay: Delay of the function call in ms on resize
- incept: If true the function call at the beginning of the detection period, if false the call will be at the end of the detection period (false by default)


or 

**``` resizilla({ ```**
**```   handler: Function, ```**
**```   delay: Milliseconds, ```**
**```   incept: Boolean, ```**
**```   orientationChange: Boolean, ```**
**```   useCapture: Boolean ```**
**``` }); ```**

- useCapture: Register the event handler for the capturing/ bubbling phase.
- orientationChange: See below...


_For general use, use a moderate delay e.g. `incept: 200`_

____
#### Tested browsers:


| Chrome 14+ | Safari 5.1+ | Firefox 4+ | Opera 10.6+ | IE9+ | Edge| IE8
|:-----------|:------------|:------------|:------------|:------------|:------------|:------------|
|✓ |✓|✓|✓|✓|✓|✗|

| iPhone 3GS+| iPad 2+ | Android 2.2+ | Windows Phone 8.1+ |
|:-----------|:------------|:------------|:------------|:------------|:------------|:------------|
|✓ |✓|✓|✓|
____
#### Mobile: 
 
By default, resizilla calls the handler when the "orientationchange" event is fired. This can be disabled using 

**``` resizilla({
    handler: () => { // do something },
    delay: 250,
    incept: true,
    orientationChange: false
}); ```**
____
#### Destroy: 
 
Remove the event listener by using the below:

**``` resizilla.destroy(event); ```**

- Leave empty or use "all" to destroy both events,
- Pass "resize" or "orientationchange" to kill those specific events.

____
#### The example:

The current example only needs to reveal the transition of the debounce to satisfy as working.

#### So no element resize support?

Nope, and with good reason. Elements resize detection is a different paradigm, to detect changes that occur with elements checkout [getComputedStyle](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle),  [transitionEnd](https://developer.mozilla.org/en-US/docs/Web/Events/transitionend) & [MutationObserver](https://developer.mozilla.org/en/docs/Web/API/MutationObserver).

_(Original ASCII art by Mozilla)_

Big thanks to [BrowsreStack](https://www.browserstack.com) for sponsoring this project via cross browser testing.  

[MIT License](https://github.com/julienetie/resizilla/blob/master/LICENSE) 

Copyright (c) 2015 Julien Etienne
