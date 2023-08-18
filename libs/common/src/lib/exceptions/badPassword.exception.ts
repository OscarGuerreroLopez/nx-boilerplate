export class BadPasswordError extends Error {
  status: number;
  override message: string;
  constructor(message: string) {
    super(message);
    this.status = 401;
    this.message = message;
  }
}
