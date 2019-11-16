import Team, {ITeam} from "../team/team";
import serializeRoster from '../serializer/serializeRoster';
import serializeMember from "./serializeMember";
import {diMember} from "../member/diMembers";
import serializeNcData from "./serializeNcData";
import {diTeam} from "../team/diTeam";
import {diRoster} from "../roster/diRoster";

export default function serializeTeam(teamData: diTeam): ITeam {
    const team = new Team();

    team.setName(teamData.name);
    team.setIsCasualTeam(teamData.isCasual);

    setNcDataForTeam(teamData, team);
    addRostersToTeam(teamData.Rosters, team);
    addOnProbationsToTeam(teamData.Probation, team);
    addOnAwaysToTeam(teamData.OnAway, team);
    addTeamLeaderToTeam(teamData['TL'], team);
    addSecondInChargeToTeam(teamData['2IC'], team);
    return team;
}

function setNcDataForTeam(teamData: diTeam, team: ITeam): void {
    if (teamData.NCSince !== undefined) {
        team.setNcData(serializeNcData(teamData));
    }
}

function addRostersToTeam(rosters: {[rosterName:string]: diRoster}, team: ITeam): void {
    for (let rosterName in rosters) {
        team.addRoster(serializeRoster(rosters[rosterName]));
    }
}

function addOnProbationsToTeam(onProbations: diMember[], team: ITeam): void {
    if (onProbations !== undefined && onProbations.length > 0) {
        onProbations.forEach(onProbation => team.addOnProbation(serializeMember(onProbation)));
    }
}

function addOnAwaysToTeam(onAways: diMember[], team: ITeam): void {
    if (onAways !== undefined && onAways.length > 0) {
        onAways.forEach(onAway => team.addOnAway(serializeMember(onAway)));
    }
}

function addTeamLeaderToTeam(teamLeaderData, team: ITeam): void {
    if (teamLeaderData !== undefined && teamLeaderData.length > 0) {
        teamLeaderData.forEach(tl => team.addTeamLeader(serializeMember(tl)));
    }
}

function addSecondInChargeToTeam(secondInChargeData, team: ITeam): void {
    if (secondInChargeData !== undefined && secondInChargeData.length > 0) {
        secondInChargeData.forEach(secondInCharge => team.addSecondInCharge(serializeMember(secondInCharge)));
    }
}
