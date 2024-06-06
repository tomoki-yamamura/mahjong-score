import UserScoresMap from "../collection/userScoreMap";

export class Row {
  public readonly Id: number;
  public readonly Date: string;
  public readonly Timestamp: string;
  public readonly Users: UserScoresMap;

  constructor(Id: number, Date: string, Timestamp: string, scoreMap: UserScoresMap) {
    this.Id = Id;
    this.Date = Date;
    this.Timestamp = Timestamp;
    this.Users =scoreMap
  }
}
