import * as winston from 'winston';
import { logger } from './logger'; // Replace with your actual logger module

// Mock the winston module
jest.mock('winston', () => {
  const logFunctions = {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };

  const createLogger = () => ({
    info: logFunctions.info,
    warn: logFunctions.warn,
    error: logFunctions.error,
    add: jest.fn(),
    on: jest.fn(), // Add a mock implementation for the "on" method
  });

  return {
    createLogger,
    transports: {
      File: jest.fn(),
      Console: jest.fn(),
    },
    format: {
      combine: jest.fn(),
      timestamp: jest.fn(),
      prettyPrint: jest.fn(),
      simple: jest.fn(),
    },
  };
});

describe('Logger Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should log info', () => {
    const data = { service: 'test', file: 'test', code: '123' };
    logger.info('Info message', data);
    expect(winston.createLogger().info).toHaveBeenCalledWith(
      'Info message',
      expect.anything()
    );
  });

  it('should log warning', () => {
    const data = { service: 'test', file: 'test', code: '123' };
    logger.warn('Warning message', data);
    expect(winston.createLogger().warn).toHaveBeenCalledWith(
      'Warning message',
      expect.anything()
    );
  });

  it('should log error', () => {
    const data = { service: 'test', file: 'test', code: '123' };
    logger.error('Error message', data);
    expect(winston.createLogger().error).toHaveBeenCalledWith(
      'Error message',
      expect.anything()
    );
  });
});
