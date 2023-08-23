const { HttpError } = require("../helpers");

const validateData = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    const emptyBody = Object.keys(req.body).length === 0;

    if (emptyBody) {
      next(HttpError(400, "missing fields"));
    }

    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateData;
