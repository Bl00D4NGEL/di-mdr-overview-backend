import Division from "./division";
import FirstCommander from "../memberTypes/firstCommander";
import HouseGeneral from "../memberTypes/houseGeneral";
import Utils from "./utils";

interface IHouse {
    divisions: Array<Division>;
    firstCommanders: Array<FirstCommander>;
    houseGenerals: Array<HouseGeneral>;
    houseName: string;
    sortingNumber: number;
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

    add(a: any): void;
}

export default class House implements IHouse {
    divisions: Array<Division>;
    firstCommanders: Array<FirstCommander>;
    houseGenerals: Array<HouseGeneral>;
    houseName: string;
    fileName: string;
    sortingNumber: number;
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

    constructor(data?: any) {
        this.divisions = [];
        this.firstCommanders = [];
        this.houseGenerals = [];
        if (data !== undefined) {
            this.parse(data);
        }
    }

    add(d: any): void {
        switch(d.constructor.name) {
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
        this.fileName = "data/house-";
        if (houseName !== undefined) {
            this.fileName += houseName;
        }
        else {
            this.fileName += this.houseName;
        }
        this.fileName += ".json";

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
        let fileName = "data/house-" + this.houseName + ".json";
        
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
                    break;
            }
        }
    }

    getDivisionNames(): Array<string> {
        let names = [];
        for (let i = 0; i < this.divisions.length; i++) {
            let div = this.divisions[i];
            names.push(div.divisionName);
        }
        return names;
    }
}