import { IObjectLiteral } from '.';

export const SanitiseBody = (
  unsanitisedBody: IObjectLiteral
): IObjectLiteral => {
  const maskEmail = (email: string): string => {
    let username;
    let domain;

    if (email.includes('@')) {
      [username, domain] = email.split('@');
    } else {
      username = email;
      domain = '';
    }

    const maskedUsername =
      username.slice(0, 2) + '*'.repeat(username.length - 2);
    const domainParts = domain.split('.');
    const maskedDomain =
      domainParts.length > 1
        ? domainParts
            .slice(0, -1)
            .map(() => '*')
            .join('.') +
          '.' +
          domainParts[domainParts.length - 1]
        : domain;
    return `${maskedUsername}@${maskedDomain}`;
  };

  const sanitizeObject = (obj: IObjectLiteral): IObjectLiteral => {
    const sanitizedObj: IObjectLiteral = {};

    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object' && value !== null) {
        sanitizedObj[key] = sanitizeObject(value);
      } else {
        if (key.toLowerCase() === 'password') {
          sanitizedObj[key] = '********'; // Mask value if key is "password"
        } else if (key.toLowerCase() === 'email') {
          sanitizedObj[key] = maskEmail(value); // Mask value if key is "email"
        } else if (key.toLowerCase() === 'lname') {
          sanitizedObj[key] = '********';
        } else {
          sanitizedObj[key] = value;
        }
      }
    }

    return sanitizedObj;
  };

  return sanitizeObject(unsanitisedBody);
};
