import axios, { AxiosResponse } from "axios";
import { ITenhoClient } from "../../domain/infrastructure/tenho/client";
import { createGunzip } from "zlib";

class TenhoClient implements ITenhoClient {
  private url: string;
  constructor(url: string) {
    this.url = url;
  }

  async getTenhoScoreData(): Promise<string[]> {
    try {
      const rawString = await this.getRawStreamFromTenho();
      const result: string[] = rawString.split("\n");
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("getTenhoScoreData error");
    }
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
