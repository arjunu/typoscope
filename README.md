# Typoscope
A runtime type schema validator for compound Javascript objects & arrays

For a given type schema and a value (object or array), it checks if the object or array satisfies the schema.

Typoscope checks from given type schema:
 - if your object (array of objects) has all the properties of corresponding types mentioned
 - if your array has items of given type (heterogeneous arrays not yet supported, use type 'Any' for now)

Basically it says yes (true) or no (false). Error logging pinpointing invalid values is coming soon.

```javascript
validate(userSchema, user); //returns true or false
```

Compound objects are supported:

```javascript
{
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

## Installation

```javascript
npm install typoscope --save
```

## Usage Example (ES6)

```javascript
import { validate, types } from 'typoscope';

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

## Motivation

During front end (and server) development we want to know if the server is sending correct data. Same goes for posting
data to server. At least until we perfect both and go into production. A missing property (`user.email`) or a value of
wrong type (number in place of string) could produce a bug or even crash the application. In the hunt for the cause, you
will head to the network tab under browser dev tools and manually inspect the response object. Instead we could have a
utility (enter Typoscope) doing the inspection for data to and fro the server.

Inspecting server communications is just one use case! Do tell us where you have used it.

## License

The MIT License
