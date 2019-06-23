import IMember from "./imember";

export default class FirstCommander implements IMember {
    name: string;
    id: number;
    roleShort: string = 'FC';
    roleLong: string = 'First Commander';
}