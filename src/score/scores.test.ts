import { convertToScoreMetrix } from "./scores";
import * as data from "./mock-data/data"
describe("convertToScoreMetrix Func", () => {
  it("return valid room result", async () => {
    const result = await convertToScoreMetrix(data.rawArray, data.headers);
    const expectedLength = data.headers.length
    for(let i = 0; i < result.length; i++) {
      expect(result[i].length).toEqual(expectedLength);
    }
  });
});
