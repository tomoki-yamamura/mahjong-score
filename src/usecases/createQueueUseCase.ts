import { inject, injectable } from "inversify";
import { Queue } from "../domain/entites/queue";
import { ISQSClient } from "../domain/infrastructure/aws/sqs";
import { formattedInsertDate } from "../utils/date";
import TYPES from "../config/inversity.types";

@injectable()
class CreateQueueUseCase {
  constructor(@inject(TYPES.ISQSClientImpl) private sqsClient: ISQSClient) {}

  async enque(queueUrl: string): Promise<void> {
      const body = `${formattedInsertDate()} result was inserted`
      const message = new Queue(body);
      await this.sqsClient.enqueue(message, queueUrl);
  }
}

export default CreateQueueUseCase
