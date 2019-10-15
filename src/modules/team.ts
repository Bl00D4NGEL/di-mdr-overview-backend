import TeamLeader from './memberTypes/teamLeader';
import SecondInCharge from './memberTypes/secondInCharge';
import Roster, { rosterRoles } from './roster';
import Member from './memberTypes/member';

export const teamRoles: string[] = [TeamLeader.roleShort, SecondInCharge.roleShort].concat(rosterRoles);

export default class Team {
    rosters: Roster[] = [];
    tls: TeamLeader[] = [];
    twoics: SecondInCharge[] = [];
    onAway: Member[] = [];
    onProbation: Member[] = [];
    teamName: string = '';
    isCasual: boolean = false;
    reputation: number = 0;
    post: number = 0;
    count: number = 0;
    mobileDevicesLinked: number = 0;
    memberCount: number = 0;
    initiateCount: number = 0;
    associateCount: number = 0;
    wardenCount: number = 0;
    officerCount: number = 0;
    activeInLastFiveDays: number = 0;
    isCompliant: boolean = false;
    isCasualTeam: boolean = false;

    constructor(data?: any) {
        this.rosters = [];
        this.tls = [];
        this.twoics = [];
        if (data !== undefined) {
            this.parse(data);
        }
        this.getRoleValues = this.getRoleValues.bind(this);
    }

    addRoster(roster: Roster): void {
        this.rosters.push(roster);
    }

    addTeamLeader(teamLeader: TeamLeader): void {
        this.tls.push(teamLeader);
    }

    addSecondInCharge(secondInCharge: SecondInCharge): void {
        this.twoics.push(secondInCharge);
    }

    addProbation(member: Member): void {
        this.onProbation.push(member);
    }

    addAway(member: Member): void {
        this.onAway.push(member);
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
            let d = dataAsJson[key];
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
                case 'rep':
                    this.reputation = d;
                    break;
                case 'posts':
                    this.post = d;
                    break;
                case 'Officer-Count':
                    this.officerCount = d;
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
                    this.teamName = d;
                    break;
                case 'Compliant':
                    this.isCompliant = d;
                    break;
                case 'isCasual':
                    this.isCasualTeam = d;
                    break;
                case 'TL':
                    for (let i = 0; i < d.length; i++) {
                        this.addTeamLeader(new TeamLeader(d[i]));
                    }
                    break;
                case '2IC':
                    for (let i = 0; i < d.length; i++) {
                        this.addSecondInCharge(new SecondInCharge(d[i]));
                    }
                    break;
                case 'Rosters':
                    for (let rosterName in d) {
                        this.addRoster(new Roster(d[rosterName]));
                    }
                    break;
                case 'OnAway':
                    for (let i = 0; i < d.length; i++) {
                        this.addAway(new Member(d[i]));
                    }
                    break;
                case 'Probation':
                    for (let i = 0; i < d.length; i++) {
                        this.addProbation(new Member(d[i]));
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

    getRoleValues(role: string) {
        switch (role) {
            case 'TL':
                return this.tls;
            case '2IC':
                return this.twoics;
            default:
                return [];
        }
    }

    getMembers(): Array<Member> {
        const members: Array<Member> = [];

        this.onAway.concat(this.onProbation).concat(this.tls).concat(this.twoics).forEach(member => members.push(member));

        this.rosters.forEach(
            roster => roster.getMembers().forEach(member => members.push(member))
        );

        return members;
    }
}
