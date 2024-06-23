const User = require('../../../../infrastructure/Persistence/entities/user.entites');
const Event = require('../../../../infrastructure/Persistence/entities/event.entites');
const updateCalendarEventsCommandHandler = async (command) => {
  const { eventId, title, notes, start, end, userId } = command;

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

  const newEvent = {
    title,
    notes,
    start,
    end,
    user: userId,
  };

  const eventoActualizado = await Event.findByIdAndUpdate(eventId, newEvent, {
    new: true, //Para retornar el evento actualizado
  });
  return {
    isValid: true,
    message: 'updateCalendarEventsCommandHandler',
    data: eventoActualizado,
  };
};

module.exports = updateCalendarEventsCommandHandler;
