import Member, {IMember} from "../member/member";
import {diMember} from "../member/diMembers";

export default function serializeMember(memberData: diMember): IMember {
    const member = new Member();
    member.setName(memberData.member_name);
    member.setPosition(memberData.position);
    member.setRank(memberData.member_rank);
    member.setId(memberData.member_id);
    member.setHouse(memberData.house);
    member.setDivision(memberData.division);
    member.setTeam(memberData.team);
    member.setRoster(memberData.roster);
    return member;
}
