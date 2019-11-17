import {IMember} from "../member/member";
import {
    POSITION_LONG_NAMES,
    POSITIONS,
    PRIORITIES
} from "../member/positions";
import {ITagListOutput} from "../tagListOutput/tagListOutput";

export default function tagListGenerator(members: IMember[], positions: string[], tagListOutput: ITagListOutput): string {
    if (!Array.isArray(discardInvalidPositions(positions)) || !Array.isArray(members)) {
        return '';
    }

    return discardInvalidPositions(positions)
        .sort((a, b) => PRIORITIES[a] - PRIORITIES[b])
        .map(position => tagListOutput.generateOutput(getMembersWithPosition(members, position), POSITION_LONG_NAMES[position]))
        .join('');
}

function discardInvalidPositions(positions: string[]): string[] {
    return positions.filter(position => POSITIONS.includes(position));
}

function getMembersWithPosition(members: IMember[], position: string): IMember[] {
    return members.filter(member => member.getPosition() === position);
}
