import passwordValidator from 'password-validator';

export const validatePassword = (password: string): boolean => {
  const schema = new passwordValidator();

  schema
    .is()
    .min(6)
    .is()
    .max(16)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits(1)
    .has()
    .not()
    .spaces()
    .has()
    .symbols(1);

  const result = schema.validate(password) as boolean;

  return result;
};
