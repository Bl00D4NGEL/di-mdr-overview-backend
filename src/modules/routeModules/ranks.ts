import {Request, Response} from "express";
import {GetSerializedMdrCsv} from "../utils/GetSerializedMdr";

export default function Ranks(req: Request, res: Response): void {
    const ranks: string[] = [];
    GetSerializedMdrCsv().getMembers().forEach(member => {
        if (member.getRank() !== 'Inactive' && !ranks.includes(member.getRank())) {
            ranks.push(member.getRank())
        }
    });
    res.send(ranks);
}