import {AWAY, PROBATION} from "./ranks";

export interface IMember {
    setId(id: number): void;
    getId(): number;

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

}
