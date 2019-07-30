import "reflect-metadata";
import {JSONResponse, JSONResponseConstructor} from "./JSONResponse";
import {
    getEntityResponseModelMetadata,
    getMetadataFromResponseClass,
    RESPONSE_METADATA_KEY
} from "./EntityResponseModel";
import {ResponseClassRequeredError} from "./errors";

export interface IResponseFieldConfig {
    modelField?: string;
    responseClass?: JSONResponseConstructor;
    isListResponse?: boolean;
    filter?: (entities: {}[]) => {}[];
}

export function ResponseField(config?: IResponseFieldConfig): (target: any, propertyKey: string) => void;
export function ResponseField(target: any, propertyKey: string): void;

export function ResponseField() {
    const factory = (config: IResponseFieldConfig = {}) => {
        return (target: any, propertyKey: string, propertyDescriptor: PropertyDecorator) => {
            const propertyType = Reflect.getMetadata("design:type", target, propertyKey);
            let responseClass: JSONResponseConstructor = null;

            let isPropertyArrayType = false;
            if (propertyType.prototype instanceof JSONResponse) {
                responseClass = propertyType;
            }

            if (propertyType === Array) {
                isPropertyArrayType = true;
                if (!(config.responseClass && config.responseClass.prototype instanceof JSONResponse)) {
                    throw new ResponseClassRequeredError();
                }
            }

            config = Object.assign({
                modelField: propertyKey,
                responseClass: responseClass,
                filter: null,
                isListResponse: isPropertyArrayType,
            }, config);

            const allMetadata = getMetadataFromResponseClass(target);

            allMetadata.properties[propertyKey] = {
                modelField: config.modelField,
                responseField: propertyKey,
                responseClass: config.responseClass,
                isListResponse: config.isListResponse,
                filter: config.filter,
                propertyType: propertyType,
            };

            Reflect.defineMetadata(
                RESPONSE_METADATA_KEY,
                allMetadata,
                target,
            );
        }
    };

    if (arguments.length === 3) {
        return factory()(arguments[0], arguments[1], arguments[2]);
    } else if (arguments.length === 1) {
        return factory(...arguments);
    } else {
        throw new Error("Wrong number of arguments for decorator. Got " + arguments.length +
            " but was expecting 1 or two. Arguments are: " + JSON.stringify(arguments));
    }
}
