import {IMember} from "./member";
import {POSITIONS, PRIORITIES} from "./positions";
import {IMemberCollection} from "./memberCollection";
import {AWAY, PROBATION} from "./ranks";

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
    return positions.filter(position => [...POSITIONS, AWAY, PROBATION].includes(position));
}

function getMembersWithPosition(members: IMember[], position: string): IMember[] {
    if ([AWAY, PROBATION].includes(position)) {
        return members.filter(member => member.getRank() === position);
    }
    return members.filter(member => member.getPosition() === position);
}
