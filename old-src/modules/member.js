class Member {
    constructor(memberData) {
        this.name = memberData.member_name;
        this.id = memberData.member_id;
    }

    formattedPositionName() {
        const roleMap = {
            'SUB': 'Sub Player',
            'TM': 'Member',
            'RL': 'Roster Leader',
            '2IC': '2IC',
            'TL': 'Team Leader',
            'DV': 'Vice',
            'DC': 'Commander',
            'HG': 'House General',
            'FC': 'First Commander'
        };
        if(roleMap[this.position] !== undefined) {
            return roleMap[this.position];
        }
        else {
            return this.position;
        }
    }
}

export default Member;