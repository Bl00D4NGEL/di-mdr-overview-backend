import * as fs from "fs";
import https = require('https');
import http = require('http');

export interface IConfig {
    configId: string;
    port: number;
    name: string;
    desc: string;
    reloadData: boolean;
    renewInterval: number;
    options: {
        key: Buffer,
        cert: Buffer
    },
    serverType: any
}

const devConfig: IConfig = {
    configId: 'development',
    port: 2049,
    name: 'DI MDR Backend (DEV)',
    desc: 'MDR Backend for DI (DEV)',
    reloadData: false,
    renewInterval: 5 * 60 * 1000, // 5 minutes
    options: {
        key: undefined,
        cert: undefined
    },
    serverType: http
};

let prodConfig: IConfig = {
    configId: 'development',
    port: 2049,
    name: 'DI MDR Backend (PROD)',
    desc: 'MDR Backend for DI (PROD)',
    reloadData: true,
    renewInterval: 5 * 60 * 1000, // 5 minutes
    options: {
        key: undefined,
        cert: undefined
    },
    serverType: https
};

const environment: string = process.env.NODE_ENV || 'development';

let diConfig = devConfig;

if (environment !== 'development') {
   diConfig = prodConfig;
   diConfig.options.key = fs.readFileSync('/etc/letsencrypt/archive/mdr.d-peters.com/privkey1.pem');
   diConfig.options.cert = fs.readFileSync('/etc/letsencrypt/archive/mdr.d-peters.com/cert1.pem');
}

export default diConfig;
