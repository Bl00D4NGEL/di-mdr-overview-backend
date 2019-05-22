import MdrParser from './modules/mdr-parser/mdr-parser';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config';
import Division from './modules/division';

// Set up the express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.listen(config.node_port, function() {
	console.log(`${config.app_name} listening on port ${config.node_port}`);
});

app.get('/tagDivisionMembers/:divisionName', (req, res) => {
	let params = req.params;
	console.log('Tag Division', params);
	GetDivision(params.divisionName, function(data) {
		try {
			let division = new Division(data);
			let output = '<div style="background-color: #171717; color: #a3a3a3"><h1>Division ' + params.divisionName + "</h1>";
			let template = '<a href="https://di.community/profile/##id##-##name##/" contenteditable="false" data-ipshover="" data-ipshover-target="https://di.community/profile/##id##-##name##/?do=hovercard" data-mentionid="##id##">@##name##</a>&#8203;&#8203;&#8203;&#8203;&#8203;&#8203;&#8203&nbsp';
			if(division.commanders.length > 0) {
				output += "Commander(s):<br>";
				for (let i = 0; i < division.commanders.length; i++) {
					let commander = division.commanders[i];
					output += template.replace(/##id##/g, commander.id).replace(/##name##/g, commander.name);
				}
				output += "<br>";
			}

			if(division.vices.length > 0) {
				output += "Vice(s):<br>";
				for (let i = 0; i < division.vices.length; i++) {
					let vice = division.vices[i];
					output += template.replace(/##id##/g, vice.id).replace(/##name##/g, vice.name);
				}
				output += "<br>";
			}

			if(division.teams.length > 0) {
				for (let i = 0; i < division.teams.length; i++) {
					let team = division.teams[i];
					output += "<h2 style='color: #1a7303'>" + team.name + "</h2>";
					if(team.teamLeaders.length > 0) {
						output += "Team Leader(s):<br>";
						for (let j = 0; j < team.teamLeaders.length; j++) {
							let teamLeader = team.teamLeaders[j];
							output += template.replace(/##id##/g, teamLeader.id).replace(/##name##/g, teamLeader.name) + "<br>";
						}
						output += "<br>";
					}
					
					if(team["2ICs"].length > 0) {
						output += "Second in charge(s) (2IC(s)):<br>";
						for (let j = 0; j < team["2ICs"].length; j++) {
							let secondInCharge = team["2ICs"][j];
							output += template.replace(/##id##/g, secondInCharge.id).replace(/##name##/g, secondInCharge.name) + "<br>";
						}
						output += "<br>";
					}

					if(team.rosters.length > 0) {
						for (let j = 0; j < team.rosters.length; j++) {
							let roster = team.rosters[j];
							output += "<h3 style='color: #025a00'>" + roster.name + "</h3>";
							if(roster.rosterLeaders.length > 0) {
								output += "Roster Leader(s):<br>";
								for (let k = 0; k < roster.rosterLeaders.length; k++) {
									let rosterLeader = roster.rosterLeaders[k];
									output += template.replace(/##id##/g, rosterLeader.id).replace(/##name##/g, rosterLeader.name);
								}
								output += "<br><br>";
							}

							if(roster.members.length > 0) {
								output += "Roster member(s):<br>";
								for (let k = 0; k < roster.members.length; k++) {
									let rosterMember = roster.members[k];
									output += template.replace(/##id##/g, rosterMember.id).replace(/##name##/g, rosterMember.name);
								}
								output += "<br><br>";
							}

							if(roster.subs.length) {
								output += "Sub player(s):<br>";
								for (let k = 0; k < roster.subs.length; k++) {
									let sub = roster.subs[k];
									output += template.replace(/##id##/g, sub.id).replace(/##name##/g, sub.name);
								}
								output += "<br><br>";
							}
						}
					}
				}
			}
			output += "</div>";
			res.send(output);
		}
		catch (ex) {
			console.log(ex);
		}
	});
});

app.get('/tagHouseMembers/:houseName', (req, res) => {

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
