import axios, { AxiosResponse } from "axios";
import { ITenhoClient } from "../../domain/infrastructure/tenho/client";
import { createGunzip } from "zlib";
import { createTenhoScoreList } from "../factory/tenhoList";
import TenhoScoreList from "../../domain/collection/tenhoScoreList";
// const roomNumber = `${process.env.TENHO_ROOM_NUMBER}`
class Client implements ITenhoClient {
  private url: string;
  constructor(url: string) {
    this.url = url;
  }

  async getTenhoRoomScoreDatas(roomNumber: string): Promise<TenhoScoreList> {
    try {
      const rawString = await this.getRawStreamFromTenho();
      const scores = rawString.split("\n");
      const filtedScores = this.filterScoresByRoom(scores, roomNumber)
      const result = createTenhoScoreList(filtedScores)
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("getTenhoScoreData error");
    }
  }

  private filterScoresByRoom(scores: string[], roomNumber: string): string[] {
    return scores.filter(score => score.includes(roomNumber));
  }

  private async getRawStreamFromTenho(): Promise<string> {
    try {
      const response: AxiosResponse = await axios.get(this.url, {
        responseType: "stream",
      });
      return new Promise<string>((resolve, reject) => {
        let dataString: string = "";
        response.data
          .pipe(createGunzip())
          .on("data", (data: Buffer) => {
            dataString += data.toString();
          })
          .on("end", () => {
            resolve(dataString);
          })
          .on("error", (error: Error) => {
            reject(error);
          });
      });
    } catch (error) {
      throw new Error(`something went wrong: ${error}`);
    }
  }
}

export default Client;