# Typoscope
A runtime type schema validator for compound Javascript objects & arrays

For a given type schema and a value (object or array), it checks if the object or array satisfies the schema.

Typoscope checks from given type schema:
 - if your object (array of objects) has all the properties of corresponding types mentioned
 - if your array has items of given type (heterogeneous arrays not yet supported, use type 'Any' for now)

Basically it says yes (true) or no (false). Pass a third boolean param `true` to enable error logging for failed validations.

```javascript
validate(userSchema, user); //returns true or false
validate(userSchema, user, true); //returns true or false and logs errors for any type mismatches & missing properties
```

Compound nested objects are supported:

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

let trueValue = {
    a: 'Sandeep', b: 123, c: false, d: {x: 2}
};
validate(schema, trueValue, true); //returns true

let falseValue = {
    a: 'Sandeep', b: 123, c: false, d: []
};
validate(schema, falseValue, true); 
//returns false, log - Type mismatch for 'd': expected Object, got Array

let falseValue2 = {
  a: 'Sandeep', b: 123, c: 1, d: 1
};
validate(schema, falseValue2, true); 
//returns false, log - 
//Type mismatch for 'c': expected Boolean, got Number
//Type mismatch for 'd': expected Object, got Number

/**Nested compound objects*/

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
      username: 'stardoge',
      name: {firstName: 'Arjun', lastName: 'Umesh'},
      id: 56,
      active: true,
      projects: [{
          name: 'Tada Todo',
          id: 1,
          titles: ['JS', 'React'],
          lead: 'Michael'
      }],
      tasks: []
  };

validate(userSchema, user, true); //returns true

let user2 = {
      username: 'sandeep2149',
      id: 1,
      active: 0,
      name: {firstName: "Sandeep"},
      projects: [{
          name: "TadaTodo",
          id: 1,
          titles: ['A', 1],
          lead: 'Michael'
      },{
          id: 2,
          titles: ['X', 'Y'],
          lead: 'Michael'
      }],
      tasks: [{
          project: 'String',
          id: 1,
          items: ['Eat', 'Code']
      }]
};

validate(userSchema, user2); 
//returns false
//log - 
//Missing property: 'name.lastName'
//Type mismatch for 'active': expected Boolean, got Number
//Type mismatch for 'projects[0].titles[1]': expected String, got Number
//Missing property: 'projects[1].name'
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
