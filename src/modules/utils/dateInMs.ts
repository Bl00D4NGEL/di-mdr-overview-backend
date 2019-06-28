export default class DateInMs {
    milliseconds: number = 0;
    private _dateObj: Date;

    constructor(milliseconds: number) {
        this.milliseconds = milliseconds;
        this._dateObj = new Date(milliseconds * 1000);
    }

    differenceInDaysToToday(): number {
        let today = new Date();
        let diffDate = this._dateObj;
        let oneDay = 1000 * 60 * 60 * 24;
        let todayMs = today.getTime();
        let diffDateMs = diffDate.getTime();
        let diffMs = todayMs - diffDateMs;
        let diffDays = Math.floor(diffMs/oneDay);
        if (diffDays < 0) {
            diffDays = 0;
        }
        return diffDays;
    }

    toString(): string {
        return this._dateObj.toString();
    }
}