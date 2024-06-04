import "reflect-metadata";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { IGoogleShpreadSheetClient } from "../../domain/infrastructure/google/client";
import { Row } from "../../domain/entites/row";
import { convertInsertRows } from "./factory/insertRows";
import { SheetId, SheetIdEnums } from "../../domain/enums/sheetId";
import { injectable } from "inversify";

@injectable()
class IGoogleShpreadSheetClientImpl implements IGoogleShpreadSheetClient {
  private doc: GoogleSpreadsheet;
  constructor(doc: GoogleSpreadsheet) {
    this.doc = doc;
  }
  async save(insertDatas: Row[], sheetId: SheetIdEnums): Promise<void> {
    const headers = await this.getHeaders(sheetId);
    const insertRows = convertInsertRows(insertDatas, headers);
    await this.doc.loadInfo();
    const sheet = this.doc.sheetsByIndex[SheetId[sheetId]];
    await sheet.addRows(insertRows);
  }

  async getNextId(sheetId: SheetIdEnums): Promise<number> {
    console.log("called");
    await this.doc.loadInfo();
    const sheet = this.doc.sheetsByIndex[SheetId[sheetId]];
    const rows = await sheet.getRows();
    console.log(rows);
    return rows.length + 1;
  }

  private async getHeaders(sheetId: SheetIdEnums): Promise<string[]> {
    await this.doc.loadInfo();
    const sheet = this.doc.sheetsByIndex[SheetId[sheetId]];
    await sheet.loadHeaderRow();
    const headers: string[] = sheet.headerValues;
    return headers;
  }
}

export default IGoogleShpreadSheetClientImpl;
