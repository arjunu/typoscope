const types = {
    boolean: "Boolean",
    number: "Number",
    string: "String",
    object: "Object",
    array: "Array",
    null: "Null",
    undefined: "Undefined",
    any: "Any"
};

function validate(type, value, getLogs) {
    let level = -1, path = [];

    const getType = item => Object.prototype.toString.call(item).slice(8, -1);

    const checkPrimitiveType = (type, value) => {

        if (type === types.any || type === getType(value)) {
            return true;
        }
        else {
            if (getLogs) {
                console.error(`Type mismatch for '${arrayToPath(path) || getPrintableValue(value)}': expected ${type}, got ${getType(value)}`);
            }
            return false
        }
    };

    const checkObjectType =
        (type, value) => {
            level++;

            let valid = getType(value) !== types.object ? false : Object.keys(type).every(
                tKey => {
                    path.push(tKey);
                    console.log(level, path);
                    let valid = !value.hasOwnProperty(tKey) ? false : checkType(type[tKey], value[tKey], tKey);
                    path.pop();
                    return valid;

                });

            path.pop();
            level--;

            return valid;
        };

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

    const arrayToPath = path => {
        if (path.length === 0) {
            return "";
        }
        else {
            let pathString = "";
            path.forEach((pathNode, index)=> {
                if (index > 0)
                    pathString += ".";
                pathString += pathNode;
            });
            return pathString;
        }
    };

    const getPrintableValue = value => {
        //TODO trim large values
        let compoundTypes = [types.object, types.array];
        if (compoundTypes.indexOf(getType(value)) >= 0) {
            return JSON.stringify(value);
        }
        return value;
    };

    return checkType(type, value);
}

export {
    validate, types
}