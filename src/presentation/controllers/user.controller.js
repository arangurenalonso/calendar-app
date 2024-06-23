const express = require('express');
const createUserCommandHandler = require('../../application/features/user/createUser.command');
const createUser = async (req = express.request, res = express.response) => {
  const {
    body: { name, email, password },
  } = req;

  try {
    const resp = await createUserCommandHandler({ name, email, password });
    if (!resp.isValid) {
      return res.status(400).send({ ok: false, message: resp.message });
    }
    res.status(201).send({ ok: true, message: resp.message, data: resp.data });
  } catch (error) {
    res.status(500).send({
      ok: false,
      message: 'Error creating user',
      error,
    });
  }
};

const updateUser = async (req = express.request, res = express.response) => {
  const { body, params, query } = req;
  try {
    res.status(201).send({ message: 'updateUser', body, query, params });
  } catch (error) {
    // res.status(400).send(error);
  }
};
module.exports = {
  createUser,
  updateUser,
};
