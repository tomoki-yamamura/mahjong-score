import "reflect-metadata";
import { Handler } from "aws-lambda";
// import { ListQueuesCommand, SQSClient } from "@aws-sdk/client-sqs";
import AWS from "aws-sdk";
import env from "dotenv";
env.config();

import TenhoScoreUseCase from "./usecases/tenho/score";
import CreateQueueUseCase from "./usecases/createQueueUseCase";
import SQSClientImpl from "./infrastructure/aws/sqs";
import container from "./config/inversity.config";
import TYPES from "./config/inversity.types";
import ConvertTenhoToSheetUsecase from "./usecases/convertTenhoToSheet";

// const sqsClient = new SQSClient({
//   region: "elasticmq",
//   // region: `${process.env.AWS_REGION}`,
//   endpoint: `${process.env.SQS_ENDPOINT}`,
// });
// console.log("sqsClient", sqsClient);

// const sqsClientImpl = new SQSClientImpl(sqsClient);

export const handler = async (): Promise<void> => {
  try {
    const convertUseCase = container.get<ConvertTenhoToSheetUsecase>(
      TYPES.ConvertTenhoToSheetUseCase
    );
    await convertUseCase.saveScore("3players");
    await convertUseCase.saveScore("4players");

    const sqs = new AWS.SQS({
      apiVersion: "2012-11-05",
      endpoint: `${process.env.SQS_ENDPOINT}`,
    });
    const data = await sqs.listQueues().promise();
    console.log(data);

    // const createQueueUseCase = new CreateQueueUseCase(sqsClientImpl);
    // await createQueueUseCase.enque(`${process.env.SQS_QUEUE_URL}`);
    console.log("successfully inserted");
  } catch (error) {
    console.error(error);
  }
};
