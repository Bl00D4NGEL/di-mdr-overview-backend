import Member from "./member";

export default class TeamLeader extends Member {
    static roleShort: string = 'TL';
    static roleLong: string = 'Team Leader';
    static priority: number = 4;
}