import {IMdr, loadMdrFromFile} from "../mdr/mdr";
import tagListGenerator from "../tagListGenerator/tagListGenerator";
import TagListOutputWeb from "../tagListOutput/tagListOutputWeb";
import {Request, Response} from "express";

export default function getTagList(req: Request, res: Response): void {
    const body = req.body;
    const requestedDivisions = body.divisions;
    const roles = req.body.roles;

    if (!Array.isArray(requestedDivisions) || !Array.isArray(roles)) {
        res.send('Invalid divisions or roles sent');
        return;
    }

    const mdr: IMdr = loadMdrFromFile();
    const toLoadDivisions = mdr.getDivisions().filter(division => requestedDivisions.includes(division.getName().toLowerCase()));
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
    res.send(tagListGenerator(toLoadMembers, roles, new TagListOutputWeb()));
}
