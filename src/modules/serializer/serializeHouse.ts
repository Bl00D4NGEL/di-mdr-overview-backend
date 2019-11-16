import House, {IHouse} from "../house/house";
import serializeDivision from "./serializeDivision";
import serializeMember from "./serializeMember";
import {diMember} from "../member/diMembers";
import serializeNcData from "./serializeNcData";
import {diHouse} from "../house/diHouse";
import {diDivision} from "../division/diDivision";

export default function serializeHouse(houseData: diHouse): IHouse {
    const house = new House();
    house.setHouseName(houseData.name);

    setNcDataForHouse(houseData, house);
    addDivisionsToHouse(houseData.Divisions, house);
    addHouseGeneralToHouse(houseData["House General"], house);
    addFirstCommanderToHouse(houseData['First Commander'], house);
    return house;
};

function setNcDataForHouse(houseData: diHouse, house) {
    if (houseData.NCSince !== undefined) {
        house.setNcData(serializeNcData(houseData))
    }
}

function addDivisionsToHouse(divisions: {[divisionName:string]: diDivision}, house: IHouse): void {
    for (let divisionName in divisions) {
        house.addDivision(serializeDivision(divisions[divisionName]));
    }
}

function addHouseGeneralToHouse(houseGenerals: diMember[], house: IHouse): void {
    if (houseGenerals !== undefined && houseGenerals.length > 0) {
        houseGenerals.forEach(hg => house.addHouseGeneral(serializeMember(hg)));
    }
}

function addFirstCommanderToHouse(firstCommanders: diMember[], house: IHouse): void {
    if (firstCommanders !== undefined && firstCommanders.length > 0) {
        firstCommanders.forEach(fc => house.addFirstCommander(serializeMember(fc)));
    }
}
