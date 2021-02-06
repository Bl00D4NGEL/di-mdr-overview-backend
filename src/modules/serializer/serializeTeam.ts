import Team, {ITeam} from "../team/team";
import serializeRoster from '../serializer/serializeRoster';
import {diTeam} from "../team/diTeam";
import setNcDataForObject from "./helpers/setNcDataForObject";
import addObjectWithCallback from "./helpers/addObjectWithCallback";
import addMembersWithCallback from "./helpers/addMembersWithCallback";

export default function serializeTeam(teamData: diTeam): ITeam {
    const team = new Team();
    bindFunctions(team);
    setData(teamData, team);
    return team;
}

function setData(teamData: diTeam, team) {
    setNcDataForObject(teamData, team.setNcData);
    addObjectWithCallback(teamData.Rosters, team.addRoster, serializeRoster);
    addMembersWithCallback(teamData.OnAway, team.addOnAway);
    addMembersWithCallback(teamData.Probation, team.addOnProbation);
    addMembersWithCallback(teamData.TL, team.addTeamLeader);
    team.setName(teamData.name);
    team.setIsCasualTeam(teamData.isCasual);
}

function bindFunctions(team: ITeam): void {
    team.setNcData = team.setNcData.bind(team);
    team.addRoster = team.addRoster.bind(team);
    team.addOnAway = team.addOnAway.bind(team);
    team.addOnProbation = team.addOnProbation.bind(team);
    team.addTeamLeader = team.addTeamLeader.bind(team);
}