import {diMember} from "../member/diMembers";
import {diDivision} from "../division/diDivision";

export interface diHouse {
    Divisions: {
        [divisionName: string]: diDivision
    };
    sorting_number: number;
    banner: string;
    color: string;
    Count: number;
    "Mobile-Device-Linked-Count": number;
    "Warden-Count": number;
    "Active-In-Last-5-Days-Count": number;
    rep: number;
    posts: number;
    "Officer-Count": number;
    "Members-Count": number;
    "Veterans-Count": number;
    "House General": diMember[];
    "First Commander": diMember[];
    "Initiate-Count": number;
    name: string;
    NCSince: number;
    NCReasons: [{
        reason: string;
        causing_unit: 1;
        drain_rate: 1;
    }];
    Compliant: boolean;
}
