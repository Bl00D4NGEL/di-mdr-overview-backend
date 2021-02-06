import configureExpress from "./modules/utils/configureExpress";
import setUpMdrFetcher from "./modules/utils/mdrFetcher";
import diConfig from './modules/config';
import * as https from "https";

if (diConfig.reloadData) {
    setUpMdrFetcher();
}

// @ts-ignore
export default https.createServer(diConfig.options, configureExpress()).listen(2048);
