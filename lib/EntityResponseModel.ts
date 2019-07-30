import {IModelConstructor, Model} from "./Model";
import "reflect-metadata";
import {clonePropertyMeta} from "./Utils";
import {JSONResponseConstructor} from "./JSONResponse";

export const RESPONSE_METADATA_KEY = Symbol("responseMetadata");


export interface IEntityResponsePropertyMetadata {
    modelField: string;
    responseField: string;
    responseClass: JSONResponseConstructor;
    isListResponse: boolean;
    filter?: (entities: {}[]) => {}[];
    propertyType: any;
}

export interface IEntityResponseMetadata<T> {
    modelConstructor: IModelConstructor<T>;
    properties: {
        [p: string]: IEntityResponsePropertyMetadata
    },
    className: string;
    baseClass: JSONResponseConstructor;
}


export function getMetadataFromResponseClass<T extends Model<T>>(target): IEntityResponseMetadata<T> {
    let allMetadata: IEntityResponseMetadata<T> = (
        Reflect.getMetadata(RESPONSE_METADATA_KEY, target) || {
            modelConstructor: null,
            properties: {},
        }
    );

    if (!allMetadata.className) {
        allMetadata.className = target.constructor.name;
        allMetadata.baseClass = target.constructor;
    }

    // it could hve been initiated on either Endpoint or ViewSet
    if (allMetadata.className !== target.constructor.name) {
        allMetadata = {
            modelConstructor: null,
            className: target.constructor.name,
            baseClass: allMetadata.baseClass,
            properties: clonePropertyMeta(allMetadata.properties),
        }
    }

    return allMetadata;
}

export function EntityResponseModel<T extends Model<T>>(modelConstructor: IModelConstructor<T>) {
    return (target: any) => {
        const allMetadata = getMetadataFromResponseClass(target.prototype);

        allMetadata.modelConstructor = modelConstructor;

        Reflect.defineMetadata(
            RESPONSE_METADATA_KEY,
            allMetadata,
            target,
        );
    }
}


export function getEntityResponseModelMetadata<T>(responseClass: IModelConstructor<T>): IEntityResponseMetadata<T> {
    return Reflect.getMetadata(RESPONSE_METADATA_KEY, responseClass);
}
