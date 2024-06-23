const { body, check, param, query } = require('express-validator');
const isDate = require('../../../../helpers/custom-validator/isDate');
const updateCalendarEventValidation = [
  check('title', 'The Titulo is required').not().isEmpty(),
  // check('notes', 'The notes is required').not().isEmpty(),
  check('start', 'The start debe ser una fecha valida').custom(isDate),
  check('end', 'The end debe ser una fecha valida').custom(isDate),
];
module.exports = updateCalendarEventValidation;
