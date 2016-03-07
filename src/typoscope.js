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

/**
 * @desc tests values against given type schema
 * @param type: type schema for value to be tested against 
 * @param value: value to be tested
 * @param printLogs: if true, consoles errors
 * @returns {boolean}
 */
function validate(type, value, printLogs) {
    let path = [], isValid = true, errors = [];

    const getType = item => Object.prototype.toString.call(item).slice(8, -1);

    const checkPrimitiveType = (type, value) => {

        if (type !== types.any && type !== getType(value)) {
            isValid = false;
            if (printLogs) {
                errors.push(`Type mismatch for '${arrayToPath(path) || getPrintableValue(value)}': expected ${type}, got ${getType(value)}`);
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
                            if (printLogs)
                                errors.push(`Missing property: '${path.length > 0 ? arrayToPath(path) : tKey}'`);

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
        (type, value) => {
            if (getType(value) !== types.array) {
                isValid = false
            }
            else {
                value.forEach((item, index) => {
                    path.push(index);
                    checkType(type[0], item);
                    path.pop();
                });
            }
        };

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

    /**
     * @desc to convert path array to string
     * @param path
     * @returns {string}
     */
    const arrayToPath = path => {
        if (path.length === 0) {
            return "";
        }
        else {
            let pathString = "";
            path.forEach((pathNode, index)=> {
                if (getType(pathNode) === types.number) {
                    pathString += `[${pathNode}]`;
                }
                else {
                    if (index > 0)
                        pathString += ".";
                    pathString += pathNode;
                }
            });
            return pathString;
        }
    };

    /**
     * @desc to convert values into printable form
     * @param value
     * @returns {*}
     */
    const getPrintableValue = value => {
        //TODO trim large values
        let compoundTypes = [types.object, types.array];
        if (compoundTypes.indexOf(getType(value)) >= 0) {
            return JSON.stringify(value);
        }
        return value;
    };

    checkType(type, value);

    //console the errors
    if (errors.length > 0) {
        console.error(`Typoscope found ${errors.length} errors:`);
        errors.forEach((error)=>(console.error(error)));
    }

    return isValid;
}

export {
    validate, types
}