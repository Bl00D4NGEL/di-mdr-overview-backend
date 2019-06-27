import Member from "./member";

export default class Commander extends Member {
    static roleShort: string = 'DC';
    static roleLong: string = 'Commander';
    static priority: number = 6;
}