import {EntityResponse} from "../lib/EntityResponse";
import {TestModel} from "./TestModel";
import {EntityResponseModel} from "../lib/EntityResponseModel";
import {ResponseField} from "../lib/ResponseField";
import {SourceModel} from "./SourceModel";

@EntityResponseModel(SourceModel)
export class SourceResponse extends EntityResponse<SourceModel> {
    @ResponseField
    public _id?: string;

    @ResponseField
    public dbName?: string;

    @ResponseField
    public deleted?: string;
}
