import { League } from "./league";
import type { Match } from "./match";
import type { Player } from "./player";

export class Team {
  id: number;
  name: string;
  logoUrl: string;
  numberOfSucessMatches: number;
  numberOfDefeatsMatches: number;
  numberOfDrawsMatches: number;
  numberOfPoints: number;
  league: League;
  players: Player[];
  matches: Match[];
  registrationDate: Date;

  constructor(id: number = 0, name: string = '', logoUrl: string = '', numberOfSucessMatches: number = 0, numberOfDefeatsMatches: number = 0, numberOfDrawsMatches: number = 0, numberOfPoints: number = 0, league: League = new League(), players: Player[] = [], matches: Match[] = [], registrationDate: Date = new Date()) {
    this.id = id;
    this.name = name;
    this.logoUrl = logoUrl;
    this.numberOfSucessMatches = numberOfSucessMatches;
    this.numberOfDefeatsMatches = numberOfDefeatsMatches;
    this.numberOfDrawsMatches = numberOfDrawsMatches;
    this.numberOfPoints = 0;
    this.league = new League();
    this.players = [];
    this.matches = [];
    this.registrationDate = new Date();
  }
}


