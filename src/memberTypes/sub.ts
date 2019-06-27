import Member from "./member";

export default class Sub extends Member {
    static roleShort: string = 'SUB';
    static roleLong: string = 'Sub';
    static priority: number = 0;
}