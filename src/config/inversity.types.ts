const TYPES = {
  //usecase
  GoogleSpreadSheetUsecase: Symbol.for("GoogleSpreadSheetUsecase"),
  TenhoScoreUseCase: Symbol.for("TenhoScoreUseCase"),
  ConvertTenhoToSheetUseCase: Symbol.for("ConvertTenhoToSheetUseCase"),
  CreateQueueUseCase: Symbol.for("CreateQueueUseCase"),

  // infrastructure
  ISQSClientImpl: Symbol.for("ISQSClientImpl"),
  IGoogleShpreadSheetClientImpl: Symbol.for("IGoogleShpreadSheetClientImpl"),
  ITenhoClientImpl: Symbol.for("ITenhoClientImpl"),
};

export default TYPES;
