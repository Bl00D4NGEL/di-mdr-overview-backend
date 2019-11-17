import {IMember} from "../member/member";
import {INcData} from "../ncData/ncData";

export interface IRoster {
    addRosterLeader(rosterLeader: IMember): void;

    getRosterLeaders(): IMember[];

    addMember(member: IMember): void;
    addAddition(addition: IMember): void;

    getMembers(): IMember[];
    getAdditions(): IMember[];

    isCompliant(): boolean;

    setNcData(ncData: INcData): void;

    getNcData(): INcData;

    setName(name: string): void;

    getName(): string;

    toJSON(): object;
}

export default class Roster implements IRoster {
    private rosterLeaders: IMember[] = [];
    private members: IMember[] = [];
    private additions: IMember[] = [];

    private name: string;
    private ncData: INcData;

    addMember(member: IMember): void {
        this.members.push(member);
    }

    addAddition(addition: IMember): void {
        this.additions.push(addition);
    }

    getAdditions(): IMember[] {
        return this.additions;
    }

    getMembers(): IMember[] {
        return this.members.concat(this.rosterLeaders);
    }

    addRosterLeader(rosterLeader: IMember): void {
        this.rosterLeaders.push(rosterLeader);
    }

    getRosterLeaders(): IMember[] {
        return this.rosterLeaders;
    }

    isCompliant(): boolean {
        return this.ncData === undefined;
    }

    setName(name: string): void {
        this.name = name;
    }

    getName(): string {
        return this.name;
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
