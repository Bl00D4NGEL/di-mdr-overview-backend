import MdrParser from './modules/mdr-parser/mdr-parser';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config';
import Division from './modules/division';
import fs from 'fs';
import Member from '../dist/memberTypes/member';

// Set up the express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.listen(config.node_port, function() {
	console.log(`${config.app_name} listening on port ${config.node_port}`);
});

app.get('/division/:divisionName', (req, res) => {
	let params = req.params;
	console.log('Division', params);
	GetDivision(params.divisionName, function(data) {
		try {
			res.send(data);
		}
		catch (ex) {
			console.log(ex);
		}
	});
});

app.get('/house/:houseName', (req, res) => {
	let params = req.params;
	console.log('House', params);
	GetHouse(params.houseName, function(data) {
		try {
			res.send(data);
		}
		catch (ex) {
			console.log(ex);
		}
	});
});

app.get('/player/:playerName', (req, res) => {
	let params = req.params;
	console.log("Player", params);
	res.send(params);
});

app.get('/mdr', (req, res) => {
	console.log('MDR');
	GetMdr(function(data) {
		try {
			res.send(data);
		}
		catch (ex) {
			console.log(ex);
		}
	});
});

app.get('/get/divisionNames', (req, res) => {
	console.log("Get division names");
	let parser = new MdrParser();
	var files = fs.readdirSync(parser.dataDirectory)
		.filter(fn => fn.startsWith('division-'))
		.map(x => x.match(/division-(.*?)\.json/)[1]);
	res.send(files);
});

app.get('/test', (req, res) => {
	//let mem = new Member();
	let mem = new Member
});

app.post('/get/tagList', GetTagList);

async function GetTagList(req, res) {
		console.log("Get taglist");
		let reqDivisions = req.body.divisions;
		if(
			reqDivisions === undefined ||
			typeof reqDivisions !== 'object' ||
			reqDivisions.length == 0
		) {
			res.send("Invalid divisions sent");
			return;
		}
		let output = '';
		let roles = req.body.roles;
		for (let i = 0; i < reqDivisions.length; i++) {
			let reqDivision = reqDivisions[i];
			console.log("loading " + reqDivision);
			await GetDivision(reqDivision, function(data) {
				try {
					let division = new Division(data);
					let divisionTagList = GenerateTagListForDataAndRoles(division, roles);
					output += "<div><h1>Division "  + division.name + "</h1>";
					output += divisionTagList;
					if(division.teams.length > 0) {
						for (let i = 0; i < division.teams.length; i++) {
							let team = division.teams[i];
							if (team.name === 'Unassigned') {
								continue;
							}
							
							let teamTagList = GenerateTagListForDataAndRoles(team, req.body.roles);
							output += "<h2>" + team.name + "</h2>";
							output += teamTagList;
							if(team.rosters.length > 0) {
								for (let j = 0; j < team.rosters.length; j++) {
									let roster = team.rosters[j];
									let rosterTagList = GenerateTagListForDataAndRoles(roster, req.body.roles);
									if (rosterTagList !== '') {
										output += "<h3>" + roster.name + "</h3>";
										output += rosterTagList;
									}
								}
							}
						}
						output += "</div>";
					}
				}
				catch(ex) {
					console.error(ex);
				}
			});
		}
		
	res.send(output);
}

function GenerateTagListForDataAndRoles(data, roles) {
	const roleMap = {
		"DC": {
			name: "Division Commander",
			val: "commanders",
			prio: 6
		},
		"DV": {
			name: "Division Vice",
			val: "vices",
			prio: 5
		},
		"TL": {
			name: "Team Leader",
			val: "teamLeaders",
			prio: 4
		},
		"2IC": {
			name: "Second in Charge",
			val: "2ICs",
			prio: 3
		},
		"RL": {
			name: "Roster Leader",
			val: "rosterLeaders",
			prio: 2
		},
		"TM": {
			name: "Team Member",
			val: "members",
			prio: 1
		},
		"SUB": {
			name: "Sub Player",
			val: "subs",
			prio: 0
		}
	};
	// Sort role data by priority
	roles = roles.sort(function(a, b) {
		return roleMap[b].prio - roleMap[a].prio;
	});

	let output = '';
	
	let template = '<a href="https://di.community/profile/##id##-##name##/" contenteditable="false" data-ipshover="" data-ipshover-target="https://di.community/profile/##id##-##name##/?do=hovercard" data-mentionid="##id##">@##name##</a>&#8203;&#8203;&#8203;&#8203;&#8203;&#8203;&#8203&nbsp';
	for (let i=0; i < roles.length; i++) {
		let role = roles[i];
		let roleConfig = roleMap[role];
		if (roleConfig !== undefined) {
			if (data[roleConfig.val] !== undefined) {
				let vals = data[roleConfig.val];
				if (vals.length > 0) {
					output += "<span class='role'>" + roleConfig.name + (vals.length > 1 ? 's' : '') + '</span><br>';
					for (let j=0; j < vals.length; j++) {
						let val = vals[j];
						output += template.replace(/##id##/g, val.id).replace(/##name##/g, val.name);
					}
					output += '<br>';
				}
			}
		}
	}
	return output;
}

async function GetDivision(divisionName, callback) {
	let mdr = new MdrParser();
	let data = await mdr.GetDivisionFromFile(divisionName);
	callback(data);
}

async function GetHouse(houseName, callback) {
	let mdr = new MdrParser();
	let data = await mdr.GetHouseFromFile(houseName);
	callback(data);
}

async function GetMdr(callback) {
	let mdr = new MdrParser();
	let data = await mdr.GetMdrFromFile();
	callback(data);
}
let mdr = new MdrParser();
Splitter();

setInterval(function() {
	Splitter();
}, config.renew_interval);

async function Splitter() {
	let mdrData;
	if (config.load_from_file) {
		mdrData = await mdr.GetMdrFromFile();
	}
	else {
		mdrData = await mdr.GetMdrFromWeb();
		mdr.SplitMdrDataToFiles(mdrData);
	}
}
