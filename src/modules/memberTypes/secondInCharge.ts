import Member from './member';

export default class SecondInCharge extends Member {
    static roleShort: string = '2IC';
    static roleLong: string = 'Second in charge';
    static priority: number = 3;
}
