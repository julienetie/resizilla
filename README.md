#resizilla v0.3 
============
Window resize with debounce & requestAnimationFrame. 

Expected to work with browsers that do not support requestAnimationFrame (fingers crossed). Currently tested with chrome 42 & Firefox 38 at the moment;

    resizilla(handler, delay, inception).call(window);

- handler: Function to execute on resize,
- delay: Delay of the function call in ms on resize,
- inception: If true the function call at the beginning of the detection period, if false the call will be at the end of the detection period (false by default),

Recommendation: Use a moderate delay for consistency with legacy browsers.

[MIT Licence](https://github.com/julienetie/resizilla/blob/master/LICENSE)

Copyright (c) 2015 Julien Etienne
