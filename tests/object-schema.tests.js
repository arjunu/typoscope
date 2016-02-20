import {expect} from 'chai';
import 'mocha-sinon';
import {types, validate} from './../src';

describe("Object schemas", ()=> {
    let simpleObjectSchema = {
        a: types.string, b: types.number, c: types.boolean, d: types.object, e: types.array
    };

    let simpleObjectSchemaWithAny = {
        a: types.string, b: types.number, c: types.boolean, d: types.object, e: types.array, f: types.any
    };

    let userSchema = {
        name: types.string,
        id: types.number,
        active: types.boolean,
        projects: [{
            name: types.string,
            id: types.number,
            titles: [types.string],
            lead: types.any
        }],
        tasks: types.any
    };

    describe("valid schema", ()=> {

        it('simple object should return true', () => {

            let trueValue = {
                a: 'Sandeep', b: 123, c: false, d: {x: 2}, e: [1, 2, 3]
            };

            expect(validate(simpleObjectSchema, trueValue)).to.be.equal(true);
        });

        it('simple object with any should return true', () => {

            let trueValues = [
                {a: 'Sandeep', b: 123, c: false, d: {x: 2}, e: [1, 2, 3], f: ''},
                {a: 'Sandeep', b: 123, c: false, d: {x: 2}, e: [1, 2, 3], f: 1},
                {a: 'Sandeep', b: 123, c: false, d: {x: 2}, e: [1, 2, 3], f: false},
                {a: 'Sandeep', b: 123, c: false, d: {x: 2}, e: [1, 2, 3], f: true},
                {a: 'Sandeep', b: 123, c: false, d: {x: 2}, e: [1, 2, 3], f: undefined},
                {a: 'Sandeep', b: 123, c: false, d: {x: 2}, e: [1, 2, 3], f: null},
                {a: 'Sandeep', b: 123, c: false, d: {x: 2}, e: [1, 2, 3], f: [4, 5, 6]},
                {a: 'Sandeep', b: 123, c: false, d: {x: 2}, e: [1, 2, 3], f: {x: 2, y: 3}}
            ];

            trueValues.forEach((trueValue) => {
                expect(validate(simpleObjectSchemaWithAny, trueValue)).to.be.equal(true);
            })
        });

        it('nested object should return true', () => {
            let trueValue = {
                name: 'Sandeep',
                id: 1,
                active: true,
                projects: [{
                    name: 'String',
                    id: 1,
                    titles: ['JS', 'Core'],
                    lead: 'Michael'
                }],
                tasks: [{
                    project: 'String',
                    id: 1,
                    items: ['Eat', 'Code']
                }]
            };

            expect(validate(userSchema, trueValue)).to.be.equal(true);
        });

        it('nested object undefined for property tasks of type any should return true', () => {
            let trueValue = {
                name: 'Sandeep',
                id: 1,
                active: true,
                projects: [{
                    name: 'String',
                    id: 1,
                    titles: ['JS', 'Core'],
                    lead: 'Michael'
                }],
                tasks: undefined
            };

            expect(validate(userSchema, trueValue)).to.be.equal(true);
        });

        it('nested object with an empty array for a property projects should return true', () => {
            let trueValue = {
                name: 'Sandeep',
                id: 1,
                active: true,
                projects: [], //empty array
                tasks: [{
                    project: 'String',
                    id: 1,
                    items: ['Eat', 'Code']
                }]
            };

            expect(validate(userSchema, trueValue)).to.be.equal(true);
        });

    });

    describe("invalid schema", ()=> {
        beforeEach(function () {
            this.sinon.stub(console, 'error');
        });

        describe('simple object type mismatch', ()=> {
            let falseValues = [
                {a: 'Sandeep', b: '123', c: false, d: {x: 2}, e: [1, 2, 3]},//b should be a number
                {a: 'Sandeep', b: 123, c: false, d: [], e: [1, 2, 3]}, //d should be an object}
                {a: 'Sandeep', b: 123, c: 1, d: {day: "Thursday"}, e: [1, 2, 3]} //c should be a boolean
            ];

            //without logs
            it('should return false', () => {
                falseValues.forEach((falseValue)=> {
                    expect(validate(simpleObjectSchema, falseValue)).to.be.equal(false);
                });
            });

            //with logs
            it('should return false & console the apt error', () => {
                expect(validate(simpleObjectSchema, falseValues[0], true)).to.be.equal(false);
                expect(console.error
                    .calledWith(`Type mismatch for '${'b'}': expected ${types.number}, got ${types.string}`))
                    .to.be.equal(true);

                expect(validate(simpleObjectSchema, falseValues[1], true)).to.be.equal(false);
                expect(console.error
                    .calledWith(`Type mismatch for 'd': expected ${types.object}, got ${types.array}`))
                    .to.be.equal(true);

                expect(validate(simpleObjectSchema, falseValues[2], true)).to.be.equal(false);
                expect(console.error
                    .calledWith(`Type mismatch for 'c': expected ${types.boolean}, got ${types.number}`))
                    .to.be.equal(true);
            });

        });

        describe('simple object multiple types mismatch', ()=> {
            let falseValues = [
                {a: 5, b: '123', c: false, d: {x: 2}, e: [1, 2, 3]},//b should be a number, a should be string
                {a: 0.1, b: 123, c: 1, d: {day: "Thursday"}, e: [1, 2, 3]} //c should be a boolean, a should be string
            ];

            //without logs
            it('should return false', () => {
                falseValues.forEach((falseValue)=> {
                    expect(validate(simpleObjectSchema, falseValue)).to.be.equal(false);
                });
            });

            //with logs
            it('1. should return false & console the apt error', () => {
                expect(validate(simpleObjectSchema, falseValues[0], true)).to.be.equal(false);
                expect(console.error
                    .calledWith(`Type mismatch for '${'a'}': expected ${types.string}, got ${types.number}`))
                    .to.be.equal(true);
                expect(console.error
                    .calledWith(`Type mismatch for '${'b'}': expected ${types.number}, got ${types.string}`))
                    .to.be.equal(true);
            });

            it('2. should return false & console the apt error', () => {
                expect(validate(simpleObjectSchema, falseValues[1], true)).to.be.equal(false);
                expect(console.error
                    .calledWith(`Type mismatch for '${'a'}': expected ${types.string}, got ${types.number}`))
                    .to.be.equal(true);
                expect(console.error
                    .calledWith(`Type mismatch for '${'a'}': expected ${types.string}, got ${types.number}`))
                    .to.be.equal(true);
            });
        });

        describe('missing property', ()=> {
            //missing property projects
            let falseUserSchemaValue = {
                name: 'Sandeep',
                id: 1,
                active: true,
                tasks: [{
                    project: 'String',
                    id: 1,
                    items: ['Eat', 'Code']
                }]
            };

            //without logs
            it('should return false', () => {
                expect(validate(userSchema, falseUserSchemaValue)).to.be.equal(false);
            });

            //with logs
            it('should return false & console the apt error', () => {
                expect(validate(userSchema, falseUserSchemaValue, true)).to.be.equal(false);
                expect(console.error
                    .calledWith(`Missing property: 'projects'`))
                    .to.be.equal(true);
            });
        });

        describe('missing nested property should return false', () => {
            let falseUserSchemaValue = {
                name: 'Sandeep',
                id: 1,
                active: true,
                projects: [{ //missing projects.name
                    id: 1,
                    titles: ['JS', 'Core'],
                    lead: 'Michael'
                }],
                tasks: [{
                    project: 'String',
                    id: 1,
                    items: ['Eat', 'Code']
                }]
            };

            //without logs
            it('should return false', () => {
                expect(validate(userSchema, falseUserSchemaValue)).to.be.equal(false);
            });

            //with logs
            it('should return false & console the apt error', () => {
                expect(validate(userSchema, falseUserSchemaValue, true)).to.be.equal(false);
                expect(console.error
                    .calledWith(`Missing property: 'projects.name'`))
                    .to.be.equal(true);
            });

        });

        describe('missing property of type any should return false', () => {
            //missing property lead
            let falseUserSchemaValue = {
                name: 'Sandeep',
                id: 1,
                active: true,
                projects: [{
                    name: 'String',
                    id: 1,
                    titles: ['JS', 'Core']
                }],
                tasks: [{
                    project: 'String',
                    id: 1,
                    items: ['Eat', 'Code']
                }]
            };

            //without logs
            it('should return false', () => {
                expect(validate(userSchema, falseUserSchemaValue)).to.be.equal(false);
            });

            //with logs
            it('should return false & console the apt error', () => {
                expect(validate(userSchema, falseUserSchemaValue, true)).to.be.equal(false);
                expect(console.error
                    .calledWith(`Missing property: 'projects.lead'`))
                    .to.be.equal(true);
            });
        });

        //TODO test extra properties
        //TODO test multiple nested missing properties
    });

});