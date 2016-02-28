import {expect} from 'chai';
import 'mocha-sinon';
import {types, validate} from './../src';

describe("Array schemas", ()=> {

    let simpleStringArraySchema = [types.string];
    let simpleBooleanArraySchema = [types.boolean];
    let simpleNumberArraySchema = [types.number];
    let simpleAnyArraySchema = [types.any];

    let compoundArraySchema = [{
        a: types.string, b: types.number, c: types.boolean, d: types.object
    }];

    describe("valid schema", ()=> {

        describe("simple arrays", ()=> {

            it('simple string array should return true', () => {
                let trueValue = ["A", "Apple", "", ".@#$%"];
                expect(validate(simpleStringArraySchema, trueValue)).to.be.equal(true);
            });

            it('simple boolean array should return true', () => {
                let trueValue = [false, false, true];
                expect(validate(simpleBooleanArraySchema, trueValue)).to.be.equal(true);
            });

            it('simple number array should return true', () => {
                let trueValue = [1, 2123, 0.23421, NaN];
                expect(validate(simpleNumberArraySchema, trueValue)).to.be.equal(true);
            });

            it('simple number array should return true', () => {
                let trueValue = [1, "Apple", 0.23421, NaN, undefined, null, 0, false, true];
                expect(validate(simpleAnyArraySchema, trueValue)).to.be.equal(true);
            });

            //TODO undefined and null arrays?
        });

        describe("compound arrays", ()=> {
            it('should return true', () => {

                let trueValue = [{a: 'Sandeep', b: 123, c: false, d: {x: 2}}];
                expect(validate(compoundArraySchema, trueValue)).to.be.equal(true);
            });
        });
    });

    describe("invalid schema", ()=> {
        beforeEach(function () {
            this.sinon.stub(console, 'error');
        });

        describe("simple arrays", ()=> {
            //without logs
            it('simple string array mismatch should return false', () => {
                let falseValue = ["A", 1, "", ".@#$%"];
                expect(validate(simpleStringArraySchema, falseValue)).to.be.equal(false);
            });

            //with logs
            it('simple string array mismatch should return false & console the apt error', () => {
                let falseValue = ["A", 1, "", ".@#$%"];
                expect(validate(simpleStringArraySchema, falseValue, true)).to.be.equal(false);
                //TODO check log
            });

            //TODO missing values
        });

        describe("compound arrays", ()=> {
            it('compound array types mismatch', () => {
                let falseValue = [{a: 1, b: 123, c: false, d: {x: 2}}];
                expect(validate(compoundArraySchema, falseValue)).to.be.equal(false);
            });
        });

    });
});