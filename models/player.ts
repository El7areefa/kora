import { Team } from "./Team";

export class Player {
    id: number;
    imageUrl: string;
    name: string;
    nickName: string;
    birthDate: Date;
    jerseyName: string;
    jerseyNumber: number;
    kitSize: KitSize;
    position: Position;
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
        this.kitSize = kitSizes[0];
        this.position = position[0];
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


export const kitSizes = [
    'small',
    'medium',
    'large',
    'xlarge',
    'xxlarge',
    'xxxlarge',
    'xxxxlarge',
    'xxxxxlarge',
  ] as const;
  
  export type KitSize = typeof kitSizes[number];

  export const position = [
    'GK',
    'CB',
    'LB',
    'RB',
    'LWB',
    'RWB',
    'CDM',
    'CM',
    'CAM',
    'LM',
    'RM',
    'LW',
    'RW',
    'CF',
    'ST',
    'SS',
  ] as const;
  
  export type Position = typeof position[number];
  