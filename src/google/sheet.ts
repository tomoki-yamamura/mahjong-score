import { GoogleSpreadsheet, GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { convertToScoreMetrix } from "../score/scores";

const createSheetsInstance = (sheetID: string, serviceAccountAuth: JWT): GoogleSpreadsheet => {
  const doc = new GoogleSpreadsheet(sheetID, serviceAccountAuth);
  return doc
}

const getLatestDateandTimestamp = (rows:  GoogleSpreadsheetRow<Record<string, any>>[]): [string, string] => {
  const lastID = rows.length
  const lastDate: string = rows[lastID-1].get("Date")
  const lastTimestamp: string = rows[lastID-1].get("Timestamp")
  return [lastDate, lastTimestamp]
}

const filtterInsertValues = (values: (string | number)[][], lastDate: string, lastTimestamp: string): (string | number)[][] => {
  const tmp = [...values]
  const convertdataAndTimestamp: string[][] = tmp.map(item => item.map(i => String(i)));
  const dataAndTimestamp = convertdataAndTimestamp.map(item => [item[1], item[2]]);
  const lastItemIndex = findIndexDateAndTimestamp(dataAndTimestamp, lastDate, lastTimestamp)
  const result = [...tmp.slice(lastItemIndex+1)];
  return result
}

function findIndexDateAndTimestamp(array: string[][], lastDate: string, lastTimestamp: string): number {
  for (let i = 0; i < array.length; i++) {
      const [date, timestamp] = array[i];
      if (date === lastDate && timestamp === lastTimestamp) {
          return i;
      }
  }
  return -1;
}

const addID = (values: (string | number)[][], rows: GoogleSpreadsheetRow<Record<string, any>>[]): (string | number)[][] => {
  let lastID = rows.length
  const result = values.map(item => [++lastID, ...item.slice(1)])
  return result
}



const insertValuesToSheet = async (doc: GoogleSpreadsheet, rawStrings: string[], index: number): Promise<void> => {
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[index];
  const rows = await sheet.getRows();
  const [lastDate, lastTimestamp]= getLatestDateandTimestamp(rows)
  const headers = await fetchHeaderValues(sheet)
  const scoreMetrix = convertToScoreMetrix(rawStrings, headers)
  const insertValues = filtterInsertValues(scoreMetrix, lastDate, lastTimestamp)
  insertValues.length === 0 ? undefined : await sheet.addRows(addID(insertValues, rows));
}

const fetchHeaderValues = async (sheet: GoogleSpreadsheetWorksheet): Promise<string[]> => {
  await sheet.loadHeaderRow()
  const headers: string[] = sheet.headerValues;
  return headers
}

export {
  createSheetsInstance,
  insertValuesToSheet
}