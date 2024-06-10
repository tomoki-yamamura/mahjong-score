import { inject, injectable } from "inversify";
import { Row } from "../../domain/entites/row";
import { SheetIdEnums } from "../../domain/values/enums/sheetId";
import { ITenhoClient } from "../../domain/infrastructure/tenho/client";
import { rowFromTenhoScore } from "../../infrastructure/tenho/factory/row";
import TYPES from "../../config/inversity.types";
const roomNumber = `${process.env.TENHO_ROOM_NUMBER}`

@injectable()
class TenhoScoreUseCase {
  private client: ITenhoClient;
  constructor(@inject(TYPES.ITenhoClientImpl) client: ITenhoClient) {
    this.client = client
  }

  async getTenhoScores(nextId: number, sheetId: SheetIdEnums): Promise<Row[]> {
    const rowTenhoScore = (await this.client.getTenhoRoomScoreDatas(roomNumber)).filterPlayersBySheetId(sheetId)
    const result = rowFromTenhoScore(rowTenhoScore, nextId)
    return result
  }
}

export default TenhoScoreUseCase