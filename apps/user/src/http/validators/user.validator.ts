import { body } from 'express-validator';
export const UserValidator = [
  body('fname').exists().withMessage('missing name'),
  body('lname').exists().withMessage('missing name'),
  body('password')
    .exists()
    .isLength({ min: 4, max: 6 })
    .matches(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/)
    .withMessage('missing or not valid password'),
  body('email')
    .exists()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
    .withMessage('missing or invalid email'),
];

export const UserLoginValidator = [
  body('password')
    .exists()
    .isLength({ min: 4, max: 6 })
    .matches(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/)
    .withMessage('missing or not valid password'),
  body('email')
    .exists()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
    .withMessage('missing or invalid email'),
];