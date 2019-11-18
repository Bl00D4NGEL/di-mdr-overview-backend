import {IMember} from "./member";
import {POSITIONS, PRIORITIES} from "./positions";
import {IMemberCollection} from "./memberCollection";

export default function positionGrouper(positions: string[], members: IMember[]): IMemberCollection {
    const collection: IMemberCollection = {};
    discardInvalidPositions(positions)
        .sort((a, b) => PRIORITIES[a] - PRIORITIES[b])
        .forEach(position => {
            collection[position] = getMembersWithPosition(members, position);
        });
    return collection;
}

function discardInvalidPositions(positions: string[]): string[] {
    return positions.filter(position => POSITIONS.includes(position));
}

function getMembersWithPosition(members: IMember[], position: string): IMember[] {
    return members.filter(member => member.getPosition() === position);
}
