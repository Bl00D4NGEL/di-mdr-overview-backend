import * as fs from 'fs';
class Utils {
    async ReadFile(path: string, opts = 'utf8'): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.readFile(path, opts, (err: any, data: any) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    ReadFileSync(path: string, opts = 'utf8'): string {
        return fs.readFileSync(path, opts);
    }

    async WriteFile(path: string, data: any, opts = 'utf8'): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, data, opts, (err: any) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }

    async LogRequest({ logPath, ...loggableData }): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.readFile(logPath, (err, data) => {
                const logData = { ...loggableData, date: new Date().toISOString() };
                if (!err) {
                    const currentData: Array<any> = JSON.parse(data.toString());
                    currentData.push(logData);
                    fs.writeFile(logPath, JSON.stringify(currentData), err => {
                        if (err) reject(err);
                        resolve();
                    });
                } else {
                    fs.writeFile(logPath, JSON.stringify([logData]), err => {
                        if (err) reject(err);
                        resolve();
                    });
                }
            });
        });
    }
}
export default Utils;
