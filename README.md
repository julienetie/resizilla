![img](http://oi68.tinypic.com/33m0pbr.jpg)


## resizilla
### A Better Window Resize

#### Why?
- When the user resizes a range of events are fired when using:  ```window.onresize``` & ```window.addEventListener()```. Resizilla reduces the frequency of calls using a **_debounce_** algorithm for better performance.
- Supports orientation change.
- Built in destroy method that removes eventListeners.
- full control

____
#### How?

##### via npm
```
npm i resizilla --save
```
```
yarn add resizilla
```
____
#### Usage:

```resizilla(handler, delay, incept);```
 
- handler: Function to execute on resize
- delay: Delay of the function call in ms on resize
- incept: If true the function call at the beginning of the detection period, if false the call will be at the end of the detection period (false by default)


also

```javascript
resizilla(
   handler,           -  Function
   delay,             -  Number (Milliseconds)
   incept,            -  Boolean
   useCapture,        -  Boolean
   orientationChange  -  Boolean
);
```

- useCapture: Register the event handler for the capturing/ bubbling phase.
- orientationChange: See below...


____
#### Tested browsers:

- Chrome 14+
- Safari 5.1+
- Firefox 4+
- Opera 10.6+
- IE9+
- Edge
- iPhone 3GS+
- iPad 2+
- Android 2.2+
- Windows Phone 8.1+


____
#### Mobile: 
 
By default, resizilla calls the handler when the "orientationchange" event is fired. This can be disabled using 

```javascript
    orientationChange: false
```
____
#### Destroy: 
 
Remove the internal event listeners by using the below:

```javascript 
const {destroy} = resizilla(...);

// Destroy all.
destroy();

// Destroy resize
destroy('resize');

// Destroy orientationchange
destroy('orientationchange');
```

And reuse resizilla at any point in time.

____
#### The example:

The current example only needs to reveal the transition of the debounce to satisfy as working.

#### So no element resize support?

To detect changes that occur with elements checkout [getComputedStyle](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle),  [transitionEnd](https://developer.mozilla.org/en-US/docs/Web/Events/transitionend) & [MutationObserver](https://developer.mozilla.org/en/docs/Web/API/MutationObserver).

_(Original ASCII art by Mozilla, of course)_

Big thanks to [BrowsreStack](https://www.browserstack.com) for sponsoring this project via cross browser testing.  

[MIT License](https://github.com/julienetie/resizilla/blob/master/LICENSE) 

Copyright (c) 2017 Julien Etienne
