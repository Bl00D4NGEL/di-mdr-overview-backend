import House from './house';
import Utils from './utils';
import * as fetch from 'node-fetch';
import Member from './memberTypes/member';

interface IMdr {
    houses: House[];
    add(a: any): void;
}

export default class Mdr implements IMdr {
    houses: House[];
    fileName: string = 'data/mdr.json';

    constructor(data?: any) {
        this.houses = [];
        if (data !== undefined) {
            this.parse(data);
        }
    }

    add(d: any): void {
        switch (d.constructor.name) {
            case 'House':
                this.houses.push(d);
                break;
            default:
                break;
        }
    }

    async getFromWeb(saveToFile?: boolean): Promise<any> {
        let data = await this.loadFromWeb();
        if (saveToFile) {
            this.splitter(data);
        }
        await this.parse(data);
        return data;
    }

    async loadFromWeb(): Promise<any> {
        let options = {
            headers: {
                'User-Agent': 'Firefox', // 'Bl00D4NGEL\' User-Agent',
                'X-Info': 'This request is done by the user Bl00D4NGEL, feel free to contact me on the forums',
            },
            json: true,
        };
        let url = 'https://di.community/mdr/?as_data_structure';

        let response = await fetch(url, options);
        let data = await response.text();
        return data;
    }

    async splitter(data?: string): Promise<any> {
        if (data === undefined) {
            data = await this.loadFromWeb();
        }
        let utils = new Utils();
        utils.WriteFile(this.fileName, data);
        let splitted = this.splitMdrData(data);
        this.saveSplittedMdrDataToFiles(splitted);
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

    splitMdrData(
        data: string,
    ): {
        houses: { name: string; value: string }[];
        divisions: { name: string; value: string }[];
    } {
        let returnObject = {
            houses: [],
            divisions: [],
        };
        try {
            let dataObject = JSON.parse(data);
            for (let houseName in dataObject) {
                if (houseName === 'Special') {
                    continue;
                }
                let house = dataObject[houseName];
                let houseObject = {
                    name: house.name.replace(/House - /i, '').toLowerCase(),
                    value: JSON.stringify(house),
                };
                returnObject.houses.push(houseObject);
                for (let divisionName in house.Divisions) {
                    let division = house.Divisions[divisionName];
                    let divisionObject = {
                        name: division.name.replace(/di-/i, '').toLowerCase(),
                        value: JSON.stringify(division),
                    };
                    returnObject.divisions.push(divisionObject);
                }
            }
        }
        catch (ex) {
            console.log(ex);
        }
        return returnObject;
    }

    saveSplittedMdrDataToFiles(data: {
        houses: { name: string; value: string }[];
        divisions: { name: string; value: string }[];
    }): void {
        let utils = new Utils();
        for (let i = 0; i < data.houses.length; i++) {
            let houseObject = data.houses[i];
            let houseFilename = 'data/house-' + houseObject.name + '.json';
            utils.WriteFile(houseFilename, houseObject.value);
        }
        for (let i = 0; i < data.divisions.length; i++) {
            let divisionObject = data.divisions[i];
            let divisionFilename = 'data/division-' + divisionObject.name + '.json';
            utils.WriteFile(divisionFilename, divisionObject.value);
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
        for (let houseName in dataAsJson) {
            if (houseName === 'Special') {
                continue; // Unassigned members w/o a division
            }
            let houseObject = new House(dataAsJson[houseName]);
            this.add(houseObject);
        }
    }
    
    getMembers(): Array<Member> {
      let members: Array<Member> = [];
      let membersAny: Array<any> = [];

      this.houses.map(house => {
        house = new House(house);
        members = members.concat(house.getMembers());
      });

      membersAny.map(x => {
        x = new Member(x);
        members.push(x);
      });
      return members;
    }
}
