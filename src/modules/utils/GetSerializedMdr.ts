import {IMdr} from "../mdr/mdr";
import Utils from "./utils";
import {diMdr} from "../mdr/diMdr";
import serializeMdr from "../serializer/serializeMdr";

export const GetSerializedMdr = (): IMdr => {
    const fileName = 'data/mdr.json';
    const utils = new Utils();
    const mdrFromFile = utils.ReadFileSync(fileName);
    const mdr: diMdr = JSON.parse(mdrFromFile);
    return serializeMdr(mdr);
}