export class MakeUseError extends Error {
  status: number;
  override message: string;
  constructor(message: string) {
    super(message);
    this.status = 400;
    this.message = message;
  }
}
