import Division, {IDivision} from "../division/division";
import serializeTeam from "./serializeTeam";
import serializeMember from "./serializeMember";
import {diMember} from "../member/diMembers";
import serializeNcData from "./serializeNcData";
import {diDivision} from "../division/diDivision";
import {diTeam} from "../team/diTeam";

export default function serializeDivision(divisionData: diDivision): IDivision {
    const division = new Division();

    division.setGame(divisionData.Game.name);
    division.setName(getDivisionNameFromUrl(divisionData.url));
    division.setIsSuperDivision(divisionData.super || divisionData.Super);
    division.setIsSeedDivision(divisionData.is_seed === 1);

    setNcDataForDivision(divisionData, division);
    addTeamsToDivision(divisionData.Teams, division);
    addViceToDivision(divisionData.Vice, division);
    addCommanderToDivision(divisionData.Commander, division);
    return division;
}

function getDivisionNameFromUrl(url: string): string {
    const division = url.match(/about\/.*?\/di-(\w+)/);
    if (division === undefined) {
        return '';
    }
    return division[1];
}

function setNcDataForDivision(divisionData: diDivision, division: IDivision): void {
    if (divisionData.NCSince !== undefined) {
        division.setNcData(serializeNcData(divisionData));
    }
}

function addTeamsToDivision(teams: {[teamName:string]: diTeam}, division: IDivision): void {
    for (let teamName in teams) {
        division.addTeam(serializeTeam(teams[teamName]));
    }
}

function addViceToDivision(vices: diMember[], division: IDivision): void {
    if (Array.isArray(vices)) {
        vices.forEach(vice => division.addVice(serializeMember(vice)));
    }
}

function addCommanderToDivision(commanders: diMember[], division: IDivision): void {
    if (Array.isArray(commanders)) {
        commanders.forEach(commander => division.addCommander(serializeMember(commander)));
    }
}
