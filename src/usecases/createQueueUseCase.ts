import { Queue } from "../domain/entites/queue";
import { ISQSClient } from "../domain/infrastructure/aws/sqs";
import { formattedInsertDate } from "../utils/date";

export class CreateQueueUseCase {
  constructor(private sqsClient: ISQSClient) {}

  async enque(queueUrl: string): Promise<void> {
    try {
      const body = `${formattedInsertDate()} result was inserted`
      const message = new Queue(body);
      const response = await this.sqsClient.enqueue(message, queueUrl);
      console.log(response);
    } catch (error) {
      throw error
    }
  }
}
