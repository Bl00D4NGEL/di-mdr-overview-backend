import Member from './memberTypes/member';
import { roleMap } from './memberRoleMap';
import Division from './division';
import Team from './team';
import Roster, { rosterRoles } from './roster';

const generate = (members: Member[], roleName: string): string => {
    if (members.length === 0) {
        return '';
    }
    return "<span class='role'>" +
        roleName +
        (members.length > 1 ? 's (' + members.length.toString() + ')' : '') +
        '</span><br>' +
        members.map(member => member.getTag()).join('') +
        '<br>';
}

export const generateTagListForMultipleRoles = (roles: string[], dataFunc: (role: string) => Member[]): string => {
    return roles
        .sort(function (a, b) {
            return roleMap[b].priority - roleMap[a].priority;
        })
        .map(role => {
            return generate(dataFunc(role), roleMap[role].roleLong);
        })
        .join('');
}

export const generateDivisionTagList = (division: Division, roles: string[]): string => {
    return '<div>' +
        '<h1>Division ' + division.divisionName + '</h1>' +
        generateTagListForMultipleRoles(roles, division.getRoleValues) +
        division.teams.map(team => generateTeamTagListForRoles(team, roles)).join('') +
        '</div>';
}


const generateTeamTagListForRoles = (team: Team, roles: string[]): string => {
    return '<div>' +
        '<h2>' + team.teamName + '</h2>' +
        generateTagListForMultipleRoles(roles, team.getRoleValues) +
        team.rosters.map(roster => generateRosterTagListForRoles(roster, roles)).join('') +
        '</div>';
}

const generateRosterTagListForRoles = (roster: Roster, roles: string[]): string => {
    if (roles.filter(role => rosterRoles.includes(role)).length > 0) {
        return roster.generateTagListForRoles(roles);
    }
    return '';
}