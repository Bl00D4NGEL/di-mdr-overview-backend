import {Request, Response} from "express";
import {fetchMdrFromWeb} from "../utils/mdrFetcher";

export default function ForceReload(req: Request, res: Response): void {
    fetchMdrFromWeb().then(() => console.log('Forced reload'));
    res.send('Forced reload');
}