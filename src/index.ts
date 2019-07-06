import express = require('express');
import cors = require('cors');
import bodyParser = require('body-parser');
import Config from './config';
import Division from './modules/division';
import * as fs from 'fs';
import Mdr from './modules/mdr';
import House from './modules/house';
import Member from './modules/memberTypes/member';
import ProfileParser from './modules/utils/profileParser';
import * as fetch from 'node-fetch';
import Utils from './modules/utils';

let mdr = new Mdr();
mdr.getFromFile();

async function getTagList(req, res): Promise<any> {
    console.log('Get taglist', req.body);
    let reqDivisions = req.body.divisions;
    let roles = req.body.roles;
    if (reqDivisions === undefined || typeof reqDivisions !== 'object' || reqDivisions.length == 0) {
        res.send('Invalid divisions sent');
        return;
    }
    let out = '';
    if (roles && roles.length > 0) {
        for (let i = 0; i < reqDivisions.length; i++) {
            let reqDivision = reqDivisions[i];
            let div = new Division();
            await div.getFromFile(reqDivision);
            out += div.generateTagListForRoles(roles);
        }
    }
    res.send(out);
}

async function splitter(): Promise<any> {
    if (Config.reloadData) {
        await mdr.splitter();
        let newMdr = new Mdr();
        await newMdr.getFromFile();
        console.log("Reloaded MDR..", newMdr);
        mdr = newMdr;
    }
}

function getDivision(req, res): void {
    let params = req.params;
    console.log('Division', params);
    if (params.divisionName !== undefined) {
        let div = new Division();
        div.getFromFile(params.divisionName).then(() => {
            res.send(div);
        });
    }
    else {
        res.send({});
    }
}

function getHouse(req, res): void {
    let params = req.params;
    console.log('House', params);
    if (params.houseName !== undefined) {
        let house = new House();
        house.getFromFile(params.houseName).then(() => {
            res.send(house);
        });
    }
    else {
        res.send({});
    }
}

async function getPlayer(req, res): Promise<any> {
    let params = req.params;
    let allMembers: Array<Member>;
    let playerName = req.params.playerName;
    let playerId: number;
    if (req.query.id !== undefined) {
        playerId = parseInt(req.query.id);
    }
    else {
        playerId = getPlayerIdFromFile(playerName);
    }
    if (playerId <= 0) {
        // File doesn't exist, check if id is loadable from mdr members
        allMembers = mdr.getMembers();
        for (let i = 0; i < allMembers.length; i++) {
            const member = allMembers[i];
            if (member.name.toLowerCase() === playerName.toLowerCase()) {
                playerId = member.id;
                console.log("Found ", playerName, playerId);
                break;
            }
        }
    }
    if (playerId <= 0) {
        // Member isn't loadable from mdr members, send error
        let errorObject = {
            error: 1,
            message: "Cannot load player " + playerName
        };
        res.send(errorObject);
        return;
    }
    else {
        let playerData = await loadPlayerDataFromPage(playerName, playerId);
        res.send(playerData);
    }
}

function getPlayerIdFromFile(player: string = ''): number {
    let dataDirectory = 'data/';
    
    var files = fs
        .readdirSync(dataDirectory)
        .filter(fn => fn.startsWith('player-'))
        .filter(fn => fn.endsWith(player.toLowerCase() + '.json'));
    if (files.length === 1) {
        let id = files[0].match(/player-(\d+)-.*?\.json/)[1];
        return parseInt(id);
    }
    return 0;
}

async function loadPlayerDataFromPage(playerName: string, playerId: number) {
    let profileUrl = 'https://di.community/profile/' + playerId + '-' + playerName.toLowerCase();
    let options = {
        headers: {
            'User-Agent': 'Firefox', // 'Bl00D4NGEL\' User-Agent',
            'X-Info': 'This request is done by the user Bl00D4NGEL, feel free to contact me on the forums',
        },
        json: true,
    };

    let response = await fetch(profileUrl, options);
    let data = await response.text();
    let utils = new Utils();
    // utils.WriteFile('data/player-' + playerId + "-" + playerName + '.html', data);
    let profileParser = new ProfileParser();
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
    let dataDirectory = 'data/';
    var files = fs
        .readdirSync(dataDirectory)
        .filter(fn => fn.startsWith('division-'))
        .map(x => x.match(/division-(\w+)\.json/)[1]);
    res.send(files);
}

function getDefaultExpress(): any {
    let app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());
    app.listen(Config.port, function() {
        console.log(`${Config.name} listening on port ${Config.port} // http://localhost:${Config.port}`);
    });
    return app;
}

// Set up the express app
const app = getDefaultExpress();

splitter();
setInterval(splitter, Config.renewInterval);

// Routes
app.get('/division/:divisionName', getDivision);
app.get('/house/:houseName', getHouse);
app.get('/player/:playerName', getPlayer);
app.get('/mdr', getMdr);
app.get('/get/divisionNames', getDivisionNames);
app.post('/get/tagList', getTagList);

export default app;
