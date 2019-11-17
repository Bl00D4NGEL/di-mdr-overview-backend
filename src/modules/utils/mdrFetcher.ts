import Config from "../config";
import fetch from 'node-fetch';
import Utils from "./utils";

export default function setUpMdrFetcher() {
    fetchMdrFromWeb().then(() => console.log('Loading up MDR', new Date().toISOString()));

    setInterval(async () => {
        console.log('Reload MDR', new Date().toDateString());
        await fetchMdrFromWeb()
    }, Config.renewInterval);
}

async function fetchMdrFromWeb(): Promise<any> {
    const options = {
        headers: {
            'User-Agent': 'Firefox', // 'Bl00D4NGEL\' User-Agent',
            'X-Info': 'This request is done by the user Bl00D4NGEL, feel free to contact me on the forums or over e-mail: di-scraper (at) d-peters.com',
        },
        json: true,
    };
    const url = 'https://di.community/mdr/?as_data_structure';
    const utils = new Utils();

    return utils.WriteFile('data/mdr.json', await fetch(url, options).then(res => res.text()));
}
