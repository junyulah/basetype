'use strict';

let assert = require('assert');

let {
    isNumber, isString, likeArray
} = require('../index');

describe('index', () => {
    it('isNumber', () => {
        assert.equal(isNumber(0), true);
        assert.equal(isNumber(NaN), false);
        assert.equal(isNumber('10'), false);
    });

    it('isString', () => {
        assert.equal(isString(0), false);
        assert.equal(isString(''), true);
        assert.equal(isString('1'), true);
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
});
