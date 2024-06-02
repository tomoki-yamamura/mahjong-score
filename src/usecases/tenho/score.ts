import TenhoScoreList from "../../domain/collection/tenhoScoreList";
import { Row } from "../../domain/entites/row";
import { SheetIdEnums } from "../../domain/enums/sheetId";
import { ITenhoClient } from "../../domain/infrastructure/tenho/client";
import { rowFromTenhoScore } from "../../infrastructure/tenho/factory/row";
const roomNumber = `${process.env.TENHO_ROOM_NUMBER}`

class TenhoScoreUseCase {
  private client: ITenhoClient;
  constructor(client: ITenhoClient) {
    this.client = client
  }

  async getTenhoScores(nextId: number, sheetId: SheetIdEnums): Promise<Row[]> {
    const rowTenhoScore = (await this.client.getTenhoRoomScoreDatas(roomNumber)).filterPlayersBySheetId(sheetId)
    const result = rowFromTenhoScore(rowTenhoScore, nextId)
    return result
  }
}

export default TenhoScoreUseCase