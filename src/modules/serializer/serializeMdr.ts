import Mdr from "../mdr/mdr";
import {ALL_NAMES, SPECIAL} from "../house/names";
import serializeHouse from "./serializeHouse";
import {diMdr} from "../mdr/diMdr";

export default function serializeMdr(mdrData: diMdr) {
    const mdr = new Mdr();

    ALL_NAMES.forEach(houseName => {
        if (mdrData[houseName] !== undefined) {
            if (shouldHouseBeIgnored(houseName)) {
                return;
            }
            const house = serializeHouse(mdrData[houseName]);
            mdr.addHouse(house);
        }
    });

    return mdr;
}

const shouldHouseBeIgnored = (houseName: string): boolean => houseName === SPECIAL;
