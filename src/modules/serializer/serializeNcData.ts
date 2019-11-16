import {INcData} from "../ncData/ncData";
import {diNcData} from "../ncData/diNcData";

export default function serializeNcData(inData: diNcData): INcData {
    const ncData: INcData = {
        NCSince: inData.NCSince,
        NCReasons: []
    };
    if (inData.NCReasons !== undefined && inData.NCReasons.length > 0) {
        inData.NCReasons.forEach((reason) => {
            ncData.NCReasons.push({
                drainRate: reason.drain_rate,
                reason: reason.reason,
                causingUnit: reason.causing_unit
            });
        })
    }
    return ncData;
}
