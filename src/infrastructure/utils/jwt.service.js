const jwt = require('jsonwebtoken');
require('dotenv').config();

class JwtService {
  generateToken(uid, name) {
    return new Promise((resolve, reject) => {
      const payload = { uid, name };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) {
            console.log(err);
            reject('No se pudo generar el token');
          }
          resolve(token);
        }
      );
    });
  }

  verifyToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.log(err);
          reject(`Error al verificar el token ${err}`);
        }
        resolve(decoded);
      });
    });
  }
}

module.exports = new JwtService();
