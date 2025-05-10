import { Team } from "./Team";

export class Match {
    id: number;
    homeTeam: Team;
    awayTeam: Team;
    homeTeamScore: number;
    awayTeamScore: number;
    matchDate: Date;
    status: string;
    league: string; // id need to check if we will need object or string

    constructor() {
        this.id = 0;
        this.homeTeam = new Team();
        this.awayTeam = new Team();
        this.homeTeamScore = 0;
        this.awayTeamScore = 0;
        this.matchDate = new Date();
        this.status = '';
        this.league = '';
    }
}

