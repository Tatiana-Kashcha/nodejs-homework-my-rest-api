const Joi = require("joi");

const subList = ["starter", "pro", "business"];

const authSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string().valid(...subList),
  token: Joi.string(),
});

module.exports = {
  authSchema,
};
