import {IMemberCollection} from "../member/memberCollection";

export interface ITagListOutput {
    generate(members: IMemberCollection): string;
}
