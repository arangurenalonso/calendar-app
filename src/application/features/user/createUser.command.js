const User = require('../../../infrastructure/Persistence/entities/user.entites');
const bycryptService = require('../../../infrastructure/utils/bycrypt.service');
const jwt = require('../../../infrastructure/utils/jwt.service');

const createUserCommandHandler = async (command) => {
  const { name, email, password } = command;
  const userExiste = await User.findOne({ email: email });
  if (userExiste) {
    return {
      isValid: false,
      message: `user with the email '${email}' have already existe in the DB`,
      data: null,
    };
  }

  const passwordHash = await bycryptService.hashPassword(password);
  const usuario = new User({ name, email, password: passwordHash });
  await usuario.save();
  const token = await jwt.generateToken(usuario.id, usuario.name);
  return {
    isValid: true,
    message: 'user created',
    data: {
      token,
      uid: usuario.id,
      name: usuario.name,
    },
  };
};

module.exports = createUserCommandHandler;
