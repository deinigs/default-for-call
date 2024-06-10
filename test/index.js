const chai = require('chai');

const expect = chai.expect;

function checkValue(fn, values, expected) {
    expect(fn(...values)).to.be.deep.eq(expected, `${fn.name}(${values}) != ${expected}`)
}

describe("Default for Call", () => {
    describe("defaultForCall function", () => {
        const defaultForCall = require('../index');
        it("should return fn value on success", () => {
            checkValue(defaultForCall, ['DEFAULT VALUE', parseInt, '1'], 1);
            checkValue(defaultForCall, ['DEFAULT VALUE', () => parseInt('2')], 2);
            checkValue(defaultForCall, ['DEFAULT VALUE', (x) => x.toUpperCase(), 'hello'], 'HELLO');
            checkValue(defaultForCall, ['DEFAULT VALUE', JSON.parse, '[1]'], [1]);
            checkValue(defaultForCall, ['DEFAULT VALUE', JSON.parse, '[]'], []);
            checkValue(defaultForCall, ['DEFAULT VALUE', JSON.parse, '{}'], {});
        });

        it ("should return fn value even if possible falsy (false, 0, '')", () => {
            checkValue(defaultForCall, ['DEFAULT VALUE', () => false], false);
            checkValue(defaultForCall, ['DEFAULT VALUE', parseInt, '0'], 0);
            checkValue(defaultForCall, ['DEFAULT VALUE', (x) => x.trim(), '   '], '');
        });

        it("should return default value on unexpected falsy (null, undefined, NaN)", () => {
            checkValue(defaultForCall, ['DEFAULT VALUE', (o) => o.name, {name: null}], 'DEFAULT VALUE');
            checkValue(defaultForCall, ['DEFAULT VALUE', (o) => o.name, {}], 'DEFAULT VALUE');
            checkValue(defaultForCall, ['DEFAULT VALUE', parseInt, 'none'], 'DEFAULT VALUE');     
        });

        it("should return default value on Error", () => {
            checkValue(defaultForCall, ['DEFAULT VALUE', (o) => o.address.street, {}], 'DEFAULT VALUE');
            checkValue(defaultForCall, ['DEFAULT VALUE', JSON.parse, 'Hello'], 'DEFAULT VALUE');
            checkValue(defaultForCall, ['DEFAULT VALUE', (s) => s.toUpperCase(), null], 'DEFAULT VALUE');
        });
    });
});