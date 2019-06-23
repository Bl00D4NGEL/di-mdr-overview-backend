import IMember from "./imember";

export default class SecondInCharge implements IMember {
    name: string;
    id: number;
    roleShort: string = '2IC';
    roleLong: string = 'Second in charge';
}