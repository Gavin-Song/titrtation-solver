"use strict";

module.exports = {
    prec: 4,
    spacing_width: 15,
    alphabet: "abcdefghijklmnopqrstuvwxyz",

    areCloseEnough: function(a, b){
        return Math.abs(a - b) < 0.00001;
    }
};
