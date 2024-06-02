import UserScoresMap from "../../../domain/collection/userScoreMap";
import { Row } from "../../../domain/entites/row";

export function convertInsertRows(rows: Row[], headers: string[]): (string | number)[][] {
  const result: (string | number)[][] = [];

  for (const row of rows) {
    const rowValues: (string | number)[] = [];

    for (const header of headers) {
      let value: string | number;
      switch (header) {
        case "Id":
          value = row.Id;
          break;
        case "Date":
          value = row.Date;
          break;
        case "Timestamp":
          value = row.Timestamp;
          break;
        default:
          const userScoresMap = row.Users as UserScoresMap;
          value = userScoresMap.getScore(header) ?? "";
          break;
      }

      rowValues.push(value);
    }
    
    result.push(rowValues);
  }

  return result;
}
