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
    let path = [], isValid = true;

    const getType = item => Object.prototype.toString.call(item).slice(8, -1);

    const checkPrimitiveType = (type, value) => {

        if (type !== types.any && type !== getType(value)) {
            isValid = false;
            if (getLogs) {
                console.error(`Type mismatch for '${arrayToPath(path) || getPrintableValue(value)}': expected ${type}, got ${getType(value)}`);
            }
        }
    };

    const checkObjectType =
        (type, value) => {

            if (getType(value) !== types.object) {
                isValid = false;
            }
            else {
                Object.keys(type).forEach(
                    tKey => {
                        path.push(tKey);
                        if (!value.hasOwnProperty(tKey)) {
                            if (getLogs)
                                console.error(`Missing property: '${path.length > 0 ? arrayToPath(path) : tKey}'`);
                            isValid = false;
                        }
                        else {
                            checkType(type[tKey], value[tKey]);
                        }
                        path.pop();
                    });
            }
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

    checkType(type, value);
    return isValid;
}

export {
    validate, types
}