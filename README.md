# basetype

Provide basic type validation functions and simple type composition.

## install

`npm i basetype --save`

## type function

Type function is a boolean function, accept one argument and return boolean value.

eg:
```js
let {likeArray} = require('basetype');

likeArray(123); // => false
likeArray([1, 2, 3]); // => true
```

## basic types

```js
isUndefined, isNull, isFalsy, likeArray, isString, isObject, isFunction, isNumber, isBool, isNode, isPromise
```

## compose types

- and

```js
let newType = and(isObject, isArray);
newType([1, 2, 3]); // true
newType({}); // false
```

- or

```js
let newType = or(isNumber, isBool);
newType(4); // true
newType(true); // true
newType("123"); // false
```

- not

```js
let newType = not(isNumber);
newType(1); // false
newType("123"); // true
```

- mapType

```js
let type = mapType({
    a: isNumber,
    b: isBool
});

type({
    a: 3,
    b: false
}); //true

type({
    a: 3,
    b: {}
}); //false
```

- listType

```js
let type = listType(isNumber);
type([1, 2, 3]); //true
type([1, {}, 3]); //false
```

- any

```js
any([1, 2, 3], isNumber); //true
any([1, {}, 3], isNumber); //false
```

- exist

```js
exist([1, 2, 3], isString); //false
exist([1, {}, 3], isNumber); // true
```

## function arguments type

```js
let fun = funType((a, b) => a + b, [
    isNumber,
    isNumber
]);

fun(1, 2); // 3
fun('1', 2); // TypeError
```
