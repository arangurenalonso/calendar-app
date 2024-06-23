const User = require('../../../../infrastructure/Persistence/entities/user.entites');
const Event = require('../../../../infrastructure/Persistence/entities/event.entites');

const createCalendarEventhandler = async (command) => {
  const { title, notes, start, end, userId } = command;
  console.log('userId', userId);
  const evento = new Event({
    title,
    notes,
    start,
    end,
  });
  evento.user = userId;
  await evento.save();
  return {
    isValid: true,
    message: 'createCalendarEventhandler',
    data: evento,
  };
};

module.exports = createCalendarEventhandler;
