import {EntityResponse} from "../lib/EntityResponse";
import {TestModel} from "./TestModel";
import {EntityResponseModel} from "../lib/EntityResponseModel";
import {ResponseField} from "../lib/ResponseField";

@EntityResponseModel(TestModel)
export class TestResponse extends EntityResponse<TestModel> {
    @ResponseField({

    })
    public firstName: string;
}
