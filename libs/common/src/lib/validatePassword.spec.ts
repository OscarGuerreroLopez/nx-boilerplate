import { validatePassword } from './validatePassword'; // Replace with the actual module path

describe('validatePassword', () => {
  it('should return true for a valid password', () => {
    const validPassword = 'Abc123!';
    const isValid = validatePassword(validPassword);
    expect(isValid).toBe(true);
  });

  it('should return false for a password with insufficient length', () => {
    const invalidPassword = 'Abc1'; // Less than 6 characters
    const isValid = validatePassword(invalidPassword);
    expect(isValid).toBe(false);
  });

  it('should return false for a password with too much length', () => {
    const invalidPassword = 'Abc123456789012345'; // More than 16 characters
    const isValid = validatePassword(invalidPassword);
    expect(isValid).toBe(false);
  });

  it('should return false for a password without uppercase letters', () => {
    const invalidPassword = 'abc123!'; // Missing uppercase letter
    const isValid = validatePassword(invalidPassword);
    expect(isValid).toBe(false);
  });

  it('should return false for a password without lowercase letters', () => {
    const invalidPassword = 'ABC123!'; // Missing lowercase letter
    const isValid = validatePassword(invalidPassword);
    expect(isValid).toBe(false);
  });

  it('should return false for a password without digits', () => {
    const invalidPassword = 'AbcXYZ!'; // Missing digits
    const isValid = validatePassword(invalidPassword);
    expect(isValid).toBe(false);
  });

  it('should return false for a password with spaces', () => {
    const invalidPassword = 'Abc 123!'; // Contains spaces
    const isValid = validatePassword(invalidPassword);
    expect(isValid).toBe(false);
  });

  it('should return false for a password without symbols', () => {
    const invalidPassword = 'Abc123'; // Missing symbols
    const isValid = validatePassword(invalidPassword);
    expect(isValid).toBe(false);
  });
});
