import { inject, injectable } from "inversify";
import { Row } from "../../domain/entites/row";
import { SheetIdEnums } from "../../domain/values/enums/sheetId";
import { IGoogleShpreadSheetClient } from "../../domain/infrastructure/google/client";
import { ITenhoClient } from "../../domain/infrastructure/tenho/client";
import TYPES from "../../config/inversity.types";

@injectable()
class GoogleSpreadSheetUsecase {
  private client: IGoogleShpreadSheetClient;
  constructor(@inject(TYPES.IGoogleShpreadSheetClientImpl) client: IGoogleShpreadSheetClient) {
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