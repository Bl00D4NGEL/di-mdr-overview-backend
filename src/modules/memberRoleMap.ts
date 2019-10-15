import Member from './memberTypes/member';
import Sub from './memberTypes/sub';
import RosterLeader from './memberTypes/rosterLeader';
import TeamLeader from './memberTypes/teamLeader';
import SecondInCharge from './memberTypes/secondInCharge';
import Commander from './memberTypes/commander';
import Vice from './memberTypes/vice';

export const roleMap = {
    DC: Commander,
    DV: Vice,
    TL: TeamLeader,
    '2IC': SecondInCharge,
    RL: RosterLeader,
    TM: Member,
    SUB: Sub,
};