import Utils from '../utils';
import fetch from 'node-fetch';

class MdrParser {
	constructor() {
		this.mdrUrl = 'https://di.community/mdr?as_data_structure';
		this.dataDirectory = 'data';
		this.mdrFile = this.dataDirectory + '/mdr.json';
		this.divisionPrefix = 'division-';
		this.housePrefix = 'house-';
		this.playerPrefix = 'player-';
		this.utils = new Utils();
	}
	async GetMdrFromWeb() {
		let options = {
			headers: {
				'User-Agent': 'Firefox', // 'Bl00D4NGEL\' User-Agent',
				'X-Info': 'This request is done by the user Bl00D4NGEL, feel free to contact me on the forums',
			},
			json: true,
		};
		let self = this;
		let response = await fetch(this.mdrUrl, options);
		self.mdrData = response.json();
		return self.mdrData;
	}

	async GetMdrFromFile() {
		let self = this;
		try {
			self.mdrData = await self.utils.ReadFile(self.mdrFile);
		}
		catch (ex) {
			self.mdrData = JSON.stringify({
				error: 'MDR data not be found',
			});
			console.error(ex);
		}
		return self.mdrData;
	}

	async GetHouseFromFile(houseName) {
		let house;
		let fileName = this.GetFileNameForHouseName(houseName);
		try {
			house = await this.utils.ReadFile(fileName);
		}
		catch (ex) {
			house = JSON.stringify({
				error: 'House ' + houseName + ' not found',
			});
			console.error(ex);
		}
		let parsedHouse = JSON.parse(house);
		return parsedHouse;
	}

	async GetDivisionFromFile(divisionName) {
		let division;
		let fileName = this.GetFileNameForDivisionName(divisionName);
		try {
			division = await this.utils.ReadFile(fileName);
		}
		catch (ex) {
			division = JSON.stringify({
				error: 'Division ' + divisionName + ' not found',
			});
			console.error(ex);
		}
		let parsedDivision = JSON.parse(division);
		return parsedDivision;

	}

	GetHouseDataFromMdrData(mdrData) {
		mdrData = this.GetCorrectMdrData(mdrData);
		let houseNames = this.GetHouseNameFromMdrData(mdrData);
		let houses = [];
		for (let i = 0; i < houseNames.length; i++) {
			let houseName = houseNames[i];
			let house = mdrData[houseName];
			house.name = houseName.replace('House - ', '');
			houses.push(mdrData[houseName]);
		}
		return houses;
	}

	GetHouseNameFromMdrData(mdrData) {
		mdrData = this.GetCorrectMdrData(mdrData);
		let houseNames = [];
		for (let houseName in mdrData) {
			if (houseName === 'Special') {
				continue;
			}
			houseNames.push(houseName);
		}
		return houseNames;
	}

	GetCorrectMdrData(mdrData) {
		if (mdrData === undefined && this.mdrData !== undefined) {
			mdrData = this.mdrData;
		}
		else if (mdrData === undefined) {
			throw new Error('MDR data needs to be specified');
		}
		return mdrData;
	}

	GetDivisionNamesFromMdrData(mdrData) {
		mdrData = this.GetCorrectMdrData(mdrData);
		let houses = this.GetHouseDataFromMdrData(mdrData);
		console.log(houses);
		let divisions = [];
		for (let i = 0; i < houses.length; i++) {
			let house = houses[i];
			let divsFromHouse = this.GetDivisionNamesFromHouseData(house);
			divisions = divisions.concat(divsFromHouse);
		}
		return divisions;
	}

	GetDivisionDataFromMdrData(mdrData) {
		mdrData = this.GetCorrectMdrData(mdrData);
		let houses = this.GetHouseDataFromMdrData(mdrData);
		let divisions = [];
		for (let i = 0; i < houses.length; i++) {
			let house = houses[i];
			let divsFromHouse = this.GetDivisionDataFromHouseData(house);
			divisions = divisions.concat(divsFromHouse);
		}
		return divisions;
	}

	GetDivisionNamesFromHouseData(houseData) {
		if (houseData === undefined) {
			throw new Error('House data needs to be specified');
		}
		let divisions = [];
		for (let key in houseData) {
			if (key === 'Divisions') {
				for (let divisionName in houseData[key]) {
					divisions.push(divisionName);
				}
			}
		}
		return divisions;
	}

	GetDivisionDataFromHouseData(houseData) {
		if (houseData === undefined) {
			throw new Error('House data needs to be specified');
		}
		let divisions = [];
		for (let key in houseData) {
			if (key === 'Divisions') {
				for (let divisionName in houseData[key]) {
					let div = houseData[key][divisionName];
					div.name = divisionName.replace('DI-', '');
					div.House = houseData.name;
					divisions.push(div);
				}
			}
		}
		return divisions;
	}

	SplitMdrDataToFiles(mdrData) {
		mdrData = this.GetCorrectMdrData(mdrData);
		try {
			this.SaveMdrDataToFile(mdrData);
			let houses = this.GetHouseDataFromMdrData(mdrData);
			let divisions = this.GetDivisionDataFromMdrData(mdrData);
			this.SaveHouseDataToFiles(houses);
			this.SaveDivisionDataToFiles(divisions);
		}
		catch (ex) {
			console.log(ex);
		}
	}

	SaveMdrDataToFile(mdrData) {
		try {
			let fields = [
				this.dataDirectory +
				'/' +
				'mdr.json',
			];
			let fileName = fields.join('');
			this.utils.WriteFile(fileName, JSON.stringify(mdrData));
		}
		catch (ex) {
			console.log(ex);
		}
	}

	SaveHouseDataToFiles(houseData) {
		for (let i = 0; i < houseData.length; i++) {
			let house = houseData[i];
			let fileName = this.GetFileNameForHouseName(house.name);
			try {
				this.utils.WriteFile(fileName, JSON.stringify(house));
			}
			catch (ex) {
				console.error(ex);
			}
		}
	}

	GetFileNameForHouseName(houseName) {
		let fields = [
			this.dataDirectory +
			'/' +
			this.housePrefix +
			houseName.toLowerCase() +
			'.json',
		];
		return fields.join('');
	}

	SaveDivisionDataToFiles(divisionData) {
		for (let j = 0; j < divisionData.length; j++) {
			let division = divisionData[j];
			let fileName = this.GetFileNameForDivisionName(division.name);
			try {
				this.utils.WriteFile(fileName, JSON.stringify(division));
			}
			catch (ex) {
				console.error(ex);
			}
		}
	}

	GetFileNameForDivisionName(divisionName) {
		let fields = [
			this.dataDirectory +
			'/' +
			this.divisionPrefix +
			divisionName.toLowerCase() +
			'.json',
		];
		return fields.join('');
	}
}
export default MdrParser;
