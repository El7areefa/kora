import { Match } from "./match";
import { Team } from "./Team";

export class League {
    id: number;
    name: string;
    logo: string;
    teams: Team[];
    matches: Match[];

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.logo = '';
        this.teams = [];
        this.matches = [];
    }
}

