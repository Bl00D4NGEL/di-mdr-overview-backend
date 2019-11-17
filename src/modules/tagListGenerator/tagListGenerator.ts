import {IMember} from "../member/member";
import {
    POSITION_LONG_NAMES,
    POSITIONS,
    PRIORITIES
} from "../member/positions";

export default function tagListGenerator(members: IMember[], positions: string[]): string {
    if (!Array.isArray(discardInvalidPositions(positions)) || !Array.isArray(members)) {
        return '';
    }

    return discardInvalidPositions(positions)
        .sort((a, b) => PRIORITIES[a] - PRIORITIES[b])
        .map(position => generateTagList(getMembersWithPosition(members, position), POSITION_LONG_NAMES[position]))
        .join('');
}

function generateTagList(members: IMember[], headingText: string): string {
    if (Array.isArray(members) && members.length > 0) {
        return '<div>' +
            '<h2>' + headingText + (members.length > 1 ? 's': '') + '</h2>' +
            members.map(member => member.getTag()).join(' ') +
            '</div>'
    }
    return '';
}

function discardInvalidPositions(positions: string[]): string[] {
    return positions.filter(position => POSITIONS.includes(position));
}

function getMembersWithPosition(members: IMember[], position: string): IMember[] {
    return members.filter(member => member.getPosition() === position);
}