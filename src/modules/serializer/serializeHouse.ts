import House, {IHouse} from "../house/house";
import serializeDivision from "./serializeDivision";
import {diHouse} from "../house/diHouse";
import setNcDataForObject from "./helpers/setNcDataForObject";
import addObjectWithCallback from "./helpers/addObjectWithCallback";
import addMembersWithCallback from "./helpers/addMembersWithCallback";

export default function serializeHouse(houseData: diHouse): IHouse {
    const house = new House();
    bindFunctions(house);
    setData(houseData, house);
    return house;
};

function bindFunctions(house: IHouse): void {
    house.setNcData = house.setNcData.bind(house);
    house.addDivision = house.addDivision.bind(house);
    house.addFirstCommander = house.addFirstCommander.bind(house);
    house.addHouseGeneral = house.addHouseGeneral.bind(house);
}

function setData(houseData: diHouse, house: IHouse): void {
    house.setHouseName(houseData.name);
    setNcDataForObject(houseData, house.setNcData);
    addObjectWithCallback(houseData.Divisions, house.addDivision, serializeDivision);
    addMembersWithCallback(houseData["House General"], house.addHouseGeneral);
    addMembersWithCallback(houseData["First Commander"], house.addFirstCommander);
}