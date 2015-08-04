(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var pizzaTime = require('./pizza-time.js');
pizzaTime();

var kirbyDance = require ('kirby-dance');

console.log(kirbyDance(10));
},{"./pizza-time.js":4,"kirby-dance":2}],2:[function(require,module,exports){
var kirbies = require('./kirbies'),
    totalKirbies
;

totalKirbies = kirbies.length;

function kirbyDance (amount) {
    var dance,
        ind
    ;

    dance = [];
    ind = 0;

    if (amount < 0) {
        ind = 1;
        amount = -amount + 1;
    }

    for (; ind < amount; ind += 1) {
        var mod = ind % totalKirbies;
        dance.push(kirbies[mod]);
    }

    return dance.join(' ');
}

module.exports = kirbyDance;

},{"./kirbies":3}],3:[function(require,module,exports){
var kirbies = [
    "<('.'<)",
    "(>'.')>"
];

module.exports = kirbies;

},{}],4:[function(require,module,exports){
function pizzaTime (){
  console.log('Pizza Time!!!!');
}

module.exports = pizzaTime;
},{}]},{},[1]);
