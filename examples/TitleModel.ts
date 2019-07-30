import {SourceModel} from "./SourceModel";
import {Model} from "../lib/Model";

export class TitleModel extends Model<TitleModel> {
    public _id?: string;

    public organization?: string;

    public sources?: SourceModel[];

    constructor(_id: string, organization: string, sources: SourceModel[]) {
        super();
        this._id = _id;
        this.organization = organization;
        this.sources = sources;
    }
}
