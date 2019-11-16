import {IMember} from "../member/member";
import {IDivision} from "../division/division";
import {INcData} from "../ncData/ncData";

export interface IHouse {
    addDivision(division: IDivision): void;
    getDivisions(): IDivision[];

    addHouseGeneral(houseGeneral: IMember): void;
    getHouseGenerals(): IMember[];

    addFirstCommander(firstCommander: IMember): void;
    getFirstCommanders(): IMember[];

    getMembers(): IMember[];

    setHouseName(houseName: string): void;
    getHouseName(): string;

    isCompliant(): boolean;

    setNcData(ncData: INcData): void;
    getNcData(): INcData;

    toJSON(): object;
}

export default class House implements IHouse{
    private divisions: IDivision[] = [];
    private houseGenerals: IMember[] = [];
    private firstCommanders: IMember[] = [];

    private houseName: string;
    private ncData: INcData;

    addDivision(division: IDivision): void {
        this.divisions.push(division);
    }

    getDivisions(): IDivision[] {
        return this.divisions;
    }

    addFirstCommander(firstCommander: IMember): void {
        this.firstCommanders.push(firstCommander);
    }

    getFirstCommanders(): IMember[] {
        return this.firstCommanders;
    }

    addHouseGeneral(houseGeneral: IMember): void {
        this.houseGenerals.push(houseGeneral);
    }

    getHouseGenerals(): IMember[] {
        return this.houseGenerals;
    }

    getMembers(): IMember[] {
        const members = [];
        this.getDivisions().forEach(division => division.getMembers().forEach(member => members.push(member)));
        return members;
    }

    setHouseName(houseName: string = ''): void {
        this.houseName = houseName;
    }

    getHouseName(): string {
        return this.houseName;
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
