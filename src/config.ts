import * as _ from 'lodash';

interface Config {
    configId: string;
    port: number;
    name: string;
    desc: string;
    reloadData: boolean;
    renewInterval: number;
}

let devConfig: Config = {
    configId: 'development',
    port: 1338,
    name: 'DI MDR Backend',
    desc: 'MDR Backend for DI',
    reloadData: true,
    renewInterval: 5 * 60 * 1000, // 5 minutes
};

let configs: any = {
    development: devConfig,
};
// Add Prod config is necessary

let environment: string = process.env.NODE_ENV || 'development';

const defaultConfig = configs.development;
const environmentConfig = configs[environment];
const finalConfig = _.merge(defaultConfig, environmentConfig);

export default finalConfig;
