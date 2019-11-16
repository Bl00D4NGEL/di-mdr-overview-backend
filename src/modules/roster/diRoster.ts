import {diMember} from "../member/diMembers";

export interface diRoster {
    Count: number;
    "Mobile-Device-Linked-Count": number;
    "Active-In-Last-5-Days-Count": number;
    "Warden-Count": number;
    "Members-Count": number;
    "Veterans-Count": number;
    "Initiate-Count": number;
    Members: diMember[];
    RL: diMember[];
    Additions: {
        [roleName: string]: diMember[]
    }
    name: string;
    NCSince: number;
    NCReasons: [{
        reason: string;
        causing_unit: 1;
        drain_rate: 1;
    }];
    Compliant: boolean;

}
