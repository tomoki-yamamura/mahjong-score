import "reflect-metadata";
import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import IGoogleShpreadSheetClientImpl from "./client";
import { JWT } from "google-auth-library";
import { SheetId } from "../../domain/enums/sheetId";

jest.mock("google-spreadsheet");
jest.mock("google-auth-library");

describe('IGoogleShpreadSheetClientImpl', () => {
  let client: IGoogleShpreadSheetClientImpl;
  let mockDoc: jest.Mocked<GoogleSpreadsheet>;
  let mockSheet: jest.Mocked<GoogleSpreadsheetWorksheet>;
  const mockJWT = new JWT({
    email: 'test@example.com',
    key: '-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n',
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  beforeEach(() => {
    mockDoc = new GoogleSpreadsheet('spreadsheet-id', mockJWT) as jest.Mocked<GoogleSpreadsheet>;
    mockSheet = {
      addRows: jest.fn(),
      getRows: jest.fn().mockResolvedValue([{ id: '1' }, { id: '2' }]),
      loadHeaderRow: jest.fn(),
      headerValues: ['header1', 'header2'],
    } as any;

    jest.spyOn(mockDoc, 'sheetsByIndex', 'get').mockReturnValue([mockSheet]);

    client = new IGoogleShpreadSheetClientImpl(mockDoc);
  });

  // it('should save rows correctly', async () => {
  //   // const insertDatas: Row[] = [
  //   //   { header1: 'data1', header2: 'data2' },
  //   // ];

  //   // await client.save(insertDatas, SheetIdEnums.SHEET1);

  //   // expect(mockDoc.loadInfo).toHaveBeenCalled();
  //   // expect(mockSheet.addRows).toHaveBeenCalledWith([
  //   //   { header1: 'data1', header2: 'data2' },
  //   // ]);
  // });

  it('should get the next id correctly', async () => {
    const nextId = await client.getNextId("3players");
    expect(mockDoc.loadInfo).toHaveBeenCalled();
    expect(mockSheet.getRows).toHaveBeenCalled();
    expect(nextId).toBe(3);
  });

  // it('should get headers correctly', async () => {
  //   // const headers = await client.getHeaders(SheetIdEnums.SHEET1);

  //   // expect(mockDoc.loadInfo).toHaveBeenCalled();
  //   // expect(mockSheet.loadHeaderRow).toHaveBeenCalled();
  //   // expect(headers).toEqual(['header1', 'header2']);
  // });
});