import { Match } from "./match";
import { Team } from "./Team";

export class League {
    id: string;
    name: string;
    imageUrl: string;
    teams: Team[];
    matches: Match[];

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.imageUrl = '';
        this.teams = [];
        this.matches = [];
    }
}


export interface LeaguePayload {
    name: string;
    imageUrl: string;
}

