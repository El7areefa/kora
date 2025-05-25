import { Team } from "./Team";

export class Match {
    id: string;
    homeTeamId: string;
    awayTeamId: string;
    homeTeamScore: number;
    awayTeamScore: number;
    matchDate: Date;
    status: MatchStatus;
    league: string; // id need to check if we will need object or string
    matchName?: string;
    homeTeam: Team;
    awayTeam: Team;

    constructor() {
        this.id = '';
        this.homeTeamId = '';
        this.awayTeamId = '';
        this.homeTeamScore = 0;
        this.awayTeamScore = 0;
        this.matchDate = new Date();
        this.status = 'Scheduled';
        this.league = '';
        this.matchName = '';
        this.homeTeam = new Team();
        this.awayTeam = new Team();
    }
}

export const matchStatus = [
    'Scheduled',
    'Live',
    'Finished',
    'Cancelled',
] as const;

export type MatchStatus = typeof matchStatus[number];
