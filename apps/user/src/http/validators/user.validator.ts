import { body, checkExact } from 'express-validator';
export const userValidator = checkExact([
  body('fname').exists().withMessage('missing name'),
  body('lname').exists().withMessage('missing name'),
  body('password').exists().isStrongPassword({
    minLength: 6,
    minLowercase: 2,
    minUppercase: 2,
    minNumbers: 1,
    minSymbols: 1,
  }),
  body('email')
    .exists()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
    .withMessage('missing or invalid email'),
]);

export const userLoginValidator = checkExact([
  body('password')
    .exists()
    .isLength({ min: 4, max: 16 })
    .matches(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/)
    .withMessage('missing or not valid password'),
  body('email')
    .exists()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
    .withMessage('missing or invalid email'),
]);
