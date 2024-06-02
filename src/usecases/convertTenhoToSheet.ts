import { SheetId, SheetIdEnums } from "../domain/enums/sheetId";
import GoogleSpreadSheetUsecase from "./google/sheet";
import TenhoScoreUseCase from "./tenho/score";

class ConvertTenhoToSheet {
  tenhoUsecase: TenhoScoreUseCase;
  sheetUsecase: GoogleSpreadSheetUsecase;
  constructor(tenhoUsecase: TenhoScoreUseCase, sheetUsecase: GoogleSpreadSheetUsecase) {
    this.tenhoUsecase = tenhoUsecase
    this.sheetUsecase = sheetUsecase
  }

  async saveScore(enums: SheetIdEnums) {
    const nextId = await this.sheetUsecase.getNextId(enums)
    const tenho3playsers = await this.tenhoUsecase.getTenhoScores(nextId, enums)
    await this.sheetUsecase.insertPlayersResult(tenho3playsers, enums)
  }
}

export default ConvertTenhoToSheet