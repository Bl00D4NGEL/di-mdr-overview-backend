import {Request, Response} from 'express';
import Utils from '../utils/utils';
import {GetSerializedMdrCsv} from "../utils/GetSerializedMdr";

interface RequestBody {
    divisions: string[],
    positions: string[],
    ranks: string[]
}

export default function GenerateTagList(req: Request, res: Response): void {
    const {
        divisions,
        positions,
        ranks
    }: RequestBody = req.body;

    const membersToTag = [];
    GetSerializedMdrCsv()
        .getDivisions()
        .filter(division => divisions.includes(division.getName()))
        .forEach(
            division => division.getMembers()
                .filter(member => positions.includes(member.getPosition()))
                .filter(member => ranks.includes(member.getRank()))
                .forEach(member => membersToTag.push(member))
        );

    const utils = new Utils();
    utils.LogRequest({
        logPath: 'logs/getTagList.json',
        divisions,
        positions,
        ranks,
        memberCount: membersToTag.length
    }).catch(error => console.error('Something went wrong when logging the request: ', error));
    res.send(membersToTag);
}
