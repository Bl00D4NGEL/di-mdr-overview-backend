import IMember from "./imember";

export default class HouseGeneral implements IMember {
    name: string;
    id: number;
    roleShort: string = 'HG';
    roleLong: string = 'House General';
}