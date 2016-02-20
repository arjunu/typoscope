import {expect} from 'chai';
import {types, validate} from './../src/type-validator';

describe("Validate objects schemas", ()=> {
    let simpleObjectSchema = {
        a: types.string, b: types.number, c: types.boolean, d: types.object
    };

    let simpleArraySchema = [{
        a: types.string, b: types.number, c: types.boolean, d: types.object
    }];

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
                a: 'Sandeep', b: 123, c: false, d: {x: 2}
            };

            expect(validate(simpleObjectSchema, trueValue)).to.be.equal(true);
        });


        it('simple array should return true', () => {

            let trueValue = [{a: 'Sandeep', b: 123, c: false, d: {x: 2}}];

            expect(validate(simpleArraySchema, trueValue)).to.be.equal(true);
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
        it('simple object types mismatch should return false', ()=> {
            let falseValue = {
                a: 'Sandeep', b: 123, c: false, d: [] //d should be an object
            };

            let falseValue2 = {
                a: 'Sandeep', b: 123, c: 1, d: 1 //d should be an object
            };

            expect(validate(simpleObjectSchema, falseValue)).to.be.equal(false);
            expect(validate(simpleObjectSchema, falseValue2)).to.be.equal(false);
        });

        it('simple array types mismatch should return true', () => {
            let falseValue = [{a: 'Sandeep', b: '123', c: false, d: {x: 2}}]; //b should be a number

            expect(validate(simpleObjectSchema, falseValue)).to.be.equal(false);
        });

        it('simple array empty item should return true', () => {

            //second item is missing it's properties
            let falseValue = [{a: 'Sandeep', b: 123, c: false, d: {x: 2}}, {}];

            expect(validate(simpleArraySchema, falseValue)).to.be.equal(false);
        });

        it('missing property should return false', () => {
            //missing property projects
            let falseValue = {
                name: 'Sandeep',
                id: 1,
                active: true,
                tasks: [{
                    project: 'String',
                    id: 1,
                    items: ['Eat', 'Code']
                }]
            };

            expect(validate(userSchema, falseValue)).to.be.equal(false);
        });

        it('missing nested property should return false', () => {
            let falseValue = {
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

            expect(validate(userSchema, falseValue)).to.be.equal(false);
        });


        it('missing property of type any should return false', () => {
            //missing property lead
            let falseValue = {
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

            expect(validate(userSchema, falseValue)).to.be.equal(false);
        });

    });


});