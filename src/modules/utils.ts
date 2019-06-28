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
    async WriteFile(path: string, data: any, opts = 'utf8'): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, data, opts, (err: any) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }
}
export default Utils;
