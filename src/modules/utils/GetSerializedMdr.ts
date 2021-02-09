import {IMdr} from "../mdr/mdr";
import serializeMdrCsv from "../serializer/serializeMdrCsv";

export const GetSerializedMdrCsv = (): IMdr => {
    return serializeMdrCsv('data/report.csv');
}