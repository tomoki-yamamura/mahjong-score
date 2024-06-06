process.env.TENHO_ROOM_NUMBER = "LXXX";
process.env.MAIN_PLAYERS = "playerA,playerB";
import TenhoScoreList from "../../domain/collection/tenhoScoreList";
import ITenhoClientImpl from "./client";
import * as data from "./mock-data/data";

describe("getTenhoRoomScoreDatas Func", () => {
  const mockUrl = 'http://example.com';
  let client: ITenhoClientImpl;

  beforeEach(() => {
    client = new ITenhoClientImpl(mockUrl);
  });

  it("return valid result", async () => {
    const mockGetRawStreamFromTenho = jest
      .spyOn<any, any>(client, 'getRawStreamFromTenho')
      .mockResolvedValue(data.rowStrings);

    const result = await client.getTenhoRoomScoreDatas("LXXX")
    const expectedScores = new TenhoScoreList(data.expectedRowStrings)
    expect(result).toEqual(expectedScores);
  });
});
