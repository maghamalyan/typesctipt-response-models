import {BaseResponse} from "./BaseResponse";
import {Context} from "./Context";

export class JSONResponse extends BaseResponse {
    public serialize(): {} {
        return this.data;
    }

    public getStatusCode(): number {
        return 200;
    }

    public write(ctx: Context): void | Promise<void> {
        ctx.body = this.serialize();
        ctx.status = this.getStatusCode();
    }
}

export interface JSONResponseConstructor {
    new (data: {}): JSONResponse;
}
