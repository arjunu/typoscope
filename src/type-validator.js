const types = {
    boolean: "Boolean",
    number: "Number",
    string: "String",
    object: "Object",
    array: "Array",
    null: "Null",
    undefined: "Undefined"
};

function validate(type, value) {
    const getType = item => Object.prototype.toString.call(item).slice(8, -1);

    const checkPrimitiveType = (type, value) => type === getType(value);

    const checkObjectType =
        (type, value) =>
            getType(value) !== types.object ? false : Object.keys(type).every(tKey => checkType(type[tKey], value[tKey]));

    const checkArrayType =
        (type, value) => getType(value) !== types.array ? false : value.every(item => checkType(type[0], item));

    const checkType = (type, value) => {
        switch (getType(type)) {

            case types.object:
                return checkObjectType(type, value);

            case types.array:
                return checkArrayType(type, value);

            default:
                return checkPrimitiveType(type, value);
        }
    };

    return checkType(type, value);
}

export {
    validate, types
}