import { CommomErrors, HttpCode } from '../types';

const errorMap = {
  [CommomErrors.BAD_PASSWORD]: 401,
  [CommomErrors.MAKE_USER_EMAIL]: 400,
  [CommomErrors.MAKE_USER_PARAMS]: 400,
  [CommomErrors.MAKE_USER_PASSWORD]: 400,
  [CommomErrors.USER_NOT_FOUND]: 404,
  [CommomErrors.USER_LOCKED]: 403,
  [CommomErrors.USER_LOCATION]: 401,
  [CommomErrors.USER_UNAUTHORIZED]: 401,
};
export class AppError extends Error {
  public override readonly name: string;
  public readonly httpCode: HttpCode;

  constructor(name: CommomErrors, description: string) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain

    this.name = name;
    this.httpCode = errorMap[name];
  }
}
