import configureExpress from "./modules/utils/configureExpress";
import setUpMdrFetcher from "./modules/utils/mdrFetcher";
import diConfig from './config';

const app = configureExpress();
if (diConfig.reloadData) {
    setUpMdrFetcher();
}

// @ts-ignore
export default diConfig.serverType.createServer(diConfig.options, app).listen(2048);
