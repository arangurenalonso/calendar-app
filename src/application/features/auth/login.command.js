const User = require('../../../infrastructure/Persistence/entities/user.entites');
const bycryptService = require('../../../infrastructure/utils/bycrypt.service');
const jwt = require('../../../infrastructure/utils/jwt.service');
const loginCommand = async (command) => {
  const { email, password } = command;
  const user = await User.findOne({ email: email });
  if (!user) {
    return {
      isValid: false,
      message: `user with the email '${email}' does not exist in the DB`,
      data: null,
    };
  }
  const isValidPassword = await bycryptService.comparePassword(
    password,
    user.password
  );
  if (!isValidPassword) {
    return {
      isValid: false,
      message: 'password is incorrect',
      data: null,
    };
  }
  const token = await jwt.generateToken(user.id, user.name);
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

module.exports = loginCommand;
