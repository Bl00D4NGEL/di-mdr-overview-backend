import {Request, Response} from "express";
import {GetSerializedMdrCsv} from "../utils/GetSerializedMdr";

export default function Positions(req: Request, res: Response): void {
    const positions: string[] = [];
    GetSerializedMdrCsv().getMembers().forEach(member => {
        if (!positions.includes(member.getPosition())) {
            positions.push(member.getPosition())
        }
    });
    res.send(positions);
}