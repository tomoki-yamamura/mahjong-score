import { formattedFetchDate } from "../utils/date";
import { DownloadAndExtractFileFunction } from "./stream";
import env from "dotenv"
env.config()
const mainPlayers = `${process.env.MAIN_PLAYERS}`.split(',')
const fileUrl = `https://tenhou.net/sc/raw/dat/sca${formattedFetchDate()}.log.gz`;

const filterRoom = (lines: string[]): string[] => {
  return lines.filter(line => line.includes(`${process.env.TENHO_ROOM_NUMBER}`) && mainPlayers.some(player => line.includes(player)));
}

const convertToRawStrings = async (downloadFile: DownloadAndExtractFileFunction): Promise<string[]> => {
  try {
    const rawString: string = await downloadFile(fileUrl);
    const lines: string[] = rawString.split('\n');
    const result: string[] = filterRoom(lines);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('convertToRawStrings error');
  }
};

export {
  convertToRawStrings
}