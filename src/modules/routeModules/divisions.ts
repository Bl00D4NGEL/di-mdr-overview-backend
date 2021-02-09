import {Request, Response} from "express";
import {GetSerializedMdrCsv} from "../utils/GetSerializedMdr";

export default function Divisions(req: Request, res: Response): void {
    const divisionNames: string[] = [];
    GetSerializedMdrCsv().getDivisions().forEach(division => {
        if (!divisionNames.includes(division.getName())) {
            divisionNames.push(division.getName());
        }
    });
    res.send(divisionNames);
}