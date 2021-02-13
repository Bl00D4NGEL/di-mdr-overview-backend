import * as fs from 'fs';

interface LoggableData {
    divisions: string[],
    positions: string[],
    ranks: string[],
    memberCount: number,
    date: string
}

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

    async LogRequest({logPath, ...loggableData}): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.readFile(logPath, (err, data) => {
                const logData: LoggableData = {
                    divisions: [],
                    ranks: [],
                    positions: [],
                    memberCount: 0,
                    date: new Date().toISOString(),
                    ...loggableData
                };
                if (!err) {
                    try {
                        const currentData: Array<any> = JSON.parse(data.toString());
                        currentData.push(logData);
                        fs.writeFile(logPath, JSON.stringify(currentData), err => {
                            if (err) reject(err);
                            resolve();
                        });
                    } catch (exception) {
                        console.log('failed json parse: ' + exception.toString());
                        console.log('tried to parse: ' + data.toString());
                    }
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
