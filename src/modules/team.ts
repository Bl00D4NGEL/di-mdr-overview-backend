import RosterLeader from '../memberTypes/rosterLeader';
import TeamLeader from '../memberTypes/teamLeader';
import SecondInCharge from '../memberTypes/secondInCharge';
import Roster from './roster';

interface ITeam {
    rosters: Array<Roster>;
    tls: Array<TeamLeader>;
    twoics: Array<SecondInCharge>;
    teamName: string;
    add(a: any): void;
}

export default class Team implements ITeam {
    rosters: Array<Roster>;
    tls: Array<TeamLeader>;
    twoics: Array<SecondInCharge>;
    teamName: string;

    constructor() {
        this.rosters = [];
        this.tls = [];
        this.twoics = [];
    }

    add(d: any): void {
        switch(d.constructor.name) {
            case 'Roster':
                this.rosters.push(d);
                break;
            case 'TeamLeader':
                this.tls.push(d);
                break;
            case 'SecondInCharge':
                this.twoics.push(d);
                break;
            default:
                break;
        }
    }
}