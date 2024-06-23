const { body, check, param, query } = require('express-validator');

const createUserValidation = [
  check('name', 'The name is required').not().isEmpty(),
  body('email').isEmail().withMessage('The email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
];
module.exports = createUserValidation;
