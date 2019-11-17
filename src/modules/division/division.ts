import {IMember} from "../member/member";
import {ITeam} from "../team/team";
import {INcData} from "../ncData/ncData";

export interface IDivision {
    addTeam(team: ITeam): void;
    getTeams(): ITeam[];

    addCommander(commander: IMember): void;
    getCommanders(): IMember[];

    addVice(vice: IMember): void;
    getVices(): IMember[];

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
    private commanders: IMember[] = [];
    private vices: IMember[] = [];

    private ncData: INcData;
    private game: string;
    private name: string;

    private isSeed: boolean = false;
    private isSuper: boolean = false;

    addCommander(commander: IMember): void {
        this.commanders.push(commander);
    }

    getCommanders(): IMember[] {
        return this.commanders;
    }

    addTeam(team: ITeam): void {
        this.teams.push(team);
    }

    getTeams(): ITeam[] {
        return this.teams;
    }

    addVice(vice: IMember): void {
        this.vices.push(vice);
    }

    getVices(): IMember[] {
        return this.vices;
    }

    getMembers(): IMember[] {
        const members = this.commanders.concat(this.vices);
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
