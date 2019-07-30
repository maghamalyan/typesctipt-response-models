import {SourceModel} from "./SourceModel";
import {TitleModel} from "./TitleModel";
import {TitleResponse} from "./TitleResponse";

function main() {
    const sources = [];

    for (let i = 0; i < 5; i ++) {
        sources.push(new SourceModel(i.toString(), "db-"+i.toString(), i % 2 === 0))
    }
    const title = new TitleModel("ssss", "Some organization", sources);
    const response = new TitleResponse(title);

    console.log(response.serialize());

    // console.log(response.getMetadata());
}

main();
