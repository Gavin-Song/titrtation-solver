"use strict";

const ARRAY_KEYS = ["values_added"];

module.exports = function(args){
    for(let key of Object.keys(args)){
        args[key] = ARRAY_KEYS.includes(key) ?
            args[key].replace(/ /g, "").split(",").map(x => +x) :
            +args[key];
    }
};
