import Config from "../config";
import fetch from 'node-fetch';
import Utils from "./utils";
import * as fs from "fs";

export default function setUpMdrFetcher() {
    fetchMdrFromWeb().then(() => console.log('Loading up MDR', new Date().toISOString()));

    setInterval(async () => {
        console.log('Reload MDR', new Date().toDateString());
        await fetchMdrFromWeb()
    }, Config.renewInterval);
}

export async function fetchMdrFromWeb(): Promise<any> {
    const options = {
        headers: {
            'User-Agent': 'Firefox',
            'X-Info': 'This request is done by the user Bl00D4NGEL, feel free to contact me over e-mail: di-scraper (at) d-peters.com',
        },
        json: true,
    };
    const url = 'https://oldmdr.dmginc.gg/?as_data_structure';
    const utils = new Utils();

    fs.copyFileSync('data/mdr.json', 'data/mdr_' + Date.now().toString() + '.json');
    return utils.WriteFile(
        'data/mdr.json',
        await fetch(url, options)
            .then(res => res.json())
            .then(x => JSON.stringify(x))
    );
}
