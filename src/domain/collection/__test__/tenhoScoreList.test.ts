import TenhoScoreList from "../tenhoScoreList";
import { mockList } from "./mock-data/data";

describe("TenhoScoreList", () => {
  it("should filter players for 3players sheet", () => {
    const scoreList = new TenhoScoreList(mockList);

    const result = scoreList.filterPlayersBySheetId("3players");

    const expected = mockList.slice(0,1);

    expect(result).toEqual(expected);
  });

  it("should filter players for 4players sheet", () => {
    const scoreList = new TenhoScoreList(mockList);

    const result = scoreList.filterPlayersBySheetId("4players");

    const expected = mockList.slice(1, 3);

    expect(result).toEqual(expected);
  });
});
