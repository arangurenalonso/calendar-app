const express = require('express');

const jwtService = require('../../infrastructure/utils/jwt.service');

const ValidarJWT = async (
  req = express.request,
  res = express.response,
  next = express.next
) => {
  const bearerHeader = req.headers['authorization'];
  if (!bearerHeader) {
    return res
      .status(401)
      .send({ ok: false, message: 'No se ha enviado el token' });
  }
  const bearer = bearerHeader.split(' ');
  const bearerToken = bearer[0];
  if (bearerToken !== 'Bearer') {
    return res
      .status(401)
      .send({ ok: false, message: 'El token debe de empezar con Bearer' });
  }
  const token = bearer[1];
  try {
    const decoded = await jwtService.verifyToken(token);
    const { uid, name } = decoded;
    req.uid = uid;
    req.name = name;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ ok: false, message: `Token no válido - ${error}` });
  }
};

module.exports = ValidarJWT;
