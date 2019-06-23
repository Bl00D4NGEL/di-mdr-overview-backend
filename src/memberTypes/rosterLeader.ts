import IMember from "./imember";

export default class RosterLeader implements IMember {
    name: string;
    id: number;
    roleShort: string = 'RL';
    roleLong: string = 'Roster Leader';
}