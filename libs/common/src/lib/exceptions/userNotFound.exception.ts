export class UserNotFoundError extends Error {
  status: number;
  override message: string;
  constructor(message: string) {
    super(message);
    this.status = 404;
    this.message = message;
  }
}
