import {Request, Response} from 'express';
import Utils from '../utils/utils';
import {GetSerializedMdr} from "../utils/GetSerializedMdr";

interface RequestBody {
    divisions: string[],
    positions: string[],
    ranks: string[]
}

export default function getTagList(req: Request, res: Response): void {
    const {
        divisions,
        positions,
        ranks
    }: RequestBody = req.body;

    const membersToTag = GetSerializedMdr()
        .getDivisions()
        .filter(division => divisions.includes(division.getName()))
        .map(
            division => division.getMembers()
                .filter(member => positions.includes(member.getPosition()))
                .filter(member => ranks.includes(member.getRank()))
        );

    const utils = new Utils();
    utils.LogRequest({logPath: 'logs/getTagList.json', data: {divisions, positions, ranks, memberCount: membersToTag.length}});
    res.send(membersToTag);
}
