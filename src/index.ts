import "reflect-metadata";
import { Handler } from "aws-lambda";
import { SQSClient } from "@aws-sdk/client-sqs";
import env from "dotenv";
env.config();

import CreateQueueUseCase from "./usecases/createQueueUseCase";
import SQSClientImpl from "./infrastructure/aws/sqs";
import container from "./config/inversity.config";
import TYPES from "./config/inversity.types";
import ConvertTenhoToSheetUsecase from "./usecases/convertTenhoToSheet";

export const handler: Handler = async (): Promise<void> => {
  try {
    const convertUseCase = container.get<ConvertTenhoToSheetUsecase>(
      TYPES.ConvertTenhoToSheetUseCase
    );
    await convertUseCase.saveScore("3players");
    await convertUseCase.saveScore("4players");
    console.log("successfully inserted to GoogleSpreadSheet");

    const createQueueUseCase = container.get<CreateQueueUseCase>(
      TYPES.CreateQueueUseCase
    );
    await createQueueUseCase.enque(`${process.env.SQS_QUEUE_URL}`);
    console.log("successfully enque");
  } catch (error) {
    console.error(error);
  }
};
