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

    addDivision(division: Division): void {
        this.divisions.push(division);
    }

    addFirstCommander(firstCommander: FirstCommander): void {
        this.firstCommanders.push(firstCommander);
    }

    addHouseGeneral(houseGeneral: HouseGeneral): void {
        this.houseGenerals.push(houseGeneral);
    }

    async getFromFile(houseName?: string): Promise<any> {
        this.fileName = 'data/house-' + (houseName !== undefined ? houseName : this.houseName) + 'json';

        const utils = new Utils();
        try {
            this.parse(await utils.ReadFile(this.fileName));
        }
        catch (ex) {
            console.error(ex);
        }
    }

    async saveToFile(): Promise<any> {
        const fileName = 'data/house-' + this.houseName + '.json';

        const utils = new Utils();
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
                        this.addFirstCommander(new FirstCommander(d[i]));
                    }
                    break;
                case 'House General':
                    for (let i = 0; i < d.length; i++) {
                        this.addHouseGeneral(new HouseGeneral(d[i]));
                    }
                    break;
                case 'Divisions':
                    for (let divisionName in d) {
                        this.addDivision(new Division(d[divisionName]));
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
        return this.divisions.map(div => div.divisionName);
    }

    getMembers(): Array<Member> {
        const members: Array<Member> = [];

        this.divisions.map(
            division => division.getMembers().forEach(member => members.push(member))
        );

        this.houseGenerals
            .concat(this.firstCommanders)
            .forEach(member => members.push(member));
        return members;
    }
}
