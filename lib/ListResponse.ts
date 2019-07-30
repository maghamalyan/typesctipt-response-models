import {JSONResponse} from "./JSONResponse";

export class ListResponse extends JSONResponse {
    protected readonly data: {}[];
    constructor(data: {}[], protected readonly responseClass: new (data) => JSONResponse) {
        super(data);
    }

    public serialize(): {} {
        return this.data.map(
            (model) => {
                const response = new this.responseClass(model);
                return response.serialize();
            }
        );
    }
}
