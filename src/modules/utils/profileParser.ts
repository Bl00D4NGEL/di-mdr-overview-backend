enum GameTypes { 'PRIMARY', 'SECONDARY', 'OTHER' };

interface Game {
    name: string;
    type: GameTypes;
}


export default class ProfileParser {
    gameData: {
        Primary: Game,
        Secondary: Game,
        OtherGames: Array<Game>
    } = {
        Primary: {name: 'None', type: GameTypes.PRIMARY},
        Secondary: {name: 'None', type: GameTypes.SECONDARY},
        OtherGames: []
    };
    house = '';
    division = '';
    team = '';
    roster = '';
    cohort = '';

    communication = {
        Discord: '',
        Steam: '',
        LoL: '',
        Blizzard: '',
        Origin: '',
        EpicGames: '',
        Twitch: '',
        Youtube: ''
    };

    constructor(data?: string) {
        if (data !== undefined) {
            this.parse(data);
        }
    }

    parse(data: string): void {
        // Game data
        this.gameData.Primary.name = this.getGenericData(data, "Primary");
        this.gameData.Secondary.name = this.getGenericData(data, "Secondary");
        let otherGameData = this.getGenericData(data, "Other Games");
        
        if (otherGameData) {
            let gameMatches = otherGameData[1].split("<br>");
            for (let i = 0; i < gameMatches.length; i++) {
                const gameName = gameMatches[i];
                let gameObject: Game = {
                    name: gameName,
                    type: GameTypes.OTHER
                }
                this.gameData.OtherGames.push(gameObject);            
            }
        }

        this.house = this.getGenericData(data, "House");
        this.division = this.getGenericData(data, "Division");
        this.team = this.getGenericData(data, "Team");
        this.roster = this.getGenericData(data, "Roster");
        this.cohort = this.getGenericData(data, "Cohort");

        this.communication.Blizzard = this.getGenericData(data, "Blizzard");
        this.communication.Discord = this.getGenericData(data, "Discord ID");
        this.communication.EpicGames = this.getGenericData(data, "Epic Games");
        this.communication.LoL = this.getGenericData(data, "LoL");
        this.communication.Origin = this.getGenericData(data, "Origin");
        this.communication.Steam = this.getGenericData(data, "Steam");
        if (this.communication.Steam) {
            this.communication.Steam = this.communication.Steam.replace(/http:\/\/steamcommunity.com\/.*?\//, "");
        }
        this.communication.Twitch = this.getGenericData(data, "Twitch");
        this.communication.Youtube = this.getGenericData(data, "Youtube");
    }

    getGenericData(data: string, type: string) {
        let genericListPattern = '<li class="ipsDataItem ipsType_break">[\\s\\S]*?<span class="ipsDataItem_generic ipsDataItem_size3 ipsType_break"><strong>##type##<\\/strong><\\/span>[\\s\\S]*?<div class="ipsDataItem_generic"><div class="ipsType_break ipsContained">(.*?)<\\/div><\\/div>[\\s\\S]*?<\\/li>';
        let regexString = genericListPattern.replace("##type##", type);
        let regex = new RegExp(regexString);
        let match = regex.exec(data);
        if (match !== null) {
            return match[1];
        }
        else {
            return undefined;
        }
    }
}