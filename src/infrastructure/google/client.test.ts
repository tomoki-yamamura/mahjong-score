
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
