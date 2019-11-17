import {loadMdrFromFile} from "../mdr/mdr";
import {Response} from "express";

export default function getDivisionNames(undefined, res: Response): void {
    res.send(loadMdrFromFile().getDivisionNames().sort());
    return;
}
