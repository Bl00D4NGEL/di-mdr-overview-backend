import {loadMdrFromFile} from "../mdr/mdr";
import {Response} from "express";

export default function getMdr(undefined, res: Response): void {
    res.send(loadMdrFromFile());
}
