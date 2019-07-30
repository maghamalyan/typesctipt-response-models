import {JSONResponse} from "./JSONResponse";
import {Model} from "./Model";
import {getEntityResponseModelMetadata, IEntityResponsePropertyMetadata} from "./EntityResponseModel";
import {ListResponse} from "./ListResponse";

export class EntityResponse<T extends Model<T>> extends JSONResponse {
    protected readonly data: Model<T>;
    constructor(data: Model<T>) {
        super(data);
    }

    public serialize(): {} {
        const json = {};

        const metadata = this.getMetadata();

        for (let key of Reflect.ownKeys(metadata.properties)) {
            const propMeta = metadata.properties[key as string];
            let data = this.data[propMeta.modelField];

            if (propMeta.filter) {
                data = propMeta.filter([...data]);
            }

            let res;
            if (propMeta.isListResponse) {
                const response = new ListResponse(data, propMeta.responseClass);
                json[propMeta.responseField] = response.serialize();
            } else if (propMeta.responseClass) {
                const response = new propMeta.responseClass(data);
                json[propMeta.responseField] = response.serialize();
            } else {
                json[propMeta.responseField] = data;
            }
        }

        return json;
    }

    public getMetadata() {
        return getEntityResponseModelMetadata<T>((this as any).constructor);
    }
}
