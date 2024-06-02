import UserScoresMap from "../../../domain/collection/userScoreMap"
import { Row } from "../../../domain/entites/row"
import { formattedInsertDate } from "../../../utils/date"

export function rowFromTenhoScore(tenhoDatas: string[], nextId: number): Row[] {
  return tenhoDatas.map((data, index) => convert(data, nextId + index));
}

function convert(t: string, Id: number): Row {
  const separated = separatePipi(t)
  const date = formattedInsertDate()
  const timeStamp = separated[1]
  const users = parseUserScores(separated[3]).changeMaxValue()
  return new Row(Id, date, timeStamp, users)
}

function parseUserScores(input: string): UserScoresMap {
  const userScores = new Map();
  const result = new UserScoresMap(userScores)

  const regex = /([^\(\)]+)\(([\+\-]?\d+\.\d+)\)/g;
  let match;
  
  while ((match = regex.exec(input)) !== null) {
    const username = match[1].trim();
    const score = parseFloat(match[2]);
    result.addScore(username, score);
  }

  return result
}

function separatePipi(line: string): string[] {
  return line.split("|").map((sep) => sep.trim())
}
