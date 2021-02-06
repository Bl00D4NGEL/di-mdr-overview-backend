import {Request, Response} from "express";
import {GetSerializedMdr} from "../utils/GetSerializedMdr";

export function Positions(req: Request, res: Response): void {
    const positions: string[] = [];
    GetSerializedMdr().getMembers().forEach(member => {
        if (!positions.includes(member.getPosition())) {
            positions.push(member.getPosition())
        }
    });
    res.send(positions);
}