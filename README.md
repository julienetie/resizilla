![img](http://oi68.tinypic.com/33m0pbr.jpg)

## resizilla
### A Better Window Resize

#### Why?
- When the user resizes a range of events are fired when using:  ```window.onresize``` & ```window.addEventListener()```. Resizilla allows you to reduce and control the frequency of calls using a **_debounce_** algorithm. **TLDR It performs better**.
- Resizilla uses the next available animation frame ( **_requestAnimationFrame_** ) rather than setTimeout for better optimization.
- S̶u̶p̶p̶o̶r̶t̶ ̶f̶o̶r̶ ̶m̶o̶b̶i̶l̶e̶ ̶*̶*̶o̶r̶i̶e̶n̶t̶a̶t̶i̶o̶n̶ ̶c̶h̶a̶n̶g̶e̶*̶*̶ ̶s̶e̶e̶ ̶b̶e̶l̶o̶w̶ TBA


#### How?
**```resizilla(handler, delay, incept);```** 
 
- handler: Function to execute on resize
- delay: Delay of the function call in ms on resize
- incept: If true the function call at the beginning of the detection period, if false the call will be at the end of the detection period (false by default)

Recommendation: Use a moderate delay for consistency with legacy browsers. 


#### Browser support: 


| Chrome 14+ | Safari 5.1+ | Firefox 4+ | Opera 10.6+ | IE9+ | Edge| IE8
|:-----------|:------------|:------------|:------------|:------------|:------------|:------------|
|✓ |✓|✓|✓|✓|✓|✗ not tested|


#### Mobile: 
 
By default resizilla is inactive for mobile devices as it is rarely necessary and differs in behaviour amongst devices ( mobile refers to "devices widths" below 1024px / CSS pixels). If required for let's say *iframes* use the enableMobileResize method:

``` 
    resizilla.enableMobileResize();
```

#### No element resize support?

Nope, and purposely done, elements resizing is a bit of a different paradigm and may create a mess of issues if intertwined. To detect changes on elements checkout [getComputedStyle](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle) and [transitionEnd](https://developer.mozilla.org/en-US/docs/Web/Events/transitionend).



[MIT License](https://github.com/julienetie/resizilla/blob/master/LICENSE) 

Copyright (c) 2015 Julien Etienne
