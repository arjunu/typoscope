import {expect} from 'chai';
import {types, validate} from './../src/type-validator';

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
        });
    });

    describe("valid number", ()=> {
        it('should return true', () => {
            expect(validate(types.number, 0)).to.be.equal(true);
            expect(validate(types.number, 0.1)).to.be.equal(true);
            expect(validate(types.number, 1)).to.be.equal(true);
        });
    });

    describe("invalid number", ()=> {
        it('should return false', () => {
            expect(validate(types.number, "0.1")).to.be.equal(false);
            expect(validate(types.number, false)).to.be.equal(false);
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
        });
    });
});

