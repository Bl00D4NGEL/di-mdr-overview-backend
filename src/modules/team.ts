import TeamLeader from '../memberTypes/teamLeader';
import SecondInCharge from '../memberTypes/secondInCharge';
import Roster from './roster';

interface ITeam {
    rosters: Array<Roster>;
    tls: Array<TeamLeader>;
    twoics: Array<SecondInCharge>;
    teamName: string;
    reputation: number;
    post: number;
    count: number;
    mobileDevicesLinked: number;
    memberCount: number;
    initiateCount: number;
    associateCount: number;
    wardenCount: number;
    officerCount: number;
    activeInLastFiveDays: number;
    isCompliant: boolean;
    isCasualTeam: boolean;

    add(a: any): void;
}

export default class Team implements ITeam {
    rosters: Array<Roster>;
    tls: Array<TeamLeader>;
    twoics: Array<SecondInCharge>;
    teamName: string;
    isCasual: boolean;
    reputation: number;
    post: number;
    count: number;
    mobileDevicesLinked: number;
    memberCount: number;
    initiateCount: number;
    associateCount: number;
    wardenCount: number;
    officerCount: number;
    activeInLastFiveDays: number;
    isCompliant: boolean;
    isCasualTeam: boolean;

    constructor(data?: any) {
        this.rosters = [];
        this.tls = [];
        this.twoics = [];
        if (data !== undefined) {
            this.parse(data);
        }
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
                        let tl = new TeamLeader(d[i]);
                        this.add(tl);
                    }
                    break;
                case '2IC':
                    for (let i = 0; i < d.length; i++) {
                        let secondInCharge = new SecondInCharge(d[i]);
                        this.add(secondInCharge);
                    }
                    break;
                case 'Rosters':
                    for (let rosterName in d) {
                        let roster = new Roster(d[rosterName]);
                        this.add(roster);
                    }
                    break;
                default:
                    break;
            }
        }
    }
}