import {expect} from 'chai';
import 'mocha-sinon';
import {types, validate} from './../src';

describe("Validate primitives", ()=> {

    let objectsAndArrays = [
        {value: {}, type: types.object, nonPrimitive: true},
        {value: {x: 1, y: 2}, type: types.object, nonPrimitive: true},
        {value: {x: 1, y: 2, z: {a: "Hello"}}, type: types.object, nonPrimitive: true},
        {value: [], type: types.array, nonPrimitive: true},
        {value: [1, 2, 3], type: types.array, nonPrimitive: true},
        {value: [{x: 1}, {x: 3}, {x: 2}], type: types.array, nonPrimitive: true}];

    describe("valid string", ()=> {
        it('should return true', () => {
            expect(validate(types.string, 'Sandeep')).to.be.equal(true);
            let name = "Sandeep";
            expect(validate(types.string, `Hello ${name}`)).to.be.equal(true);
        });
    });

    describe("invalid string", ()=> {
        beforeEach(function () {
            this.sinon.stub(console, 'error');
        });

        let invalidStrings = [
            //primitives
            {value: 0.1, type: types.number},
            {value: 0, type: types.number},
            {value: 1, type: types.number},
            {value: NaN, type: types.number},
            {value: true, type: types.boolean},
            {value: false, type: types.boolean},
            {value: undefined, type: types.undefined},
            {value: null, type: types.null},
            ...objectsAndArrays];

        //without logs
        it('should return false', () => {
            invalidStrings.forEach((invalidString)=> {
                expect(validate(types.string, invalidString.value)).to.be.equal(false);
            });
        });

        //with logs
        it('should return false & console the apt error', () => {
            invalidStrings.forEach((invalidString)=> {
                let value = invalidString.value;

                expect(validate(types.string, value, true)).to.be.equal(false);

                if (invalidString.nonPrimitive) {
                    value = JSON.stringify(value);
                }

                expect(console.error.calledWith('Typoscope found 1 errors:')).to.be.equal(true);
                expect(console.error
                    .calledWith(`Type mismatch for '${value}': expected ${types.string}, got ${invalidString.type}`))
                    .to.be.equal(true);
            });
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
        beforeEach(function () {
            this.sinon.stub(console, 'error');
        });

        let invalidNumbers = [
            //primitives
            {value: "0.1", type: types.string},
            {value: false, type: types.boolean},
            {value: undefined, type: types.undefined},
            {value: null, type: types.null},
            ...objectsAndArrays
        ];

        //without logs
        it('should return false', () => {
            invalidNumbers.forEach((invalidNumber)=> {
                expect(validate(types.number, invalidNumber.value)).to.be.equal(false);
            });
        });

        //with logs
        it('should return false & console the apt error', () => {
            invalidNumbers.forEach((invalidNumber)=> {
                let value = invalidNumber.value;

                expect(validate(types.number, value, true)).to.be.equal(false);

                if (invalidNumber.nonPrimitive) {
                    value = JSON.stringify(value);
                }

                expect(console.error.calledWith('Typoscope found 1 errors:')).to.be.equal(true);
                expect(console.error
                    .calledWith(`Type mismatch for '${value}': expected ${types.number}, got ${invalidNumber.type}`))
                    .to.be.equal(true);
            });
        });
    });

    describe("valid boolean", ()=> {
        it('should return true', () => {
            expect(validate(types.boolean, false)).to.be.equal(true);
            expect(validate(types.boolean, true)).to.be.equal(true);
        });
    });

    describe("invalid boolean", ()=> {
        beforeEach(function () {
            this.sinon.stub(console, 'error');
        });

        let invalidBooleans = [
            //primitives
            {value: "false", type: types.string},
            {value: 0.1, type: types.number},
            {value: NaN, type: types.number},
            {value: undefined, type: types.undefined},
            {value: null, type: types.null},
            ...objectsAndArrays
        ];

        //without logs
        it('should return false', () => {
            invalidBooleans.forEach((invalidBoolean)=> {
                expect(validate(types.boolean, invalidBoolean.value)).to.be.equal(false);
            });
        });

        //with logs
        it('should return false & console the apt error', () => {
            invalidBooleans.forEach((invalidBoolean)=> {
                let value = invalidBoolean.value;

                expect(validate(types.boolean, value, true)).to.be.equal(false);

                if (invalidBoolean.nonPrimitive) {
                    value = JSON.stringify(value);
                }

                expect(console.error.calledWith('Typoscope found 1 errors:')).to.be.equal(true);
                expect(console.error
                    .calledWith(`Type mismatch for '${value}': expected ${types.boolean}, got ${invalidBoolean.type}`))
                    .to.be.equal(true);
            });
        });
    });

    describe("valid null", ()=> {
        it('should return true', () => {
            expect(validate(types.null, null)).to.be.equal(true);
        });
    });

    describe("invalid null", ()=> {
        beforeEach(function () {
            this.sinon.stub(console, 'error');
        });

        let invalidNulls = [
            {value: "null", type: types.string},
            {value: 0.1, type: types.number},
            {value: true, type: types.boolean},
            {value: false, type: types.boolean},
            {value: NaN, type: types.number},
            {value: undefined, type: types.undefined},
            ...objectsAndArrays
        ];

        //without logs
        it('should return false', () => {
            invalidNulls.forEach((invalidNull)=> {
                expect(validate(types.null, invalidNull.value)).to.be.equal(false);
            });
        });

        //with logs
        it('should return false & console the apt error', () => {
            invalidNulls.forEach((invalidNull)=> {
                let value = invalidNull.value;

                expect(validate(types.null, value, true)).to.be.equal(false);

                if (invalidNull.nonPrimitive) {
                    value = JSON.stringify(value);
                }

                expect(console.error.calledWith('Typoscope found 1 errors:')).to.be.equal(true);
                expect(console.error
                    .calledWith(`Type mismatch for '${value}': expected ${types.null}, got ${invalidNull.type}`))
                    .to.be.equal(true);
            });
        });
    });

    describe("valid undefined", ()=> {
        it('should return true', () => {
            expect(validate(types.undefined, undefined)).to.be.equal(true);
        });
    });

    describe("invalid undefined", ()=> {
        beforeEach(function () {
            this.sinon.stub(console, 'error');
        });

        let invalidUndefined = [
            {value: "undefined", type: types.string},
            {value: 0.1, type: types.number},
            {value: true, type: types.boolean},
            {value: false, type: types.boolean},
            {value: NaN, type: types.number},
            {value: null, type: types.null},
            ...objectsAndArrays
        ];

        //without logs
        it('should return false', () => {
            invalidUndefined.forEach((i)=> {
                expect(validate(types.undefined, i.value)).to.be.equal(false);
            });
        });

        //with logs
        it('should return false & console the apt error', () => {
            invalidUndefined.forEach((i)=> {
                let value = i.value;

                expect(validate(types.undefined, value, true)).to.be.equal(false);

                if (i.nonPrimitive) {
                    value = JSON.stringify(value);
                }

                expect(console.error.calledWith('Typoscope found 1 errors:')).to.be.equal(true);
                expect(console.error
                    .calledWith(`Type mismatch for '${value}': expected ${types.undefined}, got ${i.type}`))
                    .to.be.equal(true);
            });
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

    //there's no invalid any case

});

