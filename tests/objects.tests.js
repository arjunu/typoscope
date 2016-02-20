import {expect} from 'chai';
import 'mocha-sinon';
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
        beforeEach(function () {
            this.sinon.stub(console, 'error');
        });

        let invalidObjects = [
            {value: "{}", type: types.string},
            {value: false, type: types.boolean},
            {value: true, type: types.boolean},
            {value: [], type: types.array, nonPrimitive: true},
            {value: 5, type: types.number},
            {value: undefined, type: types.undefined},
            {value: null, type: types.null}
        ];

        //without logs
        it('should return false', () => {
            invalidObjects.forEach((invalidObject)=> {
                expect(validate(types.object, invalidObject.value)).to.be.equal(false);
            });
        });

        //with logs
        it('should return false & console the apt error', () => {
            invalidObjects.forEach((invalidObject)=> {
                let value = invalidObject.value;

                expect(validate(types.object, value, true)).to.be.equal(false);

                if (invalidObject.nonPrimitive) {
                    value = JSON.stringify(value);
                }

                expect(console.error
                    .calledWith(`Type mismatch for '${value}': expected ${types.object}, got ${invalidObject.type}`))
                    .to.be.equal(true);
            });
        });
    });

    describe("valid arrays", ()=> {
        it('should return true', () => {
            expect(validate(types.array, [])).to.be.equal(true);
            expect(validate(types.array, [{x: 5, y: 2}])).to.be.equal(true);
        });
    });

    describe("invalid arrays", ()=> {
        beforeEach(function () {
            this.sinon.stub(console, 'error');
        });

        let invalidArrays = [
            {value: {}, type: types.object, nonPrimitive: true},
            {value: false, type: types.boolean},
            {value: true, type: types.boolean},
            {value: "[]", type: types.string},
            {value: 5, type: types.number},
            {value: 0, type: types.number},
            {value: 0.1, type: types.number},
            {value: undefined, type: types.undefined},
            {value: null, type: types.null}
        ];

        //without logs
        it('should return false', () => {
            invalidArrays.forEach((invalidArray)=> {
                expect(validate(types.array, invalidArray.value)).to.be.equal(false);
            });
        });

        //with logs
        it('should return false & console the apt error', () => {
            invalidArrays.forEach((invalidArray)=> {
                let value = invalidArray.value;

                expect(validate(types.array, value, true)).to.be.equal(false);

                if (invalidArray.nonPrimitive) {
                    value = JSON.stringify(value);
                }

                expect(console.error
                    .calledWith(`Type mismatch for '${value}': expected ${types.array}, got ${invalidArray.type}`))
                    .to.be.equal(true);
            });
        });
    });
});