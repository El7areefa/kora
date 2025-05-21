import { League } from "./league";
import type { Match } from "./match";
import type { Player } from "./player";

export class Team {
  id: string;
  name: string;
  logoUrl?: string | null;
  numOfMatches: number;
  numOfSuccessMatches: number;
  numOfLossMatches: number;
  numOfDrawMatches: number;
  numOfPoints: number;
  leagueId: string;
  players?: Player[] | null;
  matches?: Match[] | null;
  registrationDate?: Date | null;

  constructor(id: number = 0, name: string = '', logoUrl: string = '', numOfSuccessMatches: number = 0, numOfLossMatches: number = 0, numOfDrawMatches: number = 0, numOfPoints: number = 0, leagueId: string = '', players: Player[] = [], matches: Match[] = [], registrationDate: Date = new Date()) {
    this.id = id;
    this.name = name;
    this.logoUrl = logoUrl;
    this.numOfSuccessMatches = numOfSuccessMatches;
    this.numOfLossMatches = numOfLossMatches;
    this.numOfDrawMatches = numOfDrawMatches;
    this.numOfPoints = 0;
    this.leagueId = '';
    this.players = [];
    this.matches = [];
    this.registrationDate = new Date();
  }
}


