import {IMember} from "../member/member";
import {ITeam} from "../team/team";
import {INcData} from "../ncData/ncData";

export interface IDivision {
    addTeam(team: ITeam): void;
    getTeams(): ITeam[];

    addDivisionLeader(commander: IMember): void;
    getDivisionLeaders(): IMember[];

    addDivisionVice(vice: IMember): void;
    getDivisionVices(): IMember[];

    setGame(name: string): void;
    getGame(): string;

    setName(name: string): void;
    getName(): string;

    isCompliant(): boolean;

    isSeedDivision(): boolean;
    setIsSeedDivision(isSeed: boolean): void;

    isSuperDivision(): boolean;
    setIsSuperDivision(isSuper: boolean): void;

    getMembers(): IMember[];

    setNcData(ncData: INcData): void;
    getNcData(): INcData;

    toJSON(): object;
}

export default class Division implements IDivision {
    private teams: ITeam[] = [];
    private divisionLeaders: IMember[] = [];
    private divisionVices: IMember[] = [];

    private ncData: INcData;
    private game: string;
    private name: string;

    private isSeed: boolean = false;
    private isSuper: boolean = false;

    addDivisionLeader(commander: IMember): void {
        this.divisionLeaders.push(commander);
    }

    getDivisionLeaders(): IMember[] {
        return this.divisionLeaders;
    }

    addTeam(team: ITeam): void {
        this.teams.push(team);
    }

    getTeams(): ITeam[] {
        return this.teams;
    }

    addDivisionVice(vice: IMember): void {
        this.divisionVices.push(vice);
    }

    getDivisionVices(): IMember[] {
        return this.divisionVices;
    }

    getMembers(): IMember[] {
        const members = this.divisionLeaders.concat(this.divisionVices);
        this.getTeams().forEach(team => team.getMembers().forEach(member => members.push(member)));
        return members;
    }

    getGame(): string {
        return this.game;
    }

    setGame(name: string): void {
        this.game = name;
    }

    setName(name: string) {
        this.name = name.toUpperCase();
    }

    getName(): string {
        return this.name;
    }

    isCompliant(): boolean {
        return this.ncData === undefined;
    }

    setIsSeedDivision(isSeed: boolean): void {
        this.isSeed = isSeed;
    }

    isSeedDivision(): boolean {
        return this.isSeed;
    }

    setIsSuperDivision(isSuper: boolean): void {
        this.isSuper = isSuper;
    }

    isSuperDivision(): boolean {
        return this.isSuper;
    }

    setNcData(ncData: INcData): void {
        this.ncData = ncData;
    }

    getNcData(): INcData {
        return this.ncData;
    }

    toJSON(): object {
        return {
            ...this,
            isCompliant: this.isCompliant()
        };
    }
}
