import "reflect-metadata";
import {JSONResponse, JSONResponseConstructor} from "./JSONResponse";
import {ResponseField} from "./ResponseField";
import {ListResponseField} from "./ListResponseField";

export interface IListResponseFieldConfig {
    modelField?: string;
    responseClass?: JSONResponseConstructor;
    filter?: (entities: {}[]) => {}[];
}

export function DeletedFilteredListResponseField(responseClass: JSONResponseConstructor): (target: any, propertyKey: string) => void;
export function DeletedFilteredListResponseField(config?: IListResponseFieldConfig): (target: any, propertyKey: string) => void;

export function DeletedFilteredListResponseField(arg) {
    let config;
    if (arg.prototype instanceof JSONResponse) {
        config = {
            responseClass: arg,
        }
    } else  {
        config = arg;
    }
    const deletedFilter = (entities: any[]) => {
        return entities.filter((e) => !e.deleted);
    };
    config.filter = config.filter ?  (entities: any[]) => deletedFilter(config.filter(entities)) : deletedFilter;

    return ListResponseField(config);
}
