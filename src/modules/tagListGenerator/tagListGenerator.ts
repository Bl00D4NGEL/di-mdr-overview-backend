import {IMember} from "../member/member";
import {PRIORITIES} from "../member/positions";

export default function tagListGenerator(members: IMember[], roles: string[]): string {
    if (members === undefined || members.length === 0) {
        return '';
    }

    roles.map(role => {
        if (PRIORITIES[role] === undefined) {
            return;
        }
        return role;
    });
    return '';
}
