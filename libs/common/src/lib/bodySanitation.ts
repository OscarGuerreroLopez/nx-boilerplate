import { IObjectLiteral } from './common';

export const SanitiseBody = (
  unsanitisedBody: IObjectLiteral
): IObjectLiteral => {
  const sanitizeObject = (obj: IObjectLiteral): IObjectLiteral => {
    const sanitizedObj: IObjectLiteral = {};

    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object' && value !== null) {
        sanitizedObj[key] = sanitizeObject(value);
      } else {
        sanitizedObj[key] =
          key.toLowerCase() === 'password' ? '********' : value;
      }
    }

    return sanitizedObj;
  };

  return sanitizeObject(unsanitisedBody);
};
