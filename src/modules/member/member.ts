import {AWAY, PROBATION} from "./ranks";

export interface IMember {
    setId(id: number): void;

    getId(): number;

    setDivision(division: string): void;

    getHouse(): string;

    setHouse(house: string): void;

    getDivision(): string;

    setTeam(team: string): void;

    getTeam(): string;

    setRoster(roster: string): void;

    getRoster(): string;

    getTeamAndRoster(): string;

    setName(name: string): void;

    getName(): string;

    setPosition(position: string): void;

    getPosition(): string;

    setRank(rank: string): void;

    getRank(): string;

    isAway(): boolean;

    isOnProbation(): boolean;

    toJSON(): object;

    getTag(): string;
}

export default class Member implements IMember {
    private name;
    private position;
    private rank;
    private id;

    private house;
    private division;
    private team;
    private roster;

    setId(id: number): void {
        this.id = id;
    }

    getId(): number {
        return this.id;
    }

    setName(name: string): void {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    setPosition(position: string): void {
        this.position = position;
    }

    getPosition(): string {
        return this.position;
    }

    setRank(rank: string): void {
        this.rank = rank;
    }

    getRank(): string {
        return this.rank;
    }

    isAway(): boolean {
        return this.getRank() === AWAY;
    }

    isOnProbation(): boolean {
        return this.getRank() === PROBATION;
    }

    toJSON(): object {
        return {
            ...this,
            isAway: this.isAway(),
            isOnProbation: this.isOnProbation()
        };
    }

    getTag(): string {
        const tagFiller: string = '&#8203;&#8203;&#8203;&#8203;&#8203;&#8203;&#8203&nbsp;';
        return '<a href="' + this.getProfileLink() +
            '" contenteditable="false" data-ipshover="" data-ipshover-target="' +
            this.getProfileLink() + '/?do=hovercard" data-mentionid="' +
            this.getId().toString() + '">@' + this.name + '</a>' + tagFiller;
    }

    private getProfileLink(): string {
        return "https://di.community/profile/" + this.getId().toString() + '-' + this.name + "/";
    }

    setHouse(house: string): void {
        this.house = house;
    }

    getHouse(): string {
        return this.house;
    }

    setDivision(division: string): void {
        this.division = division;
    }

    getDivision(): string {
        return this.division;
    }

    setTeam(team: string): void {
        this.team = team;
    }

    getTeam(): string {
        return this.team;
    }

    setRoster(roster: string): void {
        this.roster = roster;
    }

    getRoster(): string {
        return this.roster;
    }

    getTeamAndRoster(): string {
        return this.getTeam() + " " + this.getRoster();
    }
}
