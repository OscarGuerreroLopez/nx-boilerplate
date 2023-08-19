import { ErrorHandler } from './errorHandler'; // Update with the correct import path
import { logger, Severity } from '.';
// Mock the logger module
jest.mock('.', () => {
  const originalModule = jest.requireActual('.');
  return {
    ...originalModule,
    logger: {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    },
  };
});

describe('ErrorHandler', () => {
  it('should call the logger with the correct arguments', () => {
    const error = new Error('Test Error');
    const additionalErrorInfo = {
      severity: Severity.ERROR,
      service: 'test-service',
      file: 'test-file',
      property: 'test-property',
      code: 'TEST_CODE',
    };

    ErrorHandler({ error, additionalErrorInfo });

    // Replace this with the appropriate assertion based on your logger's structure
    expect(logger.error).toHaveBeenCalledWith(
      'Test Error',
      expect.objectContaining({
        service: 'test-service',
        file: 'test-file',
        property: 'test-property',
        code: 'TEST_CODE',
      })
    );
  });
});
