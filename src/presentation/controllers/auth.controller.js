const express = require('express');
const loginCommand = require('../../application/features/auth/login.command');
const refreshTokenCommand = require('../../application/features/auth/refresh-token.command');
const login = async (req = express.request, res = express.response) => {
  const {
    body: { email, password },
  } = req;
  try {
    const resp = await loginCommand({ email, password });
    if (!resp.isValid) {
      return res.status(400).send({ ok: false, message: resp.message });
    }
    res.status(201).send({ ok: true, message: resp.message, data: resp.data });
  } catch (error) {
    res.status(500).send({
      ok: false,
      message: 'Error no controlado en el login',
      error,
    });
  }
};
const refreshToken = async (req = express.request, res = express.response) => {
  try {
    const { uid, name } = req;
    const resp = await refreshTokenCommand({ uid, name });
    if (!resp.isValid) {
      return res.status(400).send({ ok: false, message: resp.message });
    }
    res.status(201).send({ ok: true, message: resp.message, data: resp.data });
  } catch (error) {
    res.status(500).send({
      ok: false,
      message: 'Error en refrescar el token del usuario',
      error,
    });
  }
};
module.exports = {
  login,
  refreshToken,
};
