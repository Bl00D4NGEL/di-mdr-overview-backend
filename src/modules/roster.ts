import Member from '../memberTypes/member';
import Sub from '../memberTypes/sub';
import RosterLeader from '../memberTypes/rosterLeader';

interface IRoster {
    members: Array<Member>;
    subs: Array<Sub>;
    rls: Array<RosterLeader>;
    rosterName: string;
    add(a: any): void;
}

export default class Roster implements IRoster {
    members: Array<Member>;
    subs: Array<Sub>;
    rls: Array<RosterLeader>;
    rosterName: string;

    constructor() {
        this.members = [];
        this.subs = [];
        this.rls = [];
    }

    add(d: any): void {
        switch(d.constructor.name) {
            case 'Member':
                this.members.push(d);
                break;
            case 'Sub':
                this.subs.push(d);
                break;
            case 'RosterLeader':
                this.rls.push(d);
                break;
            default:
                break;
        }
    }
}