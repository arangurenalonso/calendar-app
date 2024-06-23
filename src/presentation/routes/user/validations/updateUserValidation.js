const { body, check, param, query } = require('express-validator');

const updateUserValidation = [
  check('name', 'The name is required').not().isEmpty(),
  body('email').isEmail().withMessage('The email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
  query('referrer')
    .optional()
    .isURL()
    .withMessage('The referrer must be a valid URL'),
  param('userId').isUUID().withMessage('The userId must be a valid UUID'),
];
module.exports = updateUserValidation;
