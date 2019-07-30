import "reflect-metadata";
import {JSONResponse, JSONResponseConstructor} from "./JSONResponse";
import {ResponseField} from "./ResponseField";

export interface IListResponseFieldConfig {
    modelField?: string;
    responseClass?: JSONResponseConstructor;
    filter?: (entities: {}[]) => {}[];
}

export function ListResponseField(responseClass: JSONResponseConstructor): (target: any, propertyKey: string) => void;
export function ListResponseField(config?: IListResponseFieldConfig): (target: any, propertyKey: string) => void;

export function ListResponseField(arg) {
    let config;
    if (arg.prototype instanceof JSONResponse) {
        config = {
            responseClass: arg,
        }
    } else  {
        config = arg;
    }

    return ResponseField(config);
}
