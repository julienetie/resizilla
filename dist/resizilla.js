(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('pkg.json')) :
	typeof define === 'function' && define.amd ? define(['pkg.json'], factory) :
	(factory(global.pkg));
}(this, (function (pkg) { 'use strict';

pkg = 'default' in pkg ? pkg['default'] : pkg;

console.log(pkg);

})));
