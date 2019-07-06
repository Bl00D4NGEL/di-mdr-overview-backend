import Teamspeak from '../utils/teamspeak';
import ThisAndLastMonthAndTotal from '../utils/thisAndLastMonthAndTotal';
import Event from '../utils/event';
import Recruitment from '../utils/recruitment';

export default class Member {
    name: string = '';
    id: number = 0;
    static roleShort: string = 'TM';
    static roleLong: string = 'Member';
    static priority: number = 1;
    posts?: number = 0;
    rep?: number = 0;
    static maxTsInactivity: number = 7;
    static maxForumInactivity: number = 5;
    groupId?: number = 0;
    joinedOn?: number = 0;
    lastActivity?: number = 0;
    isAway?: boolean = false;
    isMobileLinked?: boolean = false;
    rank?: string = '';
    position?: string = '';
    honorPoints?: number = 0;
    country?: string = '';
    memberRank?: string = '';

    postData?: ThisAndLastMonthAndTotal = new ThisAndLastMonthAndTotal();
    eventData?: Event = new Event();
    repData?: ThisAndLastMonthAndTotal = new ThisAndLastMonthAndTotal();
    recruitmentData?: Recruitment = new Recruitment();
    tsData?: Teamspeak = new Teamspeak();

    house?: string = '';
    roster?: string = '';
    team?: string = '';
    division?: string = '';

    constructor(data?: any) {
        if (data !== undefined) {
            this.parse(data);
        }
    }

    parse(data: any): void {
        let dataAsJson;
        if (typeof data === 'string') {
            try {
                dataAsJson = JSON.parse(data);
            }
            catch (ex) {
                console.log(ex);
                return ex;
            }
        }
        else {
            dataAsJson = data;
        }
        for (let key in dataAsJson) {
            let d = dataAsJson[key];
            switch (key) {
                case 'member_id':
                    this.id = d;
                    break;
                case 'member_name':
                    this.name = d;
                    break;
                case 'member_posts':
                    this.posts = d;
                    break;
                case 'member_group_id':
                    this.groupId = d;
                    break;
                case 'member_joined_on':
                    this.joinedOn = d;
                    break;
                case 'member_rank':
                    this.memberRank = d;
                    break;
                case 'last_activity':
                    this.lastActivity = d;
                    break;
                case 'away':
                    this.isAway = (d === 1);
                    break;
                case 'events_this_month':
                    this.eventData.attended.thisMonth = d;
                    break;
                case 'events_last_month':
                    this.eventData.attended.lastMonth = d;
                    break;
                case 'events_hosted_this_month':
                    this.eventData.hosted.thisMonth = d;
                    break;
                case 'events_hosted_last_month':
                    this.eventData.hosted.lastMonth = d;
                    break;
                case 'member_rep':
                    this.rep = d;
                    break;
                case 'country':
                    this.country = d;
                    break;
                case 'roster':
                    this.roster = d;
                    break;
                case 'ts_status':
                    this.tsData.status = d;
                    break;
                case 'ts_lastactive':
                    this.tsData.lastActive = d;
                    break;
                case 'ts_online':
                    this.tsData.isOnline = (d === 1);
                    break;
                case 'ts_updated':
                    this.tsData.lastUpdated = d;
                    break;
                case 'ts_linked':
                    this.tsData.isTsLinked = (d === 1);
                    break;
                case 'division':
                    this.division = d;
                    break;
                case 'team':
                    this.team = d;
                    break;
                case 'honor_points':
                    this.honorPoints = parseInt(d);
                    break;
                case 'recruits_this_month':
                    this.recruitmentData.recruited.thisMonth = d;
                    break;
                case 'recruits_last_month':
                    this.recruitmentData.recruited.lastMonth = d;
                    break;
                case 'recruits_retained_this_month':
                    this.recruitmentData.retained.thisMonth = d;
                    break;
                case 'recruits_retained_last_month':
                    this.recruitmentData.recruited.lastMonth = d;
                    break;
                case 'recruit_quality_this_month':
                    this.recruitmentData.quality.thisMonth = d;
                    break;
                case 'recruit_quality_last_month':
                    this.recruitmentData.quality.lastMonth = d;
                    break;
                case 'mobile_linked':
                    this.isMobileLinked = d;
                    break;
                case 'house':
                    this.house = d;
                    break;
                case 'rep':
                    let repData = d;
                    this.repData.total = repData.last_month + parseInt(repData.acc_this_month);
                    this.repData.lastMonth = parseInt(repData.acc_last_month);
                    this.repData.thisMonth = parseInt(repData.acc_this_month);
                    break;
                case 'posts':
                    let postData = d;
                    this.postData.total = postData.last_month + parseInt(postData.acc_this_month);
                    this.postData.lastMonth = postData.acc_last_month;
                    this.postData.thisMonth = postData.acc_this_month;
                    break;
                default:
                    if (typeof this[key] !== undefined) {
                        this[key] = d;
                    }
                    else {
                        console.log("???", d, key, this[key]);
                    }
                    break;
            }
        }
    }
}
