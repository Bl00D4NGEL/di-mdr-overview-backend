import IMember from "./imember";

export default class Member implements IMember {
    name: string;
    id: number;
    roleShort: string = 'TM';
    roleLong: string = 'Member';
}