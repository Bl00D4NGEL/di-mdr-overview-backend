import {Request, Response} from "express";
import {loadMdrFromFile} from "../mdr/mdr";

export default function getDivision(req: Request, res: Response): void {
    res.send(loadMdrFromFile().getDivisions().filter(division => division.getName().toLowerCase() === req.params.divisionName.toLowerCase()));
}
