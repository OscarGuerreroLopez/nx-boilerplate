import { validateEmail } from './validateEmail'; // Replace with the actual module path

describe('validateEmail', () => {
  it('should return true for a valid email', () => {
    const validEmail = 'example@example.com';
    const isValid = validateEmail(validEmail);
    expect(isValid).toBe(true);
  });

  it('should return false for an email without "@" symbol', () => {
    const invalidEmail = 'exampleexample.com'; // Missing "@"
    const isValid = validateEmail(invalidEmail);
    expect(isValid).toBe(false);
  });

  it('should return false for an email with multiple "@" symbols', () => {
    const invalidEmail = 'example@exam@ple.com'; // Multiple "@"
    const isValid = validateEmail(invalidEmail);
    expect(isValid).toBe(false);
  });

  it('should return false for an email with invalid characters before "@"', () => {
    const invalidEmail = 'ex@mple@example.com'; // Invalid characters before "@"
    const isValid = validateEmail(invalidEmail);
    expect(isValid).toBe(false);
  });

  it('should return false for an email without a top-level domain (TLD)', () => {
    const invalidEmail = 'example@example'; // Missing TLD
    const isValid = validateEmail(invalidEmail);
    expect(isValid).toBe(false);
  });

  it('should return false for an email with an invalid TLD', () => {
    const invalidEmail = 'example@example.c'; // Invalid TLD
    const isValid = validateEmail(invalidEmail);
    expect(isValid).toBe(false);
  });

  it('should return false for an email with spaces', () => {
    const invalidEmail = 'exam ple@example.com'; // Contains spaces
    const isValid = validateEmail(invalidEmail);
    expect(isValid).toBe(false);
  });
});
