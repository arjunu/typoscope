import {expect} from 'chai';
import {types, validate} from './../src/type-validator';

describe("Validate objects schemas", ()=> {
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
            let schema = {
                a: types.string, b: types.number, c: types.boolean, d: types.object
            };

            let trueValue = {
                a: 'Sandeep', b: 123, c: false, d: {x: 2}
            };

            expect(validate(schema, trueValue)).to.be.equal(true);
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

        it('nested object undefined for any should return true', () => {
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

        it('nested object empty array should return true', () => {
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
        it('types mismatch should return false', ()=> {
            let schema = {
                a: types.string, b: types.number, c: types.boolean, d: types.object
            };

            let falseValue = {
                a: 'Sandeep', b: 123, c: false, d: []
            };

            let falseValue2 = {
                a: 'Sandeep', b: 123, c: 1, d: 1
            };

            expect(validate(schema, falseValue)).to.be.equal(false);
            expect(validate(schema, falseValue2)).to.be.equal(false);
        });

        it('missing nested property should return false', () => {
            let falseValue = {
                name: 'Sandeep',
                id: 1,
                active: true
            };

            expect(validate(userSchema, falseValue)).to.be.equal(false);
        });

        it('missing nested property should return false', () => {
            let falseValue = {
                name: 'Sandeep',
                id: 1,
                active: true,
                projects: [{
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


        it('missing property any should return false', () => {

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