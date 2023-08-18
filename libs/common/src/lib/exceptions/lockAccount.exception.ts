export class AccountLockError extends Error {
  status: number;
  override message: string;
  constructor(message: string) {
    super(message);
    this.status = 403;
    this.message = message;
  }
}
