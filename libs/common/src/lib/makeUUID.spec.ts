import { v4 as uuidv4 } from 'uuid';
import { makeUUID } from './makeUUID'; // Replace with the actual path to your module

jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

describe('makeUUID', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should generate a UUID', () => {
    const mockedUUID = 'mocked-uuid';
    (uuidv4 as jest.Mock).mockReturnValueOnce(mockedUUID);

    const result = makeUUID();

    expect(result).toBe(mockedUUID);
    expect(uuidv4).toHaveBeenCalledTimes(1);
  });
});
