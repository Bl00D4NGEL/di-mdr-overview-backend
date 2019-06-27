import express = require('express');
import cors = require('cors');
import bodyParser = require('body-parser');
import Config from './config';
import Division from './modules/division';
import * as fs from 'fs';
import Mdr from './modules/mdr';
import House from './modules/house';

// Set up the express app
const app = getDefaultExpress();
const mdr = new Mdr();

splitter();
setInterval(splitter, Config.renewInterval);

// Routes
app.get('/division/:divisionName', getDivision);
app.get('/house/:houseName', getHouse);
app.get('/player/:playerName', getPlayer);
app.get('/mdr', getMdr);
app.get('/get/divisionNames', getDivisionNames);
app.post('/get/tagList', getTagList);

async function getTagList(req, res) {
		console.log("Get taglist");
		let reqDivisions = req.body.divisions;
		let roles = req.body.roles;
		if(
			reqDivisions === undefined ||
			typeof reqDivisions !== 'object' ||
			reqDivisions.length == 0
		) {
			res.send("Invalid divisions sent");
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

function splitter() {
	if (!Config.LoadFromFile) {
		mdr.getFromWeb(true);
	}
}

function getDivision(req, res) {
	let params = req.params;
	console.log('Division', params);
	if (params.divisionName !== undefined) {
		let div = new Division();
		div.getFromFile(params.divisionName).then(() => {res.send(div)});
	}
	else {
		res.send({});
	}
}

function getHouse(req, res) {
	let params = req.params;
	console.log('House', params);
	if (params.houseName !== undefined) {
		let house = new House();
		house.getFromFile(params.houseName).then(() => {res.send(house)});
	}
	else {
		res.send({});
	}
}

function getPlayer(req, res) {
	let params = req.params;
	console.log("Player", params);
	res.send(params);
}

function getMdr(req, res) {
	console.log('MDR');
	res.send(mdr);
}

function getDivisionNames(req, res) {
	console.log("Get division names");
	let dataDirectory = "data/";
	var files = fs.readdirSync(dataDirectory)
		.filter(fn => fn.startsWith('division-'))
		.map(x => x.match(/division-(.*?)\.json/)[1]);
	res.send(files);
}

function getDefaultExpress() {
	let app = express();
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cors());
	app.listen(Config.port, function() {
		console.log(`${Config.name} listening on port ${Config.port} // https://localhost:${Config.port}`);
	});
	return app;
}

export default app;