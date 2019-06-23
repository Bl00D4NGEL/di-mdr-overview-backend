import IMember from "./imember";

export default class TeamLeader implements IMember {
    name: string;
    id: number;
    roleShort: string = 'TL';
    roleLong: string = 'Team Leader';
}