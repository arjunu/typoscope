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

    let compoundNestedArraySchema = [{
        a: types.string, b: types.number, c: types.boolean, d: {x: types.number, y: types.number}
    }];

    describe("valid schema", ()=> {

        describe("simple arrays", ()=> {

            it('string array should return true', () => {
                let trueValue = ["A", "Apple", "", ".@#$%"];
                expect(validate(simpleStringArraySchema, trueValue)).to.be.equal(true);
            });

            it('boolean array should return true', () => {
                let trueValue = [false, false, true];
                expect(validate(simpleBooleanArraySchema, trueValue)).to.be.equal(true);
            });

            it('number array should return true', () => {
                let trueValue = [1, 2123, 0.23421, NaN];
                expect(validate(simpleNumberArraySchema, trueValue)).to.be.equal(true);
            });

            it('number array should return true', () => {
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

        describe("simple arrays mismatch", ()=> {
            //without logs
            it('string array mismatch should return false', () => {
                let falseValue = ["A", 1, "", ".@#$%"];
                expect(validate(simpleStringArraySchema, falseValue)).to.be.equal(false);
            });

            //with logs
            it('string array mismatch should return false & console the apt error', () => {
                let falseValue = ["A", 1, "", ".@#$%"];
                expect(validate(simpleStringArraySchema, falseValue, true)).to.be.equal(false);
                expect(console.error.calledWith('Typoscope found 1 errors:')).to.be.equal(true);
                expect(console.error
                    .calledWith(`Type mismatch for '[1]': expected String, got Number`))
                    .to.be.equal(true);
            });

        });

        describe("compound arrays", ()=> {
            describe("type mismatch", ()=> {
                let falseValue = [{a: 1, b: 123, c: false, d: {x: 2}}];

                //without logs
                it('should return false', () => {
                    expect(validate(compoundArraySchema, falseValue)).to.be.equal(false);
                });

                //with logs
                it('should return false & console the apt error', () => {
                    expect(validate(compoundArraySchema, falseValue, true)).to.be.equal(false);
                    expect(console.error.calledWith('Typoscope found 1 errors:')).to.be.equal(true);
                    expect(console.error
                        .calledWith(`Type mismatch for '[0].a': expected String, got Number`))
                        .to.be.equal(true);
                });
            });

            describe("compound arrays missing values", ()=> {
                let falseValue = [{a: '1', b: 123, c: false, d: {x: 2}}, {a: '4', b: 6543, d: {x: 3}}];

                //without logs
                it('should return false', () => {
                    expect(validate(compoundArraySchema, falseValue)).to.be.equal(false);
                });

                //with logs
                it('should return false & console the apt error', () => {
                    expect(validate(compoundArraySchema, falseValue, true)).to.be.equal(false);
                    expect(console.error.calledWith('Typoscope found 1 errors:')).to.be.equal(true);
                    expect(console.error
                        .calledWith(`Missing property: '[1].c'`))
                        .to.be.equal(true);
                });

            });
        });

        describe("compound nested arrays", ()=> {
            describe("multiple errors", ()=> {
                let falseValue = [{a: 1, b: 123, c: false, d: {x: '2'}}];

                //without logs
                it('should return false', () => {
                    expect(validate(compoundNestedArraySchema, falseValue)).to.be.equal(false);
                });

                //with logs
                it('should return false & console the apt error', () => {
                    expect(validate(compoundNestedArraySchema, falseValue, true)).to.be.equal(false);
                    expect(console.error.calledWith('Typoscope found 3 errors:')).to.be.equal(true);
                    expect(console.error
                        .calledWith(`Type mismatch for '[0].a': expected String, got Number`))
                        .to.be.equal(true);
                    expect(console.error
                        .calledWith(`Type mismatch for '[0].d.x': expected Number, got String`))
                        .to.be.equal(true);
                    expect(console.error
                        .calledWith(`Missing property: '[0].d.y'`))
                        .to.be.equal(true);
                });
            });

        });

    });
});