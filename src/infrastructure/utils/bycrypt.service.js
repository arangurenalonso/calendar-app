const bycrypt = require('bcryptjs');

class BycryptService {
  async hashPassword(password) {
    return await bycrypt.hash(password, 10);
  }

  async comparePassword(password, hash) {
    return await bycrypt.compare(password, hash);
  }
}

module.exports = new BycryptService();
