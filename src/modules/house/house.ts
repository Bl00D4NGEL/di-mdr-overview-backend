import {IMember} from "../member/member";
import {IDivision} from "../division/division";
import {INcData} from "../ncData/ncData";

export interface IHouse {
    addDivision(division: IDivision): void;
    getDivisions(): IDivision[];

    addHouseLeader(houseGeneral: IMember): void;
    getHouseLeaders(): IMember[];

    addHouseVice(firstCommander: IMember): void;
    getHouseVices(): IMember[];

    getMembers(): IMember[];

    setHouseName(houseName: string): void;
    getHouseName(): string;
    getHouseNameShort(): string

    isCompliant(): boolean;

    setNcData(ncData: INcData): void;
    getNcData(): INcData;

    toJSON(): object;
}

export default class House implements IHouse{
    private divisions: IDivision[] = [];
    private houseLeaders: IMember[] = [];
    private houseVices: IMember[] = [];

    private houseName: string;
    private ncData: INcData;

    addDivision(division: IDivision): void {
        this.divisions.push(division);
    }

    getDivisions(): IDivision[] {
        return this.divisions.filter(division => division.getName().startsWith('DI-'));
    }

    addHouseVice(firstCommander: IMember): void {
        this.houseVices.push(firstCommander);
    }

    getHouseVices(): IMember[] {
        return this.houseVices;
    }

    addHouseLeader(houseGeneral: IMember): void {
        this.houseLeaders.push(houseGeneral);
    }

    getHouseLeaders(): IMember[] {
        return this.houseLeaders;
    }

    getMembers(): IMember[] {
        const members = this.houseLeaders.concat(this.houseVices);
        this.getDivisions().forEach(division => division.getMembers().forEach(member => members.push(member)));
        return members;
    }

    setHouseName(houseName: string = ''): void {
        this.houseName = houseName;
    }

    getHouseName(): string {
        return this.houseName;
    }

    getHouseNameShort(): string {
        return this.houseName.replace('House - ', '')
    }

    isCompliant(): boolean {
        return this.getNcData() === undefined;
    }

    getNcData(): INcData {
        return this.ncData;
    }

    setNcData(ncData: INcData): void {
        this.ncData = ncData;
    }

    toJSON(): object {
        return {
            ...this,
            isCompliant: this.isCompliant()
        };
    }
}
