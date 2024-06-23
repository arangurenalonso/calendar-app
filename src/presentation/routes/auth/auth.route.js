const express = require('express');
const { login, refreshToken } = require('../../controllers/auth.controller');
const loginValidation = require('./validations/loginValidation');
const validationHandler = require('../../middlewares/validationHandler');

const validarJWT = require('../../middlewares/validar-jwt');
const router = express.Router();

router.post(
  '/login',
  loginValidation,
  validationHandler,
  async (req = express.request, res = express.response) => {
    await login(req, res);
  }
);
router.get(
  '/refresh-token',
  validarJWT,
  async (req = express.request, res = express.response) => {
    await refreshToken(req, res);
  }
);
module.exports = router;
