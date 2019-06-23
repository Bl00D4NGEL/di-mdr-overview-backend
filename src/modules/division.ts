import Team from "./team";
import Commander from "../memberTypes/commander";
import Vice from "../memberTypes/vice";

interface IDivision {
    teams: Array<Team>;
    commanders: Array<Commander>;
    vices: Array<Vice>;
    divisionName: string;
    add(a: any): void;
}

export default class Division implements IDivision {
    teams: Array<Team>;
    commanders: Array<Commander>;
    vices: Array<Vice>;
    divisionName: string;

    constructor() {
        this.teams = [];
        this.commanders = [];
        this.vices = [];
    }

    add(d: any): void {
        switch(d.constructor.name) {
            case 'Team':
                this.teams.push(d);
                break;
            case 'Vice':
                this.vices.push(d);
                break;
            case 'Commander':
                this.commanders.push(d);
                break;
            default:
                break;
        }
    }
}