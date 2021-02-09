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
    const currentDate = new Date();
    const month = currentDate.getMonth() < 9 ? '0' + (currentDate.getMonth() + 1) : currentDate.getMonth() + 1;
    const day = currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate()
    const url = 'https://api.dmg-inc.com/reports/download/' + currentDate.getFullYear() + '/' + month + '/' + day;
    const utils = new Utils();

    fs.copyFileSync('data/report.csv', 'data/report_' + Date.now().toString() + '.csv');
    return utils.WriteFile(
        'data/report.csv',
        await fetch(url, options)
            .then(res => res.text())
    );
}
