import {expect} from 'chai';
import {types, validate} from './../src';

describe("Validate objects and arrays", ()=> {

    describe("valid objects", ()=> {
        it('should return true', () => {
            expect(validate(types.object, {})).to.be.equal(true);
            expect(validate(types.object, {x: 5})).to.be.equal(true);
            expect(validate(types.object, {x: 5, y: 2})).to.be.equal(true);
            expect(validate(types.object, {a: []})).to.be.equal(true);
            expect(validate(types.object, {b: [{x: 1}, {y: 2}]})).to.be.equal(true);
        });

    });

    describe("invalid objects", ()=> {
        it('should return false', () => {
            expect(validate(types.object, "{}")).to.be.equal(false);

            expect(validate(types.object, false)).to.be.equal(false);
            expect(validate(types.object, true)).to.be.equal(false);

            expect(validate(types.object, [])).to.be.equal(false);

            expect(validate(types.object, 5)).to.be.equal(false);

            expect(validate(types.object, null)).to.be.equal(false);
            expect(validate(types.object, undefined)).to.be.equal(false);
        });

    });

    describe("valid arrays", ()=> {
        it('should return true', () => {
            expect(validate(types.array, [])).to.be.equal(true);
            expect(validate(types.array, [{x: 5, y: 2}])).to.be.equal(true);
        });
    });

    describe("invalid arrays", ()=> {
        it('should return false', () => {
            expect(validate(types.array, {})).to.be.equal(false);

            expect(validate(types.array, false)).to.be.equal(false);
            expect(validate(types.array, true)).to.be.equal(false);

            expect(validate(types.array, "[]")).to.be.equal(false);

            expect(validate(types.array, 5)).to.be.equal(false);
            expect(validate(types.array, 0)).to.be.equal(false);
            expect(validate(types.array, 0.1)).to.be.equal(false);

            expect(validate(types.array, null)).to.be.equal(false);
            expect(validate(types.array, undefined)).to.be.equal(false);
        });
    });
});