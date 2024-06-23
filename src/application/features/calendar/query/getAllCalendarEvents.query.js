const User = require('../../../../infrastructure/Persistence/entities/user.entites');
const Event = require('../../../../infrastructure/Persistence/entities/event.entites');
const getAllCalendarEventsCommandHandler = async (command) => {
  const eventos = await Event.find().populate('user', 'id name');
  return {
    isValid: true,
    message: 'getAllCalendarEventsCommandHandler',
    data: eventos,
  };
};

module.exports = getAllCalendarEventsCommandHandler;
