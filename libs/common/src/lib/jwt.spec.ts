import { BuildMakeVerifyJwt } from './jwt'; // Update with the correct import path
import jwt from 'jsonwebtoken'; // Import the jsonwebtoken library

// Mock the jsonwebtoken module
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

describe('BuildMakeVerifyJwt', () => {
  it('should create and verify tokens', () => {
    // Mock the secret and token payload
    const mockSecret = 'balblabla';
    const mockTokenPayload = {
      userId: '123',
      role: 'user',
      id: 'abcFa&56',
      userAgent: 'fake user agent',
      clientIp: '0.0.0.1',
    };

    // Mock the jwt.sign function
    (jwt.sign as jest.Mock).mockReturnValue('mocked-token');

    // Mock the jwt.verify function
    (jwt.verify as jest.Mock).mockReturnValue(mockTokenPayload);

    const { makeToken, verifyToken } = BuildMakeVerifyJwt();

    // Test makeToken
    const token = makeToken(mockTokenPayload);
    expect(token).toBe('mocked-token');
    expect(jwt.sign).toHaveBeenCalledWith(mockTokenPayload, mockSecret, {
      expiresIn: '24d',
    });

    // Test verifyToken
    const decodedPayload = verifyToken(token);
    expect(decodedPayload).toEqual(mockTokenPayload);
    expect(jwt.verify).toHaveBeenCalledWith(token, mockSecret);
  });
});
