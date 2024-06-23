const express = require('express');
const {
  getCalendarEvents,
  getCalendarEvent,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
} = require('../../controllers/calendar.controller');
const validationHandler = require('../../middlewares/validationHandler');
const router = express.Router();
const asyncHandler = require('../../middlewares/asyncHandler');
const validarJWT = require('../../middlewares/validar-jwt');
const createCalendarEventValidation = require('./validations/createCalendarEventValidation');
const updateCalendarEventValidation = require('./validations/updateCalendarEventValidation');
router.use(validarJWT);

router.get('/', validationHandler, asyncHandler(getCalendarEvents));

router.get('/:eventId', validationHandler, asyncHandler(getCalendarEvent));

router.post(
  '/',
  createCalendarEventValidation,
  validationHandler,
  asyncHandler(createCalendarEvent)
);

router.put(
  '/:eventId',
  updateCalendarEventValidation,
  validationHandler,
  asyncHandler(updateCalendarEvent)
);

router.delete(
  '/:eventId',
  validationHandler,
  asyncHandler(deleteCalendarEvent)
);

module.exports = router;
