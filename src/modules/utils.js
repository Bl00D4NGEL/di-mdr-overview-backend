import fs from 'fs';
class Utils {
	TwoDigits(d) {
		if (d >= 0 && d < 10) return '0' + d.toString();
		if (d > -10 && d < 0) return '-0' + (-1 * d).toString();
		return d.toString();
	}

	MysqlNow() {
		return {
			toSqlString: function() {
				return 'NOW()';
			},
		};
	}
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
