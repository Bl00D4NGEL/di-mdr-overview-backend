import {loadMdrFromFile} from "../mdr/mdr";
import {Request, Response} from "express";

export default function getDivisionNames(req: Request, res: Response): void {
    if (req.query.houseName !== undefined) {
        const responseDivisions = [];
        loadMdrFromFile()
            .getHouses()
            .filter(
                house => req.query.houseName
                    .toLowerCase()
                    .split(';')
                    .includes(house.getHouseNameShort().toLowerCase())
            )
            .forEach(
                house => {
                    house.getDivisions().forEach(division => responseDivisions.push(division.getName()));
                }
            );
        res.send(responseDivisions);
        return;
    }
    res.send(loadMdrFromFile().getDivisionNames().sort());
    return;
}
