import bcrypt from 'bcryptjs';
import _ from 'underscore';
import { BuildPassword } from './password'; // Replace with the actual path to your module

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('Password Functions', () => {
  const saltRounds = 10;
  const mockHashedPassword = 'mocked-hashed-password';

  const buildPassword = BuildPassword(saltRounds);
  const { makePassword, comparePassword, removePassword } = buildPassword;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should hash a password', async () => {
    (bcrypt.hash as jest.Mock).mockResolvedValue(mockHashedPassword);

    const plainPassword = 'myPassword';
    const result = await makePassword(plainPassword);

    expect(result).toBe(mockHashedPassword);
    expect(bcrypt.hash).toHaveBeenCalledWith(plainPassword, saltRounds);
  });

  it('should compare a password', async () => {
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const password = 'myPassword';
    const hashPassword = 'hashedPassword';
    const result = await comparePassword(password, hashPassword);

    expect(result).toBe(true);
    expect(bcrypt.compare).toHaveBeenCalledWith(password, hashPassword);
  });

  it('should remove password field from single item', () => {
    const item = { name: 'John', password: 'hashedPassword' };
    const result = removePassword(item);

    expect(result).toEqual({ name: 'John' });
  });

  it('should remove password field from array of items', () => {
    const items = [
      { name: 'John', password: 'hashedPassword' },
      { name: 'Jane', password: 'hashedPassword' },
    ];
    const result = removePassword(items);

    const expected = [{ name: 'John' }, { name: 'Jane' }];

    expect(result).toEqual(expected);
  });
});
