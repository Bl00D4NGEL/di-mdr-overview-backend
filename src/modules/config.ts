import * as fs from "fs";

export interface IConfig {
    environment: "prod" | "dev";
    reloadData: boolean;
    renewInterval: number;
    options: {
        key: Buffer,
        cert: Buffer
    },
}

const dotenv = require('dotenv');
dotenv.config();

const defaultConfig ={
    options: {
        key: fs.readFileSync(process.env.SSL_DIRECTORY + '/privkey.pem'),
        cert: fs.readFileSync(process.env.SSL_DIRECTORY + '/cert.pem')
    }
};

const devConfig: IConfig = {
    environment: "dev",
    reloadData: false,
    renewInterval: 0,
    ...defaultConfig
};

let prodConfig: IConfig = {
    environment: "prod",
    reloadData: false,
    renewInterval: 24 * 60 * 60 * 1000, // 1 day
    ...defaultConfig
};


const environment: string = process.env.NODE_ENV || 'development';

let diConfig = devConfig;

console.log('Environment = ', environment);
if (environment !== 'development') {
   diConfig = {
       ...prodConfig
   };
}

export default diConfig;
