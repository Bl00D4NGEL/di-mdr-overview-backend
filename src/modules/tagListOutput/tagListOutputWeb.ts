import {ITagListOutput} from "./tagListOutput";
import {IMemberCollection} from "../member/memberCollection";

export default class TagListOutputWeb implements ITagListOutput {
    generate(memberCollection: IMemberCollection): string {
        return JSON.stringify(memberCollection);
    }
}
