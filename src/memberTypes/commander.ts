import Member from "./imember";

export default class Commander implements Member {
    name: string;
    id: number;
    roleShort: string = 'DC';
    roleLong: string = 'Commander';
}