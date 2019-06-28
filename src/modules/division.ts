import Team from './team';
import Commander from './memberTypes/commander';
import Vice from './memberTypes/vice';
import Utils from './utils';
import TeamLeader from './memberTypes/teamLeader';
import SecondInCharge from './memberTypes/secondInCharge';
import RosterLeader from './memberTypes/rosterLeader';
import Member from './memberTypes/member';
import Sub from './memberTypes/sub';

interface IDivision {
    teams: Team[];
    commanders: Commander[];
    vices: Vice[];
    divisionName: string;
    houseName: string;
    color: string;
    count: number;
    mobileDevicesLinked: number;
    memberCount: number;
    initiateCount: number;
    associateCount: number;
    wardenCount: number;
    officerCount: number;
    activeInLastFiveDays: number;
    reputation: number;
    post: number;
    isCompliant: boolean;
    isCommunityDivision: boolean;
    isRepDrainEnabled: boolean;
    isSuperDivision: boolean;
    isSeedDivision: boolean;

    add(a: any): void;
}

export default class Division implements IDivision {
    teams: Team[];
    commanders: Commander[];
    vices: Vice[];
    divisionName: string;
    houseName: string;
    fileName: string;
    color: string;
    count: number;
    mobileDevicesLinked: number;
    memberCount: number;
    initiateCount: number;
    associateCount: number;
    wardenCount: number;
    officerCount: number;
    activeInLastFiveDays: number;
    reputation: number;
    post: number;
    isCompliant: boolean;
    isCommunityDivision: boolean;
    isRepDrainEnabled: boolean;
    isSuperDivision: boolean;
    isSeedDivision: boolean;

    constructor(data?: any) {
        this.teams = [];
        this.commanders = [];
        this.vices = [];
        if (data !== undefined) {
            this.parse(data);
        }
    }

    add(d: any): void {
        switch (d.constructor.name) {
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

    async getFromFile(divisionName?: string): Promise<any> {
        this.fileName = 'data/division-';
        if (divisionName !== undefined) {
            this.fileName += divisionName;
        }
        else {
            this.fileName += this.divisionName;
        }
        this.fileName += '.json';
        let utils = new Utils();
        let data = {};
        try {
            data = await utils.ReadFile(this.fileName);
            this.parse(data);
        }
        catch (ex) {
            console.error(ex);
        }
    }

    async saveToFile(): Promise<any> {
        let fileName = 'data/division-' + this.divisionName + '.json';

        let utils = new Utils();
        try {
            await utils.WriteFile(fileName, JSON.stringify(this));
        }
        catch (ex) {
            console.error(ex);
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
                case 'color':
                    this.color = d;
                    break;
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
                    this.divisionName = d;
                    if (d.match(/^C/)) {
                        this.isCommunityDivision = true;
                    }
                    else {
                        this.isCommunityDivision = false;
                    }
                    break;
                case 'House':
                    this.houseName = d;
                    break;
                case 'Compliant':
                    this.isCompliant = d;
                    break;
                case 'is_seed':
                    this.isSeedDivision = d;
                    break;
                case 'Super':
                    this.isSuperDivision = d;
                    break;
                case 'rep_drain_enabled':
                    if (d === 0) {
                        this.isRepDrainEnabled = true;
                    }
                    else {
                        this.isRepDrainEnabled = false;
                    }
                    break;
                case 'Commander':
                    for (let i = 0; i < d.length; i++) {
                        let dc = new Commander(d[i]);
                        this.add(dc);
                    }
                    break;
                case 'Vice':
                    for (let i = 0; i < d.length; i++) {
                        let dv = new Vice(d[i]);
                        this.add(dv);
                    }
                    break;
                case 'Teams':
                    for (let teamName in d) {
                        let team = new Team(d[teamName]);
                        this.add(team);
                    }
                    break;
                default:
                    break;
            }
        }
    }

    generateTagListForRoles(roles: string[]): string {
        const roleMap = {
            DC: Commander,
            DV: Vice,
            TL: TeamLeader,
            '2IC': SecondInCharge,
            RL: RosterLeader,
            TM: Member,
            SUB: Sub,
        };
        const teamRoles = ['TL', '2IC', 'RL', 'TM', 'SUB'];
        let sortedRoles = roles.sort(function(a, b) {
            return roleMap[b].priority - roleMap[a].priority;
        });

        let out: string = '<div><h1>Division ' + this.divisionName + '</h1>';
        let loadedTeam = false;

        for (let i = 0; i < sortedRoles.length; i++) {
            let role: string = sortedRoles[i];

            if (teamRoles.includes(role) && !loadedTeam) {
                for (let j = 0; j < this.teams.length; j++) {
                    let team = this.teams[j];
                    if (team.teamName === 'Unassigned') {
                        continue;
                    }
                    out += team.generateTagListForRoles(roles);
                }
                loadedTeam = true;
            }

            let vals: Member[] = [];
            switch (role) {
                case 'DC':
                    vals = this.commanders;
                    break;
                case 'DV':
                    vals = this.vices;
                    break;
                default:
                    continue;
            }

            if (vals.length > 0) {
                out +=
                    "<span class='role'>" +
                    roleMap[role].roleLong +
                    (vals.length > 1 ? 's (' + vals.length.toString() + ')' : '') +
                    '</span><br>';
                for (let j = 0; j < vals.length; j++) {
                    let val = vals[j];
                    out += this.fillTagTemplate(val.id, val.name);
                }
                out += '<br>';
            }
        }
        out += '</div>';
        return out;
    }

    fillTagTemplate(id: number, name: string): string {
        let template =
            '<a href="https://di.community/profile/##id##-##name##/" contenteditable="false" data-ipshover="" data-ipshover-target="https://di.community/profile/##id##-##name##/?do=hovercard" data-mentionid="##id##">@##name##</a>&#8203;&#8203;&#8203;&#8203;&#8203;&#8203;&#8203&nbsp';
        return template.replace(/##id##/g, id.toString()).replace(/##name##/g, name);
    }
}
