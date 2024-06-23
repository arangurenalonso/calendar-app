const asyncHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next))
    .then(() => console.log('Operación exitosa'))
    .catch((error) => {
      next(error);
    });
};

module.exports = asyncHandler;
