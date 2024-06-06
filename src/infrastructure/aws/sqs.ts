import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { ISQSClient } from "../../domain/infrastructure/aws/sqs";
import { Queue } from "../../domain/entites/queue";
import { injectable } from "inversify";

@injectable()
class ISQSClientImpl implements ISQSClient {
  private client: SQSClient;

  constructor(sqsClient: SQSClient) {
    this.client = sqsClient;
  }

  async enqueue(queue: Queue, queueUrl: string): Promise<any> {
    try {
      const command = new SendMessageCommand({
        QueueUrl: queueUrl,
        MessageBody: queue.body,
      });
      await this.client.send(command);
    } catch (error) {
      throw error;
    }
  }
}

export default ISQSClientImpl