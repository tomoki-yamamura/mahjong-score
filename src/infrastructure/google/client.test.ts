import "reflect-metadata";
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";
import IGoogleShpreadSheetClientImpl from "./client";
import { JWT } from "google-auth-library";
import { SheetId } from "../../domain/values/enums/sheetId";
import { Row } from "../../domain/entites/row";
import UserScoresMap from "../../domain/collection/userScoreMap";

jest.mock("google-spreadsheet");
jest.mock("google-auth-library");

describe("IGoogleShpreadSheetClientImpl", () => {
  let client: IGoogleShpreadSheetClientImpl;
  let mockDoc: jest.Mocked<GoogleSpreadsheet>;
  let mockSheet: jest.Mocked<GoogleSpreadsheetWorksheet>;
  const mockJWT = new JWT({
    email: "test@example.com",
    key: "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  beforeEach(() => {
    mockSheet = {
      addRows: jest.fn(),
      getRows: jest.fn().mockResolvedValue([
        ["1", "2024-01-01", "0:00", "40", "-10", "-30"],
        ["2", "2024-06-06", "0:10", "40", "-10", "-30"],
      ]),
      loadHeaderRow: jest.fn(),
      headerValues: [
        "Id",
        "Date",
        "Timestamp",
        "PlayerA",
        "PlayerB",
        "PlayerC",
      ],
    } as any;

    mockDoc = {
      useServiceAccountAuth: jest.fn(),
      addSheet: jest.fn(),
      loadInfo: jest.fn(),
      get sheetsByIndex() {
        return [mockSheet];
      },
    } as unknown as jest.Mocked<GoogleSpreadsheet>;

    client = new IGoogleShpreadSheetClientImpl(mockDoc);
  });
  it("should save rows correctly", async () => {
    const keyValuePairs: [string, number][] = [
      ["PlayerA", 50],
      ["PlayerB", -20],
      ["PlayerC", -30],
    ];
    const scoreMap = new UserScoresMap(new Map(keyValuePairs));
    const row = new Row(3, "2024-01-01", "00:20", scoreMap);
    const insertDatas: Row[] = [row];

    await client.save(insertDatas, "3players");

    const expected = [
      [
        row.Id,
        row.Date,
        row.Timestamp,
        scoreMap.getScore("PlayerA"),
        scoreMap.getScore("PlayerB"),
        scoreMap.getScore("PlayerC"),
      ],
    ];

    expect(mockDoc.loadInfo).toHaveBeenCalled();
    expect(mockSheet.addRows).toHaveBeenCalledWith(expected);
  });

  it('should get the next id correctly', async () => {
    const nextId = await client.getNextId("3players");
    expect(mockDoc.loadInfo).toHaveBeenCalled();
    expect(mockSheet.getRows).toHaveBeenCalled();
    expect(nextId).toBe(3);
  });
});
