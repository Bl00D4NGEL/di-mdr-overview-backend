import Member from "./member";

export default class RosterLeader extends Member {
    static roleShort: string = 'RL';
    static roleLong: string = 'Roster Leader';
    static priority: number = 2;
}