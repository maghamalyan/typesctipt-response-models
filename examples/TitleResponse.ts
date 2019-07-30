import {EntityResponse} from "../lib/EntityResponse";
import {TestModel} from "./TestModel";
import {EntityResponseModel} from "../lib/EntityResponseModel";
import {ResponseField} from "../lib/ResponseField";
import {SourceModel} from "./SourceModel";
import {TitleModel} from "./TitleModel";
import {ListResponseField} from "../lib/ListResponseField";
import {SourceResponse} from "./SourceResponse";
import {DeletedFilteredListResponseField} from "../lib/DeletedFilteredListResponseField";

@EntityResponseModel(TitleModel)
export class TitleResponse extends EntityResponse<TitleModel> {
    @ResponseField
    public _id?: string;

    @ResponseField
    public organization?: string;

    @DeletedFilteredListResponseField(SourceResponse)
    public sources?: SourceResponse[];
}
