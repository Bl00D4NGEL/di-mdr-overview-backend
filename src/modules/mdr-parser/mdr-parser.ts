import Utils from '../utils';
import fetch from 'node-fetch';

class MdrParser {
	mdrUrl: string;
	dataDirectory: string;
	mdrFile: string;
	divisionPrefix: string;
	housePrefix: string;
	playerPrefix: string;
	utils: Utils;
	mdrData: any;

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
}
export default MdrParser;
