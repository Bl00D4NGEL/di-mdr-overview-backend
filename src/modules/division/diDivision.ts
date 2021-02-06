import {diMember} from "../member/diMembers";
import {diTeam} from "../team/diTeam";

export interface diDivision {
    sorting_number: any;
    icon: string;
    logo: string;
    url: string;
    community_division: number;
    rep_drain_enabled: number;
    color: string;
    Game: {
        name: string;
        url: string;
        icon: string;
        logo: string;
        wallpaper: string;
    }
    super: boolean;
    Count: number;
    is_seed: number;
    Teams: {
        [teamName: string]: diTeam;
    }
    rep: number;
    posts: number;
    "Officer-Count": number;
    "Active-In-Last-5-Days-Count": number;
    "Division Vice"?: diMember[];
    "Division Leader"?: diMember[];
    "Mobile-Device-Linked-Count": number;
    "Warden-Count": number;
    "Members-Count": number;
    "Veterans-Count": number;
    "Initiate-Count": number;
    name: string;
    NCSince: number;
    NCReasons: [{
        reason: string;
        causing_unit: 1;
        drain_rate: 1;
    }];
    Complaint: boolean;
    Super: boolean;
}
