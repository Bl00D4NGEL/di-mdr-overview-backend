import {diMember} from "../../member/diMembers";
import {IMember} from "../../member/member";
import serializeMember from "../serializeMember";

export default function addMembersWithCallback(members: diMember[], callbackFn: (member: IMember) => void): void {
    if (Array.isArray(members)) {
        members.forEach(member => callbackFn(serializeMember(member)));
    }
}
