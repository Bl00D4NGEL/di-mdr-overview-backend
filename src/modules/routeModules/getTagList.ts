import { IMdr, loadMdrFromFile } from '../mdr/mdr';
import { Request, Response } from 'express';
import TagListOutputWeb from '../tagListOutput/tagListOutputWeb';
import positionGrouper from '../member/positionGrouper';
import Utils from '../utils/utils';

export default function getTagList(req: Request, res: Response): void {
    const body = req.body;
    const requestedDivisions = body.divisions;
    const roles = body.roles;

    const utils = new Utils();
    utils.LogRequest({logPath: 'logs/getTagList.json', requestedDivisions, roles });

    if (!Array.isArray(requestedDivisions)) {
        console.log(requestedDivisions);
        res.send('Invalid divisions sent');
        return;
    }
    if (!Array.isArray(roles)) {
        res.send('Invalid roles sent');
        return;
    }

    const mdr: IMdr = loadMdrFromFile();
    const toLoadDivisions = mdr
        .getDivisions()
        .filter(division =>
            requestedDivisions.map(div => div.toLowerCase()).includes(division.getName().toLowerCase()),
        );
    if (toLoadDivisions.length === 0) {
        res.send('Requested divisions do not exist');
        return;
    }

    const toLoadMembers = [];
    toLoadDivisions.forEach(division => division.getMembers().forEach(member => toLoadMembers.push(member)));
    if (toLoadMembers.length === 0) {
        res.send('Requested divisions do not have members to tag');
        return;
    }
    const output = new TagListOutputWeb();
    res.send(output.generate(positionGrouper(roles, toLoadMembers)));
}
