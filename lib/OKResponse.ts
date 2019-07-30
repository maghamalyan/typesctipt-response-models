import {JSONResponse} from "./JSONResponse";

export class OKResponse extends JSONResponse {
    constructor() {
        super({});
    }

    getStatusCode(): number {
        return 204;
    }
}
