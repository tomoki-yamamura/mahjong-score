import { Handler } from "aws-lambda";
import { SQSClient } from "@aws-sdk/client-sqs";
import env from "dotenv";
env.config();

import TenhoClient from "./infrastructure/tenho/client";
import { formattedFetchDate } from "./utils/date";
import GoogleSpreadsheetClient from "./infrastructure/google/client";
import GoogleSpreadSheetUsecase from "./usecases/google/sheet";
import ConvertTenhoToSheet from "./usecases/convertTenhoToSheet";
import TenhoScoreUseCase from "./usecases/tenho/score";
import { CreateQueueUseCase } from "./usecases/createQueueUseCase";
import { SQSClientImpl } from "./infrastructure/aws/sqs";

const tenhoUrl = `https://tenhou.net/sc/raw/dat/sca${formattedFetchDate()}.log.gz`;
const tenhoClient = new TenhoClient(tenhoUrl);

const sheetID = `${process.env.GOOGLE_SHEET_ID}`;
const email = `${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL}`;
const key = `${process.env.GOOGLE_PRIVATE_KEY}`.replace(/\\n/g, "\n");
const googleSpreadsheetClient = new GoogleSpreadsheetClient(
  sheetID,
  email,
  key
);

const awssqsClient = new SQSClient({ region: `${process.env.AWS_REGION}` });
const sqsClient = new SQSClientImpl(awssqsClient)

export const handler: Handler = async (): Promise<void> => {
  try {
    const tenhoUserCase = new TenhoScoreUseCase(tenhoClient);
    const sheetUseCase = new GoogleSpreadSheetUsecase(googleSpreadsheetClient);
    const convertUseCase = new ConvertTenhoToSheet(tenhoUserCase, sheetUseCase);
    await convertUseCase.saveScore("3players");
    await convertUseCase.saveScore("4players");

    const createQueueUseCase = new CreateQueueUseCase(sqsClient)
    await createQueueUseCase.enque(`${process.env.SQS_QUEUE_URL}`)
    console.log("successfully inserted");
  } catch (error) {
    console.error(error);
  }
};

