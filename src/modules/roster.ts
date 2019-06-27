import Member from '../memberTypes/member';
import Sub from '../memberTypes/sub';
import RosterLeader from '../memberTypes/rosterLeader';
import TeamLeader from '../memberTypes/teamLeader';
import SecondInCharge from '../memberTypes/secondInCharge';
import Commander from "../memberTypes/commander";
import Vice from "../memberTypes/vice";

interface IRoster {
    members: Array<Member>;
    subs: Array<Sub>;
    rls: Array<RosterLeader>;
    rosterName: string;
    count: number;
    mobileDevicesLinked: number;
    memberCount: number;
    initiateCount: number;
    associateCount: number;
    wardenCount: number;
    activeInLastFiveDays: number;
    isCompliant: boolean;

    add(a: any): void;
}

export default class Roster implements IRoster {
    members: Array<Member>;
    subs: Array<Sub>;
    rls: Array<RosterLeader>;
    rosterName: string;
    count: number;
    mobileDevicesLinked: number;
    memberCount: number;
    initiateCount: number;
    associateCount: number;
    wardenCount: number;
    activeInLastFiveDays: number;
    isCompliant: boolean;

    constructor(data?: any) {
        this.members = [];
        this.subs = [];
        this.rls = [];
        if (data !== undefined) {
            this.parse(data);
        }
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
                        let rl = new RosterLeader(d[i]);
                        this.add(rl);
                    }
                    break;
                case 'Members':
                    for (let i = 0; i < d.length; i++) {
                        let mem = new Member(d[i]);
                        this.add(mem);
                    }
                    break;
                case 'Subs':
                    for (let i = 0; i < d.length; i++) {
                        let sub = new Sub(d[i]);
                        this.add(sub);
                    }
                    break;
                default:
                    break;
            }
        }
    }

    generateTagListForRoles(roles: Array<string>): string {
        const roleMap = {
            "DC": Commander,
            "DV": Vice,
            "TL": TeamLeader,
            "2IC": SecondInCharge,
            "RL": RosterLeader,
            "TM": Member,
            "SUB": Sub
        };
        let sortedRoles = roles.sort(function(a, b) {
            return roleMap[b].priority - roleMap[a].priority;
        });
        let out: string = '<div><h3>'  + this.rosterName + '</h3>';
        
	    for (let i=0; i < sortedRoles.length; i++) {
            let role: string = sortedRoles[i];

            let vals: Array<Member> = [];
            switch(role) {
                case "RL":
                    vals = this.rls;
                    break;
                case "TM":
                    vals = this.members;
                    break;
                case "SUB":
                    vals = this.subs;
                    break;
                default:
                    continue;
            }
            
            if (vals.length > 0) {
                out += "<span class='role'>" + roleMap[role].roleLong + (vals.length > 1 ? 's (' + vals.length + ')' : '') + '</span><br>';
                for (let j = 0; j < vals.length; j++) {
                    let val = vals[j];
                    out += this.fillTagTemplate(val.id, val.name);
                }
                out += "<br>";
            }
        }
        out += "</div>";
        return out;
    }

    fillTagTemplate(id: number, name: string): string {
        let template = '<a href="https://di.community/profile/##id##-##name##/" contenteditable="false" data-ipshover="" data-ipshover-target="https://di.community/profile/##id##-##name##/?do=hovercard" data-mentionid="##id##">@##name##</a>&#8203;&#8203;&#8203;&#8203;&#8203;&#8203;&#8203&nbsp';
        return template.replace(/##id##/g, id.toString()).replace(/##name##/g, name);
    }
}