const express = require('express');
const router = express.Router();

// Importa los routers específicos de cada dominio
const authRouter = require('./auth/auth.route.js');
const userRouter = require('./user/user.route.js');
const calendarRouter = require('./calendar/calendar.route.js');

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/calendar/event', calendarRouter);

module.exports = router;
