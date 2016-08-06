'use strict';

/**
 * basic types
 */

let isArray = v => v && typeof v === 'object' && typeof v.length === 'number';

let isString = v => typeof v === 'string';

let isObject = v => v && typeof v === 'object';

let isFunction = v => typeof v === 'function';

let isNumber = v => typeof v === 'number';

let isBool = v => typeof v === 'boolean';

let isNode = (o) => {
    return (
        typeof Node === 'object' ? o instanceof Node :
        o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string'
    );
};

let isPromise = v => v && typeof v === 'object' && typeof v.then === 'function' && typeof v.catch === 'function';

module.exports = {
    isArray,
    isString,
    isObject,
    isFunction,
    isNumber,
    isBool,
    isNode,
    isPromise
};
