import { Team } from "./Team";

export class Player {
    id: number;
    imageUrl: string;
    name: string;
    nickName: string;
    birthDate: Date;
    jerseyName: string;
    jerseyNumber: number;
    kitSize: string;
    position: string;
    numOfGoals: number;
    numOfAssists: number;
    numOfYellowCards: number;
    numOfRedCards: number;
    numOfReceivedGoals: number;
    isGoalKeeper: boolean;
    weight: number;
    height: number;
    team: Team;

    constructor() {
        this.id = 0;
        this.name = '';
        this.nickName = '';
        this.birthDate = new Date();
        this.jerseyName = '';
        this.jerseyNumber = 0;
        this.kitSize = '';
        this.position = '';
        this.numOfGoals = 0;
        this.numOfAssists = 0;
        this.numOfYellowCards = 0;
        this.numOfRedCards = 0;
        this.numOfReceivedGoals = 0;
        this.isGoalKeeper = false;
        this.imageUrl = '';
        this.weight = 0;
        this.height = 0;
        this.team = new Team();
    }
}


