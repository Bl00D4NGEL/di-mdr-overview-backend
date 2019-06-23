import IMember from "./imember";

export default class Sub implements IMember {
    name: string;
    id: number;
    roleShort: string = 'SUB';
    roleLong: string = 'Sub';
}