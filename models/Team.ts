import { League } from "./league";
import type { Match } from "./match";
import type { Player } from "./player";

export class Team {
  id: string;
  name: string;
  logoUrl: string;
  numOfMatches: number;
  numOfSuccessMatches: number;
  numOfLossMatches: number;
  numOfDrawMatches: number;
  numOfPoints: number;
  leagueId: string;
  players?: Player[];
  matches?: Match[];
  registrationDate?: Date;

  constructor(leagueId: string = '') {
    this.id = '';
    this.name = '';
    this.logoUrl = '';
    this.numOfMatches = 0;
    this.numOfSuccessMatches = 0;
    this.numOfLossMatches = 0;
    this.numOfDrawMatches = 0;
    this.numOfPoints = 0;
    this.leagueId = leagueId;
    this.players = [];
    this.matches = [];
    this.registrationDate = new Date();
  }
}


export interface TeamRequest {
  name: string;
  logoUrl: string;
  numOfMatches: number;
  numOfSuccessMatches: number;
  numOfLossMatches: number;
  numOfDrawMatches: number;
  numOfPoints: number;
}

