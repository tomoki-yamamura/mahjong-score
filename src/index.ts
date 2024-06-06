import "reflect-metadata";
import { Handler } from "aws-lambda";
import { SQSClient } from "@aws-sdk/client-sqs";
import env from "dotenv";
env.config();

import TenhoScoreUseCase from "./usecases/tenho/score";
import CreateQueueUseCase from "./usecases/createQueueUseCase";
import SQSClientImpl from "./infrastructure/aws/sqs";
import container from "./config/inversity.config";
import TYPES from "./config/inversity.types";
import ConvertTenhoToSheetUsecase from "./usecases/convertTenhoToSheet";


const awssqsClient = new SQSClient({ region: `${process.env.AWS_REGION}` });
const sqsClient = new SQSClientImpl(awssqsClient)

export const handler = async (): Promise<void> => {
  try {
    // const tenhoUserCase = container.get<TenhoScoreUseCase>(TYPES.TenhoScoreUseCase)
    // const tenhoUserCase = new TenhoScoreUseCase(tenhoClient);
    // const sheetUseCase = new GoogleSpreadSheetUsecase(googleSpreadsheetClient);
    // const convertUseCase = new ConvertTenhoToSheet(tenhoUserCase, sheetUseCase);
    const convertUseCase = container.get<ConvertTenhoToSheetUsecase>(TYPES.ConvertTenhoToSheetUseCase)
    await convertUseCase.saveScore("3players");
    await convertUseCase.saveScore("4players");

    // const createQueueUseCase = new CreateQueueUseCase(sqsClient)
    // await createQueueUseCase.enque(`${process.env.SQS_QUEUE_URL}`)
    console.log("successfully inserted");
  } catch (error) {
    console.error(error);
  }
}

(async () => {
  await handler()
}) ()
