# resizilla v0.5
Window resize with debounce & requestAnimationFrame.  
 
    resizilla(handler, delay, inception).call(window); 
 
- handler: Function to execute on resize, 
- delay: Delay of the function call in ms on resize, 
- inception: If true the function call at the beginning of the detection period, if false the call will be at the end of the detection period (false by default), 

Recommendation: Use a moderate delay for consistency with legacy browsers. 

#### Browser support: 

- Chrome 14+ 
- Safari 5.1+ 
- Firefox 4+ 
- Opera 10.6+ 
- IE9+ (IE8< not yet tested)
- Edge 
 
#### Mobile: 
 
By default resizilla is inactive for mobile devices as it is rarely necessary and differs in behaviour amongst devices ( mobile refers to "devices widths" below 1024px / CSS pixels). If required for let's say *iframes* use the enableMobileResize method:

``` 
    resizilla.enableMobileResize();
```
### To do
- Decouple window object & this for multiple usage other than window resize.
- Fix example for IE8<.

--- 

[MIT License](https://github.com/julienetie/resizilla/blob/master/LICENSE) 

Copyright (c) 2015 Julien Etienne 
