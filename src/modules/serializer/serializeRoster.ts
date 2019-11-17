import Roster, {IRoster} from "../roster/roster";
import serializeMember from "./serializeMember";
import {diMember} from "../member/diMembers";
import {diRoster} from "../roster/diRoster";
import setNcDataForObject from "./helpers/setNcDataForObject";
import addMembersWithCallback from "./helpers/addMembersWithCallback";

export default function serializeRoster(rosterData: diRoster) {
    const roster = new Roster();
    bindFunctions(roster);
    setData(rosterData, roster);
    return roster;
}

function setData(rosterData: diRoster, roster) {
    setNcDataForObject(rosterData, roster.setNcData);
    addMembersWithCallback(rosterData.Members, roster.addMember);
    addMembersWithCallback(rosterData.RL, roster.addRosterLeader);
    roster.setName(rosterData.name);
    addAdditionsToRoster(rosterData.Additions, roster);
}

function bindFunctions(roster: IRoster): void {
    roster.setNcData = roster.setNcData.bind(roster);
    roster.addMember = roster.addMember.bind(roster);
    roster.addRosterLeader = roster.addRosterLeader.bind(roster);
}

function addAdditionsToRoster(additions: {[roleName: string]: diMember[]}, roster: IRoster): void {
    if (additions === undefined) {
        return;
    }
    for (let roleName in additions) {
        if (additions[roleName] !== undefined && additions[roleName].length > 0) {
            additions[roleName].forEach(addition => roster.addAddition(serializeMember(addition)));
        }
    }
}
