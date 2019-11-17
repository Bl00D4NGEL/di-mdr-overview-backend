import {IMember} from "../member/member";

export interface ITagListOutput {
    generateOutput(members: IMember[], description: string): string;
}
