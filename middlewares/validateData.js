const { HttpError } = require("../helpers");

const validateData = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    const emptyBody = Object.keys(req.body).length === 0;
    // const missingField =
    //   schema._ids._byKey.size !== Object.keys(req.body).length;

    if (emptyBody) {
      next(HttpError(400, "missing fields"));
    }

    if (error) {
      next(HttpError(400, error.message));
      // if (missingField) {
      //   next(
      //     HttpError(400, `missing required ${error.details[0].path[0]} field`)
      //   );
      // } else {
      //   next(HttpError(400, error.message));
      // }
    }
    next();
  };
  return func;
};

module.exports = validateData;
