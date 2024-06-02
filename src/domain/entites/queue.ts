import { IdGenerator } from "../services/idGenerator";

export class Queue {
  public readonly id: string;

  constructor(
    public readonly body: string,
  ) {
    this.id = IdGenerator.generate();
    this.body = `ID: ${this.id} - ${this.body}`;
  }
}
