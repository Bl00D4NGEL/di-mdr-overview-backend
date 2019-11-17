import Member, {IMember} from "../member/member";
import {
    COACH,
    COMMANDER,
    FIRST_COMMANDER,
    HOUSE_GENERAL,
    MEMBER,
    POSITIONS,
    ROSTER_LEADER,
    SECOND_IN_CHARGE,
    TEAM_LEADER,
    VICE
} from "../member/positions";
import {ITagListOutput} from "./tagListOutput";

export default class TagListOutputWeb implements ITagListOutput {
    generateOutput(members: IMember[], description: string): string {
        if (Array.isArray(members) && members.length > 0) {
            return "<span class='role'>" + description + (members.length > 1 ? 's' : '') + '</span><br>' +
                getTagListForPosition(members, members[0].getPosition()) +
                '<br>';
        }
        return '';
    }
}

function getTagListForPosition(members: IMember[], position?: string): string {
    let tagList = '';
    if (POSITIONS.includes(position)) {
        const groups = groupMembersByCallback(members, getGroupByCallbackForPosition(position));
        Object.keys(groups).sort().forEach(groupName => {
            tagList += '<span>' + groupName + ': ' + groups[groupName].map(member => member.getTag()).join('') + '</span><br>';
        });
    }
    return tagList;
}

function getGroupByCallbackForPosition(position: string): () => string {
    if ([HOUSE_GENERAL, FIRST_COMMANDER].includes(position)) {
        return Member.prototype.getHouse;
    }
    if ([COMMANDER, VICE].includes(position)) {
        return Member.prototype.getDivision;
    }
    if ([TEAM_LEADER, SECOND_IN_CHARGE].includes(position)) {
        return Member.prototype.getTeam;
    }
    if ([ROSTER_LEADER, MEMBER, COACH].includes(position)) {
        return Member.prototype.getTeamAndRoster;
    }
    throw new Error('Unsupported position for getGroupByCallbackForPosition');
}

function groupMembersByCallback(members: IMember[], callbackFn: () => string): { [groupName: string]: IMember[] } {
    const groups = {};

    const callbackCopy = callbackFn;

    members.forEach(member => {
        callbackFn = callbackCopy.bind(member);
        if (groups[callbackFn()] === undefined) {
            groups[callbackFn()] = [];
        }

        groups[callbackFn()].push(member);
    });
    return groups;
}
