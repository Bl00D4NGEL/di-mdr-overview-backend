import express = require('express');
import cors = require('cors');
import bodyParser = require('body-parser');
import Config from './config';
import Division from './modules/division';
import * as fs from 'fs';
import Mdr from './modules/mdr';
import House from './modules/house';
import ProfileParser from './modules/utils/profileParser';
import fetch from 'node-fetch';
import Utils from './modules/utils';
import { generateDivisionTagList } from './modules/tagListGenerator';
import https = require('http');
import serializeMdr from "./modules/serializer/serializeMdr";
import tagListGenerator from "./modules/tagListGenerator/tagListGenerator";
import serializeHouse from "./modules/serializer/serializeHouse";
import {IHouse} from "./modules/house/house";
import {POSITIONS} from "./modules/member/positions";

let mdr = new Mdr();
mdr.getFromFile();

async function getTagList(req, res): Promise<any> {
    console.log('Get taglist', req.body);
    const requestedDivisions = req.body.divisions;
    const roles = req.body.roles;

    if (requestedDivisions === undefined || typeof requestedDivisions !== 'object' || requestedDivisions.length == 0) {
        res.send('Invalid divisions sent');
        return;
    }
    let out = '';
    if (roles && roles.length > 0) {
        for (let i = 0; i < requestedDivisions.length; i++) {
            const requestedDivision = requestedDivisions[i];
            const div = new Division();
            await div.getFromFile(requestedDivision);
            out += generateDivisionTagList(div, roles);
        }
    }
    res.send(out);
}

async function splitter(): Promise<any> {
    if (Config.reloadData) {
        await mdr.splitter();
        const newMdr = new Mdr();
        await newMdr.getFromFile();
        console.log("Reloaded MDR..");
        mdr = newMdr;
    }
}

function getDivision(req, res): void {
    const params = req.params;
    console.log('Division', params);
    if (params.divisionName !== undefined) {
        const div = new Division();
        div.getFromFile(params.divisionName).then(() => {
            res.send(div);
        });
    }
    else {
        res.send({});
    }
}

function getDivisionMembers(req, res): void {
    const params = req.params;
    console.log('Division members', params);
    if (params.divisionName !== undefined) {
        const div = new Division();
        div.getFromFile(params.divisionName).then(() => {
            res.send(div.getMembers());
        });
    }
    else {
        res.send({});
    }
}

function getHouse(req, res): void {
    const params = req.params;
    console.log('House', params);
    if (params.houseName !== undefined) {
        const house = new House();
        house.getFromFile(params.houseName).then(() => {
            res.send(house);
        });
    }
    else {
        res.send({});
    }
}

async function getPlayer(req, res): Promise<any> {
    const params = req.params;
    const playerName = params.playerName;
    let playerId: number;
    if (req.query.id !== undefined) {
        playerId = parseInt(req.query.id);
    }
    else {
        playerId = getPlayerIdFromFile(playerName);
    }
    if (playerId <= 0) {
        // File doesn't exist, check if id is loadable from mdr members
        mdr.getMembers().forEach(member => {
            if (member.name.toLowerCase() === playerName.toLowerCase()) {
                playerId = member.id;
                console.log("Found ", playerName, playerId);
            }
        });
    }
    if (playerId <= 0) {
        // Member isn't loadable from mdr members, send error
        res.send({
            error: 1,
            message: "Cannot load player " + playerName
        });
    }
    else {
        res.send(await loadPlayerDataFromPage(playerName, playerId));
    }
}

function getPlayerIdFromFile(player: string = ''): number {
    const dataDirectory = 'data/';

    const files = fs
        .readdirSync(dataDirectory)
        .filter(fn => fn.startsWith('player-'))
        .filter(fn => fn.endsWith(player.toLowerCase() + '.json'));
    if (files.length === 1) {
        return parseInt(files[0].match(/player-(\d+)-.*?\.json/)[1]);
    }
    return 0;
}

async function loadPlayerDataFromPage(playerName: string, playerId: number) {
    const profileUrl = 'https://di.community/profile/' + playerId + '-' + playerName.toLowerCase();
    const options = {
        headers: {
            'User-Agent': 'Firefox', // 'Bl00D4NGEL\' User-Agent',
            'X-Info': 'This request is done by the user Bl00D4NGEL, feel free to contact me on the forums',
        },
        json: true,
    };

    const response = await fetch(profileUrl, options);
    const data = await response.text();
    const utils = new Utils();
    // utils.WriteFile('data/player-' + playerId + "-" + playerName + '.html', data);
    const profileParser = new ProfileParser();
    await profileParser.parse(data);
    utils.WriteFile('data/player-' + playerId + '-' + playerName + '.json', JSON.stringify(profileParser));
    return JSON.parse(JSON.stringify(profileParser));
}

function getMdr(req, res): void {
    console.log('MDR');
    res.send(mdr);
}

function getDivisionNames(req, res): void {
    console.log('Get division names');
    const dataDirectory = 'data/';
    var files = fs
        .readdirSync(dataDirectory)
        .filter(fn => fn.startsWith('division-'))
        .map(x => x.match(/division-(\w+)\.json/)[1]);
    res.send(files);
}

async function test(req, res): Promise<any> {
    const fileName = 'data/mdr.json';
    const utils = new Utils();
    try {
        const content = await utils.ReadFile(fileName);
        // const serializedMdr = serializeMdr(JSON.parse(content));
        const serializedHouse = serializeHouse(JSON.parse(await utils.ReadFile('data/house-javelin.json')));
        // const out = JSON.stringify(serializedMdr, null, 2);
        // res.send('<pre>' + JSON.stringify(serializedMdr.getMembers(), null, 2) + '</pre>');
        res.send('<pre>' + tagListGenerator(serializedHouse.getMembers(), POSITIONS) + '</pre>');
    }
    catch (ex) {
        console.error(ex);
    }
}


function getDefaultExpress(): any {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());
    app.listen(Config.port, function () {
        console.log(`${Config.name} listening on port ${Config.port} // http://localhost:${Config.port}`);
    });
    return app;
}

// Set up the express app
const app = getDefaultExpress();

splitter();
setInterval(splitter, Config.renewInterval);

/*
var options = {
  key: fs.readFileSync('/etc/letsencrypt/archive/mdr.d-peters.com/privkey1.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/archive/mdr.d-peters.com/cert1.pem')
};
*/


// Routes
app.get('/division/:divisionName', getDivision);
app.get('/divisionMembers/:divisionName', getDivisionMembers);
app.get('/house/:houseName', getHouse);
app.get('/player/:playerName', getPlayer);
app.get('/mdr', getMdr);
app.get('/get/divisionNames', getDivisionNames);
app.post('/get/tagList', getTagList);
app.get('/test', test);

https.createServer({}, app).listen(2048);
export default https;
