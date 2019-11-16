import {IMember} from "../member/member";
import {IHouse} from "../house/house";

export interface IMdr {
    addHouse(a: IHouse): void;
    getHouses(): IHouse[];

    getMembers(): IMember[];
}

export default class Mdr implements IMdr{
    private houses: IHouse[] = [];

    addHouse(house: IHouse): void {
        this.houses.push(house);
    }

    getHouses(): IHouse[] {
        return this.houses;
    }

    getMembers(): IMember[] {
        const members = [];
        this.getHouses().forEach(house => house.getMembers().forEach(member => members.push(member)));
        return members;
    }
}
