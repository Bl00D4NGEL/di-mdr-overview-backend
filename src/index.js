import MdrParser from './modules/mdr-parser/mdr-parser';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config';

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
