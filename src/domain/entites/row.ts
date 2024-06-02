// import UserScores from "../collection/userScoreMap";

// export class Row {
//   public readonly Id: string;
//   public readonly Date: string;
//   public readonly Timestamp: string;
//   public readonly Users: Partial<Record<string, string>>

//   constructor(obj: Partial<Record<string, any>>) {
//     this.Id = obj.Id;
//     this.Date = obj.Date;
//     this.Timestamp = obj.Timestamp;
//     const users = (({ ID, Date, Timestamp, ...rest }) => rest)(obj);
//     this.Users = users
//   }
// }

import UserScoresMap from "../collection/userScoreMap";
import UserScores from "../collection/userScoreMap";

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
