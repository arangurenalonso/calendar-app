const User = require('../../../infrastructure/Persistence/entities/user.entites');
const bycryptService = require('../../../infrastructure/utils/bycrypt.service');
const jwt = require('../../../infrastructure/utils/jwt.service');

const refreshTokenCommand = async (command) => {
  const { uid, name } = command;
  const user = await User.findOne({ _id: uid });
  if (!user) {
    return {
      isValid: false,
      message: `user with id '${uid}' does not exist in the DB`,
      data: null,
    };
  }
  const token = await jwt.generateToken(uid, name);
  return {
    isValid: true,
    message: 'user logged in',
    data: {
      token,
      uid: user.id,
      name: user.name,
    },
  };
};

module.exports = refreshTokenCommand;
