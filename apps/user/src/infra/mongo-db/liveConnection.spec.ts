import { LiveConnection } from './liveConnection'; // Replace with your actual import
import { MongoClient } from 'mongodb';

describe('LiveConnection', () => {
  let mockConnect: jest.Mock;
  let mockClose: jest.Mock;

  beforeAll(() => {
    // Mock the MongoClient's connect and close methods
    mockConnect = jest.fn();
    mockClose = jest.fn();
    MongoClient.prototype.connect = mockConnect;
    MongoClient.prototype.close = mockClose;
  });

  afterAll(() => {
    // Restore the original MongoClient methods
    delete MongoClient.prototype.connect;
    delete MongoClient.prototype.close;
  });

  it('should create a connection when getConnection is called', async () => {
    await LiveConnection.getConnection();
    expect(mockConnect).toBeCalledTimes(1);
  });

  it('should reuse an existing connection when getConnection is called multiple times', async () => {
    await LiveConnection.getConnection();
    await LiveConnection.getConnection();
    expect(mockConnect).toBeCalledTimes(1); // Connection should only be established once
  });

  it('should close the connection when closeConnection is called', async () => {
    await LiveConnection.closeConnection();
    expect(mockClose).toBeCalledTimes(1);
  });
});
