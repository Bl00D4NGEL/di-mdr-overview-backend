import Roster from '../modules/roster';
import Member from '../modules/member';

class Team {
    constructor(teamData) {
        this.rosters = [];
        if(teamData.Rosters !== undefined) {
            for (let rosterName in teamData.Rosters) {
                let roster = teamData.Rosters[rosterName];
                this.addRoster(roster);
            }
        }

        this.teamLeaders = [];
        this.addTeamLeader(teamData.TL);

        this["2ICs"] = [];
        this.add2IC(teamData["2IC"]);

        this.name = teamData.name;
    }

    addTeamLeader(teamLeaderData) {
        if(teamLeaderData !== undefined) {
            if(Array.isArray(teamLeaderData)) {
                for (let i = 0; i < teamLeaderData.length; i++) {
                    let data = teamLeaderData[i];
                    this.teamLeaders.push(new Member(data));
                }
            }
            else{
                let teamLeader = new Member(teamLeaderData);
                this.teamLeaders.push(teamLeader);
            }
        }
    }

    add2IC(secondInChargeData) {
        if(secondInChargeData !== undefined) {
            if(Array.isArray(secondInChargeData)) {
                for (let i = 0; i < secondInChargeData.length; i++) {
                    let data = secondInChargeData[i];
                    this["2ICs"].push(new Member(data));
                }
            }
            else{
                let twoIC = new Member(secondInChargeData);
                this["2ICs"].push(twoIC);
            }
        }
    }

    addRoster(rosterData) {
        let roster = new Roster(rosterData);
        this.rosters.push(roster);
    }

    getAllTeamMembers() {
        let members = [];
        if(this.teamLeaders !== undefined) {
            members = members.concat(this.teamLeaders);
        }
        if(this["2ICs"] !== undefined) {
            members = members.concat(this["2ICs"]);
        }
        if(this.rosters !== undefined) {
            for (let i = 0; i < this.rosters.length; i++) {
                let roster = this.rosters[i];
                let rosterMembers = roster.getAllRosterMembers();
                members = members.concat(rosterMembers);
            }
        }
        return members;
    }
}

export default Team;