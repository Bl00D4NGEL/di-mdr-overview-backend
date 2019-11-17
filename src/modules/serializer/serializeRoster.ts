import Roster, {IRoster} from "../roster/roster";
import serializeMember from "./serializeMember";
import {diMember} from "../member/diMembers";
import serializeNcData from "./serializeNcData";
import {diRoster} from "../roster/diRoster";

export default function serializeRoster(rosterData: diRoster) {
    const roster = new Roster();

    roster.setName(rosterData.name);

    setNcDataForRoster(rosterData, roster);
    addMembersToRoster(rosterData.Members, roster);
    addAdditionsToRoster(rosterData.Additions, roster);
    addRosterLeaderToRoster(rosterData.RL, roster);
    return roster;
}

function setNcDataForRoster(rosterData: diRoster, roster: IRoster): void {
    if (rosterData.NCSince !== undefined) {
        roster.setNcData(serializeNcData(rosterData));
    }
}

function addMembersToRoster(members: diMember[], roster: IRoster): void {
    if (Array.isArray(members)) {
        members.forEach(member => roster.addMember(serializeMember(member)));
    }
}

function addAdditionsToRoster(additions: {[roleName: string]: diMember[]}, roster: IRoster): void {
    if (additions === undefined) {
        return;
    }
    for (let roleName in additions) {
        if (additions[roleName] !== undefined && additions[roleName].length > 0) {
            additions[roleName].forEach(addition => roster.addMember(serializeMember(addition)));
        }
    }
}

function addRosterLeaderToRoster(rosterLeaders: diMember[], roster: IRoster): void {
    if (Array.isArray(rosterLeaders)) {
        rosterLeaders.forEach(rl => roster.addRosterLeader(serializeMember(rl)));
    }
}
