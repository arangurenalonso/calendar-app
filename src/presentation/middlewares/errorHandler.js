const express = require('express');
const errorHandler = (error, req, res, next) => {
  res.status(error.status || 500).send({
    ok: false,
    message: error.message || 'Internal Server Error',
    stack: error.stack,
    error: error,
  });
};

module.exports = errorHandler;
