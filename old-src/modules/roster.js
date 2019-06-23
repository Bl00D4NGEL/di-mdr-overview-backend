import Member from '../modules/member';

class Roster {
    constructor(rosterData) {
        this.members = [];
        if(rosterData.Members !== undefined) {
            for (let i = 0; i < rosterData.Members.length; i++) {
                let member = rosterData.Members[i];
                this.addRosterMember(member);                        
            }
        }

        this.subs = [];
        if(rosterData.Subs !== undefined) {
            for (let i = 0; i < rosterData.Subs.length; i++) {
                let sub = rosterData.Subs[i];
                this.addSubMember(sub);
            }
        }

        this.rosterLeaders = [];
        this.addRosterLeader(rosterData.RL);

        this.name = rosterData.name;
    }

    addRosterLeader(rosterLeaderData) {
        if(rosterLeaderData !== undefined) {
            if(Array.isArray(rosterLeaderData)) {
                for (let i = 0; i < rosterLeaderData.length; i++) {
                    let data = rosterLeaderData[i];
                    this.rosterLeaders.push(new Member(data));
                }
            }
            else{
                let rosterLeader = new Member(rosterLeaderData);
                this.rosterLeaders.push(rosterLeader);
            }
        }
    }

    addRosterMember(rosterMemberData) {
        let member = new Member(rosterMemberData);
        this.members.push(member);
    }

    addSubMember(subMemberData) {
        let sub = new Member(subMemberData);
        this.subs.push(sub);
    }

    getAllRosterMembers() {
        let members = [];
        if(this.rosterLeaders !== undefined) {
            members = members.concat(this.rosterLeaders);
        }
        if(this.members !== undefined) {
            members = members.concat(this.members);
        }
        if(this.subs !== undefined) {
            members = members.concat(this.subs);
        }
        return members;
    }
}

export default Roster;