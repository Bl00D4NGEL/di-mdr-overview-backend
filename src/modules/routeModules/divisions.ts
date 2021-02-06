import {Request, Response} from "express";
import {GetSerializedMdr} from "../utils/GetSerializedMdr";

export function Divisions(req: Request, res: Response): void {
    const divisionInfo: string[] = [];
    GetSerializedMdr().getDivisions().forEach(division => {
        divisionInfo.push(division.getName());
    });
    res.send(divisionInfo);
}