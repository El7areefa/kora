import { Team } from "./Team";

export class Player {
    id: string;
    name: string;
    position: Position;
    numOfGoals: number;
    numOfAssists: number;
    numOfYellowCards: number;
    numOfRedCards: number;
    numOfReceivedGoals: number;
    age: number;
    imageUrl: string;
    goalKeeper: boolean;
    weight: number;
    height: number;
    team: Team;

    constructor() {
        this.id = '';
        this.name = '';
        this.position = positions[0];
        this.numOfGoals = 0;
        this.numOfAssists = 0;
        this.numOfYellowCards = 0;
        this.numOfRedCards = 0;
        this.numOfReceivedGoals = 0;
        this.age = 0;
        this.imageUrl = '';
        this.weight = 0;
        this.height = 0;
        this.team = new Team();
        this.goalKeeper = true;
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

  export const positions = [
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
  
  export type Position = typeof positions[number];

export interface PlayerRegister {
    firstName: string;
    secondName: string;
    email: string;
    password: string;
    phoneNumber: string;
    dateOfBirth: string;
    position: Position;
    height: number;
    weight: number;
}