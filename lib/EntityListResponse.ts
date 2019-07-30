import {Model} from "./Model";
import {EntityResponse} from "./EntityResponse";
import {ListResponse} from "./ListResponse";

export class EntityListResponse<T extends Model<T>> extends ListResponse {
    protected readonly data: Model<T>[];
    constructor(data: Model<T>[], protected readonly responseClass: new (data) => EntityResponse<T>) {
        super(data, responseClass);
    }
}
