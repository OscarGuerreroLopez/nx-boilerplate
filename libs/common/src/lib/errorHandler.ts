import { boilerplateLogger, SeverityType, IObjectLiteral } from './common';

export interface AdditionalErrorInfo {
  severity: SeverityType;
  service: string;
  file: string;
  function: string;
  code: string;
  headers?: IObjectLiteral;
  method?: string;
  data: IObjectLiteral;
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

  boilerplateLogger[additionalErrorInfo.severity](message, {
    service: additionalErrorInfo.service,
    code: additionalErrorInfo.code || '',
    headers: additionalErrorInfo.headers || null,
    method: additionalErrorInfo.method || null,
    file: additionalErrorInfo.file,
    function: additionalErrorInfo.function,
    stack,
    data: additionalErrorInfo.data,
  });
};
