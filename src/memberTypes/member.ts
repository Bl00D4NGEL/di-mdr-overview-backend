interface IMember {
    name: string,
    id: number
    roleShort?: string;
    roleLong?: string;
    priority?: number;
}

export default class Member implements IMember {
    name: string;
    id: number;
    static roleShort: string = 'TM';
    static roleLong: string = 'Member';
    static priority: number = 1;
    
    constructor(data?: any) {
        if (data !== undefined) {
            this.parse(data);
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
                case 'member_id':
                    this.id = d;
                    break;
                case 'member_name':
                    this.name = d;
                    break;
                default:
                    break;
            }
        }
    }
}