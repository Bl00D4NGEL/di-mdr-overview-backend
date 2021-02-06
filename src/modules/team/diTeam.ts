import {diMember} from "../member/diMembers";
import {diRoster} from "../roster/diRoster";

export interface diTeam {
    isCasual: boolean;
    rep: number;
    Counter: number;
    "Officer-Count": number;
    "Active-In-Last-5-Days-Count": number;
    Rosters?: {
        [rosterName: string]: diRoster
    }
    Probation?: diMember[];
    OnAway?: diMember[];
    TL?: diMember[];
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
    Compliant: boolean;
}
