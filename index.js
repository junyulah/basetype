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

/**
 * check type
 *
 * types = [typeFun]
 */
let funType = (fun, types = []) => {
    if (!isFunction(fun)) {
        throw new TypeError(`Expect function type arg[fun] in checkFunType, but got type ${typeof fun}, and value is ${fun}`);
    }

    if (!likeArray(types)) {
        throw new TypeError(`Expect Array type arg[types] in checkFunType, but got type ${typeof types}, and value is ${types}`);
    }

    for (let i = 0; i < types.length; i++) {
        let typeFun = types[i];
        if (typeFun) {
            if (!isFunction(typeFun)) {
                throw new TypeError(`Expect function for typeFun in types ${i}. But got type ${typeof typeFun}, ${typeFun}.`);
            }
        }
    }

    return function() {
        // check type
        for (let i = 0; i < types.length; i++) {
            let typeFun = types[i];
            let arg = arguments[i];
            if (typeFun && !typeFun(arg)) {
                throw new TypeError(`Argument type error. Arguments order ${i}. Argument is ${arg}.`);
            }
        }
        // result
        return fun.apply(this, arguments);
    };
};

let and = (...args) => {
    if (!any(args, isFunction)) {
        throw new TypeError('The argument of and must be function.');
    }
    return (v) => {
        for (let i = 0; i < args.length; i++) {
            let typeFun = args[i];
            if (!typeFun(v)) {
                return false;
            }
        }
        return true;
    };
};

let or = (...args) => {
    if (!any(args, isFunction)) {
        throw new TypeError('The argument of and must be function.');
    }

    return (v) => {
        for (let i = 0; i < args.length; i++) {
            let typeFun = args[i];
            if (typeFun(v)) {
                return true;
            }
        }
        return false;
    };
};

let any = (list, type) => {
    if (!likeArray(list)) {
        throw new TypeError(`Expect Array type, but got type ${typeof list}, and value is ${list}`);
    }
    if (!isFunction(type)) {
        throw new TypeError(`Expect function type, but got type ${typeof type}, and value is ${type}`);
    }

    for (let i = 0; i < list.length; i++) {
        if (!type(list[i])) {
            return false;
        }
    }
    return true;
};

let exist = (list, type) => {
    if (!likeArray(list)) {
        throw new TypeError(`Expect Array type, but got type ${typeof list}, and value is ${list}`);
    }
    if (!isFunction(type)) {
        throw new TypeError(`Expect function type, but got type ${typeof type}, and value is ${type}`);
    }

    for (let i = 0; i < list.length; i++) {
        if (type(list[i])) {
            return true;
        }
    }
    return false;
};

module.exports = {
    likeArray,
    isString,
    isObject,
    isFunction,
    isNumber,
    isBool,
    isNode,
    isPromise,

    funType,

    any,
    exist,

    and,
    or
};
