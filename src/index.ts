import configureExpress from "./modules/utils/configureExpress";
import setUpMdrFetcher from "./modules/utils/mdrFetcher";
import diConfig from './modules/config';

if (diConfig.reloadData) {
    setUpMdrFetcher();
}

// @ts-ignore
export default diConfig.serverType.createServer(diConfig.options, configureExpress()).listen(2048);
