import {Model} from "../lib/Model";

export class SourceModel extends Model<SourceModel> {
    public _id?: string;

    public dbName?: string;

    public deleted?: boolean;

    constructor(_id: string, dbName: string, deleted: boolean) {
        super();
        this._id = _id;
        this.dbName = dbName;
        this.deleted = deleted;
    }
}
