const express = require('express');
const { createUser, updateUser } = require('../../controllers/user.controller');
const createUserValidation = require('./validations/createUserValidation');
const updateUserValidation = require('./validations/updateUserValidation');
const validationHandler = require('../../middlewares/validationHandler');
const router = express.Router();

router.post(
  '/',
  createUserValidation,
  validationHandler,
  async (req = express.request, res = express.response) => {
    await createUser(req, res);
  }
);
router.put(
  '/:userId',
  updateUserValidation,
  validationHandler,
  async (req = express.request, res = express.response) => {
    await updateUser(req, res);
  }
);
module.exports = router;
