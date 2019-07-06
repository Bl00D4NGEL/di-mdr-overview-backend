import Division from './division';
import FirstCommander from './memberTypes/firstCommander';
import HouseGeneral from './memberTypes/houseGeneral';
import Utils from './utils';
import Member from './memberTypes/member';

export default class House {
    divisions: Division[] = [];
    firstCommanders: FirstCommander[] = [];
    houseGenerals: HouseGeneral[] = [];
    houseName: string = '';
    fileName: string = '';
    sortingNumber: number = 0;
    color: string = '';
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

    constructor(data?: any) {
        this.divisions = [];
        this.firstCommanders = [];
        this.houseGenerals = [];
        if (data !== undefined) {
            this.parse(data);
        }
    }

    add(d: any): void {
        switch (d.constructor.name) {
            case 'Division':
                this.divisions.push(d);
                break;
            case 'FirstCommander':
                this.firstCommanders.push(d);
                break;
            case 'HouseGeneral':
                this.houseGenerals.push(d);
                break;
            default:
                break;
        }
    }

    async getFromFile(houseName?: string): Promise<any> {
        this.fileName = 'data/house-';
        if (houseName !== undefined) {
            this.fileName += houseName;
        }
        else {
            this.fileName += this.houseName;
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
        let fileName = 'data/house-' + this.houseName + '.json';

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
                case 'sorting_number':
                    this.sortingNumber = d;
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
                    this.houseName = d;
                    break;
                case 'Compliant':
                    this.isCompliant = d;
                    break;
                case 'First Commander':
                    for (let i = 0; i < d.length; i++) {
                        let mem = new FirstCommander(d[i]);
                        this.add(mem);
                    }
                    break;
                case 'House General':
                    for (let i = 0; i < d.length; i++) {
                        let mem = new HouseGeneral(d[i]);
                        this.add(mem);
                    }
                    break;
                case 'Divisions':
                    for (let divisionName in d) {
                        let div = new Division(d[divisionName]);
                        this.add(div);
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

    getDivisionNames(): string[] {
        let names = [];
        for (let i = 0; i < this.divisions.length; i++) {
            let div = this.divisions[i];
            names.push(div.divisionName);
        }
        return names;
    }
    
    getMembers(): Array<Member> {
      let members: Array<Member> = [];
      let membersAny: Array<any> = [];

      this.divisions.map(division => {
        division = new Division(division);
        members = members.concat(division.getMembers());
      });

      membersAny = membersAny.concat(this.houseGenerals);
      membersAny = membersAny.concat(this.firstCommanders);
      membersAny.map(x => {
        x = new Member(x);
        members.push(x);
      });
      return members;
    }
}
