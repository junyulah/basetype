'use strict';

/**
 * basic types
 */

let likeArray = v => v && typeof v === 'object' && typeof v.length === 'number' && v.length >= 0;

let isString = v => typeof v === 'string';

let isObject = v => v && typeof v === 'object';

let isFunction = v => typeof v === 'function';

let isNumber = v => typeof v === 'number' && !isNaN(v);

let isBool = v => typeof v === 'boolean';

let isNode = (o) => {
    return (
        typeof Node === 'object' ? o instanceof Node :
        o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string'
    );
};

let isPromise = v => v && typeof v === 'object' && typeof v.then === 'function' && typeof v.catch === 'function';

module.exports = {
    likeArray,
    isString,
    isObject,
    isFunction,
    isNumber,
    isBool,
    isNode,
    isPromise
};
