import Team from './team';
import Commander from './memberTypes/commander';
import Vice from './memberTypes/vice';
import Utils from './utils';
import Member from './memberTypes/member';

export default class Division {
    teams: Team[] = [];
    commanders: Commander[] = [];
    vices: Vice[] = [];
    divisionName: string = '';
    houseName: string = '';
    fileName: string = '';
    color: string = '';
    game: string = '';
    count: number = 0;
    mobileDevicesLinked: number = 0;
    memberCount: number = 0;
    initiateCount: number = 0;
    associateCount: number = 0;
    wardenCount: number = 0;
    officerCount: number = 0;
    activeInLastFiveDays: number = 0;
    reputation: number = 0;
    post: number = 0;
    isCompliant: boolean = false;
    isCommunityDivision: boolean = false;
    isRepDrainEnabled: boolean = false;
    isSuperDivision: boolean = false;
    isSeedDivision: boolean = false;

    constructor(data?: any) {
        this.teams = [];
        this.commanders = [];
        this.vices = [];
        if (data !== undefined) {
            this.parse(data);
        }
        this.getRoleValues = this.getRoleValues.bind(this);
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

    addTeam(team: Team): void {
        this.teams.push(team);
    }

    addVice(vice: Vice): void {
        this.vices.push(vice);
    }

    addCommander(commander: Commander): void {
        this.commanders.push(commander);
    }

    async getFromFile(divisionName?: string): Promise<any> {
        this.fileName = 'data/division-' + (divisionName !== undefined ? divisionName : this.divisionName) + '.json';
        const utils = new Utils();
        try {
            this.parse(await utils.ReadFile(this.fileName));
        }
        catch (ex) {
            console.error(ex);
        }
    }

    async saveToFile(): Promise<any> {
        const fileName = 'data/division-' + this.divisionName + '.json';

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
                case 'Game':
                    this.game = d.name;
                    break;
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
                    this.isRepDrainEnabled = (d === 0);
                    break;
                case 'Commander':
                    for (let i = 0; i < d.length; i++) {
                        this.addCommander(new Commander(d[i]));
                    }
                    break;
                case 'Vice':
                    for (let i = 0; i < d.length; i++) {
                        this.addVice(new Vice(d[i]));
                    }
                    break;
                case 'Teams':
                    for (let teamName in d) {
                        this.addTeam(new Team(d[teamName]));
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
            case 'DC':
                return this.commanders;
            case 'DV':
                return this.vices;
            default:
                return [];
        }
    }

    getMembers(): Array<Member> {
        const members: Array<Member> = [];

        this.commanders
            .concat(this.vices)
            .forEach(member => members.push(member));

        this.teams.forEach(
            team => team.getMembers().forEach(member => members.push(member))
        );
        return members;
    }
}
