import { logger, SeverityType, IObjectLiteral } from '.';

export interface AdditionalErrorInfo {
  severity: SeverityType;
  service: string;
  file: string;
  property: string;
  code: string;
  headers?: IObjectLiteral;
  method?: string;
  [key: string]: any;
}

export interface ErrorHandlerParams {
  error: unknown;
  additionalErrorInfo: AdditionalErrorInfo;
}

export const ErrorHandler = ({
  error,
  additionalErrorInfo,
}: ErrorHandlerParams): void => {
  let message = 'No Message';
  let stack = 'No Stack';

  if (error instanceof Error) {
    message = error.message;
    stack = error.stack || 'Error with No Stack';
  }

  if (typeof error === 'string') {
    message = error;
  }

  const { severity, service, code, headers, method, file, property, ...rest } =
    additionalErrorInfo;

  logger[severity](message, {
    service,
    code,
    headers,
    property,
    file,
    method,
    stack,
    ...rest,
  });
};
