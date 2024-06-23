const { body, check, param, query } = require('express-validator');

const loginValidation = [
  body('email').isEmail().withMessage('The email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
];
module.exports = loginValidation;
