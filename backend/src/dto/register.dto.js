import { body, validationResult } from 'express-validator';


 const validateRegister = [
  body('email')
    .custom((value, { req }) => {
      if (!value && !req.body.username) {
        throw new Error('Either username or email must be provided');
      }
      return true;
    })
    .optional()
    .isEmail().withMessage('Email is invalid'),

  body('username')
    .custom((value, { req }) => {
      if (!value && !req.body.email) {
        throw new Error('Either username or email must be provided');
      }
      return true;
    })
    .optional()
    .notEmpty().withMessage('Username cannot be empty'),

  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

// Middleware kiểm tra lỗi
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export { validateRegister, validate };
