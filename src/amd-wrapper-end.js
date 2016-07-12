// Node.js/ CommonJS
if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = exports = resizilla;
}

// AMD
else if (typeof define === 'function' && define.amd) {
    define(function() {
        return resizilla;
    });
}

// Default to window as global
else if (typeof window === 'object') {
    window.resizilla = resizilla;
}
/* global -module, -exports, -define */

}((typeof window === "undefined" ? {} : window)));
