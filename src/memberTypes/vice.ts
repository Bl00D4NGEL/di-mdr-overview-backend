import IMember from "./imember";

export default class Vice implements IMember {
    name: string;
    id: number;
    roleShort: string = 'DV';
    roleLong: string = 'Vice';
}