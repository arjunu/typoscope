# Typoscope
A runtime type validator for compound Javascript objects

For a given object schema and object, it checks if the object satisfies the schema.

## Installation 

Drop the <a href="https://github.com/arjunu/type-validator/blob/master/src/typoscope.js">typoscope.js</a>
file anywhere in your project to use it. It's in ES6, transpile it before using if your project is in ES5. 

:exclamation:Node module coming soon :soon:

## Usage Example (ES6)

```javascript
import { validate, types } from 'type-validator';

/**Simple objects*/

let schema = {
    a: types.string, b: types.number, c: types.boolean, d: types.object
};

let falseValue = {
    a: 'Sandeep', b: 123, c: false, d: []
};

let falseValue2 = {
  a: 'Sandeep', b: 123, c: 1, d: 1
};

let trueValue = {
    a: 'Sandeep', b: 123, c: false, d: {x: 2}
};

validate(schema, trueValue); //returns true
validate(schema, falseValue)); //returns false
validate(schema, falseValue2)); //returns false

/**Nested objects*/

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
    
let user = {
      name: 'Sandeep',
      id: 1,
      active: true,
      projects: [{
          name: 'Tada Todo',
          id: 1,
          titles: ['JS', 'React'],
          lead: 'Michael'
      }],
      tasks: [{
          project: 'Life',
          id: 1,
          items: ['Eat', 'Code']
      }]
  };

validate(userSchema, user); //returns true

let user2 = {
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

validate(userSchema, user2); //returns false
```

Supported types:

- Boolean
- String
- Number
- Null
- Undefined
- Array
- Object
- Any

Type `any` means the property can be any of the other types: primitives (including `null` and `undefined`) or Array or Object
but the property cannot be missing from the object.

## License

The MIT License
