import {loadMdrFromFile} from "../mdr/mdr";
import {Request, Response} from "express";

export default function getHouse(req: Request, res: Response): void {
    res.send(loadMdrFromFile().getHouses().filter(house => house.getHouseName().toLowerCase().replace("house - ", "") === req.params.houseName.toLowerCase()));
}
