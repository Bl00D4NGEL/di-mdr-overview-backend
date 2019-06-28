import Member from './member';

export default class HouseGeneral extends Member {
    static roleShort: string = 'HG';
    static roleLong: string = 'House General';
    static priority: number = 8;
}
