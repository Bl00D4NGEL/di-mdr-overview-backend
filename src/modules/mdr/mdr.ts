import {IMember} from "../member/member";
import {IHouse} from "../house/house";
import {IDivision} from "../division/division";
import Utils from "../utils/utils";
import serializeMdr from "../serializer/serializeMdr";


export interface IMdr {
    addHouse(a: IHouse): void;

    getHouses(): IHouse[];

    getHouseNames(): string[];

    getDivisions(): IDivision[];

    getDivisionNames(): string[];

    getMembers(): IMember[];
}

export default class Mdr implements IMdr {
    private houses: IHouse[] = [];

    addHouse(house: IHouse): void {
        this.houses.push(house);
    }

    getHouses(): IHouse[] {
        return this.houses;
    }

    getHouseNames(): string[] {
        return this.getHouses().map(house => house.getHouseName());
    }

    getDivisions(): IDivision[] {
        const divisions = [];
        this.getHouses().forEach(house => house.getDivisions().forEach(division => divisions.push(division)));
        return divisions;
    }

    getDivisionNames(): string[] {
        return this.getDivisions().map(division => division.getName());
    }

    getMembers(): IMember[] {
        const members = [];
        this.getHouses().forEach(house => house.getMembers().forEach(member => members.push(member)));
        return members;
    }
}

export function loadMdrFromFile(): IMdr {
    const fileName = 'data/mdr.json';
    const utils = new Utils();
    try {
        return serializeMdr(JSON.parse(utils.ReadFileSync(fileName)));
    }
    catch (e) {
        console.error(e);
    }
}
