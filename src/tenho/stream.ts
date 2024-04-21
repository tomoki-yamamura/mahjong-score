import axios, { AxiosResponse } from 'axios';
import {createGunzip} from 'zlib';

type DownloadAndExtractFileFunction = (url: string) => Promise<string> ;

const downloadAndExtractFile: DownloadAndExtractFileFunction = async (url: string): Promise<string> => {
  try {
    const response: AxiosResponse = await axios.get(url, { responseType: 'stream' });
    return new Promise<string>((resolve, reject) => {
      let dataString: string = '';
      response.data.pipe(createGunzip())
        .on('data', (data: Buffer) => {
          dataString += data.toString();
        })
        .on('end', () => {
          resolve(dataString);
        })
        .on('error', (error: Error) => {
          reject(error);
        });
    });
  } catch (error) {
    throw new Error(`something went wrong: ${error}`);
  }
}

export {
  downloadAndExtractFile,
  type DownloadAndExtractFileFunction
}