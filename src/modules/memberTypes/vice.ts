import Member from './member';

export default class Vice extends Member {
    static roleShort: string = 'DV';
    static roleLong: string = 'Vice';
    static priority: number = 5;
}
