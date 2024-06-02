import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { IGoogleShpreadSheetClient } from "../../domain/infrastructure/google/client";
import { formattedInsertDate } from "../../utils/date";
import { Row } from "../../domain/entites/row";
import { convertInsertRows } from "./factory/insertRows";
import { SheetId, SheetIdEnums } from "../../domain/enums/sheetId";

class Client implements IGoogleShpreadSheetClient {
  private doc: GoogleSpreadsheet;
  constructor(
    sheetAuthId: string,
    sheetEmail: string,
    googlePrivateKey: string,
  ) {
    const serviceAccountAuth = new JWT({
      email: sheetEmail,
      key: googlePrivateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    this.doc = new GoogleSpreadsheet(sheetAuthId, serviceAccountAuth)
  }
  async save(insertDatas: Row[], sheetId: SheetIdEnums): Promise<void> {
    const headers = await this.getHeaders(sheetId)
    const insertRows = convertInsertRows(insertDatas, headers)
    await this.doc.loadInfo()
    const sheet = this.doc.sheetsByIndex[SheetId[sheetId]];
    await sheet.addRows(insertRows)
  }

  async getNextId(sheetId: SheetIdEnums): Promise<number> {
    await this.doc.loadInfo()
    const sheet = this.doc.sheetsByIndex[SheetId[sheetId]];
    const rows = await sheet.getRows()
    return rows.length + 1
  }

  private async getHeaders(sheetId: SheetIdEnums): Promise<string[]> {
    await this.doc.loadInfo()
    const sheet = this.doc.sheetsByIndex[SheetId[sheetId]];
    await sheet.loadHeaderRow();
    const headers: string[] = sheet.headerValues;
    return headers;
  }
}

export default Client;