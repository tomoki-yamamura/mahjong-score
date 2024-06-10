import { inject, injectable } from "inversify";
import { SheetIdEnums } from "../domain/values/enums/sheetId";
import GoogleSpreadSheetUsecase from "./google/sheet";
import TenhoScoreUseCase from "./tenho/score";
import TYPES from "../config/inversity.types";

@injectable()
class ConvertTenhoToSheetUsecase {
  tenhoUsecase: TenhoScoreUseCase;
  sheetUsecase: GoogleSpreadSheetUsecase;
  constructor(
    @inject(TYPES.TenhoScoreUseCase) tenhoUsecase: TenhoScoreUseCase,
    @inject(TYPES.GoogleSpreadSheetUsecase) sheetUsecase: GoogleSpreadSheetUsecase
  ) {
    this.tenhoUsecase = tenhoUsecase;
    this.sheetUsecase = sheetUsecase;
  }

  async saveScore(enums: SheetIdEnums) {
    const nextId = await this.sheetUsecase.getNextId(enums);
    const tenhoScores = await this.tenhoUsecase.getTenhoScores(nextId, enums);
    if (tenhoScores.length === 0) return;
    await this.sheetUsecase.insertPlayersResult(tenhoScores, enums);
  }
}

export default ConvertTenhoToSheetUsecase;
