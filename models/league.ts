import { Match } from "./match";
import { Team } from "./Team";

export class League {
    id: number;
    name: string;
    logo: string;
    teams: Team[];
    matches: Match[];

    constructor() {
        this.id = 0;
        this.name = '';
        this.logo = '';
        this.teams = [];
        this.matches = [];
    }
}

