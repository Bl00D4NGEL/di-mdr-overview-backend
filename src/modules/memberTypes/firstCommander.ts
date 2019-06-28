import Member from './member';

export default class FirstCommander extends Member {
    static roleShort: string = 'FC';
    static roleLong: string = 'First Commander';
    static priority: number = 7;
}
