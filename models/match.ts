import { Team } from "./Team";

export class Match {
    id: string;
    homeTeamId: string;
    awayTeamId: string;
    homeTeamScore: number;
    awayTeamScore: number;
    matchDate: Date;
    status: string;
    league: string; // id need to check if we will need object or string
    matchName?: string;

    constructor() {
        this.id = '';
        this.homeTeamId = '';
        this.awayTeamId = '';
        this.homeTeamScore = 0;
        this.awayTeamScore = 0;
        this.matchDate = new Date();
        this.status = '';
        this.league = '';
        this.matchName = '';
    }
}

