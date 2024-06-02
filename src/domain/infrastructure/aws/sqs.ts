import { Queue } from "../../entites/queue";

export interface ISQSClient {
  enqueue(queue: Queue, queueUrl: string): Promise<any>;
}