const { validationResult } = require('express-validator');
const express = require('express');
const validationHandler = (
  req = express.request,
  res = express.response,
  next = express.next
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ ok: false, errors: errors.mapped() });
  }
  next();
};

module.exports = validationHandler;
