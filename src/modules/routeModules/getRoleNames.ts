import {Response} from "express";
import {POSITIONS} from "../member/positions";
import {AWAY, INITIATE, PROBATION} from "../member/ranks";

export default function getRoleNames(undefined, res: Response): void {
    res.send([
        ...POSITIONS,
        AWAY,
        PROBATION,
        INITIATE
    ]);
}
