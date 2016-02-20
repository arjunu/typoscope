import {expect} from 'chai';
import {types, validate} from './../src';

describe("Validate primitives", ()=> {

    describe("valid string", ()=> {
        it('should return true', () => {
            expect(validate(types.string, 'Sandeep')).to.be.equal(true);

            let name = "Sandeep";
            expect(validate(types.string, `Hello ${name}`)).to.be.equal(true);
        });
    });

    describe("invalid string", ()=> {
        it('should return false', () => {
            expect(validate(types.string, 0.1)).to.be.equal(false);
            expect(validate(types.string, 0)).to.be.equal(false);
            expect(validate(types.string, 1)).to.be.equal(false);
            expect(validate(types.string, true)).to.be.equal(false);
            expect(validate(types.string, false)).to.be.equal(false);
            expect(validate(types.string, NaN)).to.be.equal(false);
            expect(validate(types.string, undefined)).to.be.equal(false);
            expect(validate(types.string, null)).to.be.equal(false);
        });
    });

    describe("valid number", ()=> {
        it('should return true', () => {
            expect(validate(types.number, 0)).to.be.equal(true);
            expect(validate(types.number, 0.1)).to.be.equal(true);
            expect(validate(types.number, 1)).to.be.equal(true);
            expect(validate(types.number, NaN)).to.be.equal(true);
        });
    });

    describe("invalid number", ()=> {
        it('should return false', () => {
            expect(validate(types.number, "0.1")).to.be.equal(false);
            expect(validate(types.number, false)).to.be.equal(false);
            expect(validate(types.number, undefined)).to.be.equal(false);
            expect(validate(types.number, null)).to.be.equal(false);
        });
    });

    describe("valid boolean", ()=> {
        it('should return true', () => {
            expect(validate(types.boolean, false)).to.be.equal(true);
            expect(validate(types.boolean, true)).to.be.equal(true);
        });
    });

    describe("invalid boolean", ()=> {
        it('should return false', () => {
            expect(validate(types.boolean, "false")).to.be.equal(false);
            expect(validate(types.boolean, 0.1)).to.be.equal(false);
            expect(validate(types.boolean, NaN)).to.be.equal(false);
            expect(validate(types.boolean, undefined)).to.be.equal(false);
            expect(validate(types.boolean, null)).to.be.equal(false);
        });
    });

    describe("valid null", ()=> {
        it('should return true', () => {
            expect(validate(types.null, null)).to.be.equal(true);
        });
    });

    describe("invalid null", ()=> {
        it('should return false', () => {
            expect(validate(types.null, "null")).to.be.equal(false);
            expect(validate(types.null, 0.1)).to.be.equal(false);
            expect(validate(types.null, true)).to.be.equal(false);
            expect(validate(types.null, false)).to.be.equal(false);
            expect(validate(types.null, NaN)).to.be.equal(false);
            expect(validate(types.null, undefined)).to.be.equal(false);
        });
    });

    describe("valid undefined", ()=> {
        it('should return true', () => {
            expect(validate(types.undefined, undefined)).to.be.equal(true);
        });
    });

    describe("invalid undefined", ()=> {
        it('should return false', () => {
            expect(validate(types.undefined, "undefined")).to.be.equal(false);
            expect(validate(types.undefined, 0.1)).to.be.equal(false);
            expect(validate(types.undefined, true)).to.be.equal(false);
            expect(validate(types.undefined, false)).to.be.equal(false);
            expect(validate(types.undefined, NaN)).to.be.equal(false);
            expect(validate(types.undefined, null)).to.be.equal(false);
        });
    });

    describe("valid any", ()=> {
        it('should return true', () => {
            expect(validate(types.any, "null")).to.be.equal(true);
            expect(validate(types.any, 0.1)).to.be.equal(true);
            expect(validate(types.any, true)).to.be.equal(true);
            expect(validate(types.any, false)).to.be.equal(true);
            expect(validate(types.any, null)).to.be.equal(true);
            expect(validate(types.any, undefined)).to.be.equal(true);
            expect(validate(types.any, NaN)).to.be.equal(true);
            expect(validate(types.any, {})).to.be.equal(true);
            expect(validate(types.any, {x: 1, y: 2})).to.be.equal(true);
            expect(validate(types.any, [])).to.be.equal(true);
            expect(validate(types.any, [1, 2, 3])).to.be.equal(true);
            expect(validate(types.any, [{x: 1, y: 2}])).to.be.equal(true);
        });
    });
});

