import {expect} from 'chai';
import {types, validate} from './../src/type-validator';

describe("Validate objects schemas", ()=> {
    let schema = {
        name: types.string,
        id: types.number,
        active: types.boolean,
        projects: [{
            name: types.string,
            id: types.number,
            titles: [types.string],
            lead: types.any
        }]
    };

    describe("valid schema", ()=> {
        let trueValue = {
            name: 'Sandeep',
            id: 1,
            active: true,
            projects: [{
                name: 'String',
                id: 1,
                titles: ['JS', 'Core'],
                lead: 'Michael'
            }]
        };

        it('should return true', () => {
            expect(validate(schema, trueValue)).to.be.equal(true);
            expect(validate({a: types.string, b: types.number, c: types.boolean},
                {a: 'Sandeep', b: 123, c: true})).to.be.equal(true);
        });

    });

    describe("invalid schema", ()=> {
        let falseValue = {
            name: 'Sandeep',
            id: 1,
            active: true
        };

        it('should return false', () => {
            expect(validate(schema, falseValue)).to.be.equal(false);

            expect(validate({
                a: types.string, b: types.number, c: types.boolean
            }, {
                a: 'Sandeep', b: 123, c: 1
            })).to.be.equal(false);
        });

        it('should console error message');

    });


});