import {IMember} from "../member/member";
import {IRoster} from "../roster/roster";
import {INcData} from "../ncData/ncData";

export interface ITeam {
    addRoster(roster: IRoster): void;
    getRosters(): IRoster[];

    addTeamLeader(teamLeader: IMember): void;
    getTeamLeaders(): IMember[];

    addSecondInCharge(secondInCharge: IMember): void;
    getSecondInCharges(): IMember[];

    addOnAway(awayMember: IMember): void;
    getOnAways(): IMember[];

    addOnProbation(probationMember: IMember): void;
    getOnProbations(): IMember[];

    isCompliant(): boolean;

    isCasualTeam(): boolean;
    setIsCasualTeam(isCasual: boolean): void;

    getName(): string;
    setName(name: string): void;

    getMembers(): IMember[];

    setNcData(ncData: INcData): void;
    getNcData(): INcData;

    toJSON(): object;
}

export default class Team implements ITeam {
    private rosters: IRoster[] = [];
    private teamLeaders: IMember[] = [];
    private secondInCharges: IMember[] = [];

    private onAways: IMember[] = [];
    private onProbations: IMember[] = [];

    private isCasual: boolean = false;
    private name: string;
    private ncData: INcData;

    addRoster(roster: IRoster): void {
        this.rosters.push(roster);
    }

    getRosters(): IRoster[] {
        return this.rosters;
    }

    addSecondInCharge(secondInCharge: IMember): void {
        this.secondInCharges.push(secondInCharge);
    }

    getSecondInCharges(): IMember[] {
        return this.secondInCharges;
    }

    addTeamLeader(teamLeader: IMember): void {
        this.teamLeaders.push(teamLeader);
    }

    getTeamLeaders(): IMember[] {
        return this.teamLeaders;
    }

    getMembers(): IMember[] {
        const members = this.teamLeaders
            .concat(this.secondInCharges)
            .concat(this.onAways)
            .concat(this.onProbations);
        this.getRosters().forEach(roster => roster.getMembers().forEach(member => members.push(member)));
        return members;
    }

    isCompliant(): boolean {
        return this.ncData === undefined;
    }

    isCasualTeam(): boolean {
        return this.isCasual;
    }

    setIsCasualTeam(isCasual: boolean): void {
        this.isCasual = isCasual;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }

    setNcData(ncData: INcData): void {
        this.ncData = ncData;
    }

    getNcData(): INcData {
        return this.ncData;
    }

    addOnAway(awayMember: IMember): void {
        this.onAways.push(awayMember);
    }

    getOnAways(): IMember[] {
        return this.onAways;
    }

    addOnProbation(probationMember: IMember): void {
        this.onProbations.push(probationMember);
    }

    getOnProbations(): IMember[] {
        return this.onProbations;
    }

    toJSON(): object {
        return {
            ...this,
            isCompliant: this.isCompliant()
        };
    }
}
