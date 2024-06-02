import { Row } from "../../domain/entites/row";
import { SheetIdEnums } from "../../domain/enums/sheetId";
import { IGoogleShpreadSheetClient } from "../../domain/infrastructure/google/client";
import { ITenhoClient } from "../../domain/infrastructure/tenho/client";

class GoogleSpreadSheetUsecase {
  private client: IGoogleShpreadSheetClient;
  constructor(client: IGoogleShpreadSheetClient) {
    this.client = client
  }

  async getNextId(sheetId: SheetIdEnums): Promise<number> {
    return await this.client.getNextId(sheetId)
  }

  async insertPlayersResult(insertDatas: Row[], sheetId: SheetIdEnums) {
    await this.client.save(insertDatas, sheetId)
  }
}

export default GoogleSpreadSheetUsecase