const User = require('../../../../infrastructure/Persistence/entities/user.entites');
const Event = require('../../../../infrastructure/Persistence/entities/event.entites');
const deleteCalendarEventsCommandHandler = async (command) => {
  const { eventId, userId } = command;
  const event = await Event.findById(eventId);
  if (!event) {
    return {
      isValid: false,
      message: `Event with the id '${eventId}' does not exist in the DB`,
      data: {},
    };
  }
  if (event.user.toString() !== userId) {
    return {
      isValid: false,
      message: `You don't have permission to update this event`,
      data: {},
    };
  }
  await Event.findByIdAndDelete(eventId);
  return {
    isValid: true,
    message: 'deleteCalendarEventsCommandHandler',
    data: {},
  };
};

module.exports = deleteCalendarEventsCommandHandler;
