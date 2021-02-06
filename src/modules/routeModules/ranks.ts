import {Request, Response} from "express";
import {GetSerializedMdr} from "../utils/GetSerializedMdr";

export default function Ranks(req: Request, res: Response): void {
    const ranks: string[] = [];
    GetSerializedMdr().getMembers().forEach(member => {
        if (!ranks.includes(member.getRank())) {
            ranks.push(member.getRank())
        }
    });
    res.send(ranks);
}