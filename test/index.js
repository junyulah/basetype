'use strict';

let assert = require('assert');

let {
    isNumber, isString, likeArray, isPromise, isBool,
    isUndefined, isNull, isFalsy, isArray, isObject,
    isRegExp, isReadableStream, isWritableStream,

    isFunction, funType, and, or, not, any, exist,
    mapType, listType
} = require('../index');

let fs = require('fs');

describe('index', () => {
    it('base', () => {
        let a;
        assert.equal(isUndefined(a), true);
        assert.equal(isUndefined(null), false);

        assert.equal(isNull(null), true);
        assert.equal(isNull(undefined), false);

        assert.equal(isFalsy(undefined), true);
        assert.equal(isFalsy(null), true);
        assert.equal(isFalsy(0), true);
        assert.equal(isFalsy(''), true);
        assert.equal(isFalsy(' '), false);

        assert.equal(isNumber(0), true);
        assert.equal(isNumber(NaN), false);
        assert.equal(isNumber('10'), false);

        assert.equal(isBool(0), false);
        assert.equal(isBool(true), true);

        assert.equal(isString(0), false);
        assert.equal(isString(''), true);
        assert.equal(isString('1'), true);

        assert.equal(isObject({}), true);
        assert.equal(isObject(null), false);

        assert.equal(isFunction(() => {}), true);
        assert.equal(isFunction({}), false);

    });

    it('likeArray', () => {
        assert.equal(likeArray([1, 2, 3]), true);
        assert.equal(likeArray({
            length: 0
        }), true);
        assert.equal(likeArray({
            length: -1
        }), false);
        assert.equal(likeArray('hdskf'), false);
        assert.equal(likeArray({}), false);
    });

    it('isArray', () => {
        assert.equal(isArray({
            length: 1
        }), false);
        assert.equal(isArray('123'), false);
        assert.equal(isArray([]), true);
    });

    it('isPromise', () => {
        let p = Promise.resolve(10);
        let likep = {
            then: () => {},
            'catch': () => {}
        };
        assert.equal(isPromise(p), true);
        assert.equal(isPromise(likep), true);
        assert.equal(isPromise(123), false);
    });

    it('funType', (done) => {
        let fun = funType((a, b) => a + b, [
            isNumber,
            isNumber
        ]);

        expectExcept(() => funType(1), done);
        expectExcept(() => funType(() => {}, {}), done);
        expectExcept(() => funType(() => {}, [{}]), done);

        let ret = fun(1, 2);
        assert.equal(ret, 3);

        expectExcept(() => fun('123', {}), done);
        done();
    });

    it('and', (done) => {
        let typea = and(isObject, isArray);
        expectExcept(() => and(1, 2), done);

        assert.equal(typea({}), false);
        assert.equal(typea([]), true);
        done();
    });

    it('or', (done) => {
        let typea = or(isNumber, isBool);
        expectExcept(() => or({}), done);

        assert.equal(typea({}), false);
        assert.equal(typea(100), true);
        assert.equal(typea(false), true);
        done();
    });

    it('not', (done) => {
        let typea = not(isNumber);
        expectExcept(() => not({}), done);

        assert.equal(typea({}), true);
        assert.equal(typea(100), false);
        assert.equal(typea(false), true);
        done();
    });

    it('any', (done) => {
        assert.equal(any([1, 2, 3], isNumber), true);
        assert.equal(any([1, {},
            3
        ], isNumber), false);

        expectExcept(() => any({}), done);
        expectExcept(() => any([], 10), done);

        done();
    });

    it('exist', (done) => {
        assert.equal(exist([1, 2, 3], isString), false);
        assert.equal(exist([1, {},
            3
        ], isNumber), true);

        expectExcept(() => exist({}), done);
        expectExcept(() => exist([], 10), done);

        done();
    });

    it('mapType', (done) => {
        expectExcept(() => mapType(123), done);
        expectExcept(() => mapType({
            a: {}
        }), done);

        let type = mapType({
            a: isNumber,
            b: isBool
        });
        assert.equal(type({
            a: 3,
            b: false
        }), true);
        assert.equal(type({
            a: 3,
            b: {}
        }), false);
        assert.equal(type(1287), false);

        done();
    });

    it('listType', (done) => {
        expectExcept(() => listType(123), done);
        let type = listType(isNumber);
        assert.equal(type([1, 2, 3]), true);
        assert.equal(type([1, {},
            3
        ]), false);

        done();
    });

    it('isRegExp', () => {
        assert.equal(isRegExp(/dss/), true);
        assert.equal(isRegExp(new RegExp('jkhh')), true);
        assert.equal(isRegExp('dsdksjk'), false);
    });

    it('isReadableStream', () => {
        assert.equal(isReadableStream(fs.createReadStream(__dirname + '/fixture/test.txt')), true);
        assert.equal(isReadableStream('test'), false);
    });

    it('isWritableStream', () => {
        assert.equal(isWritableStream(fs.createWriteStream(__dirname + '/fixture/test.txt')), true);
        assert.equal(isWritableStream('test'), false);
    });
});

let expectExcept = (handler, done) => {
    try {
        handler();
        done(new Error('expect exception happen, but not.'));
    } catch (e) {} // eslint-disable-line
};
