import House from './house';
import Utils from './utils';
import * as fetch from 'node-fetch';

interface IMdr {
    houses: Array<House>;
    add(a: any): void;
}

export default class Mdr implements IMdr {
    houses: Array<House>;
    fileName: string = "data/mdr.json";

    constructor(data?: any) {
        this.houses = [];
        if (data !== undefined) {
            this.parse(data);
        }
    }

    add(d: any): void {
        switch(d.constructor.name) {
            case 'House':
                this.houses.push(d);
                break;
            default:
                break;
        }
    }

	async getFromWeb(): Promise<any> {
		let options = {
			headers: {
				'User-Agent': 'Firefox', // 'Bl00D4NGEL\' User-Agent',
				'X-Info': 'This request is done by the user Bl00D4NGEL, feel free to contact me on the forums',
			},
			json: true,
		};
		let url = 'https://di.community/mdr?as_data_structure';
		return await fetch(url, options);
    }
    
    async getFromFile(): Promise<any> {
        let utils = new Utils();
        let data = {};
		try {
			data = await utils.ReadFile(this.fileName);
            this.parse(data);
		}
		catch (ex) {
			console.error(ex);
        }
		return;
    }

    async saveToFile(): Promise<any> {
        let fileName = "data/mdr.json";
        console.log("Saving...", this);
        let utils = new Utils();
		try {
			await utils.WriteFile(fileName, JSON.stringify(this));
		}
		catch (ex) {
			console.error(ex);
        }
    }

    parse(data: any): void {
        let dataAsJson;
        if (typeof data === 'string') {
            try {
                dataAsJson = JSON.parse(data);
            }
            catch (ex) {
                return ex;
            }
        }
        else {
            dataAsJson = data;
        }
        for (let house in dataAsJson) {
            if (house === 'Special') {
                continue; // Unassigned members w/o a division
            }
            let houseObject = new House(dataAsJson[house]);
            console.log("Adding", houseObject);
            this.add(houseObject);
        }
    }
}