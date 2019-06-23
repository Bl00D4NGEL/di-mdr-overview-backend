import Team from '../modules/team';
import Member from '../modules/member';

class Division {
    constructor(data) {
        this.teams = [];
        if(data.Teams !== undefined) {
            for (let teamName in data.Teams) {
                let team = data.Teams[teamName];
                team.division = this.name;
                this.addTeam(team);
            }
        }

        this.vices = [];
        this.addVice(data.Vice);

        this.commanders = [];
        this.addCommander(data.Commander);

        this.name = data.name;
    }

    addVice(viceData) {
        if(viceData !== undefined) {
            if(Array.isArray(viceData)) {
                for (let i = 0; i < viceData.length; i++) {
                    let data = viceData[i];
                    this.vices.push(new Member(data));
                }
            }
            else{
                let vice = new Member(viceData);
                this.vices.push(vice);
            }
        }
    }
    
    addCommander(commanderData) {
        if(commanderData !== undefined) {
            if(Array.isArray(commanderData)) {
                for (let i = 0; i < commanderData.length; i++) {
                    let data = commanderData[i];
                    this.commanders.push(new Member(data));
                }
            }
            else{
                let commander = new Member(commanderData);
                this.commanders.push(commander);
            }
        }
    }

    addTeam(teamData) {
        let team = new Team(teamData);
        this.teams.push(team);
    }

    getAllDivisionMembers() {
        let members = [];
        if(this.commanders !== undefined) {
            members = members.concat(this.commanders);
        }
        if(this.vices !== undefined) {
            members = members.concat(this.vices);
        }
        if(this.teams !== undefined) {
            for (let i = 0; i < this.teams.length; i++) {
                let team = this.teams[i];
                let teamMembers = team.getAllTeamMembers();
                members = members.concat(teamMembers);                        
            }
        }
        return members;
    }

    getAllDivisionMembersLinks() {
        let members = [];
        if(this.commanders !== undefined) {
            members = members.concat(this.commanders);
        }
        if(this.vices !== undefined) {
            members = members.concat(this.vices);
        }
        if(this.teams !== undefined) {
            for (let i = 0; i < this.teams.length; i++) {
                let team = this.teams[i];
                let teamMembers = team.getAllTeamMembers();
                members = members.concat(teamMembers);                        
            }
        }
        return members;
    }
}
export default Division;