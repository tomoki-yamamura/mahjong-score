import TYPES from "./inversity.types";
import { Container } from "inversify";
import { IGoogleShpreadSheetClient } from "../domain/infrastructure/google/client";
import IGoogleShpreadSheetClientImpl from "../infrastructure/google/client";
import { ITenhoClient } from "../domain/infrastructure/tenho/client";
import ITenhoClientImpl from "../infrastructure/tenho/client";
import { ISQSClient } from "../domain/infrastructure/aws/sqs";
import ISQSClientImpl from "../infrastructure/aws/sqs";
import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { formattedFetchDate } from "../utils/date";
import TenhoScoreUseCase from "../usecases/tenho/score";
import GoogleSpreadSheetUsecase from "../usecases/google/sheet";
import ConvertTenhoToSheetUsecase from "../usecases/convertTenhoToSheet";

const container = new Container();
const sheetID = `${process.env.GOOGLE_SHEET_ID}`;
const email = `${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL}`;
const key = `${process.env.GOOGLE_PRIVATE_KEY}`.replace(/\\n/g, "\n");
const serviceAccountAuth = new JWT({
  email,
  key,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const googleSpreadsheetDoc = new GoogleSpreadsheet(sheetID, serviceAccountAuth);

const tenhoUrl = `https://tenhou.net/sc/raw/dat/sca${formattedFetchDate()}.log.gz`;

//usecase
container.bind<GoogleSpreadSheetUsecase>(TYPES.GoogleSpreadSheetUsecase).to(GoogleSpreadSheetUsecase)
container.bind<TenhoScoreUseCase>(TYPES.TenhoScoreUseCase).to(TenhoScoreUseCase)
container.bind<ConvertTenhoToSheetUsecase>(TYPES.ConvertTenhoToSheetUseCase).to(ConvertTenhoToSheetUsecase)

// infrastructure
container.bind<IGoogleShpreadSheetClient>(TYPES.IGoogleShpreadSheetClientImpl).toConstantValue(new IGoogleShpreadSheetClientImpl(googleSpreadsheetDoc))
container.bind<ITenhoClient>(TYPES.ITenhoClientImpl).toConstantValue(new ITenhoClientImpl(tenhoUrl))

export default container;
