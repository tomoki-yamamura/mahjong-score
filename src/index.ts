import { Handler } from "aws-lambda";
import { JWT } from "google-auth-library";
import env from "dotenv";
env.config();

import { convertToRawStrings } from "./tenho/raw";
import { createSheetsInstance, insertValuesToSheet } from "./google/sheet";
import { downloadAndExtractFile } from "./tenho/stream";

const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const key = `${process.env.GOOGLE_PRIVATE_KEY}`.replace(/\\n/g, "\n");
const sheetID: string = `${process.env.GOOGLE_SHEET_ID}`;

const serviceAccountAuth = new JWT({
  email: email,
  key: key,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export const handler: Handler = async (): Promise<void> => {
  const rawStrings = await convertToRawStrings(downloadAndExtractFile);
  if (rawStrings.length === 0) {
    console.log('No data to fetch');
    return
  }
  const doc = createSheetsInstance(sheetID, serviceAccountAuth);
  const [player3Strings, player4Strings] = separateDateFromStyle(rawStrings);
  await insertValuesToSheet(doc, player3Strings, 0);
  if (player4Strings.length !== 0) {
    await insertValuesToSheet(doc, player4Strings, 1)
  }
}

const separateDateFromStyle = (values: string[]): [string[], string[]] => {
  const player3Values = values.filter(i => i.includes('三般南喰赤－'));
  const player4Values = values.filter(i => i.includes('四般南喰赤－'));
  return [player3Values, player4Values]
}
