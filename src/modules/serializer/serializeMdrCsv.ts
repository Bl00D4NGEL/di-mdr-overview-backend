import Mdr, {IMdr} from "../mdr/mdr";
import Utils from "../utils/utils";
import House from "../house/house";
import Member, {IMember} from "../member/member";
import Division, {IDivision} from "../division/division";
import Team, {ITeam} from "../team/team";
import Roster, {IRoster} from "../roster/roster";

export default function serializeMdrCsv(fileName: string): IMdr {
    const mdr = new Mdr();
    const utils = new Utils();
    const mdrFromFile = utils.ReadFileSync(fileName);
    const rows = mdrFromFile.split("\n");
    const headers = rows[0].split(",");
    const groupedByHouse = groupByValueAtFieldIndex(
        rows.slice(1),
        headers.indexOf('house'),
        value => value !== 'Leadership'
    );

    const createMember = memberRow => createMemberFromRow(memberRow, headers);

    Object.values(groupedByHouse).forEach(houseRows => mdr.addHouse(serializeHouse(houseRows, createMember, headers)));

    return mdr;
}

const serializeHouse = (houseRows: string[], createMember: Function, headers: string[]) => {
    const house = new House();
    house.setHouseName(houseRows[0].split(",")[headers.indexOf('house')]);

    filterByValueAtFieldIndex(
        houseRows,
        headers.indexOf('position'),
        value => value === 'HG'
    ).map(row => {
        house.addHouseLeader(createMember(row));
    });

    filterByValueAtFieldIndex(
        houseRows,
        headers.indexOf('position'),
        value => value === 'FC'
    ).map(row => {
        house.addHouseVice(createMember(row));
    });

    const groupedByDivision = groupByValueAtFieldIndex(
        houseRows,
        headers.indexOf('division'),
        (value: string) => value.startsWith('DI')
    );
    Object.values(groupedByDivision).forEach(divisionRows => house.addDivision(serializeDivision(divisionRows, createMember, headers)));
    return house;
};

const serializeDivision = (divisionRows: string[], createMember: Function, headers: string[]): IDivision => {
    const division = new Division();
    division.setName(divisionRows[0].split(",")[headers.indexOf('division')]);

    filterByValueAtFieldIndex(
        divisionRows,
        headers.indexOf('position'),
        value => value === 'DC'
    ).map(row => {
        division.addDivisionLeader(createMember(row));
    });

    filterByValueAtFieldIndex(
        divisionRows,
        headers.indexOf('position'),
        value => value === 'DV'
    ).map(row => {
        division.addDivisionVice(createMember(row));
    });

    const groupedByTeam = groupByValueAtFieldIndex(
        divisionRows,
        headers.indexOf('team'),
    );
    Object.values(groupedByTeam).forEach(teamRows => division.addTeam(serializeTeam(teamRows, createMember, headers)));

    return division;
}

const serializeTeam = (teamRows: string[], createMember: Function, headers: string[]): ITeam => {
    const team = new Team();
    team.setName(teamRows[0].split(",")[headers.indexOf('team')]);

    filterByValueAtFieldIndex(
        teamRows,
        headers.indexOf('position'),
        value => value === 'TL'
    ).map(row => {
        team.addTeamLeader(createMember(row));
    });

    filterByValueAtFieldIndex(
        teamRows,
        headers.indexOf('rank'),
        value => value === 'Away'
    ).map(row => {
        team.addOnAway(createMember(row));
    });

    filterByValueAtFieldIndex(
        teamRows,
        headers.indexOf('rank'),
        value => value === 'Probation'
    ).map(row => {
        team.addOnProbation(createMember(row));
    });

    const groupedByRoster = groupByValueAtFieldIndex(
        teamRows,
        headers.indexOf('roster'),
    );
    Object.values(groupedByRoster).forEach(rosterRows => team.addRoster(serializeRoster(rosterRows, createMember, headers)));

    return team;
};

const serializeRoster = (rosterRows: string[], createMember: Function, headers: string[]): IRoster => {
    const roster = new Roster();

    filterByValueAtFieldIndex(
        rosterRows,
        headers.indexOf('position'),
        value => value === 'RL'
    ).map(row => {
        roster.addRosterLeader(createMember(row));
    });

    filterByValueAtFieldIndex(
        rosterRows,
        headers.indexOf('rank'),
        value => value === 'Member'
    ).map(row => {
        roster.addMember(createMember(row));
    });

    filterByValueAtFieldIndex(
        rosterRows,
        headers.indexOf('rank'),
        value => !['Member', 'Inactive'].includes(value)
    ).map(row => {
        roster.addAddition(createMember(row));
    });

    return roster;
};

const filterByValueAtFieldIndex = (rows: string[], fieldIndex: number, filterCallback?: Function): string[] => {
    const values = [];
    rows.forEach(row => {
        const rowParts = row.split(",");
        if (!rowParts[fieldIndex]) {
            return;
        }

        if (filterCallback !== undefined && !filterCallback(rowParts[fieldIndex])) {
            return;
        }

        values.push(row);
    });
    return values;
};

const groupByValueAtFieldIndex = (rows: string[], fieldIndex: number, filterCallback?: Function): { [groupName: string]: string[] } => {
    const groups = {};
    rows.forEach(row => {
        const rowParts = row.split(",");
        if (!rowParts[fieldIndex]) {
            return;
        }

        if (filterCallback !== undefined && !filterCallback(rowParts[fieldIndex])) {
            return;
        }

        if (!groups[rowParts[fieldIndex]]) {
            groups[rowParts[fieldIndex]] = [];
        }

        groups[rowParts[fieldIndex]].push(row);
    });
    return groups;
}

const createMemberFromRow = (row: string, headers: string[]): IMember =>  {
    const rowFields = row.split(",");
    const member = new Member();
    member.setDivision(rowFields[headers.indexOf('division')]);
    member.setHouse(rowFields[headers.indexOf('house')]);
    member.setId(parseInt(rowFields[headers.indexOf('id')]));
    member.setName(rowFields[headers.indexOf('name')]);
    member.setPosition(rowFields[headers.indexOf('position')]);
    member.setRank(rowFields[headers.indexOf('rank')]);
    member.setRoster(rowFields[headers.indexOf('roster')]);
    member.setTeam(rowFields[headers.indexOf('team')]);
    return member;
}