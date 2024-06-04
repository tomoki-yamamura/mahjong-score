process.env.TENHO_ROOM_NUMBER = "LXXX";
process.env.MAIN_PLAYERS = "playerA,playerB";
import * as data from "./mock-data/data";

describe("convertToRawStrings Func", () => {
  it("return valid room result", async () => {
    const mockDownloadAndExtractFile = jest.fn() as jest.Mock<Promise<string>>;
    mockDownloadAndExtractFile.mockImplementation((url: string) =>
      Promise.resolve(data.room2275validPlayerName)
    );
    const result = await convertToRawStrings(mockDownloadAndExtractFile);
    expect(result).toEqual(data.expectedValidRoom2275Result);
  });
});

describe("convertToRawStrings Func", () => {
  it("return valid room result", async () => {
    const mockDownloadAndExtractFile = jest.fn() as jest.Mock<Promise<string>>;
    mockDownloadAndExtractFile.mockImplementation((url: string) =>
      Promise.resolve(data.room2275invalidPlayerName)
    );
    const result = await convertToRawStrings(mockDownloadAndExtractFile);
    expect(result).toEqual([]);
  });
});
