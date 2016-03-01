declare module "typoscope" {

    export function validate(schema:any, value:any, logErrors?:boolean):boolean;

    interface Types {
        boolean: string;
        number: string;
        string: string;
        object: string;
        array: string;
        'null': string;
        undefined: string;
        any: string;
    }

    export const types:Types;
}
