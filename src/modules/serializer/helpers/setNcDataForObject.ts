import {INcData} from "../../ncData/ncData";
import serializeNcData from "../serializeNcData";

export default function setNcDataForObject(object: any, setNcDataFn: (ncData: INcData) => void): void {
    if (object.NCSince !== undefined) {
        setNcDataFn(serializeNcData(object));
    }
}