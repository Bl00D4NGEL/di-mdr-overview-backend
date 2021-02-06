import Division, {IDivision} from "../division/division";
import serializeTeam from "./serializeTeam";
import {diDivision} from "../division/diDivision";
import addMembersWithCallback from "./helpers/addMembersWithCallback";
import addObjectWithCallback from "./helpers/addObjectWithCallback";
import setNcDataForObject from "./helpers/setNcDataForObject";

export default function serializeDivision(divisionData: diDivision): IDivision {
    const division = new Division();
    bindFunctions(division);
    setData(division, divisionData);
    return division;
}

function bindFunctions(division: IDivision): void {
    division.setNcData = division.setNcData.bind(division);
    division.addTeam = division.addTeam.bind(division);
    division.addCommander = division.addCommander.bind(division);
    division.addVice = division.addVice.bind(division);
}

function setData(division: IDivision, divisionData: diDivision): void {
    division.setGame(divisionData.Game && divisionData.Game.name || '');
    division.setName(divisionData.name);
    division.setIsSuperDivision(divisionData.super || divisionData.Super);
    division.setIsSeedDivision(divisionData.is_seed === 1);

    setNcDataForObject(divisionData, division.setNcData);
    addObjectWithCallback(divisionData.Teams, division.addTeam, serializeTeam);
    addMembersWithCallback(divisionData["Division Leader"], division.addCommander);
    addMembersWithCallback(divisionData["Division Vice"], division.addVice);
}
