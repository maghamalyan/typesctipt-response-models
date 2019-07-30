import {Context} from "./Context";

export abstract class BaseResponse {
    constructor(protected readonly data: {}) {

    }

    public abstract write(ctx: Context): void|Promise<void>;
}
