export default function addObjectWithCallback(object: {[name:string]: any}, callbackFn, serializerFn): void {
    for (let name in object) {
        callbackFn(serializerFn(object[name]));
    }
}