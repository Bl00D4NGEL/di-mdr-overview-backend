export interface diMember {
    member_id: number;
    member_name: string;
    member_posts: number;
    member_group_id: number;
    member_joined_on: number;
    last_activity: number;
    away: number;
    events_this_month: number;
    events_last_month: number;
    events_hosted_this_month: number;
    events_hosted_last_month: number;
    member_rep: number;
    country: string;
    roster: string;
    ts_status: string;
    ts_lastactive: number;
    ts_online: number;
    ts_updated: number;
    ts_linked: number;
    division: string;
    team: string;
    member_rank: string;
    position: string;
    honor_points: number;
    recruits_this_month: number;
    recruits_last_month: number;
    recruits_retained_this_month: number;
    recruits_retained_last_month: number;
    mobile_linked: number;
    away_days: number;
    house: string;
    rep: {
        acc_last_month: number;
        acc_this_month: number;
        last_month: number
    };
    posts: {
        acc_last_month: number;
        acc_this_month: number;
        last_month: number
    };
    recruit_quality_last_month: number;
    recruit_quality_this_month: number;
}
