import Member from './memberTypes/member';
import Sub from './memberTypes/sub';
import RosterLeader from './memberTypes/rosterLeader';

export const rosterRoles: string[] = [RosterLeader.roleShort, Member.roleShort, Sub.roleShort];

export default class Roster {
    members: Member[] = [];
    subs: Sub[] = [];
    rls: RosterLeader[] = [];
    rosterName: string = '';
    count: number = 0;
    mobileDevicesLinked: number = 0;
    memberCount: number = 0;
    initiateCount: number = 0;
    associateCount: number = 0;
    wardenCount: number = 0;
    activeInLastFiveDays: number = 0;
    isCompliant: boolean = false;

    constructor(data?: any) {
        this.members = [];
        this.subs = [];
        this.rls = [];
        if (data !== undefined) {
            this.parse(data);
        }
        this.getRoleValues = this.getRoleValues.bind(this);
    }

    addMember(member: Member): void {
        this.members.push(member);
    }

    addSub(sub: Sub): void {
        this.subs.push(sub);
    }

    addRosterLeader(rosterLeader: RosterLeader): void {
        this.rls.push(rosterLeader);
    }

    parse(data: any): void {
        let dataAsJson;
        if (typeof data === 'string') {
            try {
                dataAsJson = JSON.parse(data);
            }
            catch (ex) {
                return ex;
            }
        }
        else {
            dataAsJson = data;
        }
        for (let key in dataAsJson) {
            const d = dataAsJson[key];
            switch (key) {
                case 'Count':
                    this.count = d;
                    break;
                case 'Mobile-Device-Linked-Count':
                    this.mobileDevicesLinked = d;
                    break;
                case 'Warden-Count':
                    this.wardenCount = d;
                    break;
                case 'Active-In-Last-5-Days-Count':
                    this.activeInLastFiveDays = d;
                    break;
                case 'Member-Count':
                    this.memberCount = d;
                    break;
                case 'Initiate-Count':
                    this.initiateCount = d;
                    break;
                case 'Associate-Count':
                    this.associateCount = d;
                    break;
                case 'name':
                    this.rosterName = d;
                    break;
                case 'Compliant':
                    this.isCompliant = d;
                    break;
                case 'RL':
                    for (let i = 0; i < d.length; i++) {
                        this.addRosterLeader(new RosterLeader(d[i]));
                    }
                    break;
                case 'Members':
                    for (let i = 0; i < d.length; i++) {
                        this.addMember(new Member(d[i]));
                    }
                    break;
                case 'Subs':
                    for (let i = 0; i < d.length; i++) {
                        this.addSub(new Sub(d[i]));
                    }
                    break;
                default:
                    if (typeof this[key] !== undefined) {
                        this[key] = d;
                    }
                    else {
                        console.log("???", d, key, this[key]);
                    }
                    break;
            }
        }
    }

    getRoleValues(role: string): Member[] {
        switch (role) {
            case 'RL':
                return this.rls;
            case 'TM':
                return this.members;
            case 'SUB':
                return this.subs;
            default:
                return [];
        }
    }

    getMembers(): Array<Member> {
        return this.rls
            .concat(this.members)
            .concat(this.subs);
    }
}
