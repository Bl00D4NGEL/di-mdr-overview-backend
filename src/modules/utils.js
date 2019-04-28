import fs from 'fs';
class Utils {
	async ReadFile(path, opts = 'utf8') {
		return new Promise((resolve, reject) => {
			fs.readFile(path, opts, (err, data) => {
				if (err) reject(err);
				else resolve(data);
			});
		});
	}
	async WriteFile(path, data, opts = 'utf8') {
		return new Promise((resolve, reject) => {
			fs.writeFile(path, data, opts, (err) => {
				if (err) reject(err);
				else resolve();
			});
		});
	}
}
export default Utils;
