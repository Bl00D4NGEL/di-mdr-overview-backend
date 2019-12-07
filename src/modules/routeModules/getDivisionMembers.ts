import {Request, Response} from "express";
import {loadMdrFromFile} from "../mdr/mdr";

export default function getDivisionMembers(req: Request, res: Response): void {
    res.send(
        loadMdrFromFile()
            .getDivisions()
            .filter(
                division => division.getName().toLowerCase() === req.params.divisionName.toLowerCase()
            )
            .map(division => division.getMembers())
    );
}
